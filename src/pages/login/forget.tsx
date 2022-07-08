import { ProForm, ProFormInstance, ProFormItem, ProFormText } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import { Input, Button ,message} from 'antd'
import { useHistory, useLocation } from 'umi';
import { getCode, getUserInfo, pcLogin } from '@/server/login';
import { commonRequest } from '@/server/common';
function Forget({ setType }: {setType: (_:'login' | 'regist' | 'forget') => void}) {
  const [loginType, setLoginType] = useState<'person'| 'comp'>('person')
  const history = useHistory()
  const ref = useRef<ProFormInstance>()
  const [uuid, setUuid] = useState(Math.random() * 9999 + "" + +new Date())

  return (
    <div>
      <div className="login-part">
        <div className={`lf comp cur`} > 忘记密码</div>
      </div>
      <ProForm  submitter={false} style={{marginTop: 40}} formRef={ref}>
        <ProFormText placeholder="手机号" width={445} 
        name="phone"
        required
        rules={[{
          required: true,
          pattern: /^1[3-9]\d{9}$/,
          message: '手机号码不匹配，请检查后重新输入'        }]}
        fieldProps={{
          size: 'large',
          prefix: <img src="/icons/s3.png"/>
        }}/>
         <ProFormText name='vcode'
                rules={[{
                  required: true,
                }]}
                placeholder={'请输入验证码'}
                fieldProps={{
                  prefix: <img src="/icons/s6.png"/>,
                  size: 'large',
                  addonAfter: <a onClick={async () => {
                    if(!ref.current?.getFieldError('phone').length) {
                      const res = await getCode({ phone: ref.current?.getFieldValue('phone'), service:  'forget'})
                      if(res.code === '0') {
                        message.success('验证码发送成功，请在手机短信查看')
                      }
                    }
                  }}>发送验证码</a>
                }}
              />
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
          name="password"
          width={445}
          placeholder="请输入密码"
        />
       <ProFormText name='repassword'
                placeholder={'请再次输入密码'}
                rules={[
                  {
                    required: true,
                    validator(rule: any,value: any)  {
                      return new Promise((res, rej) => {
                        if( ref.current?.getFieldValue('password') === value) {
                          res(true)
                        }else{
                          rej('两次密码不一致!')
                        }
                      })
                    }
                  }
                ]}
                fieldProps={{
            size: 'large',
            prefix: <img src="/icons/s5.png"/>,

                  type:'password'
                }}
              />
      </ProForm>
      <Button type="primary" block size='large' style={{height: 46}} onClick={async () => {
        const errors = await ref.current?.validateFields()
        if(!errors.length) {
          const values = ref.current?.getFieldsValue()
          const res = await commonRequest('/login/forgetPswVcode', {
            data: values,
            method: 'post'
          })
          if(res.code === '0') {
            message.success('修改成功，请重新登陆')
            setType('login')
          }else{
            message.success('修改失败！')
          }
        }
      }}>
        修改密码
      </Button>
      <div className="tips">
        <div className="reg" onClick={() => setType('login')}>返回登录</div>
      </div>
    </div>
  );
}

export default Forget;
