import { ProForm, ProFormCascader, ProFormInstance, ProFormItem, ProFormSelect, ProFormText, ProFormTextArea, ProFormTreeSelect, ProFormUploadButton, ProFormUploadDragger } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.less';
import { Upload, Button, message } from 'antd'
import city from '@/constants/city';
import { getBrands, uploadImg } from '@/server/common';
import { getUuid } from '@/utils';
import { PlusOutlined } from '@ant-design/icons'
import { equipmentRepairInfo } from '@/server/rent';

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>点击上传</div>
  </div>
);
function Repair() {
  const [brands, setBrands] = useState([])
  const [fileList, setFileList] = useState([])
  const [uuid, setUuid] = useState( getUuid())
  const formRef = useRef<ProFormInstance>()

  useEffect(() => {
    (async () => {
      const res = await getBrands()
      if(res.code === '0') {
        setBrands(res.data)
      }
    })()
  },[])
  return (
    <div className={styles['repaire-wrap']}>
      <img src="/images/repair-hd.png" alt="" style={{margin: '35px 0 30px 0'}} />
      <div className="repaire-inner">
        <div className="tit">请在下面填写维修需求，我们会立即与您联系。</div>
        <div className='stit'>维护需求</div>
        <ProForm formRef={formRef} submitter={false}  grid size='large'>
          <ProFormSelect
            options={brands.map((i: any) => ({label: i.brandName, value: i.brandName}))}
            colProps={{
              span: 12
            }}
            name="contactName"
            label="品牌"
            rules={[{required: true}]}
          />
          <ProFormText 
            colProps={{
              span: 12
            }}
            label="型号"
            name="equipModel"
            rules={[{required: true}]}
          />
          <ProFormTextArea 
            label="问题描述"
            fieldProps={{
              rows: 8
            }}
            name="problemDesc"
            rules={[{required: true}]}
          />
        <ProForm.Item label="照片" style={{width: '100%'}}>
          <Upload
                listType="picture-card"
                accept='.png,.jpg,.jpeg' 
                maxCount={1}
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
        <div className='stit' style={{width: '100%'}}>联系方式</div>
          <ProFormText 
            colProps={{
              span: 12
            }}
            rules={[{required: true}]}

            label="姓名"
            name="contactName"
          />
           <ProFormText 
            colProps={{
              span: 12
            }}
            label="手机号"
            rules={[{required: true,     pattern: /^1[3-9]\d{9}$/,
            message: '手机号码不匹配，请检查后重新输入'}]}
            name="contactNumber"
          />
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
       
           <ProFormText 
            colProps={{
              span: 12
            }}
            label="详细地址"
            name="detailAddress"
            rules={[{required: true}]}
          />
          </ProForm>
          <div style={{textAlign: 'center'}}>
            <Button size='large' type={'primary'} style={{width: 260, height: 60, fontSize: 22, margin: '10px 0 50px 0'}}
             onClick={ async () => {
              const values = await formRef.current?.validateFields()
              console.log(values)
              if(values) {
                const res = await equipmentRepairInfo({...values, id: uuid, releaseCityName: values.releaseCityName.join(',')})
                if(res.code === '0') {
                  message.success('发布成功!')
                  formRef.current?.resetFields()
                  setFileList([])
                }
              }
            }}
            >提交</Button>
          </div>
      </div>
    </div>
  );
}

export default Repair;
