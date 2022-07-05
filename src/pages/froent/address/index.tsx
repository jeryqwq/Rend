import city from '@/constants/city';
import { ProForm, ProFormCascader, ProFormInstance, ProFormText } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.less';
import { Button , message, Modal} from 'antd'
import { commonRequest } from '@/server/common';
function Address() {
  const formRef = useRef<ProFormInstance>()
  const [address, setAddress] = useState([])
  useEffect(() => {
    reloadAddress()
  }, [])
  async function reloadAddress() {
    const res = await commonRequest('/mallReceiveAddress/findMy', {
      method: 'get'
    })
    if(res.code === '0') {
      setAddress(res.data)
    }
  }
  return (
    <div className={styles.addWrap}>
      <div className="tit">地址管理</div>
      <div style={{padding: '0 20px 20px 20px'}}>
      <Button type='link' style={{marginTop: 20}}>新增地址</Button>
      <ProForm formRef={formRef} submitter={false} autoFocusFirstInput={false} grid style={{width: 610}}>
        <ProFormText label="姓名" name="receiveUser" rules={[{required: true}]}/>
        <ProFormText label="手机" name="contactNumber" rules={[{required: true}]}/>
        <ProFormCascader label="地址" 
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
          name="city"
        />
        <ProFormText label="详细地址" name="address" rules={[{required: true}]}/>
        <ProFormText label="邮编" name="zipCode" rules={[{required: true}]}/>
      </ProForm>
      <Button type={'primary'} onClick={async () => {
        await formRef.current?.validateFields()
        const values = await formRef.current?.getFieldsValue()
        const res  = await commonRequest('/mallReceiveAddress', {
          method: 'post',
          data: {
            ...values,
            provinceName: values.city[0],
            cityName: values.city[1],
          }
        })
        if(res.code === '0') {
          message.info('新增成功!')
          formRef.current?.resetFields()
          reloadAddress()
        } 
      }}>新增</Button>
     <div className="table-wrap">
     <table style={{width: '100%', fontSize: 16, color: '#333'}} className={styles.tableWrap}>
        <thead style={{background: '#F2F2F2',borderBottom: '1px solid #DCDCDC', height: 60, textAlign: 'center'}}>
          <tr>
            <td style={{width: 100}}>收货人</td>
            <td style={{width: 130}}>所在地区</td>
            <td style={{width: 230}}>详细地址</td>
            <td style={{width: 120}}>邮编</td>
            <td style={{width: 170}}>电话/手机</td>
            <td style={{width: 220}}>操作</td>
          </tr>
        </thead>
        <tbody style={{lineHeight: '24px'}}>
          {
            address?.map((i:any) => <tr  style={{textAlign: 'center'}} >
            <td>{i.provinceName}</td>
            <td >{i.provinceName + " " + i.cityName} </td>
            <td>{i.address}</td>
            <td>{i.zipCode}</td>
            <td>{i.contactNumber}</td>
            <td>
              <a type='link' onClick={() => {
                Modal.confirm({
                  icon: null,
                  content: <ProForm formRef={formRef} submitter={false} initialValues={{...i, city: [i.provinceName, i.cityName]}} autoFocusFirstInput={false} grid >
                        <ProFormText label="姓名" name="receiveUser" rules={[{required: true}]}/>
                        <ProFormText label="手机" name="contactNumber" rules={[{required: true}]}/>
                        <ProFormCascader label="地址"
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
                          name="city"
                        />
                        <ProFormText label="详细地址" name="address" rules={[{required: true}]}/>
                        <ProFormText label="邮编" name="zipCode" rules={[{required: true}]}/>
                  </ProForm>,
                  onOk :async() => {
        await formRef.current?.validateFields()
                    const values = await formRef.current?.getFieldsValue()
                    const res = await commonRequest('/mallReceiveAddress', {
                      method: 'put',
                      data: {
                        ...i,
                        ...values,
                        provinceName: values.city[0],
                        cityName: values.city[1],
                        city: undefined,
                        userId: undefined
                      }
                    })
                    reloadAddress()
                    if(res.code !== '0') {
                      return false
                    }
                  }
                })
              }}>修改</a>
              <a type='link' onClick={async () => {
               Modal.confirm({
                title: '是否删除?',
                onOk: async() => {
                  const res = await commonRequest(`/mallReceiveAddress/${i.id}`, {
                    method: 'delete'
                  })
                  if(res.code === '0') {
                    message.success('删除成功!')
                    reloadAddress()
                  }
                }
               })
              }}>删除</a>
              <a type='link' style={{color: i.isDefault  === 1 && '#CE1610'}} onClick={async() => {
                const res = await commonRequest('/mallReceiveAddress', {
                  method: 'put',
                  data: {
                    id: i.id,
                    isDefault: 1
                  }
                })
                if(res.code === '0') {
                  message.success('设置成功')
                  reloadAddress()
                }
              }}>默认地址</a>
            </td>
           </tr>)
          }
        </tbody>
        </table>
     </div>
     </div>
    </div>
  );
}

export default Address;
