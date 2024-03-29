import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import { Row, Col, Divider, Modal } from 'antd';
import { useHistory, useLocation } from 'umi';
import { commonRequest } from '@/server/common';
function msgHandler(str: string) {
  if (str.startsWith('http')) {
    window.open(str);
  } else {
    Modal.confirm({
      width: 600,
      icon: null,
      content: (
        <div style={{ padding: 20 }}>
          <div
            dangerouslySetInnerHTML={{
              __html: str,
            }}
          ></div>
        </div>
      ),
    });
  }
}
function Footer() {
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    window.location.href = 'https://www.fjrongshengda.com/h5app/#/';
  }
  const history = useHistory();
  const [list, setList] = useState([]);
  const footerInfo = (
    <>
      {' '}
      <Divider style={{ margin: '12px 0' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div className="info">电话: 0591-83987222 </div>
          <div className="info">
            地址:福州市马尾区江滨东大道100-1世创国际中心
          </div>
          <div className="info">
            <a target={'_blank'} href="http://beian.miit.gov.cn">
              闽ICP备2022009747号
            </a>{' '}
            Copyright © 2022 版权所有
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ textAlign: 'center' }}>
            <img src="/images/dy.png" alt="" width={120} height="120px" />
            <div>抖音</div>
          </div>
          <div style={{ textAlign: 'center', margin: '0 20px' }}>
            <img src="/images/gzh.jpeg" alt="" width={120} height="120px" />
            <div>公众号</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <img src="/images/app.png" alt="" width={120} height="120px" />
            <div>小程序</div>
          </div>
        </div>
      </div>
    </>
  );
  async function loadDict(key: string) {
    if (key === '平台法律顾问') {
      history.push('/law?type=' + 'flgw');
    } else {
      const res = await commonRequest('/appdict/param/' + key, {
        method: 'get',
      });
      if (res.code === '0') {
        return res.data;
      }
    }
  }
  async function loadList() {
    const res = await commonRequest('/appdict/wzdb', {
      method: 'get',
    });
    if (res.code === '0') {
      setList(res.data);
    }
  }
  useEffect(() => {
    loadList();
  }, []);
  return (
    <div style={{ background: '#F6F6F6' }}>
      <div className="content">
        <div className={styles.footer}>
          <div className="lf">
            <div>
              <Row
                gutter={50}
                style={{ lineHeight: '30px', marginTop: '30px' }}
              >
                {list.map((i) => (
                  <div
                    style={{ width: '20%', height: '50px' }}
                    onClick={async () => {
                      const res = await loadDict(i.code);
                      res && msgHandler(res.msg);
                    }}
                  >
                    {i.code}
                  </div>
                ))}
                {/* 
                <Col style={{cursor: 'pointer'}}><div onClick={async () => {
                  const res = await loadDict('个人会员入驻')
                  msgHandler(res.msg)
                }}>个人会员入驻</div><div  onClick={async () => {
                  const res = await loadDict('品牌代理商会员入驻')
                  msgHandler(res.msg)
                }}>品牌代理商会员入驻</div>
                <div
                onClick={async () => {
                  const res = await loadDict('平台法律顾问')
                  msgHandler(res.msg)
                }}
                >平台法律顾问</div>
                </Col>
                <Col><div onClick={async () => {
                  const res = await loadDict('设备求租')
                  msgHandler(res.msg)
                }}>设备求租</div><div
                onClick={async () => {
                  const res = await loadDict('出租发布')
                  msgHandler(res.msg)
                }}
                >出租发布</div></Col>
                <Col><div
                 onClick={async () => {
                  const res = await loadDict('平台规则')
                  msgHandler(res.msg)
                }}
                >平台规则</div><div
                onClick={async () => {
                  const res = await loadDict('用户协议')
                  msgHandler(res.msg)
                }}
                >用户协议</div></Col>
                <Col><div
                onClick={async () => {
                  const res = await loadDict('用户协议')
                  msgHandler(res.msg)
                }}
                >用户协议</div><div
                onClick={async () => {
                  const res = await loadDict('服务规则')
                  msgHandler(res.msg)
                }}
                >服务规则</div></Col>
                <Col><div
                onClick={async () => {
                  const res = await loadDict('服务保障')
                  msgHandler(res.msg)
                }}
                >服务保障</div><div
                onClick={async () => {
                  const res = await loadDict('诚信管理')
                  msgHandler(res.msg)
                }}
                >诚信管理</div></Col> */}
              </Row>
              {/* //  : <Row gutter={50} style={{lineHeight: '30px', fontSize: 14}}>
              //   <Col ><div style={{fontSize: 17}}>平台协议</div><div>用户协议</div><div >服务规则</div><div>服务保障</div><div>诚信管理</div></Col>
              //   <Col ><div style={{fontSize: 17}}>工程公司指南</div><div>入驻指南</div><div >需求发布</div><div>特价抢租</div><div>先租后买</div></Col>
              //   <Col ><div style={{fontSize: 17}}>品牌代理商指南</div><div>品牌代理商入驻</div><div >设备发布</div><div>应征悬赏</div><div>参与竞价</div></Col>
              // </Row>   */}
            </div>
            <div className="rg">
              <img
                src="/icons/head2.png"
                alt=""
                width={280}
                height={112}
                style={{ marginRight: 45 }}
              />
            </div>
          </div>
          {footerInfo}
        </div>
      </div>
    </div>
  );
}

export default Footer;
