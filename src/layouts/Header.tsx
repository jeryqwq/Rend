import React, { useState } from 'react';
import styles from './index.module.less';
import { Button, Input, Dropdown, Menu } from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import { MenuRouter } from '@/routers';
import { useHistory, useLocation, useRouteMatch } from 'umi';
import { ShowSaleRouter } from '@/routers';

import useLogin from '@/hooks/useLogin';
import Line from './Line';
type SearchType = 'shebei' | 'peijian' | 'ershou'
function Header({ searchType, onChange }: { searchType: SearchType  ; onChange: (_: SearchType) => void, showMenu?: boolean }) {
  const { pathname: path, } = useLocation()
  const history = useHistory()
  const curRouter = MenuRouter.find(i => i.path === path)
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
            <img src='/icons/head.png'/>
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
                    onSearch={() => {}}
                    prefix={<SearchOutlined className='theme-color'/>}
                    style={{ width: 490, height:45, marginRight: 20 }}
                  />
                  <div className="search-his"><span>挖掘</span><span>土方</span><span>起重机</span><span>挖掘</span></div>
                </div>
              <div>
                <Dropdown overlay={<Menu onClick={(e) => {
                  history.push(e.key)
                }} items={[{ label: '设备出租', key: 'productRent' }, { label: '出售二手设备', key: 'sallOld' }]}/>} placement="bottom">
                <span className='btn-round' style={{marginRight: 27, left: 0}}><span>发布设备</span></span>
                </Dropdown>
                <Dropdown overlay={<Menu onClick={(e) => {
                  history.push(e.key)
                }} items={[{ label: '求租设备', key: 'forRent' }, { label: '求购二手', key: 'forBuy' }]}/>} placement="bottom">
                <span className='btn-round rg' ><span style={{left: 0}}>发布需求</span></span>

                </Dropdown>
              </div>
              <span className='phone'>
                <img src="/images/phone.png" alt="" />
                400-8932-608</span>
            </div>
          </div>
        </div>
      </div>
      {curRouter?.showmenu !== 0 &&  <Menu style={{marginTop: 20}} onClick={({ key: curKey }) => {history.push(curKey)}}  mode="horizontal" theme='dark' items={
       MenuRouter
      } />}
    </div>
  );
}

export default Header;
