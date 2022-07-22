import Bread from '@/components/Bread';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'umi';
import { Descriptions, Button, Tabs, message, Row, Col } from 'antd';
import styles from './index.module.less';
import { equipmentSaleDetail, getStoreCommon, getStoreOthers } from '@/server/rent';
import { commonRequest, getFiles } from '@/server/common';
import dayjs from 'dayjs'
import { mallCart } from '@/server/order';
import { IdcardOutlined } from '@ant-design/icons'
function ProductDetail() {
  const location = useLocation() as any
  const history = useHistory()
  const id = location.query.id
  const [productInfo, setProduct] = useState<any>({})
  const [activeType, setActive] = useState<'detail' | 'attration'>('detail')
  const [commonStore, setCommon] = useState<any[]>([])
  const [storeOther, setOther] = useState<any[]>([])
  useEffect(() => {
    (async () => {
      const res = await commonRequest(`/equipmentParts/${id}`,{ method: 'get' })
      if(res.code === '0') {
        setProduct(res.data)
      }
      const res3 = await await commonRequest('/equipmentParts/page', {
        method: 'post',
        data: {"conditions": [
          {"operator":"eq","column":"d.organ_id","value":res.data.organId},{"operator":"ne","column":"d.id","value": res.data.id}
        ],
        "current": 0,
        "pages": 5,
        "size": 5}
      })
      if(res3.code ==='0') {
        setCommon(res3.data.records || [])
      }
      const res4 = await commonRequest('/equipmentParts/page', {
        method: 'post',
        data: {"conditions": [
          {"operator":"ne","column":"d.organ_id","value":res.data.organId},{"operator":"eq","column":"d.parts_type","value": res.data.partsType}
        ],
        "current": 0,
        "pages": 5,
        "size": 5}
      })
      if(res4.code === '0') {
        setOther(res4.data.records || [])
      }
    })()
  },[id])
  return (
    <div className='content' style={{marginTop: 20}}>
      <Bread breads={['设备详情']}/>
      <div className={styles.line1}>
        <div className="lf">
          <img src={'/lease-center/' + productInfo.mainImgPath} alt="" style={{width: '100%', height: 300}}/>
          <div className="subs">
          </div>
        </div>
        <div className="rg">
          <div className="tit">{productInfo.partsName}</div>
          <div className="part1">
            单价:<span className='price'>¥{productInfo.price} /元</span>
          </div>
          <Descriptions column={1} contentStyle={{color: '#333', fontSize: 15}}  labelStyle={{width: 105, color: '#666666', fontSize: 15}}>
            <Descriptions.Item label="地区">{productInfo.releaseCityName}</Descriptions.Item>
            <Descriptions.Item label="品牌">{productInfo.partsBrand}</Descriptions.Item>
            <Descriptions.Item label="发布者">{productInfo.createName}</Descriptions.Item>
            <Descriptions.Item label="最新更新时间">{ productInfo.updateDate}</Descriptions.Item>
            <Descriptions.Item label="设备浏览数">{productInfo.views}</Descriptions.Item>
          </Descriptions>
          <div className="actions">
            <Button type={'primary'} color="#FF4302" size='large' style={{width: 190, height: 44}}
            onClick={async () => {
              history.push({pathname: '/orderAddress',
              state: {
                prods: [{
                details:[{
                  ...productInfo,
                  // mainImgPath,
                  price: productInfo.price,
                  productAmount: 1,
                  productName: productInfo.partsName,
                  productBrand: productInfo.partsBrand,
                  productModel: productInfo.partsModel,
                 type:'EquipmentParts',
                }]
              }]}})
            }}
            >立即订购</Button>
            <Button size='large' color="#FF4302" style={{marginLeft: 38,width: 190, height: 44}}
              onClick={async () => {
                const res = await mallCart({
                  productId: id,
                  productAmount: 1,
                  type: 'EquipmentParts'
                })
                if(res.code === '0') {
                  message.success('加入购物车成功！')
                }
              }}
            >加入购物车</Button>
          </div>
        </div>
      </div>

    <div className={styles.line2}>
      <div className="lf">
        <div className="item">
        <div className="head-tit" style={{paddingLeft: 10}}>商家</div>
        <div className="tit-img"> <img src="/images/store.png" alt="" style={{width: 60, height: 60}} /><span style={{lineHeight: '20px'}}>{productInfo?.organDto?.name}</span></div>
        <div className="person">
          <div className="label">身份认证: <IdcardOutlined  style={{color: '#48BC29'}}/></div>
          {/* <div className="label">经营:xxx</div> */}
        </div>
        <div className="atcion">
          <div className='cur'>联系商家</div>
          <div>进入店铺</div>
        </div>
        </div>
        {
          commonStore.map(i => <div className="item" style={{textAlign: 'center'}} onClick={() => {
            history.replace('/partDetail?id=' + i.id)
          }}>
          <div className="head-tit" style={{paddingLeft: 10, color: '#666666', fontSize: 13, background: 'white',borderColor: 'transparent', borderBottom: '1px solid #DCDCDC'}}>商家还在供应</div>
          <img style={{width: 181, height: 184, margin: '5px 0'}} src={'/lease-center/' + i.mainImgPath}/>
          <div className="ot-tit">
          {i.partsName}
          </div>
          <div className="price">
            ¥{i.price} <span style={{color: '#666666', fontSize: 13}}></span>
          </div>
        </div>)
        }
      </div>
      <div className="rg">
          <div className="head-tit">
            <div className={`item ${activeType === 'detail' && 'active'}`} onClick={() => setActive('detail')}>产品详情</div>
            <div className={`item ${activeType === 'attration' && 'active'}`} onClick={() => setActive('attration')}>注意事项</div>
          </div>
          <div className="prod-cont">
            <div className="stit">产品属性</div>
            <Descriptions column={3} contentStyle={{color: '#333', fontSize: 14}}  labelStyle={{width: 100, color: '#666666', fontSize: 14}}>
              <Descriptions.Item label="设备品牌">{productInfo.partsBrand}</Descriptions.Item>
              <Descriptions.Item label="出厂日期">{productInfo.productionDate && dayjs(productInfo.productionDate).format('YYYY-MM-DD')}</Descriptions.Item>
              {/* <Descriptions.Item label="整机序列号">{productInfo.serialNumber}</Descriptions.Item> */}
              <Descriptions.Item label="配件型号">{productInfo.partsModel}</Descriptions.Item>
              {/* <Descriptions.Item label="工作小时数">{productInfo.workTime}小时</Descriptions.Item> */}
            </Descriptions>
            <div className="stit">产品详情</div>
            <div className="detail">{productInfo.description}</div>
            {/* {subsImg.map(i => <img src={'/lease-center/' + i}  alt="" width='100%'/>)} */}
          </div>
      </div>
    </div>

    <div className={styles.line3}>
      <div className="tit">其他商家相关货品推荐</div>
      <div className="others">
      { 
          storeOther.map(i => 
          <div className="item" onClick={() => {
            history.replace('/partDetail?id=' + i.id)
          }}>
          <img src={'/lease-center/' + i.mainImgPath} style={{width: 210, height: 185}} alt="" />
          <div className="itit">
          {i.partsName} 
          </div>
          <div className="price">
            ¥{i.price}元 <span style={{color: '#666666', fontSize: 13}}></span>
          </div>
          <div className="add">
            地区： {i.releaseCityName}
          </div>
        </div>
          )
        }
      </div>
    </div>
    </div>
  );
}

export default ProductDetail;
