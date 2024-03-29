import {
  ProForm,
  ProFormCascader,
  ProFormInstance,
  ProFormItem,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
  ProFormUploadButton,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.less';
import { Upload, Button, message } from 'antd';
import city from '@/constants/city';
import { commonRequest, getBrands, uploadImg } from '@/server/common';
import { getUuid } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
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
  const [yyzzUrlfileList, setFileList] = useState<any[]>([]);
  const [cardUrl1fileList, setFileList1] = useState<any[]>([]);
  const [cardUrl2fileList, setFileList2] = useState<any[]>([]);
  const [otherfileList, setOthers] = useState<any[]>([]);
  const [uuid, setUuid] = useState(getUuid());
  const { user } = useUserInfo();
  const userId = user.user.id;
  const formRef = useRef<ProFormInstance>();
  const history = useHistory();
  const [userType, setType] = useState('user');
  const [sysorgin, setSys] = useState({});
  useEffect(() => {
    (async () => {
      const res = await commonRequest('/sysOrgan/findMy', {
        method: 'get',
        params: { type: 2 },
      });
      if (res.code === '0') {
        formRef.current?.setFieldsValue(res?.data);
        if (res.data) {
          if (res.data.status === 'user') {
            message.info('您已认证过，不需要认证了');
            // history.push('/');
            return;
          } else {
            setType(res.data?.serverType);
            setSys(res.data);
            setFileList([res?.data?.yyzzUrl]);
            setFileList1([res?.data?.cardUrl1]);
            setFileList2([res?.data?.cardUrl2]);
            res?.data?.otherUrl && setOthers(res?.data?.otherUrl.split(','));
          }
        } else {
          const res2 = await commonRequest('/sysOrgan/findMy', {
            method: 'get',
            params: { type: 1 },
          });
          if (res2.code === '0') {
            if (res2.data) {
              setSys(res2.data);
              formRef.current?.setFieldsValue(res2.data);
              setFileList([res2?.data?.yyzzUrl]);
              setFileList1([res2?.data?.cardUrl1]);
              setFileList2([res2?.data?.cardUrl2]);
              res2?.data?.otherUrl &&
                setOthers(res2?.data?.otherUrl.split(','));
            }
          }
        }
      }
    })();
  }, []);
  console.log(userType);

  return (
    <div className={styles['repaire-wrap']}>
      <div className="bg">RONG SHENG DA</div>
      <div className="tit2">施工单位认证</div>
      <div className="repaire-inner">
        <div className="tit">请补充相应资料，我们审核后会立即与您联系。</div>
        {userType === 'dept' && <h1>企业信息</h1>}
        <ProForm formRef={formRef} submitter={false} grid size="large">
          <ProFormRadio.Group
            name={'serverType'}
            label={'请选择用户类型'}
            fieldProps={{
              defaultValue: 'user',
              onChange(e) {
                setType(e.target.value);
              },
            }}
            options={[
              {
                label: '个人用户',
                value: 'user',
              },
              {
                label: '企业用户',
                value: 'dept',
              },
            ]}
          />
          {userType === 'dept' && (
            <>
              <ProFormText
                colProps={{
                  span: 12,
                }}
                name="callUser"
                label="联系人"
                rules={[{ required: true }]}
              />
              <ProFormText
                colProps={{
                  span: 12,
                }}
                label="联系电话"
                name="callPhone"
                rules={[{ required: true }]}
              />
              <ProFormText
                colProps={{
                  span: 12,
                }}
                label="法人姓名"
                name="legalUser"
              />
              <ProFormText
                colProps={{
                  span: 12,
                }}
                label="法人身份证号码"
                name="legalIdCard"
                // rules={userType === 'user' ? [{required: true}] : []}
              />
              <ProFormText
                label="企业名称"
                colProps={{
                  span: 12,
                }}
                name="name"
              />
              <ProFormText
                label="统一社会信用代码"
                colProps={{
                  span: 12,
                }}
                name="compCode"
              />
              <ProForm.Item
                label="企业营业执照"
                style={{ width: '100%' }}
                required
              >
                <Upload
                  listType="picture-card"
                  accept=".png,.jpg,.jpeg"
                  maxCount={1}
                  fileList={yyzzUrlfileList.map((i) => ({
                    url: '/lease-center/' + i,
                    uid: i,
                    name: '预览图',
                  }))}
                  onChange={async (e) => {
                    const file = e.file.originFileObj;
                    const res = await uploadImg(file as File, {
                      serviceId: uuid,
                      serviceType: 'AUTH_IMG',
                      sort: yyzzUrlfileList.length,
                    });
                    if (res.code === '0') {
                      setFileList([res.data.path]);
                    }
                  }}
                >
                  {yyzzUrlfileList.length >= 8 ? null : uploadButton}
                </Upload>
              </ProForm.Item>
              <ProForm.Item label="法人身份证正面" style={{ width: '50%' }}>
                <Upload
                  listType="picture-card"
                  accept=".png,.jpg,.jpeg"
                  maxCount={1}
                  fileList={cardUrl1fileList.map((i) => ({
                    url: '/lease-center/' + i,
                    uid: i,
                    name: '预览图',
                  }))}
                  onChange={async (e) => {
                    const file = e.file.originFileObj;
                    const res = await uploadImg(file as File, {
                      serviceId: uuid,
                      serviceType: 'AUTH_MAIN',
                      sort: cardUrl1fileList.length,
                    });
                    if (res.code === '0') {
                      setFileList1([res.data.path]);
                    }
                  }}
                >
                  {cardUrl1fileList.length >= 8 ? null : uploadButton}
                </Upload>
              </ProForm.Item>
              <ProForm.Item label="法人身份证反面" style={{ width: '50%' }}>
                <Upload
                  listType="picture-card"
                  accept=".png,.jpg,.jpeg"
                  maxCount={1}
                  fileList={cardUrl2fileList.map((i) => ({
                    url: '/lease-center/' + i,
                    uid: i,
                    name: '预览图',
                  }))}
                  onChange={async (e) => {
                    const file = e.file.originFileObj;
                    const res = await uploadImg(file as File, {
                      serviceId: uuid,
                      serviceType: 'AUTH_BACK',
                      sort: cardUrl2fileList.length,
                    });
                    if (res.code === '0') {
                      setFileList2([res.data.path]);
                    }
                  }}
                >
                  {cardUrl2fileList.length >= 8 ? null : uploadButton}
                </Upload>
              </ProForm.Item>
            </>
          )}

          {userType === 'user' && (
            <>
              <div className="stit" style={{ width: '100%' }}>
                个人信息
              </div>
              <ProFormText
                colProps={{
                  span: 12,
                }}
                label="个人姓名"
                name="legalUser"
              />
              <ProFormText
                colProps={{
                  span: 12,
                }}
                label="个人身份证"
                name="legalIdCard"
              />
              <ProForm.Item label="个人身份证正面" style={{ width: '50%' }}>
                <Upload
                  listType="picture-card"
                  accept=".png,.jpg,.jpeg"
                  maxCount={1}
                  fileList={cardUrl1fileList.map((i) => ({
                    url: '/lease-center/' + i,
                    uid: i,
                    name: '预览图',
                  }))}
                  onRemove={() => {
                    setFileList1([]);
                    return false;
                  }}
                  onChange={async (e) => {
                    const file = e.file.originFileObj;
                    const res = await uploadImg(file as File, {
                      serviceId: uuid,
                      serviceType: 'AUTH_MAIN',
                      sort: cardUrl1fileList.length,
                    });
                    if (res.code === '0') {
                      setFileList1([res.data.path]);
                    }
                  }}
                >
                  {cardUrl1fileList.length >= 8 ? null : uploadButton}
                </Upload>
              </ProForm.Item>
              <ProForm.Item label="个人身份证反面" style={{ width: '50%' }}>
                <Upload
                  listType="picture-card"
                  accept=".png,.jpg,.jpeg"
                  maxCount={1}
                  onRemove={() => {
                    setFileList2([]);
                    return false;
                  }}
                  fileList={cardUrl2fileList.map((i) => ({
                    url: '/lease-center/' + i,
                    uid: i,
                    name: '预览图',
                  }))}
                  onChange={async (e) => {
                    const file = e.file.originFileObj;
                    const res = await uploadImg(file as File, {
                      serviceId: uuid,
                      serviceType: 'AUTH_BACK',
                      sort: cardUrl2fileList.length,
                    });
                    if (res.code === '0') {
                      setFileList2([res.data.path]);
                    }
                  }}
                >
                  {cardUrl2fileList.length >= 8 ? null : uploadButton}
                </Upload>
              </ProForm.Item>
              <h1 style={{ width: '100%' }}>其他资质材料</h1>

              <ProForm.Item label="其他材料扫描件" style={{ width: '50%' }}>
                <Upload
                  listType="picture-card"
                  accept=".png,.jpg,.jpeg"
                  maxCount={1}
                  onRemove={() => {
                    setOthers([]);
                    return false;
                  }}
                  fileList={otherfileList.map((i) => ({
                    url: '/lease-center/' + i,
                    uid: i,
                    name: '预览图',
                  }))}
                  onChange={async (e) => {
                    const file = e.file.originFileObj;
                    const res = await uploadImg(file as File, {
                      serviceId: uuid,
                      serviceType: 'OTHER',
                      sort: otherfileList.length,
                    });
                    if (res.code === '0') {
                      setOthers(otherfileList.concat(res.data.path));
                    }
                  }}
                >
                  {otherfileList.length >= 8 ? null : uploadButton}
                </Upload>
              </ProForm.Item>
            </>
          )}
        </ProForm>
        <div style={{ textAlign: 'center' }}>
          <Button
            size="large"
            type={'primary'}
            style={{
              width: 260,
              height: 60,
              fontSize: 22,
              margin: '10px 0 50px 0',
            }}
            onClick={async () => {
              const values = await formRef.current?.validateFields();
              if (userType === 'dept' || yyzzUrlfileList.length) {
                if (values) {
                  const res = await commonRequest('/sysOrgan', {
                    method: 'post',
                    data: {
                      ...sysorgin,
                      ...values,
                      yyzzUrl: yyzzUrlfileList[0],
                      cardUrl1: cardUrl1fileList[0],
                      cardUrl2: cardUrl2fileList[0],
                      otherUrl: otherfileList.join(','),
                      id: uuid,
                      type: 2,
                      serverId: userId,
                      compName: values.name || sysorgin.name,
                    },
                  });
                  if (res.code === '0') {
                    message.success('保存成功!');
                    formRef.current?.resetFields();
                    setFileList([]);
                    window.location.reload();
                  }
                }
              } else {
                message.warn('请上传营业执照后提交');
              }
            }}
          >
            提交
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Repair;
