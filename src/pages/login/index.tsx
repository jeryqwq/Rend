import React, { useState } from 'react';
import styles from './index.module.less';
import Register from './register';
import Login from './login'
import Forget from './forget';
function Login1() {
  const [type, setType] = useState<'login' | 'regist' |'forget'>('login')
  return (
    <div className={styles['login-wrap']}>
      <div className="login-content">
        <div className="lf">
          <img src="/images/bg3.png" alt="" style={{ width: '100%' }} />
          <div style={{ width: 517, marginTop: 255, height: 300 }}/>
        </div>
        <div className="rg">
          {
            type === 'login' ? <Login setType={setType}/> : type === 'regist' ? <Register setType={setType}/>: <Forget  setType={setType}/>
          }
        </div>
      </div>
      <div className="login-fot">
      <span>版权所有：融勝达信息技术</span> 
      <span>地址：福州市仓山区南江滨西大道193号5号楼4层 </span>
      <span>邮政编码：350006</span> 
      <span>技术支持：福建数万通信息科技</span>
      </div>
    </div>
  );
}

export default Login1;
