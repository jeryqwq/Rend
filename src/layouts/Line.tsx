import React from 'react';
import { useHistory } from 'umi';
import { Dropdown, Button, Menu,message } from 'antd'
import useLogin from '@/hooks/useLogin';
import { ShowSaleRouter } from '@/routers';
import { ShoppingCartOutlined } from '@ant-design/icons';
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
     items={[{ label: '消息通知', key: 'msgAlert' }, { label: '个人信息', key: 'personInfo' }, { label: '安全设置', key: 'address' }, { label: '我的订单', key: '/userCenter/order' }]}/>}>
     <Button type='text'  onClick={e => history.push('/userCenter')}>
       个人中心
     </Button>
   </Dropdown>
   <Button type='text'  onClick={e => {
      localStorage.removeItem('TK')
      localStorage.removeItem('USER')
      message.success('退出成功!')
     }}>
       退出
     </Button>
   <Dropdown overlay={<Menu onClick={({key}) => {
    history.push(key)
   }} items={ShowSaleRouter.map(i => ({label: i.label, key: i.key}))}/>}>
      <Button type='text'  onClick={e => history.push('/saler')}>
        商家中心
      </Button>
    </Dropdown>
    <Button type='text' onClick={() => {history.push('/shoppingCart')}} style={{cursor: 'pointer'}}>购物车<ShoppingCartOutlined  style={{marginRight: 5}} /></Button>
   </> : <a href='#/login' >登录/注册</a> 
   }
       帮助中心       联系客服
 </div>
  );
}

export default Line;
