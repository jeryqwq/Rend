import {
  ProForm,
  ProFormInstance,
  ProFormItem,
  ProFormText,
} from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import { Input, Button, message } from 'antd';
import { useHistory, useLocation } from 'umi';
import { getUserInfo, pcLogin } from '@/server/login';
function Login({
  setType,
}: {
  setType: (_: 'login' | 'regist' | 'forget') => void;
}) {
  const [loginType, setLoginType] = useState<'person' | 'comp'>('person');
  const history = useHistory();
  const ref = useRef<ProFormInstance>();
  const [uuid, setUuid] = useState(Math.random() * 9999 + '' + +new Date());

  return (
    <div>
      <div className="login-part">
        {/* <div className={`lf ${ loginType === 'comp' && 'cur' }`} onClick={() => setLoginType('comp')}><img src={loginType === 'comp' ?"/icons/s7_1.png" : "/icons/s7.png"} style={{marginRight: 5}} /> 企业登录</div> */}
        <div
          className={`rg ${loginType === 'person' && 'cur'}`}
          onClick={() => setLoginType('person')}
        >
          <img
            src={loginType === 'person' ? '/icons/s9.png' : '/icons/s9_1.png'}
            alt=""
          />
          个人登录
        </div>
      </div>
      <ProForm submitter={false} style={{ marginTop: 40 }} formRef={ref}>
        <ProFormText
          placeholder="手机号"
          width={445}
          name="username"
          required
          rules={[
            {
              required: true,
              message: '请输入手机号',
            },
          ]}
          fieldProps={{
            size: 'large',
            prefix: <img src="/icons/s3.png" />,
          }}
        />
        <ProFormText
          fieldProps={{
            type: 'password',
            size: 'large',
            prefix: <img src="/icons/s5.png" />,
          }}
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
          name="password"
          width={445}
          placeholder="密码"
        />
        <ProFormItem>
          <Input.Group compact>
            <Input
              placeholder="验证码"
              style={{ width: 355, height: 47 }}
              prefix={<img src="/icons/s6.png" />}
              onChange={(e) => {
                ref.current?.setFieldsValue({ vcode: e.target.value });
              }}
            />
            <img
              src={`/lease-center/login/kaptcha?code=${uuid}`}
              style={{ width: 90, height: 47, cursor: 'pointer' }}
              onClick={() => {
                setUuid(Math.random() * 9999 + '' + +new Date());
              }}
            />
          </Input.Group>
          <ProFormText
            hidden
            name="vcode"
            fieldProps={{
              style: { display: 'none' },
            }}
          />
        </ProFormItem>
      </ProForm>
      <Button
        type="primary"
        block
        size="large"
        style={{ height: 46 }}
        onClick={async () => {
          const errors = await ref.current?.validateFields();
          if (!errors.length) {
            const values = ref.current?.getFieldsValue();
            const res = await pcLogin({
              ...values,
              codeNum: uuid,
              userType: loginType === 'person' ? 1 : 2,
            });
            if (res.code === '0') {
              message.success('登录成功');
              const tk = res.data;
              tk && localStorage.setItem('TK', tk);
              const userInfo = await getUserInfo();
              localStorage.setItem('USER', JSON.stringify(userInfo.data));
              history.push('/');
            } else {
              setUuid(Math.random() * 9999 + '' + +new Date());
            }
            console.log(res);
          }
        }}
      >
        登录
      </Button>
      <div className="tips">
        <div className="reg" onClick={() => setType('regist')}>
          <img src="/icons/s10.png" />
          用户注册
        </div>
        <div className="forget" onClick={() => setType('forget')}>
          忘记密码
        </div>
      </div>
    </div>
  );
}

export default Login;
