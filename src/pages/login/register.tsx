import React, { useRef, useState } from 'react';
import { Tabs } from 'antd';
import {
  ProForm,
  ProFormInstance,
  ProFormItem,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { Checkbox, Button, message, Modal, Upload } from 'antd';
import styles from './index.module.less';
import { request } from 'umi';
import { getCode, getLoginFwxy, regist } from '@/server/login';
import { uploadImg } from '@/server/common';
let interval: any;
function Register({ setType }: { setType: (_: 'login' | 'regist') => void }) {
  const [userInfo, setUserInfo] = useState({});
  const personRef = useRef<ProFormInstance>();
  const compRef = useRef<ProFormInstance>();
  const timer = useRef(60);
  const [checked, setChecked] = useState(false);
  const [logOrReg, setLogOrReg] = useState<'person' | 'comp'>('person');
  const [, set] = useState({});
  return (
    <div>
      <Tabs
        centered
        defaultActiveKey="person"
        activeKey={logOrReg}
        onChange={(val) => setLogOrReg(val as 'person')}
      >
        <Tabs.TabPane tab="个人注册" key="person">
          <div style={{ width: 500 }}>
            <ProForm
              submitter={false}
              initialValues={userInfo}
              formRef={personRef}
              layout="horizontal"
              colon={false}
              labelCol={{ span: 8 }}
              size="large"
            >
              <ProFormText
                label="手机号"
                rules={[
                  {
                    required: true,
                    pattern: /^1[3-9]\d{9}$/,
                    message: '手机号码不匹配，请检查后重新输入',
                  },
                ]}
                name="phone"
                placeholder="请输入11位手机号"
              />
              <ProFormText
                name="vcode"
                required
                label="验证码"
                placeholder={'请输入验证码'}
                fieldProps={{
                  addonAfter: (
                    <a
                      onClick={async () => {
                        if (!personRef.current?.getFieldError('phone').length) {
                          if (!personRef.current?.getFieldValue('phone')) {
                            message.error('请填写电话号码');
                          }
                          if (interval) {
                            return;
                          } else {
                            const res = await getCode({
                              phone: personRef.current?.getFieldValue('phone'),
                              service: 'register',
                            });
                            if (res.code === '0') {
                              message.success(
                                '验证码发送成功，请在手机短信查看',
                              );
                              interval = setInterval(() => {
                                if (timer.current <= 0) {
                                  clearInterval(interval);
                                  timer.current = 60;
                                  interval = undefined;
                                } else {
                                  timer.current = timer.current - 1;
                                }
                                set({});
                              }, 1000);
                            }
                          }
                        }
                      }}
                    >
                      {!interval ? '发送验证码' : timer.current}
                    </a>
                  ),
                }}
              />
              <ProFormText
                name="password"
                required
                label="登录密码"
                rules={[
                  {
                    min: 8,
                  },
                ]}
                placeholder={'请输入密码'}
                fieldProps={{
                  type: 'password',
                }}
              />
              <ProFormText
                name="repassword"
                required
                label="确认密码"
                rules={[
                  {
                    validator(rule: any, value: any) {
                      return new Promise((res, rej) => {
                        if (
                          personRef.current?.getFieldValue('password') === value
                        ) {
                          res(true);
                        } else {
                          rej('两次密码不一致!');
                        }
                      });
                    },
                  },
                ]}
                placeholder={'请再次输入密码'}
                fieldProps={{
                  type: 'password',
                }}
              />
              <ProFormText
                name="shareCode"
                label="推广码"
                placeholder={'请输入推广码(可不填)'}
              />
            </ProForm>
          </div>
        </Tabs.TabPane>
        {/* <Tabs.TabPane tab="企业注册" key="comp">
          <div style={{ width: 500 }}>
            <ProForm
              submitter={false}
              initialValues={userInfo}
              formRef={compRef}
              layout="horizontal"
              colon={false}
              labelCol={{ span: 8 }}
              size="large"
            >
              <ProFormText
                label="手机号"
                rules={[
                  {
                    required: true,
                    pattern: /^1[3-9]\d{9}$/,
                    message: '手机号码不匹配，请检查后重新输入',
                  },
                ]}
                name="phone"
                placeholder="请输入11位手机号"
              />
              <ProFormText
                name="vcode"
                rules={[
                  {
                    required: true,
                  },
                ]}
                label="验证码"
                placeholder={'请输入验证码'}
                fieldProps={{
                  addonAfter: (
                    <a
                      onClick={async () => {
                        if (!compRef.current?.getFieldError('phone').length) {
                          if (!compRef.current?.getFieldValue('phone')) {
                            message.error('请填写电话号码');
                          }
                          if (interval) {
                            return;
                          } else {
                            const res = await getCode({
                              phone: compRef.current?.getFieldValue('phone'),
                              service: 'register',
                            });
                            if (res.code === '0') {
                              message.success(
                                '验证码发送成功，请在手机短信查看',
                              );
                              interval = setInterval(() => {
                                if (timer.current <= 0) {
                                  clearInterval(interval);
                                  interval = undefined;
                                  timer.current = 60;
                                } else {
                                  timer.current = timer.current - 1;
                                }
                                set({});
                              }, 1000);
                            }
                          }
                        }
                      }}
                    >
                      {!interval ? '发送验证码' : timer.current}
                    </a>
                  ),
                }}
              />
              <ProFormText
                name="password"
                label="登录密码"
                rules={[
                  {
                    required: true,
                    min: 8,
                  },
                ]}
                placeholder={'请输入密码'}
                fieldProps={{
                  type: 'password',
                }}
              />
              <ProFormText
                name="repassword"
                label="确认密码"
                placeholder={'请再次输入密码'}
                rules={[
                  {
                    required: true,
                    validator(rule: any, value: any) {
                      return new Promise((res, rej) => {
                        if (
                          compRef.current?.getFieldValue('password') === value
                        ) {
                          res(true);
                        } else {
                          rej('两次密码不一致!');
                        }
                      });
                    },
                  },
                ]}
                fieldProps={{
                  type: 'password',
                }}
              />
              <ProFormText
                label="企业名称"
                name="compName"
                rules={[
                  {
                    required: true,
                  },
                ]}
              />
              <ProFormText
                label="统一社会信用代码"
                name="compCode"
                rules={[
                  {
                    required: true,
                  },
                ]}
              />
              <ProFormText name="yyzzUrl" hidden />
              <ProFormItem label="营业执照" required>
                <Upload
                  listType="picture-card"
                  accept=".png,.jpg,.jpeg"
                  maxCount={1}
                  onChange={async (e) => {
                    const file = e.file.originFileObj;
                    const formData = new FormData();
                    formData.append('file', file as unknown as File);
                    formData.append('serviceType', 'YYZZ');
                    formData.append('sort', '0');
                    const res = await fetch('/lease-center/appfile/upload', {
                      method: 'post',
                      body: formData,
                    }).then((res) => res.json());
                    if (res.code === '0') {
                      compRef.current?.setFieldsValue({
                        yyzzUrl: res.data.path,
                      });
                      message.success('图片上传成功');
                    } else {
                      message.error(res.msg);
                    }
                  }}
                >
                  点击上传(小于5M文件的图片)
                </Upload>
              </ProFormItem>
              <ProFormText
                label="姓名"
                name="name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              />
              <ProFormSelect
                label="证件类型"
                name="cardType"
                rules={[
                  {
                    required: true,
                  },
                ]}
                options={[{ label: '身份证', value: '身份证' }]}
              />
              <ProFormText
                label="证件号码"
                name="cardNum"
                rules={[
                  {
                    required: true,
                  },
                ]}
              />
              <ProFormText
                label="联系电话"
                name="userPhone"
                rules={[
                  {
                    required: true,
                  },
                ]}
              />
              <ProFormText
                label="联系地址"
                name="address"
                rules={[
                  {
                    required: true,
                  },
                ]}
              />
              <ProFormText
                name="shareCode"
                label="推广码"
                placeholder={'请输入推广码(可不填)'}
              />
            </ProForm>
          </div>
        </Tabs.TabPane> */}
      </Tabs>
      <div className={styles['center-top15']}>
        <Checkbox
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        >
          我已阅读并接受
        </Checkbox>
        <a
          onClick={async () => {
            const res = await getLoginFwxy();
            console.log(res);
            Modal.confirm({
              icon: null,
              title: res.data.name,
              content: (
                <div
                  style={{ height: 600, overflow: 'scroll' }}
                  dangerouslySetInnerHTML={{ __html: res.data.msg }}
                ></div>
              ),
            });
          }}
        >
          《服务协议》
        </a>
      </div>
      <div className={styles['center-top15']}>
        <Button
          style={{ height: 46, width: 167 }}
          onClick={() => setType('login')}
        >
          返回
        </Button>
        <Button
          style={{ height: 46, width: 167, marginLeft: 15 }}
          type="primary"
          onClick={() => {
            if (checked) {
              (logOrReg === 'person' ? personRef : compRef).current
                ?.validateFields()
                .then(async (res) => {
                  const result = await regist({
                    data: {
                      ...res,
                      type: logOrReg === 'person' ? 1 : 2,
                      repassword: undefined,
                      psw: res.password,
                    },
                  });
                  if (result.code === '0') {
                    message.success('注册成功');
                    setType('login');
                  }
                });
            } else {
              message.info('请点击同意协议');
            }
          }}
        >
          注册
        </Button>{' '}
      </div>
    </div>
  );
}

export default Register;
