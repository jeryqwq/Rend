import React, { useEffect, useState } from 'react';
import { Steps, Button } from 'antd';
import styles from './index.module.less';
import { useLocation } from 'umi';
import { commonRequest } from '@/server/common';
import { orderStatus } from '@/constants/var';
const Step = Steps.Step;
function Order() {
  const location = useLocation() as any;
  const id = location.query.id;
  const [orderDetail, setOrder] = useState<any>({});
  useEffect(() => {
    (async () => {
      const res = await commonRequest(`/mallOrderMaster/${id}`, {
        method: 'get',
      });
      if (res.code === '0') {
        setOrder(res.data);
      }
    })();
  }, []);
  return (
    <div className={styles['order-wrap']}>
      <div className="order-status">
        <Steps current={orderDetail.orderStatus}>
          <Step
            stepNumber={1}
            status={orderDetail.orderStatus >= 1 ? 'finish' : 'wait'}
            title={orderStatus[1]}
            description={orderDetail.createDate}
          />
          <Step
            stepNumber={10}
            status={orderDetail.orderStatus >= 10 ? 'finish' : 'wait'}
            title={orderStatus[10]}
          />
        </Steps>
        <div className="status">
          订单状态：{orderStatus[orderDetail.orderStatus as 10]}
          {/* <Button  style={{borderColor: '#FE2525', color: '#FE2525', marginLeft: 150}}>联系商家</Button> */}
        </div>
      </div>
      <div className="desc">
        <div className="tit">商品详情</div>
        <div style={{ border: 'solid 1px #DCDCDC', paddingBottom: 30 }}>
          <table
            style={{ width: '100%', fontSize: 16, color: '#333' }}
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
              </tr>
            </thead>
            <tbody style={{ lineHeight: '60px' }}>
              <tr style={{ width: 100, textAlign: 'center' }}>
                <td row-gap={6}>商家名称</td>
              </tr>
              {orderDetail?.details?.map((i: any) => (
                <tr style={{ textAlign: 'center' }}>
                  <td>
                    <img
                      src={'/lease-center/' + i.mainImgPath}
                      alt=""
                      style={{ width: 100, height: 100, marginLeft: 20 }}
                    />
                  </td>
                  <td style={{ lineHeight: '30px' }}>
                    {i.equipName}
                    {/* <div style={{color: '#999', fontSize: 14}}>{i.equipBrand + ' ' + i.equipModel} </div> */}
                  </td>
                  <td>{i.equipPrice}</td>
                  <td>{i.equipAmount}</td>
                  <td style={{ fontSize: 16, color: '#FE1515' }}>
                    ¥{i.equipAmount * i.equipPrice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="order-desc">
          <div>
            <div className="tit">订单信息</div>
            <div className="item">
              <span>收货人：</span>
              {orderDetail.receiveUser}
            </div>
            <div className="item">
              <span>联系方式：</span>
              {orderDetail.contactNumber}
            </div>
            <div className="item">
              <span>收获地址：</span>
              {orderDetail.address}
            </div>
            <div className="item">
              <span>订单编号：</span>
              {orderDetail.id}
            </div>
            <div className="item">
              <span>下单时间：</span>
              {orderDetail.createDate}
            </div>
            <div className="item">
              <span>商家：</span>
              {orderDetail.createName}
            </div>
          </div>
          <div className="rg">
            <div className="tit">付款详情</div>
            <div className="item">
              <span>商品件数：</span>
              <span className="num">1</span>
            </div>
            <div className="item">
              <span>商品总价：</span>
              <span className="num">{orderDetail.orderMoney}</span>
            </div>
            <div className="item">
              <span>活动优惠：</span>
              <span className="num">0</span>
            </div>
            <div className="item">
              <span>运费：</span>
              <span className="num">0</span>
            </div>
            <div className="item">
              <span>应付总额：</span>
              <span style={{ fontSize: 22 }} className="num">
                {orderDetail.paymentMoney}
              </span>
            </div>
            <div className="item">
              <span>实际付款：</span>
              <span style={{ fontSize: 22 }} className="num">
                {orderDetail.paymentActualMoney}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
