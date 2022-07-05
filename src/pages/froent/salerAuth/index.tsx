import { ProForm, ProFormCascader, ProFormInstance, ProFormItem, ProFormSelect, ProFormText, ProFormTextArea, ProFormTreeSelect, ProFormUploadButton, ProFormUploadDragger } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.less';
import { Upload, Button, message } from 'antd'
import city from '@/constants/city';
import { commonRequest, getBrands, uploadImg } from '@/server/common';
import { getUuid } from '@/utils';
import { PlusOutlined } from '@ant-design/icons'
import { equipmentRepairInfo } from '@/server/rent';
import { useHistory } from 'umi';
import useUserInfo from '@/hooks/useLogin';

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>点击上传</div>
  </div>
);
function Repair() {
  const [yyzzUrlfileList, setFileList] = useState<any[]>([])
  const [cardUrl1fileList, setFileList1] = useState<any[]>([])
  const [cardUrl2fileList, setFileList2] = useState<any[]>([])
  const [otherfileList, setOthers] = useState<any[]>([])
  const [uuid, setUuid] = useState( getUuid())
  const { user } = useUserInfo()
  const userId = user.user.id
  const formRef = useRef<ProFormInstance>()
  const history = useHistory()
  useEffect(() => {
    (async () => {
     const res = await commonRequest('/sysOrgan/findMy', { method: 'get', params: { type: 1 } })
     if(res.code === '0') {
      // message.info('您已提交过认证信息，请稍后！')
      // history.push('/')
     }
    })()
  },[])
  return (
    <div className={styles['repaire-wrap']}>
  <div className='bg'>RONG SHENG DA</div>
        <div className="tit2">品牌商认证</div>
      <div className="repaire-inner">
      <div className="tit">请补充相应资料，我们审核后会立即与您联系。</div>
      <h1>企业信息</h1>

        <ProForm formRef={formRef} submitter={false}  grid size='large' >
          <ProFormText
            colProps={{
              span: 12
            }}
            name="callUser"
            label="联系人"
            rules={[{required: true}]}
          />
          <ProFormText 
            colProps={{
              span: 12
            }}
            label="联系电话"
            name="callPhone"
            rules={[{required: true}]}
          />
          <ProFormText 
            label="企业名称"
            colProps={{
              span: 12
            }}
            name="name"
            rules={[{required: true}]}
          />
          <ProFormText 
            label="统一社会信用代码"
            colProps={{
              span: 12
            }}
            name="compCode"
            rules={[{required: true}]}
          />
        <ProForm.Item label="企业营业执照" style={{width: '100%'}} required>
          <Upload
                listType="picture-card"
                accept='.png,.jpg,.jpeg' 
                fileList={yyzzUrlfileList.map(i => ({ url: '/lease-center/' + i, uid: i, name: '预览图'}))}
                onChange={async (e) => {
                  const file = e.file.originFileObj
                  const res = await uploadImg(file as File, { serviceId: uuid, serviceType: 'AUTH_IMG',sort: yyzzUrlfileList.length })
                  if(res.code === '0') {
                    setFileList([res.data.path])
                  }
                }}
              >
                {yyzzUrlfileList.length >= 8 ? null : uploadButton}
              </Upload>
        </ProForm.Item>
        <div className='stit' style={{width: '100%'}}>联系方式</div>
          <ProFormText 
            colProps={{
              span: 12
            }}
            rules={[{required: true}]}

            label="法人姓名"
            name="legalUser"
          />
           <ProFormText 
            colProps={{
              span: 12
            }}
            label="法人身份证"
            rules={[{required: true,}]}
            name="legalIdCard"
          />
            <ProForm.Item label="法人身份证正面" style={{width: '50%'}} required>
          <Upload
                listType="picture-card"
                accept='.png,.jpg,.jpeg' 
                maxCount={1}
                fileList={cardUrl1fileList.map(i => ({ url: '/lease-center/' + i, uid: i, name: '预览图'}))}
                onChange={async (e) => {
                  const file = e.file.originFileObj
                  const res = await uploadImg(file as File, { serviceId: uuid, serviceType: 'AUTH_MAIN',sort: cardUrl1fileList.length })
                  if(res.code === '0') {
                    setFileList1([res.data.path])
                  }
                }}
              >
                {cardUrl1fileList.length >= 8 ? null : uploadButton}
              </Upload>
        </ProForm.Item>
        <ProForm.Item label="法人身份证反面" style={{width: '50%'}} required>
          <Upload
                listType="picture-card"
                accept='.png,.jpg,.jpeg' 
                maxCount={1}
                fileList={cardUrl2fileList.map(i => ({ url: '/lease-center/' + i, uid: i, name: '预览图'}))}
                onChange={async (e) => {
                  const file = e.file.originFileObj
                  const res = await uploadImg(file as File, { serviceId: uuid, serviceType: 'AUTH_BACK',sort: cardUrl2fileList.length })
                  if(res.code === '0') {
                    setFileList2([res.data.path])
                  }
                }}
              >
                {cardUrl2fileList.length >= 8 ? null : uploadButton}
              </Upload>
        </ProForm.Item>
        <h1 style={{width: '100%'}}>其他资质材料</h1>

        <ProForm.Item label="其他材料扫描件" style={{width: '50%'}} required>
          <Upload
                listType="picture-card"
                accept='.png,.jpg,.jpeg' 
                maxCount={1}
                fileList={otherfileList.map(i => ({ url: '/lease-center/' + i, uid: i, name: '预览图'}))}
                onChange={async (e) => {
                  const file = e.file.originFileObj
                  const res = await uploadImg(file as File, { serviceId: uuid, serviceType: 'OTHER',sort: otherfileList.length })
                  if(res.code === '0') {
                    setOthers(otherfileList.concat(res.data.path))
                  }
                }}
              >
                {otherfileList.length >= 8 ? null : uploadButton}
              </Upload>
        </ProForm.Item>
          </ProForm>
          <div style={{textAlign: 'center'}}>
            <Button size='large' type={'primary'} style={{width: 260, height: 60, fontSize: 22, margin: '10px 0 50px 0'}}
             onClick={ async () => {
              const values = await formRef.current?.validateFields()
              if(yyzzUrlfileList.length && cardUrl1fileList.length && cardUrl2fileList.length ){
              if(values) {
                const res = await commonRequest('/sysOrgan', {
                  method: 'post',
                  data: {
                    ...values,
                    yyzzUrl: yyzzUrlfileList[0],
                    cardUrl1: cardUrl1fileList[0],
                    cardUrl2: cardUrl2fileList[0],
                    otherfileList: otherfileList.join(','),
                    id: uuid,
                    type: 1,
                    serverId: userId,
                    serverType: 'user',
                    compName: values.name
                  }
                })
                if(res.code === '0') {
                  message.success('保存成功!')
                  formRef.current?.resetFields()
                  setFileList([])
                }
              }
              }else{
                message.warn('请上传相关照片后提交')
              }
            }}
            >提交</Button>
          </div>
      </div>
    </div>
  );
}

export default Repair;
