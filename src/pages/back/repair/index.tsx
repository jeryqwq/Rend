import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.less';
import {Button, message} from 'antd'
import { ActionType, ProTable } from '@ant-design/pro-components';
import { commonRequest } from '@/server/common';
import { useHistory } from 'umi';
function Repair() {
  const history = useHistory()
  const tableRef = useRef<ActionType>()
  const [typeEnum, setEnum] = useState({})
  useEffect(() => {
    (async() => {
      const res = await commonRequest('/mallBrandInfo/all', { method: 'post', data: {} })
      if(res.code === '0') {
        let _data:any = {}
        res.data.forEach((i: any) => {
          _data[i.brandName] = i.brandName
        })
        setEnum(_data)
      }
    })()
  }, [])
  return (
   <div className='content'>
     <div className={styles['repair-wrap']}>
      <div className="tit">
        <span style={{background: 'white', paddingRight: 10}}>维修管理</span>
      </div>
      <Button type='primary' style={{float: 'right'}} onClick={() => {
        history.push('/repair')
      }}>新增</Button>
      <ProTable 
        columns={[
          {
            dataIndex: 'id',
            title: '需求ID',
            ellipsis: true,   
            copyable: true,
            hideInSearch: true
          },
          {
            dataIndex: 'equipBrand',
            title: '品牌',
            valueEnum: typeEnum,
            valueType: 'select'
          },
          {
            dataIndex: 'equipModel',
            title: '型号',
            
          },
          {
            dataIndex: 'mainImgPath',
            title: '照片',
            render(text) {
              return <img src={"/lease-center/" + text} style={{width: 80, height: 80}}/>
            },
            hideInSearch: true
          },
          {
            dataIndex: 'problemDesc',
            title: '描述',
            ellipsis: true, 
            width: 350
          }, {
            dataIndex: 'releaseCityName',
            title: '城市',
            hideInSearch: true
          }, {
            dataIndex: 'contactNumber',
            title: '手机号',
            hideInSearch: true
          },
          {
            dataIndex: 'id',
            title: '操作',
            hideInSearch: true,
            render(text){
              return <Button type="link" onClick={async () => {
                const res = await commonRequest('/equipmentRepairInfo/doTakeOrder', {
                  method: 'get',
                  params: {
                    id: text
                  }
                })
                if(res.code === '0') {
                  message.success('接单成功！')
                  tableRef.current?.reload()
                }
              }}>接单</Button>
            }
          },
        ]}
        pagination={
          {
            pageSize: 10
          }
        }
        actionRef={tableRef}
        request={async ({pageSize, current, ...others}) => {
          let conditions = []
          others?.equipBrand !==undefined && conditions.push({
            column: 'equip_brand',
            operator: 'eq',
            value: others?.equipBrand
          })
          others?.equipModel !==undefined && conditions.push({
            column: 'equip_model',
            operator: 'like',
            value: others?.equipModel
          })
          others?.problemDesc !==undefined && conditions.push({
            column: 'problem_desc',
            operator: 'like',
            value: others?.problemDesc
          })
          const res = await commonRequest('/equipmentRepairInfo/pageWait', {
            data:{
              size: pageSize,
             current,
             conditions
            },
            method: 'post'
          })
          if(res.code === '0') {
            return {
              data: res.data.records,
              total: res.data.total
            }
          }
          return { }
        }}
      />
         <div className='page-wrap'>
         </div>
    </div>
   </div>
  );
}

export default Repair;
