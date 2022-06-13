import styles from './index.module.less';
import { Menu } from 'antd'
import { MenuRouter } from '@/routers';
import { Button, Carousel, Row, Col, BackTop } from 'antd'
import { MenuFoldOutlined } from '@ant-design/icons';
import DeviceItem from '@/components/DeviceItem';
import OldItem from '@/components/OldItem';
import PartItem from '@/components/PartItem';
import CourseItem from '@/components/CourseItem';
import NewsItem from '@/components/NewsItem';
import { useHistory } from 'umi';
const contentStyle: React.CSSProperties = {
  height: '400px',
  color: '#fff',
  lineHeight: '400px',
  textAlign: 'center',
  background: '#364d79',
};
export default function IndexPage() {
  const history = useHistory();

  return (
   <>
    <div className='content' style={{ margin: '20px auto' }}>
      <div className={styles['line1']}>
        <div className="lf">
        <Button type="primary" icon={<MenuFoldOutlined />} size='large'style={{height: 40, width: 200}}>
          全部产品
        </Button>
        <div className="menu-lf">
          <Menu style={{height: '100%', overflow: 'scroll'}} mode="vertical" theme='dark' items={[{ key: '1', label:'挖掘机', children: [{ key:'1-1', label: '挖掘机1' }] },{ key: '2', label:'装载机' }]} />
        </div>
        </div>
        <div className="rg">
          <Menu  onClick={({ key: curKey }) => {
            history.push(curKey)
          }}  mode="horizontal"  items={ MenuRouter } />
          <Carousel autoplay>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
          </Carousel>
        </div>
      </div>
    </div>

    <div style={{ paddingTop: 25, background: '#F6F6F6' }}>
      <div className='content' >
        <span style={{float: 'right',}}>更多</span>
        <h2 className='title'>为您推荐</h2>
        <Row gutter={12}>
          {
            new Array(10).fill(1).map(i => <Col><DeviceItem /></Col>)
          }
        </Row>
      </div>
    </div>

    <div style={{ paddingTop: 25, background: 'white'}}>
      <div className='content' >
        <span style={{float: 'right',cursor: 'pointer'}}>更多</span>
        <h2 className='title'>品牌设备</h2>
        <Row gutter={12}>
          {
            new Array(6).fill(1).map(i => <Col span={4}>
              <div className={styles['brand-item']}>
                <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" width={190} height={117} />
                <div className='tit'>沃尔沃</div>
              </div>
            </Col>)
          }
        </Row>
        </div>
    </div>

    <div style={{ paddingTop: 25, background: '#F6F6F6' }}>
        <div className='content' >
          <span style={{float: 'right',}}>更多</span>
          <h2 className='title'>二手推荐</h2>
          <Row gutter={12}>
            {
              new Array(10).fill(1).map(i => <Col><OldItem /></Col>)
            }
          </Row>
        </div>
    </div>
    
    <div style={{ padding: '25px 0', background: 'white'}}>
      <div className='content' >
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{width: 670}}>
            <span style={{float: 'right', cursor: 'pointer'}}>更多</span>
            <h2 className='title'>配件零件</h2>
            <Row gutter={15}>
              {
                new Array(3).fill(1).map(i => <Col >
                <PartItem />
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
          <span style={{float: 'right', cursor: 'pointer'}}>更多</span>
          <h2 className='title'>培训课程</h2>
          <Row gutter={18}>
            {
              new Array(3).fill(1).map(i => <Col><CourseItem /></Col>)
            }
          </Row>
        </div>
    </div>

    <div style={{ padding: '25px 0', background: 'white'}}>
      <div className='content' >
        <span style={{float: 'right',cursor: 'pointer'}}>更多</span>
        <h2 className='title'>行业资讯</h2>
        <Row gutter={0}>
          {
            new Array(3).fill(1).map((i,idx) => <Col span={8}>
              <NewsItem index={idx}/>
            </Col>)
          }
        </Row>
        </div>
    </div>
    <BackTop />
   </>
  );
}
