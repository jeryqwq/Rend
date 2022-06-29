import React, { useEffect, useState } from 'react';
import { Steps, Button } from 'antd'
import styles from './index.module.less';
import { useLocation } from 'umi';
import { commonRequest } from '@/server/common';
import { orderStatus } from '@/constants/var';
const Step = Steps.Step
function Order() {
  const location = useLocation() as any
  const id = location.query.id
  const [orderDetail, setOrder] = useState<any>({})
  useEffect(() => {
    (async () => {
      const res= await commonRequest(`/mallOrderMaster/${id}`, {method: 'get'})
      if(res.code === '0') {
        setOrder(res.data)
      }
    })()
  }, [])
  return (
    <div className={styles['order-wrap']}>
       <div className='order-status'>
        <Steps current={orderDetail.orderStatus}>
          <Step stepNumber={1} title={orderStatus[1]} description={orderDetail.createDate} />
          <Step stepNumber={2} title={orderStatus[2]}   />
          <Step stepNumber={3} title={orderStatus[3]} />
          <Step stepNumber={10} title={orderStatus[10]}  />
          <Step title="完成"  />
        </Steps>
        <div className="status">
          订单状态：待收货
          <Button  style={{borderColor: '#FE2525', color: '#FE2525', marginLeft: 150}}>联系商家</Button>
        </div>
       </div>
       <div className="desc">
        <div className="tit">商品详情</div>
       <table style={{width: '100%', fontSize: 16, color: '#333'}} className={styles.tableWrap}>
        <thead style={{background: '#F2F2F2',border: '1px solid #DCDCDC', height: 60, textAlign: 'center'}}>
          <tr>
            <td style={{width: 100}}></td>
            <td style={{width: 420}}>商品信息</td>
            <td style={{width: 130}}>单价</td>
            <td style={{width: 120}}>数量</td>
            <td style={{width: 170}}>小记</td>
          </tr>
        </thead>
        <tbody style={{lineHeight: '60px'}}>
           <tr  style={{width: 100, textAlign: 'center'}}>
            <td row-gap={6}>商家名称</td>
           </tr>
          {
            orderDetail?.details?.map((i:any) =>  <tr  style={{textAlign: 'center'}}>
            <td><img src={'/lease-center/' + i.mainImgPath} alt=""  style={{width: 100, height: 100, marginLeft: 20}}/></td>
            <td style={{lineHeight: '30px'}}>{i.equipName}
            <div style={{color: '#999', fontSize: 14}}>{i.equipBrand + ' ' + i.equipModel} </div>
            </td>
            <td>{i.equipPrice}</td>
            <td>{i.equipAmount}</td>
            <td style={{fontSize: 16, color: '#FE1515'}}>¥{ i.equipAmount * i.equipPrice }</td>
           </tr> )
          }
        </tbody>
        </table>
       </div>
    </div>
  );
}

export default Order;
