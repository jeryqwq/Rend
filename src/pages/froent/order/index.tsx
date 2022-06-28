import React from 'react';
import { Steps, Button } from 'antd'
import styles from './index.module.less';

const Step = Steps.Step
function Order() {
  return (
    <div className={styles['order-wrap']}>
       <div className='order-status'>
        <Steps current={2}>
          <Step title="提交订单" description="00:00:08" />
          <Step title="商家确认"  description="00:00:08" />
          <Step title="卖家发货" description="00:00:08" />
          <Step title="确认收货" />
          <Step title="完成"  />
        </Steps>
        <div className="status">
          订单状态：待收货
          <Button  style={{borderColor: '#FE2525', color: '#FE2525', marginLeft: 150}}>联系商家</Button>
        </div>
       </div>
    </div>
  );
}

export default Order;
