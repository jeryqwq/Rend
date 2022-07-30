import { ProForm, ProFormCascader, ProFormDatePicker, ProFormDigit, ProFormField, ProFormInstance, ProFormItem, ProFormRadio, ProFormSelect, ProFormSwitch, ProFormText, ProFormTextArea, ProFormTreeSelect, ProFormUploadButton, ProFormUploadDragger } from '@ant-design/pro-components';
import React, {useRef, useState, useEffect} from 'react';
import styles from './index.module.less';
import { TreeSelect } from 'antd'
import city from '@/constants/city';
import { Upload, Button, Radio, message } from 'antd'
import { getUuid } from '@/utils';
import {  equipmentRent } from '@/server/rent';
import { commonRequest, getDict } from '@/server/common';
import { useLocation } from 'umi';
import moment from 'moment';

function ForRent() {
  const formRef = useRef<ProFormInstance>()
  const [uuid, setUuid] = useState( getUuid())
  // const [prodTypes, setProds] = useState([])
  const location = useLocation() as any
  const state = location.state
  useEffect(() => {
    (async () => {
      state && formRef.current?.setFieldsValue({
        ...state,
        startTime: moment(state.startTime),
        releaseCityName: state.releaseCityName.split(',')
      })
      state?.id && setUuid(state.id);
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
                  options={[{
                    label: '土石方挖装',
                    value: 0
                  },{
                    label: '破碎锤打击',
                    value: 1
                  }, {
                    label: '钢板桩机',
                    value:2
                  }, {
                    label: '公路边挖削',
                    value:3
                  }]}
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
              }}
            >提交</Button>
          </div>
      </div>
    </div>
  );
}

export default ForRent;
