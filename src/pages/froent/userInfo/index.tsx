import React from 'react';
import {Descriptions} from 'antd'
import styles from './index.module.less';
import useUserInfo from '@/hooks/useLogin';
import { Button,Modal,Input, message } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { commonRequest } from '@/server/common';
import Message from '../message';
function UserInfo() {
  const { user } = useUserInfo()
  const userInfo = user.user
  return (
    <div className={styles['info-wrap']}>
      <div className="tit">个人资料</div>
      <div className="item">
        <span>用户名:</span>{user.user.username}
      </div>
      <div className="item">
        <span>用户类别:</span> { userInfo?.roles.map((i:any) => i.name).join(' ') }
      </div>
      <div className="item">
        <span>昵称:</span>{user.user.name} <Button type={'link'} onClick={() => {
          let temp = ''
          Modal.confirm({
            title: '请输入昵称',
            content: <Input  onChange={(e) => {
              temp = e.target.value
            }}/>,
            onOk: async() => {
              const res = await commonRequest('/apiuser/updateName', {
                method: 'get',
                data: {
                  name: temp
                }
              })
              if(res.code === '0') {
                message.success('修改成功!')
              }
            }
          })
        }}><EditOutlined />修改</Button>
      </div>
      <div className="item">
        <span>邮箱:</span>
      </div>
    </div>
  );
}

export default UserInfo;
