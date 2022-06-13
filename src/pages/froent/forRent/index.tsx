import { ProForm, ProFormCascader, ProFormDatePicker, ProFormDigit, ProFormField, ProFormItem, ProFormRadio, ProFormSelect, ProFormSwitch, ProFormText, ProFormTextArea, ProFormTreeSelect, ProFormUploadButton, ProFormUploadDragger } from '@ant-design/pro-components';
import React from 'react';
import styles from './index.module.less';
import { TreeSelect, Button, Radio } from 'antd'
import city from '@/constants/city';
function ForRent() {
  return (
    <div className={styles['repaire-wrap']}>
      <div className="repaire-inner">
        <div className="tit">租用设备</div>
        <div className='stit'>选择发布城市</div>
        <ProForm submitter={false}  grid size='large'>
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
            <ProFormText 
              colProps={{
                span: 12
              }}
              label="详细地址"
            />
          {/* <ProFormUploadButton label="照片"/> */}
        </ProForm>
        <div className='stit'>联系人信息</div>
        <ProForm submitter={false}  grid size='large'>
            <ProFormText 
              colProps={{
                span: 12
              }}
              label="联系人"
            />
            <ProFormText 
              colProps={{
                span: 12
              }}
              label="手机号"
            />
          </ProForm>
        <div className='stit'>设备需求</div>
          <ProForm submitter={false}  grid size='large'>
            <ProFormText 
              colProps={{
                span: 12
              }}
              label="设备名称"
            />
            <ProFormText 
              colProps={{
                span: 12
              }}
              label="设备型号"
            />
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
              colProps={{
                span: 12
              }}
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
          </ProForm>
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
