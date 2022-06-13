import React, { useState } from 'react';
import styles from './index.module.less';
import { Button, Input, Dropdown, Menu } from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import { MenuRouter } from '@/routers';
import { useHistory, useLocation, useRouteMatch } from 'umi';
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
          <div className="rg"><a href='#/login'>登录/注册</a>       个人中心       <a href='#/saler'>商家中心</a>       帮助中心       联系客服</div>
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
                <Dropdown overlay={<Menu items={[{ label: '设备出租', key: 'chuzu' }, { label: '出售二手设备', key: 'sold' }]}/>} placement="bottom">
                <span className='btn-round' style={{marginRight: 27, left: 0}}><span>发布设备</span></span>
                </Dropdown>
                <span className='btn-round rg' onClick={() => history.push('/forRent')}><span style={{left: 0}}>发布需求</span></span>
              </div>
              <span className='phone'>400-8932-608</span>
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
