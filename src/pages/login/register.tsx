import React from 'react';
import { Tabs } from 'antd'
import { ProForm, ProFormSelect, ProFormText, ProFormUploadButton } from '@ant-design/pro-components';
import { Checkbox , Button} from 'antd';
import styles from './index.module.less';
function Register({ setType }: {setType: (_:'login' | 'regist') => void}) {
  return (
    <div >
      <ProForm submitter={false} layout='horizontal' colon={false} labelCol={{span: 8}} size='large'>
        <Tabs centered defaultActiveKey='person'>
          <Tabs.TabPane tab="个人注册" key="person">
            <div style={{width: 500}}>
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
              <ProFormText name='code'
                required
                label="验证码"
                placeholder={'请输入验证码'}
                fieldProps={{
                  addonAfter: <a>发送验证码</a>
                }}
              />
               <ProFormText name='code'
                required
                label="登陆密码"
                placeholder={'请输入密码'}
                fieldProps={{
                  type:'password'
                }}
              />
               <ProFormText name='code'
                required
                label="确认密码"
                placeholder={'请再次输入密码'}
                fieldProps={{
                  type:'password'
                }}
              />
               <ProFormText name='code'
                label="推广码"
                placeholder={'请输入推广码(可不填)'}
              />
              <div className={styles['center-top15']}><Checkbox onChange={() => {}}>我已阅读并接受<a>《服务协议》</a></Checkbox></div>
              <div className={styles['center-top15']}><Button style={{height: 46, width: 167}} onClick={() => setType('login')}>返回</Button> 
              <Button  style={{height: 46, width: 167, marginLeft: 15}} type='primary'>注册</Button> </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="企业注册" key="comp">
          <div style={{width: 500}}>
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
              <ProFormText name='code'
                required
                label="验证码"
                placeholder={'请输入验证码'}
                fieldProps={{
                  addonAfter: <a>发送验证码</a>
                }}
              />
               <ProFormText name='code'
                required
                label="登陆密码"
                placeholder={'请输入密码'}
                fieldProps={{
                  type:'password'
                }}
              />
               <ProFormText name='code'
                required
                label="确认密码"
                placeholder={'请再次输入密码'}
                fieldProps={{
                  type:'password'
                }}
              />
              <ProFormText label="企业名称" />
              <ProFormText label="统一社会信用代码" />
              <ProFormUploadButton label="营业执照" accept='.png,.jpg,.jpeg' max={1}/>
              <ProFormSelect label='联系人' options={[{ label: '',value: '' }]}/>
              <ProFormSelect label='证件类型' options={[{ label: '',value: '' }]}/>
              <ProFormText label='证件号码' />
              <ProFormText label='联系电话'/>
              <ProFormText label='联系地址'/>
              <ProFormText name='code'
                label="推广码"
                placeholder={'请输入推广码(可不填)'}
              />
              <div className={styles['center-top15']}><Checkbox onChange={() => {}}>我已阅读并接受<a>《服务协议》</a></Checkbox></div>
              <div className={styles['center-top15']}><Button style={{height: 46, width: 167}} onClick={() => setType('login')}>返回</Button> 
              <Button  style={{height: 46, width: 167, marginLeft: 15}} type='primary'>注册</Button> </div>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </ProForm>
    </div>
  );
}

export default Register;
