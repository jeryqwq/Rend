import { ProForm, ProFormCascader, ProFormDatePicker, ProFormDigit, ProFormField, ProFormInstance, ProFormItem, ProFormRadio, ProFormSelect, ProFormSwitch, ProFormText, ProFormTextArea, ProFormTreeSelect, ProFormUploadButton, ProFormUploadDragger } from '@ant-design/pro-components';
import React, {useRef, useState, useEffect} from 'react';
import styles from './index.module.less';
import { TreeSelect } from 'antd'
import city from '@/constants/city';
import { Upload, Button, Radio, message } from 'antd'
import { getUuid } from '@/utils';
import {  equipmentPurchase, equipmentRent } from '@/server/rent';
import { getBrands, getDict, getEquipmentType } from '@/server/common';
import { useLocation } from 'umi';
import moment from 'moment';
let allProdTypes
function ForRent() {
  const formRef = useRef<ProFormInstance>()
  const [uuid, setUuid] = useState( getUuid())
  const [prodTypes, setProds] = useState([])
  const [brands, setBrands] = useState([])
  const location = useLocation() as any
  const state = location.state
  useEffect(() => {
    (async () => {
      state && formRef.current?.setFieldsValue({
        ...state,
        startTime: moment(state.startTime),
        releaseCityName: state.releaseCityName.split(',')
      })
      state?.id && setUuid(state.id);
    })()
  }, [])
  useEffect(() => {
    (async () => {
      const res = await getDict('/mechineType')
      if(res.code === '0') {
        setProds(res.data)
      }
      const res2 = await getEquipmentType()
      if(res2.code === '0') {
        let _val:any = []
        function trans (items: any[], parentID?: string): any {
          return items.map((i: any) => {
            if(i.id === state?.equipType) {
              parentID && _val.push(parentID)
              _val.push(i.id)
              formRef.current?.setFieldsValue({
                equipType: _val
              })
            }
            return ({label: i.name, value: i.id, children: i.children ?  trans(i.children, i.id) : undefined})
          })
        }
        allProdTypes = trans(res2.data)
        setProds(allProdTypes)
      }
      const res3 = await getBrands()
      if(res3.code === '0') {
        setBrands(res3.data)
      }
    })()
  }, [])
  return (
    <div className={styles['repaire-wrap']}>
      <div className="repaire-inner">
        <div className="tit">??????????????????</div>
        <div className='stit'>??????????????????</div>
        <ProForm submitter={false}  grid size='large' formRef={formRef}>
          <ProFormCascader label="????????????" 
               colProps={{
                span: 12
              }}
              placeholder='??????????????????'
              name="releaseCityName"
              rules={[{required: true}]}
              fieldProps={{
                options: city,
                showSearch: true,
              }}
            />
          {/* <ProFormUploadButton label="??????"/> */}
        <div className='stit'>???????????????</div>
            <ProFormText 
              colProps={{
                span: 12
              }}
              rules={[{required: true}]}
              label="????????????"
              name="contactNumber"
            />
        <div className='stit' style={{width: '100%'}}>????????????</div>
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
                label="????????????"
              />
              <ProFormSelect
              colProps={{
                span: 12
              }}
              name="equipBrand"
              label="????????????"
              options={brands.map((i: any) => ({label: i.brandName, value: i.brandName}))}
              rules={[{
                required: true,
              }]}
            />
            
            
            <ProFormText
              colProps={{
                span: 12
              }}
              placeholder="?????? 307E"
              name="equipModel"
              label="????????????"
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
            placeholder="?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????200??????"
            label="????????????"/>
          </ProForm>
          <div style={{textAlign: 'center'}}>
            <Button size='large' type={'primary'} style={{width: 260, height: 60, fontSize: 22, margin: '10px 0 50px 0'}}
              onClick={ async () => {
                const values = await formRef.current?.validateFields()
                if(values) {
                  const res = await equipmentPurchase({...values, id: uuid, releaseCityName: values.releaseCityName.join(','), equipType: values.equipType[values.equipType.length - 1]}, state?.id ? 'put' : 'post' )
                  if(res.code === '0') {
                    message.success('????????????!')
                    formRef.current?.resetFields()
                    window.location.reload()
                  }
                }
              }}
            >??????</Button>
          </div>
      </div>
    </div>
  );
}

export default ForRent;
