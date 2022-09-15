import { ProForm, ProFormCascader, ProFormDatePicker, ProFormDigit, ProFormField, ProFormInstance, ProFormItem, ProFormRadio, ProFormSelect, ProFormSwitch, ProFormText, ProFormTextArea, ProFormTreeSelect, ProFormUploadButton, ProFormUploadDragger } from '@ant-design/pro-components';
import React, {useRef, useState, useEffect} from 'react';
import styles from './index.module.less';
import { TreeSelect } from 'antd'
import city from '@/constants/city';
import { Input, Button, Radio, message, Modal } from 'antd'
import { getUuid } from '@/utils';
import {  equipmentRent } from '@/server/rent';
import { commonRequest, getDict } from '@/server/common';
import { useLocation } from 'umi';
import moment from 'moment';
import useUserInfo from '@/hooks/useLogin';
import { getUserInfo } from '@/server/login';

function ForRent() {
  const formRef = useRef<ProFormInstance>()
  const [uuid, setUuid] = useState( getUuid())
  // const [prodTypes, setProds] = useState([])
  const location = useLocation() as any
  const state = location.state
  const { user, login } = useUserInfo()
  const [dicts, setDict] = useState<any[]>([])
  useEffect(() => {
    (async () => {
      state && formRef.current?.setFieldsValue({
        ...state,
        startTime: moment(state.startTime),
        releaseCityName: state.releaseCityName.split(',')
      })
      state?.id && setUuid(state.id);
      const res2  = await commonRequest('/appdict/' + 'qztc' ,{
        method: 'get'
      })
      if(res2.code === '0') {
        setDict(res2.data)
      }
    })()
  }, [])
  return (
    <div className={styles['repaire-wrap']}>
      <div className="repaire-inner">
        <div className="tit">机手求职</div>
        <div className='stit'>基本信息</div>
        <ProForm submitter={false}  grid size='large' formRef={formRef}
        >
          <ProFormText 
              colProps={{
                span: 12
              }}
              rules={[{required: true}]}
              name="name"
              label="机手姓名"
            />
            <ProFormText 
              colProps={{
                span: 12
              }}
              rules={[{required: true}]}
              name={'phone'}
              label="联系电话"
            />
          <ProFormCascader label="选择地点" 
               colProps={{
                span: 12
              }}
              placeholder='请选择省市区'
              name="cityName"
              rules={[{required: true}]}
              fieldProps={{
                options: city,
                showSearch: true,
              }}
            />
            <ProFormText 
              colProps={{
                span: 12
              }}
              rules={[{required: true}]}
              name='detailAddress'
              label="求职意向"
            />
            <ProFormRadio.Group
                 colProps={{
                  span: 24
                }}
                rules={[{required: true}]}
                name="specialty"
                label="我的特长技能"
                  options={dicts.map(i => ({
                    label: i.name,
                    value: i.code
                  }))}
                  fieldProps={{
                    size: 'large',
                    optionType: 'button',
                    buttonStyle: 'solid'
                  }}
                />
          </ProForm>
            
          <div style={{textAlign: 'center'}}>
            <Button size='large' type={'primary'} style={{width: 260, height: 60, fontSize: 22, margin: '10px 0 50px 0'}}
              onClick={ async () => {
                async function submit () {
                  const values = await formRef.current?.validateFields()
                  if(values) {
                    const res = await commonRequest('/jobhunting', {
                      method: 'post',
                      data:{...values, id: uuid, cityName: values.cityName.join(','),}
                    })
                    if(res.code === '0') {
                      message.success('发布成功!')
                      formRef.current?.resetFields()
                    }
                  }
                }
                if(user.user.vipLevel !== 2) {
                  // message.error('您还未缴纳会员费，请缴纳重新登录后重试!')
                  let number = '', type
                  Modal.confirm({
                    icon: null,
                    onOk: async() =>  {
                      if(!number) { message.info('请输入证件号码!');return;}
                      const res = await commonRequest('/sysuserMember', {
                        method: 'post',
                        data: {
                          price	: 0,
                          status: 0,
                          userId: user.user.id,
                          cardNum: number
                        }
                      })
                      if(res.code === '0') {
                        submit()
                        const res = await getUserInfo()
                        if(res.code === '0') {
                         login(res.data)
                         window.location.reload()
                        }
                      }
                    },
                    content: <div>
                      <div style={{margin: '5px'}}>请输入身份证号</div>
                      <Input onChange={(e) => {
                        number = e.target.value
                      }}/>
                      <div style={{margin: '5px'}}>请选择缴纳的会费</div>
                      <Radio.Group
                        options={[{
                          label: '0',
                          value: 2
                        },{
                          label: '50',
                          value: 3,
                          disabled: true
                        },{
                          label: '100',
                          value: 4,
                          disabled: true

                        }]}
                        onChange={(e) => {
                          type = e.target.value
                        }}
                        optionType="button"
                        buttonStyle="solid"
                      />
                    </div>
                  },
                  )
                  return
                }
                submit()
              }}
            >提交</Button>
          </div>
      </div>
    </div>
  );
}

export default ForRent;
