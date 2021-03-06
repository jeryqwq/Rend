import Bread from '@/components/Bread';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'umi';
import { Descriptions, Button, Tabs, message } from 'antd';
import styles from './index.module.less';
import { equipmentSaleDetail } from '@/server/rent';
import { commonRequest, getFiles } from '@/server/common';
import dayjs from 'dayjs'
import { mallCart } from '@/server/order';
import { IdcardOutlined } from '@ant-design/icons'

const { TabPane } = Tabs
function ProductDetail() {
  const location = useLocation() as any
  const id = location.query.id
  const [productInfo, setProduct] = useState<any>({})
  const [activeType, setActive] = useState<'detail' | 'attration'>('detail')
  const [mainImg, setMain] = useState<string[]>([])
  const [subsImg, setSubs] = useState<string[]>([])
  const [mainIndex, setMainIdx] = useState(0)
  const history = useHistory()
  const [others, setOhter] = useState<any[]>([])
  const [otherStores, setOhterStore] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      const res = await equipmentSaleDetail(id, 'equipmentLease')
      if(res.code === '0') {
        setProduct(res.data)
      }
      const res2 = await getFiles(id)
      let subs: any[]  = []
      let mains: any[]  = []
      if(res2.code === '0') {
        const images = res2.data as Array<any>
        images.forEach(i => {
          if(i.serviceType === 'MAIN_IMG')  {
            mains.push(i.path)
          }else{
            subs.push(i.path)
          }
        })
        setSubs(subs)
        setMain(mains)
      }
      const res3 = await commonRequest('/equipmentLease/page', {
        data: {"conditions": [
          {"operator":"eq","column":"d.organ_id","value": res.data.organId}
            ,{"operator":"ne","column":"d.id","value": res.data.id}
          ],
          "current": 0,
          "pages": 5,
          "size": 5}
          ,
        method: 'post'
      })
      if(res3.code === '0') {
        setOhter(res3.data.records)
      }
      const res4 = await commonRequest('/equipmentLease/page', {
        data: {"conditions": [
          {"operator":"ne","column":"d.organ_id","value": res.data.organId}
            ,{"operator":"eq","column":"d.equip_type","value": res.data.equipType}
          ],
          "current": 0,
          "pages": 5,
          "size": 5}
          ,
        method: 'post'
      })
      if(res4.code === '0') {
        setOhterStore(res4.data.records)
      }
    })()
  },[id])
  return (
    <div className='content' style={{marginTop: 20}}>
      <Bread breads={['????????????', '????????????', '????????????']}/>
      <div className={styles.line1}>
        <div className="lf">
        <img src={'/lease-center' + mainImg[mainIndex]} alt="" style={{width: '100%', height: 300}}/>
          <div className="subs">
            {mainImg.map((i, idx) => <img src={'/lease-center/' + i}  alt=""  onClick={() => setMainIdx(idx)} style={{cursor: 'pointer'}}/>)}
          </div>
        </div>
        <div className="rg">
          <div className="tit">{productInfo.equipName}</div>
          <div className="part1">
            ??????:<span className='price'>??{productInfo.monthlyRent} /???</span>/???
          </div>
          <Descriptions column={1} contentStyle={{color: '#333', fontSize: 15}}  labelStyle={{width: 105, color: '#666666', fontSize: 15}}>
            <Descriptions.Item label="??????">{productInfo.releaseCityName?.replace(',', '-')}</Descriptions.Item>
            <Descriptions.Item label="??????">{productInfo.equipBrand}</Descriptions.Item>
            <Descriptions.Item label="?????????">{productInfo.createName}</Descriptions.Item>
            <Descriptions.Item label="??????????????????">{ productInfo.updateDate}</Descriptions.Item>
            <Descriptions.Item label="???????????????">{productInfo.views}</Descriptions.Item>
          </Descriptions>
          <div className="actions">
            <Button type={'primary'} color="#FF4302" size='large' style={{width: 190, height: 44}}
            onClick={async () => {
              history.push({pathname: '/orderAddress',
              state: {
                prods: [{
                details:[{
                  ...productInfo,mainImgPath: mainImg[0],
                  price: productInfo.monthlyRent,
                  productAmount: 1,
                 type:'EquipmentLease',
                 productName: productInfo.partsName,
                 productBrand: productInfo.equipBrand,
                 productModel: productInfo.equipModel,
                }]
              }]}})
            }}
            >????????????</Button>
            <Button size='large' color="#FF4302" style={{marginLeft: 38,width: 190, height: 44}}
               onClick={async () => {
                const res = await mallCart({
                  productId: id,
                  productAmount: 1,
                  type: 'EquipmentLease'
                })
                if(res.code === '0') {
                  message.success('????????????????????????')
                }
              }}
            >???????????????</Button>
          </div>
        </div>
      </div>

    <div className={styles.line2}>
      <div className="lf">
        <div className="item">
        <div className="head-tit" style={{paddingLeft: 10}}>??????</div>
        <div className="tit-img"> <img src="/images/store.png" alt="" style={{width: 60, height: 60}} /><span style={{lineHeight: '20px'}}>{productInfo?.organDto?.name}</span></div>
        <div className="person">
          <div className="label">????????????: <IdcardOutlined  style={{color: '#48BC29'}}/></div>
          {/* <div className="label">??????:xxx</div> */}
        </div>
        <div className="atcion">
        <div className='cur' onClick={() => {
            message.info('?????????' + productInfo?.organDto?.callPhone)
          }}>????????????</div>
          {/* <div>????????????</div> */}
        </div>
        </div>
        {
          others.map((i: any) => <div className="item" style={{textAlign: 'center'}} onClick={() => {
            history.replace('/rentDetail?id=' + i.id)
          }}>
          <div className="head-tit" style={{paddingLeft: 10, color: '#666666', fontSize: 13, background: 'white',borderColor: 'transparent', borderBottom: '1px solid #DCDCDC'}}>??????????????????</div>
          <img src={'/lease-center/' + i.mainImgPath} style={{width: 181, height: 184, margin: '5px 0'}}/>
          <div className="ot-tit">
          {i.equipName}
          </div>
          <div className="price">
            ??{i.monthlyRent}??? <span style={{color: '#666666', fontSize: 13}}>/???</span>
          </div>
        </div>)
        }
      </div>
      <div className="rg">
          <div className="head-tit">
            <div className={`item ${activeType === 'detail' && 'active'}`} onClick={() => setActive('detail')}>????????????</div>
            <div className={`item ${activeType === 'attration' && 'active'}`} onClick={() => setActive('attration')}>????????????</div>
          </div>
          <div className="prod-cont">
            <div className="stit">????????????</div>
            <Descriptions column={3} contentStyle={{color: '#333', fontSize: 14}}  labelStyle={{width: 100, color: '#666666', fontSize: 14}}>
              <Descriptions.Item label="????????????">{productInfo.equipBrand}</Descriptions.Item>
              <Descriptions.Item label="????????????">{productInfo.productionDate && dayjs(productInfo.productionDate).format('YYYY-MM-DD')}</Descriptions.Item>
              <Descriptions.Item label="???????????????">{productInfo.serialNumber}</Descriptions.Item>
              <Descriptions.Item label="????????????">{productInfo.equipModel}</Descriptions.Item>
              <Descriptions.Item label="???????????????">{productInfo.workTime}??????</Descriptions.Item>
            </Descriptions>
            <div className="stit">????????????</div>
            <div className="detail">{productInfo.description}</div>
            {subsImg.map(i => <img src={'/lease-center/' + i}  alt="" width='100%'/>)}
          </div>
      </div>
    </div>

    <div className={styles.line3}>
      <div className="tit">??????????????????????????????</div>
      <div className="others">
        { 
          otherStores.map(i =>  <div className="item" onClick={() => {
            history.replace('/rentDetail?id=' + i.id)
          }}>
          <img src={'/lease-center/' + i.mainImgPath} style={{width: 210, height: 185}} />
            <div className="itit">
            {i.equipName}
            </div>
          <div className="price">
            ??{i.monthlyRent}??? <span style={{color: '#666666', fontSize: 13}}>/???</span>
          </div>
          <div className="add">
            ????????? {i.releaseCityName}
          </div>
        </div>)
        }
      </div>
    </div>
    </div>
  );
}

export default ProductDetail;
