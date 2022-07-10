import { ProForm, ProFormCascader, ProFormDatePicker, ProFormDigit, ProFormField, ProFormGroup, ProFormInstance, ProFormItem, ProFormRadio, ProFormSelect, ProFormSwitch, ProFormText, ProFormTextArea, ProFormTreeSelect, ProFormUploadButton, ProFormUploadDragger } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.less';
import { Upload, Button, Radio, message } from 'antd'
import city from '@/constants/city';
import { getBrands, getDict, getEquipmentType, getFiles, uploadImg } from '@/server/common';
import { PlusOutlined } from '@ant-design/icons'
import { equipmentLease, equipmentRent } from '@/server/rent';
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
  const [fileList_total, setTotalList] = useState([])
  const formRef = useRef<ProFormInstance>()
  const [uuid, setUuid] = useState( getUuid())
  const [prodTypes, setProds] = useState([])
  const [brands, setBrands] = useState([])
  const { state } = useLocation() as any
  useEffect(() => {
    (async () => {
      const res = await getEquipmentType()
      if(res.code === '0') {
        function trans (items: any[], parent?: any): any {
          return items.map((i: any) => {
            if(state?.id) {
              if(state.equipType === i?.id) {
                formRef.current?.setFieldsValue({
                  equipType: [parent?.id, state.equipType]
                })
              }
            }
            return ({label: i.name, value: i.id, children: i.children ? trans(i.children, i) : undefined})
          })
        }
        setProds(trans(res.data))
      }
      const res2 = await getBrands()
      if(res2.code === '0') {
        setBrands(res2.data)
      }
      if(state?.id) {
        setUuid(state.id)
        const res3 = await getFiles(state.id)
        if(res3.code === '0') {
          let file1s: any = [], file2:any = []
          res3?.data?.forEach((i: any) => {
            if(i.serviceType === 'MAIN_IMG')  {
              file1s.push(i.path)
            }else{
              file2.push(i.path)
            }
          })
          setFileList(file1s)
          setTotalList(file2)
        }
      }
    })()
  }, [])
  return (
    <div className={styles['repaire-wrap']}>
      <div className="repaire-inner">
      <ProForm submitter={false}  size='large' grid layout='vertical' initialValues={state} formRef={formRef}>
        <ProForm.Item style={{width: '100%'}}>
        <div className="tit">设备出租</div>
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
        </ProForm.Item>
        <ProFormText label="设备名称" name="equipName"  rules={[{
                required: true,
              }]}
              colProps={{
                span: 12
              }}
              />
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

        <div className='stit'>设备图片</div>
        <ProForm.Item label="整体外观" style={{width: '100%'}}>
          <Upload
                listType="picture-card"
                accept='.png,.jpg,.jpeg'
                maxCount={5}
                fileList={fileList.map(i => ({ url: '/lease-center/' + i, uid: i, name: '预览图'}))}
                onChange={async (e) => {
                  const file = e.file.originFileObj
                  const res = await uploadImg(file as File, { serviceId: uuid, serviceType: 'MAIN_IMG',sort: fileList.length })
                  if(res.code === '0') {
                    setFileList(fileList.concat(res.data.path))
                  }
                }}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
        </ProForm.Item>
        <ProForm.Item label="细节展示" style={{width: '100%'}}>
          <Upload
                listType="picture-card"
                accept='.png,.jpg,.jpeg' 
                maxCount={10}
                fileList={fileList_total.map(i => ({ url:  '/lease-center/' + i, uid: i, name: '预览图'}))}
                onChange={async (e) => {
                  const file = e.file.originFileObj
                  const res = await uploadImg(file as File, { serviceId: uuid, serviceType: 'DETAIL_IMG', sort: fileList_total.length  })
                  if(res.code === '0') {
                    setTotalList(fileList_total.concat(res.data.path))
                  }
                }}
              >
                {fileList_total.length >= 8 ? null : uploadButton}
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
              <ProFormDigit label="工作小时数"
                colProps={{
                  span: 12
                }}
                name='workTime'
                rules={[{
                  required: true,
                }]}
              />
              <ProFormDigit label="整机序列号"
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
              fieldProps={{
                addonAfter: "元/月"
              }}
              rules={[{
                required: true,
              }]}
              name="monthlyRent"
              label="月租金"
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
              placeholder="请对设备的技术参数、设备状况、提供的配套辅件、服务项目、服务商实力进行说明（限200字）"
              label="详细说明"/>
           
          </ProForm>
          <div style={{textAlign: 'center'}}>
            <Button size='large' type={'primary'} style={{width: 260, height: 60, fontSize: 22, margin: '10px 0 50px 0'}}
              onClick={ async () => {
                const values = await formRef.current?.validateFields()
                if(values) {
                  const res = await equipmentLease({...values, id: uuid, equipType: values.equipType[values.equipType.length - 1], releaseCityName:  Array.isArray(values.releaseCityName) ? values.releaseCityName.join(',') : values.releaseCityName}, state.id ? 'put':'post')
                  if(res.code === '0') {
                    message.success('保存成功!')
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
