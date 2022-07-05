import React from 'react';
import {Descriptions} from 'antd'
import styles from './index.module.less';
import useUserInfo from '@/hooks/useLogin';
function UserInfo() {
  const { user } = useUserInfo()
  console.log(user)
  return (
    <div className={styles['info-wrap']}>
      <div className="tit">个人资料</div>
      <div className="item">
        <span>用户名:</span>{user.user.username}
      </div>
      <div className="item">
        <span>用户类别:</span>xxx
      </div>
      <div className="item">
        <span>昵称:</span>{user.user.name}
      </div>
      <div className="item">
        <span>邮箱:</span>
      </div>
    </div>
  );
}

export default UserInfo;
