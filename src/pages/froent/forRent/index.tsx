import { ProForm, ProFormCascader, ProFormDatePicker, ProFormDigit, ProFormField, ProFormInstance, ProFormItem, ProFormRadio, ProFormSelect, ProFormSwitch, ProFormText, ProFormTextArea, ProFormTreeSelect, ProFormUploadButton, ProFormUploadDragger } from '@ant-design/pro-components';
import React, {useRef, useState, useEffect} from 'react';
import styles from './index.module.less';
import { TreeSelect } from 'antd'
import city from '@/constants/city';
import { Upload, Button, Radio, message } from 'antd'
import { getUuid } from '@/utils';
import {  equipmentRent } from '@/server/rent';
import { getDict } from '@/server/common';

function ForRent() {
  const formRef = useRef<ProFormInstance>()
  const [uuid, setUuid] = useState( getUuid())
  // const [prodTypes, setProds] = useState([])
  useEffect(() => {
    (async () => {
      // const res = await getDict('/mechineType')
      // if(res.code === '0') {
      //   setProds(res.data)
      // }
    })()
  }, [])
  return (
    <div className={styles['repaire-wrap']}>
      <div className="repaire-inner">
        <div className="tit">租用设备</div>
        <div className='stit'>选择发布城市</div>
        <ProForm submitter={false}  grid size='large' formRef={formRef}
         
        >
          <ProFormCascader label="项目地点" 
               colProps={{
                span: 12
              }}
              placeholder='请选择省市区'
              name="releaseCityName"
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
              label="详细地址"
            />
          {/* <ProFormUploadButton label="照片"/> */}
        <div className='stit'>联系人信息</div>
            <ProFormText 
              colProps={{
                span: 12
              }}
              rules={[{required: true}]}
              name="contactName"
              label="联系人"
            />
            <ProFormText 
              colProps={{
                span: 12
              }}
              rules={[{required: true}]}
              label="联系电话"
              name="contactNumber"
            />
        <div className='stit'>设备需求</div>
            <ProFormText 
              colProps={{
                span: 12
              }}
              rules={[{required: true}]}
              name="equipName"
              label="设备名称"
            />
            <ProFormText 
              colProps={{
                span: 12
              }}
              rules={[{required: true}]}
              name="equipType"
              label="设备型号"
            />
            <ProFormDigit
              colProps={{
                span: 12
              }}
              fieldProps={{
                addonAfter: '台'
              }}
              rules={[{required: true}]}

              name="demandAmount"
              label="需求数量"
            />
            <ProFormDigit 
              colProps={{
                span: 12
              }}
              rules={[{required: true}]}
              name="projectDuration"
              fieldProps={{
                addonAfter: '天'
              }}
              label="工期长度"
            />
            <ProFormDatePicker label="进场时间" colProps={{
                span: 12
              }}
              rules={[{required: true}]}
              name="startTime"
              width={437}
              />
          <div className='stit'>其他信息</div>
            <ProFormField colProps={{
                span: 12
              }}
              rules={[{required: true}]}

              name="invoiceType"
              label="发票"
              >
                <Radio.Group
                  size='large'

                  options={[{
                    label: '不需要',
                    value: '0'
                  },{
                    label: '增值税普票',
                    value: '1'
                  }, {
                    label: '增值税专票',
                    value: '2'
                  }]}
                  optionType="button"
                  buttonStyle="solid"
                />
            </ProFormField>
            <ProFormField colProps={{
                span: 12
              }}
              rules={[{required: true}]}
              name="reqOperator"
              label="机手">
                <Radio.Group
                size='large'
                  options={[{
                    label: '需要',
                    value: '1'
                  },{
                    label: '不需要',
                    value: '0'
                  }]}
                  optionType="button"
                  buttonStyle="solid"
                />
            </ProFormField>
            <ProFormField colProps={{
                span: 12
              }}
              rules={[{required: true}]}
              label="付款方式"
              >
                <Radio.Group
                  size='large'
                  options={[{
                    label: '预付',
                    value: '1'
                  },{
                    label: '后付',
                    value: '2'
                  }, {
                    label: '现付',
                    value: '3'
                  }]}
                  optionType="button"
                  buttonStyle="solid"
                />
            </ProFormField>
            <ProFormTextArea 
            colProps={{
              span: 24
            }}
            rules={[{required: true}]}
            fieldProps={{
              rows: 7
            }}
            name="remark"
            placeholder="请对运输方式、原材料（如燃油）提供、应用情况、环境工况、特殊配置等的说明（限100字）"
            label="备注说明"/>
          </ProForm>
            
          <div style={{textAlign: 'center'}}>
            <Button size='large' type={'primary'} style={{width: 260, height: 60, fontSize: 22, margin: '10px 0 50px 0'}}
              onClick={ async () => {
                const values = await formRef.current?.validateFields()
                if(values) {
                  const res = await equipmentRent({...values, id: uuid, releaseCityName: values.releaseCityName.join(','), startTime: values.startTime.format('YYYY/MM/DD').toString()})
                  if(res.code === '0') {
                    message.success('发布成功!')
                    formRef.current?.resetFields()
                    location.reload()
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
