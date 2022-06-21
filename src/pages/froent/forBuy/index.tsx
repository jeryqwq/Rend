import { ProForm, ProFormCascader, ProFormDatePicker, ProFormDigit, ProFormField, ProFormInstance, ProFormItem, ProFormRadio, ProFormSelect, ProFormSwitch, ProFormText, ProFormTextArea, ProFormTreeSelect, ProFormUploadButton, ProFormUploadDragger } from '@ant-design/pro-components';
import React, {useRef, useState, useEffect} from 'react';
import styles from './index.module.less';
import { TreeSelect } from 'antd'
import city from '@/constants/city';
import { Upload, Button, Radio, message } from 'antd'
import { getUuid } from '@/utils';
import {  equipmentPurchase, equipmentRent } from '@/server/rent';
import { getBrands, getDict } from '@/server/common';

function ForRent() {
  const formRef = useRef<ProFormInstance>()
  const [uuid, setUuid] = useState( getUuid())
  const [prodTypes, setProds] = useState([])
  const [brands, setBrands] = useState([])

  useEffect(() => {
    (async () => {
      const res = await getDict('/mechineType')
      if(res.code === '0') {
        setProds(res.data)
      }
      const res2 = await getBrands()
      if(res2.code === '0') {
        setBrands(res2.data)
      }
    })()
  }, [])
  return (
    <div className={styles['repaire-wrap']}>
      <div className="repaire-inner">
        <div className="tit">求购二手设备</div>
        <div className='stit'>选择发布城市</div>
        <ProForm submitter={false}  grid size='large' formRef={formRef}>
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
          {/* <ProFormUploadButton label="照片"/> */}
        <div className='stit'>联系人信息</div>
            <ProFormText 
              colProps={{
                span: 12
              }}
              rules={[{required: true}]}
              label="联系电话"
              name="contactNumber"
            />
        <div className='stit' style={{width: '100%'}}>基本信息</div>
              <ProFormSelect 
                colProps={{
                  span: 12
                }}
                rules={[{
                  required: true,
                }]}
                options={prodTypes.map((i: any)=> ({ label: i.name, value: i.code }))}
                name="equipType"
                label="设备类型"
               
              />
              <ProFormSelect
              colProps={{
                span: 12
              }}
              name="equipBrand"
              label="设备品牌"
              options={brands.map((i: any) => ({label: i.brandName, value: i.brandName}))}
              rules={[{
                required: true,
              }]}
            />
            
            
            <ProFormText
              colProps={{
                span: 12
              }}
              placeholder="如： 307E"
              name="equipModel"
              label="设备型号"
              rules={[{
                required: true,
              }]}
            />
            <ProFormTextArea 
            colProps={{
              span: 24
            }}
            rules={[{required: true}]}
            fieldProps={{
              rows: 7
            }}
            name="remark"
            placeholder="请对设备的技术参数、设备状况、提供的配套辅件、服务项目、服务商实力进行说明（限200字）"
            label="详细说明"/>
          </ProForm>
          <div style={{textAlign: 'center'}}>
            <Button size='large' type={'primary'} style={{width: 260, height: 60, fontSize: 22, margin: '10px 0 50px 0'}}
              onClick={ async () => {
                const values = await formRef.current?.validateFields()
                if(values) {
                  const res = await equipmentPurchase({...values, id: uuid, releaseCityName: values.releaseCityName.join(',')})
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