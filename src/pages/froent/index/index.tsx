import styles from './index.module.less';
import { Menu } from 'antd'
import { MenuRouter } from '@/routers';
import { Button, Carousel, Row, Col, BackTop, Popover } from 'antd'
import { MenuFoldOutlined } from '@ant-design/icons';
import DeviceItem from '@/components/DeviceItem';
import OldItem from '@/components/OldItem';
import PartItem from '@/components/PartItem';
import CourseItem from '@/components/CourseItem';
import NewsItem from '@/components/NewsItem';
import { useHistory } from 'umi';
import { useEffect, useState } from 'react';
import { commonRequest, getDict, getEquipmentType } from '@/server/common';
import { mallBrandInfo } from '@/server/rent';
import { appNewsPage } from '@/server/news';
const contentStyle: React.CSSProperties = {
  height: '400px',
  color: '#fff',
  lineHeight: '400px',
  textAlign: 'center',
  background: '#364d79',
};
export default function IndexPage() {
  const history = useHistory();
  const [prods, setProds] = useState([])
  const [brands, setBrand] = useState<any[]>([])
  const [rents, setRent] = useState<any[]>([])
  const [sales, setSale] = useState<any[]>([])
  const [news, setNews] = useState<any[]>([])
  const [parts, setParts] =  useState<any[]>([])
  const [banners, setBanner] = useState<any[]>([])
  const [course, setCourse] =  useState<any[]>([])

  useEffect(() => {
    (async () => {
      const res = await getEquipmentType()
      if(res.code === '0') {
        function trans (items: any[]): any {
          return items.map((i: any) => ({label: i.name, key: i.id, children: i.children ?  trans(i.children) : undefined}))
        }
        setProds(trans(res.data))
      }
      const res2 = await mallBrandInfo({
        page: 0,
        size: 6
      })
      if(res2.code === '0') {
        setBrand(res2.data.records)
      }
      const res3 = await commonRequest('/equipmentLease/getRecommList', {
        method: 'get'
      })
      if(res3.code === '0') {
        setRent(res3.data)
      }
      const res4 = await commonRequest('/equipmentSale/getRecommList', {
        method: 'get'
      })
      if(res4.code === '0') {
        setSale(res4.data)
      }
      const res5 = await commonRequest('/appnews/findRecomand', { method: 'post' })
      if(res5.code === '0') {
        setNews(res5.data.slice(0, 3))
      }
      const res6 = await commonRequest('/equipmentParts/getRecommList', {
        method: 'get',
      })
      if(res6.code === '0') {
        setParts(res6.data.slice(0,3))
      }
      const res7 = await commonRequest('/appnews/findLunbo', {
        method: 'get'
      })
      if(res7.code === '0') {
        setBanner(res7.data)
      }
      const res8 = await commonRequest('/trainingCourse/getRecommList', {
        method: 'get'
      })
      if(res8.code === '0') {
        setCourse(res8.data)
      }
    })()
  },[])
  return (
   <>
    <div className='content' style={{ margin: '20px auto' }}>
      <div className={styles['line1']}>
        <div className="lf">
          <Button type="primary" icon={<MenuFoldOutlined />} size='large'style={{height: 40, width: 200}}>
            全部产品
          </Button>
        <div className="menu-lf">
          <Menu style={{height: '100%', overflow: 'auto'}} onClick={({key}) => {
            history.push('/allDevice?type=' + key)
          }} mode="vertical" theme='dark' items={prods} />
        </div>
        </div>
        <div className="rg">
        <div className='menu-wrap'><div className='content'> {MenuRouter.map(i => <div className={`item `}
        onClick={() => {
          history.push(i.path)
        }}
      >{
        i.other? 
        <Popover content={i.other} placement='bottomLeft' >
        {i.label}
      </Popover>
        :i.label
      }</div>)}</div> 
      </div>
          {/* <Menu  onClick={({ key: curKey }) => {
            if(curKey === 'forxxx') {
              window.open('http://psi.fjrongshengda.com/')
            }else{
              history.push(curKey)
            }
          }}  mode="horizontal"  items={ MenuRouter } /> */}
          <Carousel autoplay>
          {
            banners.map((i: any) => <h3 style={contentStyle}>
            <img src={'/lease-center/' + i.headUrl} style={{width: '100%', height: '400px'}}/>
           </h3>)
          }
          </Carousel>
        </div>
      </div>
    </div>

    <div style={{ paddingTop: 25, background: '#F6F6F6' }}>
      <div className='content' >
        {/* <span style={{float: 'right',}}>更多</span> */}
        <h2 className='title'>为您推荐</h2>
        <Row gutter={12}>
          {
           rents.map((i:any) => <Col><DeviceItem item={i}/></Col>)
          }
        </Row>
      </div>
    </div>

    <div style={{ paddingTop: 25, background: 'white'}}>
      <div className='content' >
        <span style={{float: 'right',cursor: 'pointer'}} onClick={() => {history.push('/brandList')}}>更多</span>
        <h2 className='title'>品牌设备</h2>
        <Row gutter={12}>
          {
           brands.map(i => <Col span={4}>
              <div className={styles['brand-item']} >
                <img src={'/lease-center' + i.brandLogo} width={190} height={117} />
                <div className='tit'>{i.brandName}</div>
              </div>
            </Col>)
          }
        </Row>
        </div>
    </div>

    <div style={{ paddingTop: 25, background: '#F6F6F6' }}>
        <div className='content' >
          <a style={{float: 'right', color: '#333'}} href="#/sallList" >更多</a>
          <h2 className='title'>二手推荐</h2>
          <Row gutter={12}>
            {
             sales.map((i: any) => <Col><OldItem item={i}/></Col>)
            }
          </Row>
        </div>
    </div>
    
    <div style={{ padding: '25px 0', background: 'white'}}>
      <div className='content' >
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{width: 670}}>
            <a style={{float: 'right', cursor: 'pointer'}} href="#/part">更多</a>
            <h2 className='title'>配件零件</h2>
            <Row gutter={15}>
              {
               parts.map(i => <Col >
                <PartItem item={i}/>
                </Col>)
              }
            </Row>
          </div>
          <div style={{width: 500}}>
            <img src='/images/server.png' width={490}/>
          </div>
        </div>
      </div>
    </div>

    <div style={{ padding: '25px 0 20px 0',  background: '#F6F6F6' }}>
        <div className='content' >
          <a style={{float: 'right', cursor: 'pointer'}} href="#/course">更多</a>
          <h2 className='title'>培训课程</h2>
          <Row gutter={18}>
            {
             course.map(i => <Col><CourseItem item={i}/></Col>)
            }
          </Row>
        </div>
    </div>

    <div style={{ padding: '25px 0', background: 'white'}}>
      <div className='content' >
        <a style={{float: 'right',cursor: 'pointer'}} href="#/news">更多</a>
        <h2 className='title'>行业资讯</h2>
        <Row gutter={0}>
          {
           news.map((i,idx) => <Col span={8}>
              <NewsItem index={idx} item={i}/>
            </Col>)
          }
        </Row>
        </div>
    </div>
    <BackTop />
   </>
  );
}
