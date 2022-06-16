import { ProForm, ProFormCascader, ProFormDatePicker, ProFormDigit, ProFormField, ProFormGroup, ProFormInstance, ProFormItem, ProFormRadio, ProFormSelect, ProFormSwitch, ProFormText, ProFormTextArea, ProFormTreeSelect, ProFormUploadButton, ProFormUploadDragger } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import styles from './index.module.less';
import { Upload, Button, Radio } from 'antd'
import city from '@/constants/city';
import { uploadImg } from '@/server/common';
import { PlusOutlined } from '@ant-design/icons'
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
  return (
    <div className={styles['repaire-wrap']}>
      <div className="repaire-inner">
      <ProForm submitter={false}   size='large'  layout='vertical' formRef={formRef}>
        <ProForm.Item >
        <div className="tit">设备出租</div>
        <div className='stit'>选择发布城市</div>
          <ProFormCascader label="项目地点" 
               colProps={{
                span: 12
              }}
              placeholder='请选择省市区'
              fieldProps={{
                options: city,
                showSearch: true,
              }}
            />
        </ProForm.Item>
        <ProForm.Item >
        <div className='stit'>联系人信息</div>
            <ProFormText 
              
              label="联系电话"
            />
          </ProForm.Item>
        </ProForm>

        <div className='stit'>设备图片</div>
        <ProForm.Item label="整体外观">
          <ProFormText hidden />
          <Upload
                listType="picture-card"
                accept='.png,.jpg,.jpeg' 
                maxCount={1}
                fileList={fileList}
                onChange={async (e) => {
                  const file = e.file.originFileObj
                  const res = await uploadImg(file as File)
                  if(res.code === '0') {
                    formRef.current?.setFieldsValue({yyzzUrl: res.data.path})
                  }
                }}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
        </ProForm.Item>
        <ProForm.Item label="细节展示">
          <ProFormText hidden/>
          <Upload
                listType="picture-card"
                accept='.png,.jpg,.jpeg' 
                maxCount={1}
                fileList={fileList_total}
                onChange={async (e) => {
                  const file = e.file.originFileObj
                  const res = await uploadImg(file as File)
                  if(res.code === '0') {
                    formRef.current?.setFieldsValue({yyzzUrl: res.data.path})
                  }
                }}
              >
                {fileList_total.length >= 8 ? null : uploadButton}
              </Upload>
        </ProForm.Item>
        <div className='stit'>基本信息</div>
        <ProFormGroup grid colProps={{span: 24}}>
              <ProFormText 
   colProps={{
    span: 12
  }}
                label="设备类型"
               
              />
              <ProFormText 
              colProps={{
                span: 12
              }}
              label="设备品牌"
            />
        </ProFormGroup>
            
            
            <ProFormDigit
              colProps={{
                span: 12
              }}
              fieldProps={{
                addonAfter: '台'
              }}
              label="需求数量"
            />
            <ProFormDigit 

              fieldProps={{
                addonAfter: '天'
              }}
              label="工期长度"
            />
            <ProFormDatePicker label="进场时间" colProps={{
                span: 12
              }}
              width={437}
              />
          <div className='stit'>其他信息</div>
        <ProForm submitter={false}  grid size='large'>
            <ProFormField colProps={{
                span: 12
              }}
              label="发票"
              >
                <Radio.Group
                size='large'
                  options={[{
                    label: '不需要',
                    value: 'no'
                  },{
                    label: '增值税普票',
                    value: '增值税普票'
                  }, {
                    label: '增值税专票',
                    value: '增值税专票'
                  }]}
                  optionType="button"
                  buttonStyle="solid"
                />
            </ProFormField>
            <ProFormField colProps={{
                span: 12
              }}
              label="机手">
                <Radio.Group
                size='large'
                  options={[{
                    label: '需要',
                    value: 'no'
                  },{
                    label: '不需要',
                    value: '不需要'
                  }]}
                  optionType="button"
                  buttonStyle="solid"
                />
            </ProFormField>
            <ProFormField colProps={{
                span: 12
              }}
              label="付款方式"
              >
                <Radio.Group
                size='large'
                  options={[{
                    label: '预付',
                    value: 'no'
                  },{
                    label: '后付',
                    value: '增值税普票'
                  }, {
                    label: '现付',
                    value: '增值税专票'
                  }]}
                  optionType="button"
                  buttonStyle="solid"
                />
            </ProFormField>
            <ProFormTextArea 
            colProps={{
              span: 24
            }}
            fieldProps={{
              rows: 7
            }}
            placeholder="请对运输方式、原材料（如燃油）提供、应用情况、环境工况、特殊配置等的说明（限100字）"
            label="备注说明"/>
          </ProForm>
          <div style={{textAlign: 'center'}}>
            <Button size='large' type={'primary'} style={{width: 260, height: 60, fontSize: 22, margin: '10px 0 50px 0'}}>提交</Button>
          </div>
      </div>
    </div>
  );
}

export default ForRent;
