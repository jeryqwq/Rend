import React, { useEffect } from 'react';
import { useHistory } from 'umi';
import { Dropdown, Button, Menu,message, Modal } from 'antd'
import useLogin from '@/hooks/useLogin';
import { ShowSaleRouter } from '@/routers';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { getUserInfo } from '@/server/login';
import { commonRequest } from '@/server/common';
function Line() {
  const history = useHistory()
  const { user, login } = useLogin()
  function msgHandler (str: string) {
    if(str.startsWith('http')){
      window.open(str)
    }else{
      Modal.confirm({
        width: 600,
        icon: null,
        content: <div style={{padding: 20}}>
          <div dangerouslySetInnerHTML={{
            __html: str
          }}></div>
        </div>
      })
    }
  }
  return (
    <div>
   {
     user ? <>{'欢迎您,' + user.user.username}
     <Dropdown overlay={<Menu
     onClick={({key}) => {
       history.push(key)
      }}
     items={[{ label: '消息通知', key: '/userCenter/message' }, { label: '个人信息', key: '/userCenter' }, { label: '安全设置', key: '/userCenter/safeSetting' }, { label: '我的订单', key: '/userCenter' }, { label: '地址管理', key: '/userCenter/address' }]}/>}>
     <Button type='text'  onClick={e => history.push('/userCenter')}>
       个人中心
     </Button>
   </Dropdown>
   <Button type='text'  onClick={e => {
      localStorage.removeItem('TK')
      localStorage.removeItem('USER')
      message.success('退出成功!')
      window.location.href = '/#/'
      window.location.reload()
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
   <span onClick={async () => {
    const res =  await commonRequest('/appdict/param/帮助中心' , {
      method: 'get'
     })
     if(res.code === '0') {
      res.data && msgHandler(res.data) 
     }
   }} style={{margin: '0 10px', cursor: 'pointer'}}>帮助中心</span>
    <span onClick={async() => {
      const res =  await commonRequest('/appdict/param/联系客服', {
        method: 'get'
       })
       if(res.code === '0') {
        res.data && msgHandler(res.data) 
      }
    }} style={{margin: '0 10px', cursor: 'pointer'}}>联系客服</span>
 </div>
  );
}

export default Line;
