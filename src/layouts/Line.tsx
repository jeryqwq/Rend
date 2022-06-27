import React from 'react';
import { useHistory } from 'umi';
import { Dropdown, Button, Menu } from 'antd'
import useLogin from '@/hooks/useLogin';
import { ShowSaleRouter } from '@/routers';
function Line() {
  const history = useHistory()
  const { user } = useLogin()

  return (
    <div>
   {
     user ? <>{'欢迎您,' + user.user.username}
     <Dropdown overlay={<Menu
     onClick={({key}) => {
       history.push(key)
      }}
     items={[{ label: '消息通知', key: 'msgAlert' }, { label: '个人信息', key: 'personInfo' }, { label: '安全设置', key: 'address' }, { label: '我的订单', key: 'order' }]}/>}>
     <Button type='text'  onClick={e => history.push('/saler')}>
       个人中心
     </Button>
   </Dropdown>
   </> : <a href='#/login' >登录/注册</a> 
   }
  <Dropdown overlay={<Menu onClick={({key}) => {
    history.push(key)
   }} items={ShowSaleRouter.map(i => ({label: i.label, key: i.key}))}/>}>
      <Button type='text'  onClick={e => history.push('/saler')}>
      商家中心
      </Button>
    </Dropdown>
       帮助中心       联系客服
 </div>
  );
}

export default Line;
