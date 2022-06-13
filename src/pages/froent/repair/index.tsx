import { ProForm, ProFormCascader, ProFormItem, ProFormSelect, ProFormText, ProFormTextArea, ProFormTreeSelect, ProFormUploadButton, ProFormUploadDragger } from '@ant-design/pro-components';
import React from 'react';
import styles from './index.module.less';
import { TreeSelect, Button } from 'antd'
import city from '@/constants/city';
function Repair() {
  return (
    <div className={styles['repaire-wrap']}>
      <img src="/images/repair-hd.png" alt="" style={{margin: '35px 0 30px 0'}} />
      <div className="repaire-inner">
        <div className="tit">请在下面填写维修需求，我们会立即与您联系。</div>
        <div className='stit'>维护需求</div>
        <ProForm submitter={false}  grid size='large'>
          <ProFormSelect 
            options={[{
              label: '',
              value: ''
            }]}
            colProps={{
              span: 12
            }}
            label="品牌"
          />
          <ProFormText 
            colProps={{
              span: 12
            }}
            label="型号"
          />
          <ProFormTextArea 
            label="问题描述"
          />
          <ProFormUploadButton label="照片"/>
       
        </ProForm>
        <div className='stit'>联系方式</div>
        <ProForm submitter={false}  grid size='large'>
          <ProFormText 
            colProps={{
              span: 12
            }}
            label="姓名"
          />
           <ProFormText 
            colProps={{
              span: 12
            }}
            label="手机号"
          />
           {/* <ProFormTreeSelect 
            colProps={{
              span: 12
            }}
            fieldProps={{ treeData: city, treeNodeLabelProp: 'label'}}
            label="城市"
          /> */}
            <ProFormCascader label="城市" 
               colProps={{
                span: 12
              }}
              placeholder='请选择省市区'
              fieldProps={{
                options: city,
                showSearch: true,
              }}
            />
          {/* <ProFormItem >
            <TreeSelect style={{width: 200}} treeData={city} treeNodeLabelProp='label' />
          </ProFormItem> */}
           <ProFormText 
            colProps={{
              span: 12
            }}
            label="详细地址"
          />
          </ProForm>
          <div style={{textAlign: 'center'}}>
            <Button size='large' type={'primary'} style={{width: 260, height: 60, fontSize: 22, margin: '10px 0 50px 0'}}>提交</Button>
          </div>
      </div>
    </div>
  );
}

export default Repair;
