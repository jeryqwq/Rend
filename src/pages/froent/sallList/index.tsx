import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import { Row, Col, Button, Pagination } from 'antd'
import { equipmentSalePage } from '@/server/rent';
import { getBrands, getDict } from '@/server/common';
import city from '@/constants/city';
function AllDevice() {
  const [curDevice, setCurDevice] = useState('all')
  const [pageInfo, setPageInfo] = useState({
    "current": 1,
    "pages": 10,
    "size": 8
  })
  const [brands, setBrands] = useState([])
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [params, setParams] = useState<Record<string, any>>({})
  const [prodTypes, setProds] = useState([])
  const [curCity, setCurCity] = useState(city)
  useEffect(() => {
    (async () => {
      const res = await getBrands()
      if(res.code === '0') {
        setBrands(res.data)
      }
      const res2 = await getDict('/mechineType')
      if(res2.code === '0') {
        setProds(res2.data)
      }
    })()
  },[])

  useEffect(() => {
    (async () => {
      const res = await equipmentSalePage({...pageInfo, ...params})
      if(res.code === '0') {
        setList(res.data.records || [])
        setTotal(res.data.total || 0)
      }
    })()
  }, [pageInfo, params])
  return (
    <div className='content'>
     <div className={styles['search']}>
      <div className={styles.line}>
        <div className="lf">设备</div>
        <Row className="rg" gutter={[20, 15]}>
          <Col><Button  size='small' type={!params['equipType'] ? 'primary' : 'text'}
            onClick={() => {
              setParams({
                ...params,
                equipType: undefined
              })
            }}
          >全部</Button></Col>
         { prodTypes.map((i: any) => <Col><Button  size='small' 
         type={ params['equipType'] === i.code ? 'primary' : 'text' }
         onClick={() => {
          setParams({
            ...params,
            equipType: i.code
          })
         }}
         >{i.name}</Button></Col>) } 
        </Row>
      </div>

      <div className={styles.line}>
        <div className="lf">品牌</div>
        <Row className="rg" gutter={15}>
          <Col><Button  size='small' type={!params['brandName'] ? 'primary' : 'text'}
          onClick={() => {
            setParams({
              ...params,
              brandName: undefined
            })
          }}
          >全部</Button></Col>
          { brands.map((i: any) => <Col><Button  size='small'
           type={ params['brandName'] === i.brandName ? 'primary' : 'text' }
          onClick={() => {
            setParams({
              ...params,
              brandName: i.brandName
            })
          }}>{i.brandName}</Button></Col>) }
        </Row>
      </div>

      <div className={styles.line}>
        <div className="lf">地区</div>
        <Row className="rg" gutter={15}>
          <Col><Button  size='small' type={!params['conditions'] ? 'primary' : 'text'}
            onClick={() => {
              setCurCity(city)
              setParams({
                ...params,
                conditions: undefined
              })
            }}
          >全部</Button></Col>
          { curCity.map(i => <Col style={{marginBottom: 10}}><Button  size='small'
          type={params?.conditions?.[0].value === i.label ? 'primary' : 'text'}
          onClick={() => {
            if(i.children) {
              setCurCity(i.children)
            }
            setParams({
              ...params,
              conditions: [{
                column: "releaseCityName",
                operator: "like",
                value: i.label
              }]
            })
          }}>{i.label}</Button></Col>) }
        </Row>
      </div>
     </div>

      <div className={styles['devices']}>
        <div className={styles.lf}><Row gutter={10}>
        { list.map((i: any) => <Col style={{marginBottom: 5}}>
          <div className={`${styles['item-wrap']} ${ styles.hover }`}>
            <div className={`${styles['img-wrap']}`}>
              <img
                width={210}
                src="/images/repair-bg.png"
              />
              </div>
              <div className="line">
                <div className="lf"><span style={{color: '#D90B18', fontSize: 18}}>¥{i.salePrice}</span> /月</div>
                <div className="rg">{i.releaseCityName.split(',')[1]}</div>
              </div>
            <div style={{textAlign: 'left',height: 50,overflow: 'hidden', margin: '0 10px'}}>{i.description}</div>
            <div className='comp'>合肥安弘工程设备租赁有限公司</div> 
            <Button type={'primary'} size='middle' style={{width: '100%'}} className={styles.detail}>查看详情</Button>
        </div>
        </Col>) }
      </Row></div>
      <div className={styles.rg}>
        <div className={styles.hotPrice}>特价推荐</div>
       {
         new Array(3).fill(1).map(() =>  <div className={`${styles['item-wrap']}`} style={{padding: 0, width: 220}}>
         <div className={`${styles['img-wrap']}`} style={{padding: 0}}>
           <img
             width={220}
             style={{height: 220}}
             src="/images/repair-bg.png"
           />
           </div>
           <div className="line">
             <div className="lf"><span style={{color: '#D90B18', fontSize: 18}}>¥9000</span> /月</div>
             <div className="rg">福州市</div>
           </div>
         <div style={{textAlign: 'left',margin: '0 10px'}}>出租挖掘机</div>
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
       }} current={pageInfo.current} defaultCurrent={2} total={total}  />
       </div>
    </div>
  );
}

export default AllDevice;
