import React, { useState } from 'react';
import styles from './index.module.less';
import { Button, Input, Dropdown, Menu } from 'antd';
import {EditOutlined} from '@ant-design/icons';
import { MenuRouter, ShowSaleRouter } from '@/routers';
import { useHistory, useLocation, useRouteMatch } from 'umi';
type SearchType = 'shebei' | 'peijian' | 'ershou'
function Header() {
  const { pathname: path, } = useLocation()
  const history = useHistory()
  const curRouter = MenuRouter.find(i => i.path === path)
  return (
    <div  className={styles['for-menu']}>
      <div className={`${styles['line-header']}`} >
        <div className='content'>
          <div className="lf">欢迎来到融勝达设备租赁网</div>
          <div className="rg"><a href='#/login'>登录/注册</a>       个人中心       <a href='#/saler'>商家中心</a>       帮助中心       联系客服</div>
        </div>
      </div>
      <div className='content'>
        <div className={styles.headerWrap} >
          <div className={styles.lf}>
            <img src='/icons/head.png'/>
          </div>
          <div className={styles.rg }>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 55}}>
              <Menu style={{width: 700}} onClick={({ key: curKey }) => {history.push(curKey)}}  mode="horizontal" theme='light' items={
              ShowSaleRouter
              } />
              <Button size='large' type='primary' style={{width: 150, height: 44}}><EditOutlined />快速发布</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
