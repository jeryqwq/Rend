import Bread from '@/components/Bread';
import { commonRequest } from '@/server/common';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'umi';
import styles from './index.module.less';
import { message, Modal, Descriptions, Typography } from 'antd';
const { Paragraph } = Typography;

function OrderAddress() {
  const location = useLocation() as any;
  const history = useHistory();
  const [address, setAddress] = useState<any[]>([]);
  const [curIdx, setCurIdx] = useState(0);
  const { state } = location as any;
  const [paymentMethod, setpaymentMethod] = useState<1 | 2 | 3 | 4 | 5>(1);
  console.log(state);
  if (!state?.prods) return <div>非法进入</div>;
  const isCart = state.isCart;
  let totalCount = 0;
  let totalPrice = 0;
  let allProdus: any[] = [];
  state?.prods.forEach((j: any) => {
    totalCount += j?.details?.length || 0;
    allProdus.push(...j?.details);
    totalPrice += j?.details
      ?.map((i: any) => i.productAmount * (i.price || i.nowPrice))
      .reduce((a: number, b: number) => a + b);
  });
  useEffect(() => {
    (async () => {
      const res = await commonRequest('/mallReceiveAddress/findMy', {
        method: 'get',
      });
      if (res.code === '0') {
        res.data.forEach((i: any, idx: number) => {
          if (i.isDeatul === 1) {
            setCurIdx(idx);
          }
        });
        setAddress(res.data);
      }
    })();
  }, []);
  return (
    <div className="content" style={{ marginTop: 20 }}>
      <div className={styles.addressWrap}>
        <Bread breads={['确认订单']} />
        <div className="tit">
          选择收获地址
          <a
            href="/#/userCenter/address"
            style={{ float: 'right', fontSize: 15 }}
          >
            管理地址
          </a>
        </div>
        <div className="addr-list">
          {address.map((i: any, idx) => (
            <div
              className={`item ${curIdx === idx && 'cur'}`}
              onClick={() => {
                setCurIdx(idx);
              }}
            >
              <span>收货人:</span>
              {i.receiveUser}
              <br />
              <span>联系方式:</span>
              {i.contactNumber}
              <br />
              <span>收货地址:</span>
              {i.address}
            </div>
          ))}
        </div>
        <div className="tit">交易方式</div>
        <div style={{ display: 'flex' }}>
          <div
            className={'pay-method ' + (paymentMethod === 1 && 'cur')}
            onClick={() => {
              setpaymentMethod(1);
            }}
          >
            银联支付
          </div>
          <div
            className={'pay-method ' + (paymentMethod === 3 && 'cur')}
            onClick={() => {
              setpaymentMethod(3);
            }}
          >
            线下支付
          </div>
        </div>
        <table
          style={{ width: '100%', fontSize: 16, color: '#333', marginTop: 30 }}
          className={styles.tableWrap}
        >
          <thead
            style={{
              background: '#F2F2F2',
              borderBottom: '1px solid #DCDCDC',
              height: 60,
              textAlign: 'center',
            }}
          >
            <tr>
              <td style={{ width: 100 }}></td>
              <td style={{ width: 420 }}>商品信息</td>
              <td style={{ width: 130 }}>单价</td>
              <td style={{ width: 120 }}>数量</td>
              <td style={{ width: 170 }}>小记</td>
              <td style={{ width: 170 }}>实付</td>
            </tr>
          </thead>
          <tbody style={{ lineHeight: '30px' }}>
            {state?.prods?.map((j: any) => (
              <>
                <tr
                  style={{
                    width: 800,
                    textAlign: 'center',
                    lineHeight: '20px',
                  }}
                >
                  <td row-gap={6}>{j.storeName}</td>
                </tr>
                {j.details.map((i: any) => (
                  <tr style={{ textAlign: 'center' }}>
                    <td>
                      <img
                        src={'/lease-center/' + i.mainImgPath}
                        alt=""
                        style={{ width: 100, height: 100, marginLeft: 20 }}
                      />
                    </td>
                    <td style={{ lineHeight: '30px' }}>
                      {i.equipName || i.productName}
                      <div style={{ color: '#999', fontSize: 14 }}>
                        {(i.productBrand || '') + ' ' + (i.productModel || '')}{' '}
                      </div>
                    </td>
                    <td>{i.price || i.nowPrice}</td>
                    <td>{i.productAmount}</td>
                    <td style={{ fontSize: 16, color: '#FE1515' }}>
                      ¥{i.productAmount * (i.price || i.nowPrice)}
                    </td>
                    <td style={{ fontSize: 16, color: '#FE1515' }}>
                      ¥{i.productAmount * (i.price || i.nowPrice)}
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
        <div className="tit">金额明细</div>
        <div className="money-detail">
          <div className="items">
            <div className="item">
              <span className="label">商品件数：</span>{' '}
              <span className="num">{totalCount}件</span>
            </div>
            <div className="item">
              <span className="label">商品总价：</span>{' '}
              <span className="num">¥{totalPrice}</span>
            </div>
            <div className="item">
              <span className="label">活动优惠：</span>{' '}
              <span className="num">-¥{0}</span>
            </div>
          </div>
          <div className="items">
            <div className="item">
              <span className="label">运费：</span>{' '}
              <span className="num">0</span>
            </div>
            <div className="item">
              <span className="label">应付总额：</span>{' '}
              <span className="num" style={{ fontSize: 20 }}>
                ¥{totalPrice}
              </span>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div
            className="orderaction"
            onClick={async () => {
              if (!address.length) {
                message.warn('还未选择地址,请先添加地址');
                history.push('/userCenter/address');
                return;
              }
              if (paymentMethod === 3) {
                Modal.confirm({
                  width: '1000px',
                  title: '提示：请按照订单金额转账,我们会尽快联系您确认订单。',
                  content: (
                    <Descriptions
                      title="福建省融胜达信息科技有限公司"
                      column={1}
                    >
                      <Descriptions.Item label="建设银行账号">
                        <Paragraph copyable>35050187390000000646</Paragraph>
                      </Descriptions.Item>
                      <Descriptions.Item label="开户行名称">
                        <Paragraph copyable>
                          中国建设银行股份有限公司福州华能支行
                        </Paragraph>
                      </Descriptions.Item>
                    </Descriptions>
                  ),
                });
              }
              // return
              const res = await commonRequest('/mallOrderMaster/addOrder', {
                method: 'post',
                data: {
                  address: address[curIdx].address,
                  contactNumber: address[curIdx].contactNumber,
                  productVos: allProdus.map((i: any) => ({
                    carId: i.id,
                    isCart: isCart === 1 ? 1 : 0,
                    num: 1,
                    productId: i.productId || i.id,
                    type: i.type,
                  })),
                  receiveUser: address[curIdx].receiveUser,
                  provinceName: address[curIdx].provinceName,
                  cityName: address[curIdx].cityName,
                  paymentMethod,
                },
              });
              if (res.code === '0') {
                message.success('订单生成成功，请前往个人中心查看!');
                history.push('/orderSuccess');
              }
            }}
          >
            确认下单
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderAddress;
