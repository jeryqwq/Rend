import React, { useState } from 'react';
import styles from './index.module.less';
import { Button, Input, Dropdown, Menu } from 'antd';
import {  ShowSaleRouter } from '@/routers';
import { useHistory, useLocation, useRouteMatch } from 'umi';
import Line from './Line';
function Header() {
  const { pathname: path, } = useLocation()
  const history = useHistory()
  return (
    <div  className={styles['for-menu']}>
      <div className={`${styles['line-header']}`} >
        <div className='content'>
          <div className="lf">欢迎来到融勝达工程机械网</div>
          <div className="rg">
            <Line />
          </div>
        </div>
      </div>
      <div className='content'>
        <div className={styles.headerWrap} >
          <div className={styles.lf}>
            <img src='/icons/head2.png' style={{cursor: 'pointer'}} onClick={() => { history.push('/') }}/>
          </div>
          <div className={styles.rg }>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 55}}>
              <Menu style={{width: 700}} onClick={({ key: curKey }) => {history.push(curKey)}}  mode="horizontal" theme='light' items={
              ShowSaleRouter
              } />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
