import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import { Row, Col, Button,Tag, Pagination } from 'antd'
import { equipmentPartPage } from '@/server/rent';
import { commonRequest, getBrands, getDict, getEquipmentType } from '@/server/common';
import city from '@/constants/city';
import { useHistory, useLocation } from 'umi';
function AllDevice() {
  const location = useLocation() as any
  const history = useHistory()
  const [pageInfo, setPageInfo] = useState({
    "current": 1,
    "pages": 10,
    "size": 12
  })
  const [keyword, setKeyword] = useState(location.query.keyword)
  const [brands, setBrands] = useState([])
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [params, setParams] = useState<Record<string, any>>({})
  const [curCity, setCurCity] = useState(city)
  const [recommList, setRlist] = useState([])
  const [partsType, setPartType] = useState([])

  useEffect(() => {
    (async () => {
      // const res = await getBrands()
      // if(res.code === '0') {
      //   setBrands(res.data)
      // }
      const res2 = await commonRequest('/equipmentParts/getRecommList', {
        method: 'get'
      })
      if(res2.code === '0') {
        setRlist(res2.data)
      }
      const res3 = await commonRequest('/appdict/partsType', { method: 'get' })
      if(res3.code === '0') {
        setPartType(res3.data)
      }
      const res4 = await commonRequest('/appdict/partsBrand', { method: 'get' })
      if(res4.code === '0') {
        setBrands(res4.data)
      }
    })()
  },[])

  useEffect(() => {
    (async () => {
      const res = await equipmentPartPage({...pageInfo, ...params, equipName: keyword})
      if(res.code === '0') {
        setList(res.data.records || [])
        setTotal(res.data.total || 0)
      }
    })()
  }, [pageInfo, params, keyword])
  return (
    <div className='content'>
     <div className={styles['search']}>

     <div className={styles.line}>
        <div className="lf">类型</div>
        <Row className="rg" gutter={15}>
          <Col><Button  size='small' type={!params['partsType'] ? 'primary' : 'text'}
          onClick={() => {
            setParams({
              ...params,
              partsType: undefined
            })
          }}
          >全部</Button></Col>
          { partsType.map((i: any) => <Col><Button  size='small'
           type={ params['partsType'] === i.code ? 'primary' : 'text' }
          onClick={() => {
            setParams({
              ...params,
              partsType: i.code
            })
          }}>{i.name}</Button></Col>) }
        </Row>
      </div>


      <div className={styles.line}>
        <div className="lf">品牌</div>
        <Row className="rg" gutter={15}>
          <Col><Button  size='small' type={!params['partsBrand'] ? 'primary' : 'text'}
          onClick={() => {
            setParams({
              ...params,
              partsBrand: undefined
            })
          }}
          >全部</Button></Col>
          { brands.map((i: any) => <Col><Button  size='small'
           type={ params['partsBrand'] === i.name ? 'primary' : 'text' }
          onClick={() => {
            setParams({
              ...params,
              partsBrand: i.name
            })
          }}>{i.name}</Button></Col>) }
        </Row>
      </div>

      <div className={styles.line}>
        <div className="lf">地区</div>
        <Row className="rg" gutter={15}>
          <Col><Button  size='small' type={!params['releaseCityName'] ? 'primary' : 'text'}
            onClick={() => {
              setCurCity(city)
              setParams({
                ...params,
                releaseCityName: undefined
              })
            }}
          >全部</Button></Col>
          { curCity.map(i => <Col style={{marginBottom: 10}}><Button  size='small'
          type={params?.releaseCityName === i.label ? 'primary' : 'text'}
          onClick={() => {
            if(i.children) {
              setCurCity(i.children as any )
            }
            setParams({
              ...params,
              releaseCityName: i.label
            })
          }}>{i.label}</Button></Col>) }
        </Row>
      </div>
     {
      keyword &&  <div className={styles.line}>
      <div className="lf">搜索关键词</div>
     <div style={{flex: 1}}>
       <Tag closable visible={keyword} onClose={() => setKeyword('')}>
        {keyword}
      </Tag>
     </div>
    </div>
     }
   </div>
    

      <div className={styles['devices']}>
        <div className={styles.lf}><Row gutter={10}>
        { list.map((i: any) => <Col style={{marginBottom: 5}}>
          <div className={`${styles['item-wrap']} ${ styles.hover }`} style={{cursor: 'pointer'}} onClick={() => {
            history.push('/partDetail?id=' + i.id)
          }}>
            <div className={`${styles['img-wrap']}`}>
              <img
                width={210}
                src={'/lease-center/' + i.mainImgPath}
              />
              </div>
              <div className="line">
                <div className="lf"><span style={{color: '#D90B18', fontSize: 18}}>¥{i.price}</span> </div>
                <div className="rg">{i.releaseCityName}</div>
              </div>
              <div className={styles.stit}>{i.remark}</div>
            <div className='comp'>{i.organName}</div> 
            <Button type={'primary'} size='middle' style={{width: '100%'}} className={styles.detail}>查看详情</Button>
        </div>
        </Col>) }
      </Row></div>
      <div className={styles.rg}>
        <div className={styles.hotPrice}>热卖配件</div>
       {
        recommList.map((i: any) =>  <div className={`${styles['item-wrap']}`} style={{padding: 0, width: 220}}>
         <div className={`${styles['img-wrap']}`} style={{padding: 0}}>
           <img
             width={220}
             style={{height: 220}}
             src={'/lease-center/' + i.mainImgPath}
           />
           </div>
           <div className={styles.stit} >{i.description}</div>
           <div className="line">
             <div className="lf"><span style={{color: '#D90B18', fontSize: 18}}>¥{i.price}</span> </div>
             <div className="rg">销量：900</div>
           </div>
     
     </div>)
       }
       
      </div>
      </div>

       <div style={{margin: '40px auto 60px auto', textAlign: 'center'}}>
       <Pagination showQuickJumper onChange={(num: number, size) => {
         setPageInfo({
           ...pageInfo,
           current: num,
           size
         })
       }} current={pageInfo.current} defaultCurrent={1} total={total}  />
       </div>
    </div>
  );
}

export default AllDevice;
