import Bread from '@/components/Bread';
import React from 'react';
import { useHistory, useLocation } from 'umi';
import styles from './index.module.less';
function User({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;
  return (
    <div className="content" style={{ marginTop: 20 }}>
      <Bread breads={['个人中心']} />
      <div className={styles['user-wrap']}>
        <div className="lf">
          <div className="tit">我的账户</div>
          <div
            className={`item ${pathname === '/userCenter' && 'cur'}`}
            onClick={() => history.push('/userCenter')}
          >
            个人中心
          </div>
          <div
            className={`item ${pathname === '/userCenter/message' && 'cur'}`}
            onClick={() => history.push('/userCenter/message')}
          >
            消息通知
          </div>
          <div
            className={`item ${pathname === '/userCenter/userInfo' && 'cur'}`}
            onClick={() => history.push('/userCenter/userInfo')}
          >
            个人信息
          </div>
          <div
            className={`item ${
              pathname === '/userCenter/safeSetting' && 'cur'
            }`}
            onClick={() => history.push('/userCenter/safeSetting')}
          >
            安全设置
          </div>
          <div
            className={`item ${pathname === '/userCenter/address' && 'cur'}`}
            onClick={() => history.push('/userCenter/address')}
          >
            地址管理
          </div>
          <div
            style={{ marginTop: 25, borderBottom: 'solid 1px #DCDCDC' }}
          ></div>
          <div className="tit">交易管理</div>
          <div
            className={`item ${pathname === '/userCenter/myRepair' && 'cur'}`}
            onClick={() => history.push('/userCenter/myRepair')}
          >
            我的维修
          </div>
          {/* <div className={`item ${pathname === '/userCenter/soldServer' && 'cur'}`} onClick={() => history.push('/userCenter/soldServer')}>售后服务</div> */}
        </div>
        <div className="rg"> {children}</div>
      </div>
    </div>
  );
}

export default User;
