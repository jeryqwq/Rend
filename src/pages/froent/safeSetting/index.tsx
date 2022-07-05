import useUserInfo from '@/hooks/useLogin';
import { commonRequest } from '@/server/common';
import { ProForm, ProFormInstance, ProFormText } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import styles from './index.module.less';
import { message } from 'antd'
function SafeSetting() {
  const formRef = useRef<ProFormInstance>()
  const { user } = useUserInfo()
  return (
    <div className={styles['safe-wrap']}>
      <div className="tit">安全设置</div>
      <ProForm title='修改密码' layout='horizontal' size='large' formRef={formRef} 
      style={{width: 720, marginLeft: 30}}
      submitter={{resetButtonProps: false, submitButtonProps:{onClick: async function(e){
        const values = formRef.current?.getFieldsValue()
        const res = await commonRequest('/sysuser/updatePassword', {
          method: 'post',
          data:{
            ...values,
            phone: user?.user.phone
          }
        })
        if(res.code === '0') {
          message.success('修改成功')
        }
      },
      style: {
        width: 200,
        height: 35,
        marginLeft: 290
      }}}}>
        <ProFormText label="原始密码" 
        labelCol={{span: 4}}
        rules={[{
          required: true
        }]}
        fieldProps={{
          type: 'password'
        }} name='oldPassword'/>
        <ProFormText label="新密码"
        labelCol={{span: 4}}

        name='newPassword'
        fieldProps={{
          type: 'password'
        }} />
        <ProFormText label="再次输入新密码" 
          name='repwd'
        labelCol={{span: 4}}

          rules={[
          {
            required: true,
            validator(rule: any,value: any)  {
              return new Promise((res, rej) => {
                if( formRef.current?.getFieldValue('newPassword') === value) {
                  res(true)
                }else{
                  rej('两次密码不一致!')
                }
              })
            }
          }
        ]}
        fieldProps={{
          type: 'password'
        }} />
      </ProForm>
    </div>
  );
}

export default SafeSetting;
