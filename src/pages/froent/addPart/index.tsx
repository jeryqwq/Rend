import { ProForm, ProFormCascader, ProFormDatePicker, ProFormDigit, ProFormField, ProFormGroup, ProFormInstance, ProFormItem, ProFormRadio, ProFormSelect, ProFormSwitch, ProFormText, ProFormTextArea, ProFormTreeSelect, ProFormUploadButton, ProFormUploadDragger } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.less';
import { Upload, Button, Radio, message } from 'antd'
import city from '@/constants/city';
import { commonRequest, getBrands, getDict, getEquipmentType, getFiles, uploadImg } from '@/server/common';
import { PlusOutlined } from '@ant-design/icons'
import { equipmentRent, equipmentSale } from '@/server/rent';
import { getUuid } from '@/utils';
import { useLocation } from 'umi';
 const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>点击上传</div>
    </div>
  );
function ForRent() {
  const [fileList, setFileList] = useState([])
  const formRef = useRef<ProFormInstance>()
  const [uuid, setUuid] = useState( getUuid())
  const [prodTypes, setPartType] = useState([])
  const [brands, setBrands] = useState([])
  const { state } = useLocation() as any

  useEffect(() => {
    (async () => {
      const res3 = await commonRequest('/appdict/partsType', { method: 'get' })
      if(res3.code === '0') {
        setPartType(res3.data?.map((i: any) => ({ label: i.name ,value: i.code })))
      }
      const res4 = await commonRequest('/appdict/partsBrand', { method: 'get' })
      if(res4.code === '0') {
        setBrands(res4.data?.map((i: any) => ({ label: i.name ,value: i.code })))
      }
      if(state?.id) {
        setUuid(state.id)
        setFileList([state.mainImgPath])
      }
    })()
  }, [])
  return (
    <div className={styles['repaire-wrap']}>
      <div className="repaire-inner">
      <ProForm submitter={false}  size='large' initialValues={state} grid layout='vertical' formRef={formRef}>
        <ProForm.Item style={{width: '100%'}}>
        <div className="tit">配件{ state?.id ? '编辑': '新增' }</div>
        <div className='stit'>选择发布城市</div>
          <ProFormCascader label="当前发布城市" 
               colProps={{
                span: 12
              }}
              rules={[{
                required: true,
              }]}
              placeholder='请选择省市区'
              fieldProps={{
                options: city,
                showSearch: true,
              }}
              name="releaseCityName"
            />
            <ProFormText label="零件名称" name="partsName"  rules={[{
                required: true,
              }]}
              colProps={{
                span: 12
              }}
              />
        </ProForm.Item>
        <ProForm.Item style={{width: '100%'}} >
        <div className='stit'>联系人信息</div>
            <ProFormText 
              name="contactNumber"
              label="联系电话"
              rules={[{
                required: true,
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号码不匹配，请检查后重新输入'
              }]}
            />
          </ProForm.Item>
        <div className='stit'>零件图片</div>
        <ProFormText name="mainImgPath" hidden/>
        <ProForm.Item required label="零件图片" style={{width: '100%'}}>
          <Upload
                listType="picture-card"
                accept='.png,.jpg,.jpeg' 
                maxCount={1}
                fileList={fileList.map(i => ({ url: '/lease-center/' + i, uid: i, name: '预览图'}))}
                onChange={async (e) => {
                  const file = e.file.originFileObj
                  const res = await uploadImg(file as File, { serviceId: uuid, serviceType: 'MAIN_IMG',sort: fileList.length })
                  if(res.code === '0') {
                    formRef.current?.setFieldsValue({
                      mainImgPath: res.data.path
                    })
                    setFileList([res.data.path])
                  }
                }}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
        </ProForm.Item>
       
        <div className='stit' style={{width: '100%'}}>基本信息</div>
        <ProFormCascader
                colProps={{
                  span: 12
                }}
                rules={[{
                  required: true,
                }]}
                fieldProps={{
                  options: prodTypes,
                  showSearch: true
                }}
                name="partsType"
                label="零件类型"
              />
              <ProFormSelect
              colProps={{
                span: 12
              }}
              name="partsBrand"
              label="零件品牌"
              options={brands}
              rules={[{
                required: true,
              }]}
            />
            
            
            <ProFormText
              colProps={{
                span: 12
              }}
              placeholder="如： 307E"
              name="partsModel"
              label="零件型号"
              rules={[{
                required: true,
              }]}
            />
            <ProFormDatePicker 
              colProps={{
                span: 12
              }}
              name="productionDate"
              label="出厂日期"
              width={437}
              rules={[{
                required: true,
              }]}
            />
              <ProFormDigit label="序列号"
                colProps={{
                  span: 12,
                }}
                name="serialNumber"
                rules={[{
                  required: true,
                }]}
              />
              <ProFormDigit 
                colProps={{
                  span: 12
                }}
              rules={[{
                required: true,
              }]}
              name="price"
              label="出售价格"
              />
            <ProFormTextArea 
              colProps={{
                span: 24
              }}
              fieldProps={{
                rows: 7,
                maxLength: 200
              }}
              
              name="description"
              placeholder="请对零件的技术参数、零件状况、提供的配套辅件、服务项目、服务商实力进行说明（限200字）"
              label="详细说明"/>
           
          </ProForm>
          <div style={{textAlign: 'center'}}>
            <Button size='large' type={'primary'} style={{width: 260, height: 60, fontSize: 22, margin: '10px 0 50px 0'}}
              onClick={ async () => {
                const values = await formRef.current?.validateFields()
                if(values) {
                  // const values = formRef.current?.getFieldsValue()
                  // const res = await equipmentSale(, state?.id ? 'put':'post')
                  const res = await commonRequest('/equipmentParts', {
                    method: state?.id ? 'put':'post',
                    data: {...state,...values, id: uuid, partsType: values.partsType[values.partsType.length - 1],releaseCityName:  Array.isArray(values.releaseCityName) ? values.releaseCityName.join(',') : values.releaseCityName}
                  })
                  if(res.code === '0') {
                    message.success('保存成功!')
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
