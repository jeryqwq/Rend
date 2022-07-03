import React from 'react';
import { Button } from 'antd'
import Bread from '@/components/Bread';
import { useHistory } from 'umi';
function OrderSuccess() {
  const his = useHistory()
  return (
    <div className='content' style={{textAlign: 'center', margin: '30px auto'}}>
      <Bread breads={['下单成功']}/>
      <img src="/images/suc.png" alt="" style={{marginTop: 50}} />
      <p style={{fontSize: 24, color: '#333',margin: '50px 0 80px 0'}}>
        订单提交成功
        <br />
        商家确认订单后会立即与您联系
      </p>
      <Button type='primary' size='middle' onClick={() => {
        his.push('/userCenter')
      }}>查看订单</Button>
      <Button type='default' size='middle' style={{marginLeft: 20}} onClick={() => {
        his.push('/')
      }}>返回首页</Button>

    </div>
  );
}

export default OrderSuccess;
