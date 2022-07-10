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
  const { state } = useLocation() as any
  const [courseType, setType] = useState<any[]>([]);
 
  useEffect(() => {
    (async () => {
      const res = await commonRequest('/appdict/kcpxlx', { method: 'get' })
      if(res.code === '0') {
        setType(res.data?.map((i:any) => ({label: i.name, value: i.code})))
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
        <div className="tit">课程{ state?.id ? '编辑': '新增' }</div>
            <ProFormGroup>
            <ProFormText label="课程名称" name="courseName"  rules={[{
                required: true,
              }]}
              colProps={{
                span: 12
              }}
              />
              <ProFormCascader label="发布城市" 
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
            </ProFormGroup>
        <div className='stit'>联系人信息</div>
             <ProFormGroup>
             <ProFormText 
              name="contactName"
              label="联系人姓名"
              colProps={{
                span: 12
              }}
              rules={[{
                required: true,
              }]}
            />
            <ProFormText 
              name="contactNumber"
              label="联系电话"
              colProps={{
                span: 12
              }}
              rules={[{
                required: true,
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号码不匹配，请检查后重新输入'
              }]}
            />
             </ProFormGroup>
        <div className='stit'>课程图片</div>
        <ProFormText name="mainImgPath" hidden/>
        <ProForm.Item required label="课程图片" style={{width: '100%'}}>
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
              <ProFormSelect
              colProps={{
                span: 12
              }}
              name="courseType"
              label="课程类型"
              options={courseType}
              rules={[{
                required: true,
              }]}
            />
            <ProFormText
              colProps={{
                span: 12
              }}
              name="courseTypeText"
              label="课程类型描述"
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
              placeholder="请对课程的技术参数、提供的配套辅件、服务项目、服务商实力进行说明（限200字）"
              label="详细说明"/>
           
          </ProForm>
          <div style={{textAlign: 'center'}}>
            <Button size='large' type={'primary'} style={{width: 260, height: 60, fontSize: 22, margin: '10px 0 50px 0'}}
              onClick={ async () => {
                const values = await formRef.current?.validateFields()
                if(values) {
                  // const values = formRef.current?.getFieldsValue()
                  // const res = await equipmentSale(, state?.id ? 'put':'post')
                  const res = await commonRequest('/trainingCourse', {
                    method: state?.id ? 'put':'post',
                    data: {...state,...values, id: uuid, courseType: values.courseType,releaseCityName:  Array.isArray(values.releaseCityName) ? values.releaseCityName.join(',') : values.releaseCityName}
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
