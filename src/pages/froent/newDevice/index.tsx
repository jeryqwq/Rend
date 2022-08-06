import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import { Row, Col, Button,Tag, Pagination } from 'antd'
import { equipmentSalePage } from '@/server/rent';
import { commonRequest, getBrands, getDict, getEquipmentType } from '@/server/common';
import city from '@/constants/city';
import { useHistory, useLocation } from 'umi';
let allProdTypes: any
function AllDevice() {
  const location = useLocation() as any
  const history = useHistory()
  const [pageInfo, setPageInfo] = useState({
    "current": 1,
    "pages": 10,
    "size": 8
  })
  const [keyword, setKeyword] = useState(location.query.keyword)
  const [brands, setBrands] = useState([])
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [params, setParams] = useState<Record<string, any>>({})
  const [prodTypes, setProds] = useState([])
  const [curCity, setCurCity] = useState(city)
  const [recommons, setRecommon] = useState([])
  useEffect(() => {
    (async () => {
      const res = await getBrands()
      if(res.code === '0') {
        setBrands(res.data)
      }
      const res3 = await getEquipmentType()
      if(res3.code === '0') {
        function trans (items: any[]): any {
          return items.map((i: any) => ({name: i.name, code: i.id, children: i.children ?  trans(i.children) : undefined}))
        }
        allProdTypes = trans(res3.data)
        setProds(allProdTypes)
      }

      const res4 = await commonRequest('/equipmentSale/getRecommList', {
        method: 'get'
      })
      if(res4.code === '0') {
        setRecommon(res4.data.slice(0, 3))
      }
    })()
  },[])

  useEffect(() => {
    (async () => {
      const res = await equipmentSalePage({...pageInfo, ...params, equipName: keyword, isNew: 1})
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
        <div className="lf">设备</div>
        <Row className="rg" gutter={[20, 15]}>
          <Col><Button  size='small' type={!params['equipType'] ? 'primary' : 'text'}
            onClick={() => {
              setParams({
                ...params,
                equipType: undefined
              })
              allProdTypes && setProds(allProdTypes)

            }}
          >全部</Button></Col>
         { prodTypes.map((i: any) => <Col><Button  size='small' 
         type={ params['equipType'] === i.code ? 'primary' : 'text' }
         onClick={() => {
          setParams({
            ...params,
            equipType: i.code
          })
          i.children && setProds(i.children)

         }}
         >{i.name}</Button></Col>) } 
        </Row>
      </div>

      <div className={styles.line}>
        <div className="lf">品牌</div>
        <Row className="rg" gutter={15}>
          <Col><Button  size='small' type={!params['equipBrand'] ? 'primary' : 'text'}
          onClick={() => {
            setParams({
              ...params,
              equipBrand: undefined
            })
          }}
          >全部</Button></Col>
          { brands.map((i: any) => <Col><Button  size='small'
           type={ params['equipBrand'] === i.brandName ? 'primary' : 'text' }
          onClick={() => {
            setParams({
              ...params,
              equipBrand: i.brandName
            })
          }}>{i.brandName}</Button></Col>) }
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
            history.push('/productDetail?id=' + i.id)
          }}>
            <div className={`${styles['img-wrap']}`}>
              <img
                width={210}
                src={'/lease-center/' + i.mainImgPath}
              />
              </div>
              <div className="line">
                <div className="lf"><span style={{color: '#D90B18', fontSize: 18}}>¥{i.salePrice}</span> </div>
                <div className="rg">{i.releaseCityName.split(',')[1]}</div>
              </div>
            <div style={{textAlign: 'left',height: 50,overflow: 'hidden', margin: '0 10px'}}>{i.equipName}</div>
            <div className='comp'>{i.organName}</div> 
            <Button type={'primary'} size='middle' style={{width: '100%'}} className={styles.detail}>查看详情</Button>
        </div>
        </Col>) }
      </Row></div>
      <div className={styles.rg}>
        <div className={styles.hotPrice}>特价推荐</div>
       {
         recommons.map((i: any) =>  <div className={`${styles['item-wrap']}`} style={{padding: 0, width: 220}} style={{cursor: 'pointer'}} onClick={() => {
          history.push('/productDetail?id=' + i.id)
        }}>
         <div className={`${styles['img-wrap']}`} style={{padding: 0, height: 220}}>
           <img
             width={220}
             src={'/lease-center/' + i.mainImgPath}
           />
           </div>
           <div className="line">
             <div className="lf"><span style={{color: '#D90B18', fontSize: 18}}>¥{i.salePrice}</span> </div>
             <div className="rg">{i.releaseCityName}</div>
           </div>
         <div style={{textAlign: 'left',margin: '0 10px'}}>{i.equipName}</div>
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
