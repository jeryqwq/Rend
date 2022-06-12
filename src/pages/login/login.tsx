import { ProForm, ProFormItem, ProFormText } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { Input, Button } from 'antd'
import { useHistory, useLocation } from 'umi';
function Login({ setType }: {setType: (_:'login' | 'regist') => void}) {
  const [loginType, setLoginType] = useState<'person'| 'comp'>('person')
  const history = useHistory()
  return (
    <div>
      <div className="login-part">
        <div className={`lf ${ loginType === 'comp' && 'cur' }`} onClick={() => setLoginType('comp')}><img src={loginType === 'comp' ?"/icons/s7_1.png" : "/icons/s7.png"} style={{marginRight: 5}} /> 企业登陆</div>
        <div className={`rg ${ loginType === 'person' && 'cur' }`} onClick={() => setLoginType('person')}><img src={loginType === 'person' ?"/icons/s9.png" : "/icons/s9_1.png"} alt="" />个人登陆</div>
      </div>
      <ProForm  submitter={false} style={{marginTop: 40}}>
        <ProFormText placeholder="用户名" width={445} 
        name="name"
        required
        rules={[{
          required: true,
          message: '请输入用户名'
        }]}
        fieldProps={{
          size: 'large',
          prefix: <img src="/icons/s3.png"/>
        }}/>
        <ProFormText
          fieldProps={{
            type: 'password',
            size: 'large',
            prefix: <img src="/icons/s5.png"/>
          }}
          rules={[{
            required: true,
            message: '请输入密码'
          }]}
          name="pwd"
          width={445}
          placeholder="密码"
        />
        <ProFormItem>
          <Input.Group compact>
            <Input style={{ width: 355 }} size='large' placeholder='验证码' prefix={<img src="/icons/s6.png"/>}/>
            <span>验证码</span>
          </Input.Group>
        </ProFormItem>
      </ProForm>
      <Button type="primary" block size='large' style={{height: 46}} onClick={() => history.push('/')}>
        登陆
      </Button>
      <div className="tips">
        <div className="reg" onClick={() => setType('regist')}><img src="/icons/s10.png"/>用户注册</div>
        <div className="forget">忘记密码</div>
      </div>
    </div>
  );
}

export default Login;
