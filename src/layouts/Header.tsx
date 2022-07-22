import React, { useState } from 'react';
import styles from './index.module.less';
import { Button, Input, Dropdown, Menu,Modal, message } from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import { MenuRouter } from '@/routers';
import { useHistory, useLocation, useRouteMatch } from 'umi';
import { ShowSaleRouter } from '@/routers';

import useLogin from '@/hooks/useLogin';
import Line from './Line';
import useUserInfo from '@/hooks/useLogin';
import { commonRequest } from '@/server/common';
import { getUserInfo } from '@/server/login';
type SearchType = 'shebei' | 'peijian' | 'ershou'
function Header({ searchType, onChange }: { searchType: SearchType  ; onChange: (_: SearchType) => void, showMenu?: boolean }) {
  const { pathname: path, } = useLocation()
  const history = useHistory()
  const curRouter = MenuRouter.find(i => i.path === path)
  const { user, login } = useUserInfo()
  const userInfo = user?.user
  return (
    <div  className={styles['for-menu']}>
      <div className={`${styles['line-header']}`} >
        <div className='content'>
          <div className="lf">欢迎来到融勝达设备租赁网</div>
          <div className="rg">
            <Line />
           </div>
        </div>
      </div>
      <div className='content'>
        <div className={styles.headerWrap} >
          <div className={styles.lf}>
            <img src='/icons/head.png' style={{cursor: 'pointer'}} onClick={() => { history.push('/') }}/>
          </div>
          <div className={styles.rg}>
            <Button.Group>
              <Button size='large' type={ searchType === 'shebei' ? 'primary' : 'text' }  onClick={() => onChange('shebei')}>设备</Button>
              <Button  size='large' type={ searchType === 'ershou' ? 'primary' : 'text' } onClick={() => onChange('ershou')}>二手</Button>
              <Button  size='large' type={ searchType === 'peijian' ? 'primary' : 'text' }onClick={() => onChange('peijian')} >配件</Button>
            </Button.Group>
            <div className='line2'>
                <div style={{position: 'relative'}}>
                  <Input.Search
                    placeholder="请输入设备名称"
                    allowClear
                    enterButton="搜索"
                    size="large"
                    onSearch={(val) => {
                      switch (searchType) {
                        case 'ershou':
                          history.push('/sallList?keyword=' + val)
                          break;
                          case 'peijian':
                            history.push('/part?keyword=' + val)
                            break; case 'shebei':
                            history.push('/allDevice?keyword=' + val)
                            break;
                        default:
                          break;
                      }
                    }}
                    prefix={<SearchOutlined className='theme-color'/>}
                    style={{ width: 490, height:45, marginRight: 20 }}
                  />
                  <div className="search-his"><span>挖掘</span><span>土方</span><span>起重机</span><span>挖掘</span></div>
                </div>
              <div>
                <Dropdown overlay={<Menu onClick={async (e) => {
                  if(user?.brand?.status === 1) {
                  history.push(e.key)
                }else{
                  let states: any, authRes: any
                    const res = await commonRequest('/sysOrgan/findMy', { method: 'get', params: { type: 1 } })
                    if(res.code === '0') {
                      states = res?.data?.status
                      authRes = res?.data
                      if(states === 1) {
                        const res = await getUserInfo()
                          if(res.code === '0') {
                           login(res.data)
                           window.location.reload()
                          }
                      }
                    }
                    Modal.confirm({
                      title: '认证提示',
                      content: <>
                      <img src='/images/auth.png'/>
                      <h3>认证信息审核</h3>
                      </>,
                      okText: (states === 0) ? '认证中' : (states === -1) ? '认证失败':'我要认证',
                      onOk: async() =>{
                        if(states === 0) {
                          message.info('认证中，请稍后')
                        }else if(states === -1){
                          message.info('认证失败，原因：' + authRes?.statusMsg + '  请重新提交')
                          history.push('/salerAuth')
                        }else if(states === 1){
                          message.info('您已认证，无需认证')
                             const res = await getUserInfo()
                             if(res.code === '0') {
                              login(res.data)
                              window.location.reload()
                             }
                        }else{
                          history.push('/salerAuth')
                        }
                      }
                    })
                  }
                }} items={[{ label: '设备出租', key: 'productRent' }, { label: '出售二手设备', key: 'sallOld' }]}/>} placement="bottom">
                <span className='btn-round' style={{marginRight: 27, left: 0}}><span>发布设备</span></span>
                </Dropdown>
                <Dropdown overlay={<Menu onClick={async (e) => {
                  if(user?.construction?.status === 1) {
                    history.push(e.key)
                  }else{
                    let states: any, authRes: any
                    const res = await commonRequest('/sysOrgan/findMy', { method: 'get', params: { type: 2 } })
                    if(res.code === '0') {
                      states = res?.data?.status
                      authRes = res?.data
                      if(states === 1) {
                        const res = await getUserInfo()
                          if(res.code === '0') {
                           login(res.data)
                           window.location.reload()
                          }
                      }
                    }
                    Modal.confirm({
                      title: '认证提示',
                      content: <>
                      <img src='/images/auth.png'/>
                      <h3>认证信息审核</h3>
                      </>,
                      okText: (states === 0) ? '认证中' : (states === -1) ? '认证失败':'我要认证',
                      onOk:async() =>{
                        if(states === 0) {
                          message.info('认证中，请稍后')
                        }else if(states === -1){
                          message.info('认证失败，原因：' + authRes?.statusMsg + '  请重新提交')
                          history.push('/buyAuth')
                        }else if(states === 1){
                          message.info('您已认证，无需认证')
                          const res = await getUserInfo()
                          if(res.code === '0') {
                           login(res.data)
                           window.location.reload()
                          }
                        }else{
                          history.push('/buyAuth')
                        }
                      }
                    })
                  }
                }} items={[{ label: '求租设备', key: 'forRent' }, { label: '求购二手', key: 'forBuy' }]}/>} placement="bottom">
                <span className='btn-round rg' ><span style={{left: 0}}>发布需求</span></span>
                </Dropdown>
              </div>
              <span className='phone'>
                <img src="/images/phone.png" alt="" />
                400-918-5979</span>
            </div>
          </div>
        </div>
      </div>
      {curRouter?.showmenu !== 0 && <div className='menu-wrap'> {MenuRouter.map(i => <div className={`item ${ i.path === path && 'cur' }`}
        onClick={() => {
          history.push(i.path)
        }}
      >{i.label}</div>)} </div>
      //  <Menu style={{marginTop: 20}} onClick={({ key: curKey }) => {history.push(curKey)}}  mode="horizontal" theme='dark' items={
      //  MenuRouter
      // } />
    }
    </div>
  );
}

export default Header;
