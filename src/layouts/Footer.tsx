import React from 'react';
import styles from './index.module.less';
import {Row, Col, Divider} from 'antd';
import { useLocation } from 'umi';
function Footer() {
  const { pathname: path } = useLocation()
  const footerInfo = <> <Divider style={{margin: '12px 0'}}/>
  <div className='info'>电话: 0591-87527815  </div>         
  <div className='info'>地址:福州市鼓楼区七星井龙山里14号龙山大厦2楼</div>
  <div className='info'>闽ICP备17171717号-11          Copyright © 2019 版权所有</div> </>
  return (
    <div style={{background: '#F6F6F6'}}>
      <div className='content'>
        <div className={styles.footer}>
          <div className="lf">
            <div>
              { path === '/' ? <Row gutter={50} style={{lineHeight: '30px'}}>
                <Col ><div>个体工程公司会员入驻</div><div>品牌代理商会员入驻</div> </Col>
                <Col><div>设备求租</div><div>出租发布</div></Col>
                <Col><div>平台规则</div><div>用户协议</div></Col>
                <Col><div>用户协议</div><div>服务规则</div></Col>
                <Col><div>服务保障</div><div>诚信管理</div></Col>
              </Row> : <Row gutter={50} style={{lineHeight: '30px', fontSize: 14}}>
                <Col ><div style={{fontSize: 17}}>平台协议</div><div>用户协议</div><div >服务规则</div><div>服务保障</div><div>诚信管理</div></Col>
                <Col ><div style={{fontSize: 17}}>工程公司指南</div><div>入驻指南</div><div >需求发布</div><div>特价抢租</div><div>先租后买</div></Col>
                <Col ><div style={{fontSize: 17}}>品牌代理商指南</div><div>品牌代理商入驻</div><div >设备发布</div><div>应征悬赏</div><div>参与竞价</div></Col>
              </Row>  }
             { path === '/' && footerInfo }
            </div>
            <div className="rg">
              <img src="/icons/head.png" alt="" width={280} height={112} style={{marginRight: 45}}/>
              <img src="/images/miniapp.png" alt="" width={123} />
            </div>
          </div>
             { path !== '/' && footerInfo }
        </div>
      </div>
    </div>
   
  );
}

export default Footer;
