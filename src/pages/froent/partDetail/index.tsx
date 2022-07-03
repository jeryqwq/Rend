import Bread from '@/components/Bread';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'umi';
import { Descriptions, Button, Tabs, message } from 'antd';
import styles from './index.module.less';
import { equipmentSaleDetail } from '@/server/rent';
import { commonRequest, getFiles } from '@/server/common';
import dayjs from 'dayjs'
import { mallCart } from '@/server/order';
function ProductDetail() {
  const location = useLocation() as any
  const history = useHistory()
  const id = location.query.id
  const [productInfo, setProduct] = useState<any>({})
  const [activeType, setActive] = useState<'detail' | 'attration'>('detail')
  const [mainImg, setMain] = useState<string[]>([])
  useEffect(() => {
    (async () => {
      const res = await commonRequest(`/equipmentParts/${id}`,{ method: 'get' })
      if(res.code === '0') {
        setProduct(res.data)
      }
    })()
  },[])
  return (
    <div className='content' style={{marginTop: 20}}>
      <Bread breads={[  '设备详情']}/>
      <div className={styles.line1}>
        <div className="lf">
          <img src={'/lease-center' + productInfo.path} alt="" style={{width: '100%', height: 300}}/>
          <div className="subs">
          </div>
        </div>
        <div className="rg">
          <div className="tit">{productInfo.partsName}</div>
          <div className="part1">
            租金:<span className='price'>¥{productInfo.price} /元</span>/月
          </div>
          <Descriptions column={1} contentStyle={{color: '#333', fontSize: 15}}  labelStyle={{width: 105, color: '#666666', fontSize: 15}}>
            <Descriptions.Item label="地区">{productInfo.releaseCityName}</Descriptions.Item>
            <Descriptions.Item label="品牌">{productInfo.partsBrand}</Descriptions.Item>
            <Descriptions.Item label="发布者">{productInfo.createName}</Descriptions.Item>
            <Descriptions.Item label="最新更新时间">empty</Descriptions.Item>
            <Descriptions.Item label="设备浏览数">{productInfo.updateDate}</Descriptions.Item>
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
        <div className="tit-img"> <img src="" alt="" style={{width: 60, height: 60}} />xxx</div>
        <div className="person">
          <div className="label">顺丰认证:</div>
          <div className="label">经营摩好:xxx</div>
        </div>
        <div className="atcion">
          <div className='cur'>联系商家</div>
          <div>进入店铺</div>
        </div>
        </div>
        <div className="item" style={{textAlign: 'center'}}>
          <div className="head-tit" style={{paddingLeft: 10, color: '#666666', fontSize: 13, background: 'white',borderColor: 'transparent', borderBottom: '1px solid #DCDCDC'}}>商家还在供应</div>
          <img style={{width: 181, height: 184, margin: '5px 0'}}/>
          <div className="ot-tit">
          福建省福州市鼓楼区挖掘机设备出租
          </div>
          <div className="price">
            ¥153414元 <span style={{color: '#666666', fontSize: 13}}>/月</span>
          </div>
        </div>
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
              <Descriptions.Item label="整机序列号">{productInfo.serialNumber}</Descriptions.Item>
              <Descriptions.Item label="设备型号">{productInfo.partsModel}</Descriptions.Item>
              <Descriptions.Item label="工作小时数">{productInfo.workTime}小时</Descriptions.Item>
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
          new Array(5).fill(1).map(i =>  <div className="item">
          <img src="" style={{width: 210, height: 185}} alt="" />
          <div className="itit">
          福建省福州市鼓楼区挖掘机设备出租
          </div>
          <div className="price">
            ¥153414元 <span style={{color: '#666666', fontSize: 13}}>/月</span>
          </div>
          <div className="add">
            地区： 福州市
          </div>
        </div>)
        }
      </div>
    </div>
    </div>
  );
}

export default ProductDetail;
