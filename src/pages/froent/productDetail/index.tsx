import Bread from '@/components/Bread';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'umi';
import { Descriptions, Button, Tabs, message } from 'antd';
import styles from './index.module.less';
import {
  equipmentSaleDetail,
  getStoreCommon,
  getStoreOthers,
} from '@/server/rent';
import { commonRequest, getFiles } from '@/server/common';
import dayjs from 'dayjs';
import { mallCart } from '@/server/order';
import { IdcardOutlined } from '@ant-design/icons';

function ProductDetail() {
  const location = useLocation() as any;
  const history = useHistory();
  const id = location.query.id;
  const [productInfo, setProduct] = useState<any>({});
  const [activeType, setActive] = useState<'detail' | 'attration'>('detail');
  const [mainImg, setMain] = useState<string[]>([]);
  const [subsImg, setSubs] = useState<string[]>([]);
  const [mainIndex, setMainIdx] = useState(0);
  const [commonStore, setCommon] = useState<any[]>([]);
  const [storeOther, setOther] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const res = await equipmentSaleDetail(id);
      if (res.code === '0') {
        setProduct(res.data);
      }
      const res2 = await getFiles(id);
      let subs: any[] = [];
      let mains: any[] = [];
      if (res2.code === '0') {
        const images = res2.data as Array<any>;
        images.forEach((i) => {
          if (i.serviceType === 'MAIN_IMG') {
            mains.push(i.path);
          } else {
            subs.push(i.path);
          }
        });
        setSubs(subs);
        setMain(mains);
      }
      const res3 = await commonRequest('/equipmentSale/page', {
        method: 'post',
        data: {
          size: 5,
          current: 0,
          conditions: [
            {
              operator: 'eq',
              column: 'd.organ_id',
              value: res.data.organId,
            },
            {
              operator: 'ne',
              column: 'd.id',
              value: res.data.id,
            },
          ],
        },
      });
      if (res3.code === '0') {
        setCommon(res3.data.records);
      }
      const res4 = await commonRequest('/equipmentSale/page', {
        method: 'post',
        data: {
          size: 5,
          current: 0,
          conditions: [
            {
              operator: 'ne',
              column: 'd.organ_id',
              value: res.data.organId,
            },
            {
              operator: 'eq',
              column: 'd.equip_type',
              value: res.data.equipType,
            },
          ],
        },
      });
      if (res4.code === '0') {
        setOther(res4.data.records);
      }
    })();
  }, [id]);
  return (
    <div className="content" style={{ marginTop: 20 }}>
      <Bread
        breads={[productInfo.isNew === 1 ? '新机出售' : '二手设备', '设备详情']}
      />
      <div className={styles.line1}>
        <div className="lf">
          <img
            src={'/lease-center' + mainImg[mainIndex]}
            alt=""
            style={{ width: '100%' }}
          />
          <div className="subs">
            {mainImg.map((i, idx) => (
              <img
                src={'/lease-center/' + i}
                alt=""
                onClick={() => setMainIdx(idx)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
        </div>
        <div className="rg">
          <div className="tit">{productInfo.equipName}</div>
          <div className="part1">
            单价:<span className="price">¥{productInfo.salePrice} /元</span>/台
          </div>
          <Descriptions
            column={1}
            contentStyle={{ color: '#333', fontSize: 15 }}
            labelStyle={{ width: 105, color: '#666666', fontSize: 15 }}
          >
            <Descriptions.Item label="地区">
              {productInfo.releaseCityName?.replace(',', '-')}
            </Descriptions.Item>
            <Descriptions.Item label="品牌">
              {productInfo.equipBrand}
            </Descriptions.Item>
            <Descriptions.Item label="发布者">
              {productInfo.createName}
            </Descriptions.Item>
            <Descriptions.Item label="最新更新时间">
              {productInfo.updateDate}
            </Descriptions.Item>
            <Descriptions.Item label="设备浏览数">
              {productInfo.views}
            </Descriptions.Item>
          </Descriptions>
          <div className="actions">
            <Button
              type={'primary'}
              color="#FF4302"
              size="large"
              style={{ width: 190, height: 44 }}
              onClick={async () => {
                history.push({
                  pathname: '/orderAddress',
                  state: {
                    prods: [
                      {
                        details: [
                          {
                            ...productInfo,
                            mainImgPath: mainImg[0],
                            price: productInfo.salePrice,
                            productAmount: 1,
                            productName: productInfo.partsName,
                            productBrand: productInfo.equipBrand,
                            productModel: productInfo.equipModel,
                            type: 'EquipmentSale',
                          },
                        ],
                      },
                    ],
                  },
                });
              }}
            >
              立即订购
            </Button>
            <Button
              size="large"
              color="#FF4302"
              style={{ marginLeft: 38, width: 190, height: 44 }}
              onClick={async () => {
                const res = await mallCart({
                  productId: id,
                  productAmount: 1,
                  type: 'EquipmentSale',
                });
                if (res.code === '0') {
                  message.success('加入购物车成功！');
                }
              }}
            >
              加入购物车
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.line2}>
        <div className="lf">
          <div className="item">
            <div className="head-tit" style={{ paddingLeft: 10 }}>
              商家
            </div>
            <div className="tit-img">
              {' '}
              <img
                src="/images/store.png"
                alt=""
                style={{ width: 60, height: 60 }}
              />
              <span style={{ lineHeight: '20px' }}>
                {productInfo?.organDto?.serverType === 'user'
                  ? productInfo?.organDto?.legalUser
                  : productInfo?.organDto?.name}
              </span>
            </div>
            <div className="person">
              <div className="label">
                身份认证: <IdcardOutlined style={{ color: '#48BC29' }} />
              </div>
              {/* <div className="label">经营:xxx</div> */}
            </div>
            <div className="atcion">
              <div
                className="cur"
                onClick={async () => {
                  const res = await commonRequest('/appdict/param/ptPhone', {
                    method: 'get',
                  });
                  if (res.code === '0') {
                    message.info('电话：' + res.data?.msg);
                  }
                }}
              >
                联系商家
              </div>
              {/* <div>进入店铺</div> */}
            </div>
          </div>
          {commonStore.map((i) => (
            <div
              className="item"
              style={{ textAlign: 'center' }}
              onClick={() => {
                history.replace('/productDetail?id=' + i.id);
              }}
            >
              <div
                className="head-tit"
                style={{
                  paddingLeft: 10,
                  color: '#666666',
                  fontSize: 13,
                  background: 'white',
                  borderColor: 'transparent',
                  borderBottom: '1px solid #DCDCDC',
                }}
              >
                商家还在供应
              </div>
              <img
                style={{ width: 181, height: 184, margin: '5px 0' }}
                src={'/lease-center/' + i.mainImgPath}
              />
              <div className="ot-tit">{i.equipName}</div>
              <div className="price">
                ¥{i.salePrice}{' '}
                <span style={{ color: '#666666', fontSize: 13 }}></span>
              </div>
            </div>
          ))}
        </div>
        <div className="rg">
          <div className="head-tit">
            <div
              className={`item ${activeType === 'detail' && 'active'}`}
              onClick={() => setActive('detail')}
            >
              产品详情
            </div>
            <div
              className={`item ${activeType === 'attration' && 'active'}`}
              onClick={() => setActive('attration')}
            >
              注意事项
            </div>
          </div>
          <div className="prod-cont">
            <div className="stit">产品属性</div>
            <Descriptions
              column={3}
              contentStyle={{ color: '#333', fontSize: 14 }}
              labelStyle={{ width: 100, color: '#666666', fontSize: 14 }}
            >
              <Descriptions.Item label="设备品牌">
                {productInfo.equipBrand}
              </Descriptions.Item>
              <Descriptions.Item label="出厂日期">
                {productInfo.productionDate &&
                  dayjs(productInfo.productionDate).format('YYYY-MM-DD')}
              </Descriptions.Item>
              <Descriptions.Item label="整机序列号">
                {productInfo.serialNumber}
              </Descriptions.Item>
              <Descriptions.Item label="设备型号">
                {productInfo.equipModel}
              </Descriptions.Item>
              {productInfo.isNew === 0 && (
                <Descriptions.Item label="工作小时数">
                  {productInfo.workTime}小时
                </Descriptions.Item>
              )}
            </Descriptions>
            <div className="stit">产品详情</div>
            <div className="detail">{productInfo.description}</div>
            {subsImg.map((i) => (
              <img src={'/lease-center/' + i} alt="" width="100%" />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.line3}>
        <div className="tit">其他商家相关货品推荐</div>
        <div className="others">
          {storeOther.map((i) => (
            <div
              className="item"
              onClick={() => {
                history.replace('/productDetail?id=' + i.id);
              }}
            >
              <img
                src={'/lease-center/' + i.mainImgPath}
                style={{ width: 210, height: 185 }}
                alt=""
              />
              <div className="itit">{i.equipName}</div>
              <div className="price">
                ¥{i.salePrice}元{' '}
                <span style={{ color: '#666666', fontSize: 13 }}></span>
              </div>
              <div className="add">地区： {i.releaseCityName}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
