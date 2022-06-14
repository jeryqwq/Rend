import React, { useRef, useState } from 'react';
import { Tabs } from 'antd'
import { ProForm, ProFormInstance, ProFormSelect, ProFormText, ProFormUploadButton } from '@ant-design/pro-components';
import { Checkbox , Button, message } from 'antd';
import styles from './index.module.less';
import { request } from 'umi';
import { getCode, getLoginFwxy, regist } from '@/server/login';
function Register({ setType }: {setType: (_:'login' | 'regist') => void}) {
  const [userInfo, setUserInfo ] = useState({})
  const personRef = useRef<ProFormInstance>()
  const compRef = useRef<ProFormInstance>()

  const [checked, setChecked] = useState(false)
  const [logOrReg, setLogOrReg] = useState<'person' | 'comp'>('person')
  return (
    <div >
      
        <Tabs centered defaultActiveKey='person' activeKey={logOrReg} onChange={(val) =>setLogOrReg(val as 'person') }>
          <Tabs.TabPane tab="个人注册" key="person">
         
            <div style={{width: 500}}>
              <ProForm submitter={false}
                initialValues={userInfo}
                formRef={personRef}
              layout='horizontal' colon={false} labelCol={{span: 8}} size='large'>
              <ProFormText
                label='手机号'
                rules={[{
                  required: true,
                  pattern: /^1[3-9]\d{9}$/,
                  message: '手机号码不匹配，请检查后重新输入'
                }]}
                name="phone"
                placeholder='请输入11位手机号'
              />
              <ProFormText name='vcode'
                required
                label="验证码"
                placeholder={'请输入验证码'}
                fieldProps={{
                  addonAfter: <a onClick={async () => {
                    if(!personRef.current?.getFieldError('phone').length) {
                      const res = await getCode({ phone: personRef.current?.getFieldValue('phone'), service: 'register' })
                      if(res.code === '0') {
                        message.success('验证码发送成功，请在手机短信查看')
                      }
                    }
                  }}>发送验证码</a>
                }}
              />
               <ProFormText name='password'
                required
                label="登陆密码"
                rules={[{
                  min: 8
                }]}
                placeholder={'请输入密码'}
                fieldProps={{
                  type:'password',
                }}
              />
               <ProFormText name='repassword'
                required
                label="确认密码"
                rules={[
                  {
                    validator(rule: any,value: any)  {
                      return new Promise((res, rej) => {
                        if( personRef.current?.getFieldValue('password') === value) {
                          res(true)
                        }else{
                          rej('两次密码不一致!')
                        }
                      })
                    }
                  }
                ]}
                placeholder={'请再次输入密码'}
                fieldProps={{
                  type:'password'
                }}
              />
               <ProFormText name='shareCode'
                label="推广码"
                placeholder={'请输入推广码(可不填)'}
              />
              </ProForm>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="企业注册" key="comp">
          <div style={{width: 500}}>
              <ProForm submitter={false}
                initialValues={userInfo}
                formRef={compRef}
              layout='horizontal' colon={false} labelCol={{span: 8}} size='large'>
              <ProFormText 
                label='手机号'
                rules={[{
                  required: true,
                  pattern: /^1[3-9]\d{9}$/,
                  message: '手机号码不匹配，请检查后重新输入'
                }]}
                name="phone"
                placeholder='请输入11位手机号'
              />
              <ProFormText name='vcode'
                rules={[{
                  required: true,
                }]}
                label="验证码"
                placeholder={'请输入验证码'}
                fieldProps={{
                  addonAfter: <a>发送验证码</a>
                }}
              />
               <ProFormText name='password'
                label="登陆密码"
                rules={[{
                  required: true,
                  min: 8
                }]}
                placeholder={'请输入密码'}
                fieldProps={{
                  type:'password'
                }}
              />
               <ProFormText name='repassword'
                label="确认密码"
                placeholder={'请再次输入密码'}
                rules={[
                  {
                    required: true,
                    validator(rule: any,value: any)  {
                      return new Promise((res, rej) => {
                        if( compRef.current?.getFieldValue('password') === value) {
                          res(true)
                        }else{
                          rej('两次密码不一致!')
                        }
                      })
                    }
                  }
                ]}
                fieldProps={{
                  type:'password'
                }}
              />
              <ProFormText label="企业名称" name="CompName" rules={[{
                  required: true,
                }]}/>
              <ProFormText label="统一社会信用代码" name="compCode" rules={[{
                  required: true,
                }]}/>
              <ProFormUploadButton label="营业执照" accept='.png,.jpg,.jpeg' max={1}/>
              <ProFormText label='姓名' name="name" rules={[{
                  required: true,
                }]}/>
              <ProFormSelect label='证件类型'name="cardType" rules={[{
                  required: true,
                }]} options={[{ label: '身份证',value: '身份证' }]}/>
              <ProFormText label='证件号码' name="cardNum" rules={[{
                  required: true,
                }]}/>
              <ProFormText label='联系电话' name="userPhone" rules={[{
                  required: true,
                }]}/>
              <ProFormText label='联系地址' name="address" rules={[{
                  required: true,
                }]}/> 
              <ProFormText name='shareCode'
                label="推广码"
                placeholder={'请输入推广码(可不填)'}
              />
              </ProForm>
            </div>
          </Tabs.TabPane>
        </Tabs>
      <div className={styles['center-top15']}><Checkbox checked={checked} onChange={(e)=> setChecked(e.target.checked)}>我已阅读并接受<a onClick={async () => {
        const res = await getLoginFwxy()
        console.log(res)
        message.info({
          content: <div></div>
        })
      }}>《服务协议》</a></Checkbox></div>
              <div className={styles['center-top15']}><Button style={{height: 46, width: 167}} onClick={() => setType('login')}>返回</Button> 
              <Button  style={{height: 46, width: 167, marginLeft: 15}} type='primary'
              onClick={() => {
                if(checked) {
                    (logOrReg === 'person' ? personRef :compRef).current?.validateFields().then(async (res) => {
                      console.log(res)
                        const result = await regist({ data: {...res, type: logOrReg === 'person' ? 1 : 2, repassword: undefined, shareCode: res.shareCode || ''} })
                        if(res.code === '300') {
                          message.info(res.msg)
                        }else if(res.code === '0') {
                          message.success('注册成功，等待后台审核')
                        }
                        console.log(result)
                    })
                }else{
                  message.info('请点击同意协议')
                }
              }}
              >注册</Button> </div>
    </div>
  );
}

export default Register;
