import { ActionType, ProTable } from '@ant-design/pro-components';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Button,Input, Table, Space, Radio, message, Modal } from 'antd'
import styles from './index.module.less';
import { commonRequest } from '@/server/common';
import { useHistory } from 'umi';
const apiMap = {
  rent: '/equipmentLease/pageMy',
  sall: '/equipmentSale/page',
  part: '/equipmentParts/page'
}
const apiStatusMap = {
  rent: '/equipmentLease/batchShelf',
  sall: '/equipmentSale/batchShelf',
  part: '/equipmentParts/batchShelf'
}
const locaMap = {
  rent: 'rentDetail',
  sall: 'productDetail',
  part: 'partDetail'
}
const apiDelMap = {
  rent: '/equipmentLease',
  sall: '/equipmentSale',
  part: '/equipmentParts'
}
const addLocMap = {
  rent: '/productRent',
  sall: '/sallOld',
  part: '/addPart'
}
function Product() {
  const [params, setParams] = useState({
    size: 8,
    current: 0 
  })
  const history = useHistory()
  const tableRef = useRef<ActionType>()
  const [type, setType] = useState<'rent' | 'sall' | 'part'>('rent')
  const [manageValueEnum, setEnum] = useState<Record<string, any>>({
    rent: [],
    sall: [],
    part: []
  })
  const [keyword, setKeyword] = useState('')
  useEffect(() => {
    (async () => {
       const res2 = await commonRequest('/equipmentType/tree',{})
       if(res2.code === '0') {
        function trans (items: any[]): any {
          return items.map((i: any) => ({label: i.name, value: i.id, children: i.children ?  trans(i.children) : undefined}))
        }
        const _data = trans(res2.data)
        setEnum( (val) => {
          return {
            ...val,
            rent: _data,
            sall: _data
          }
        })
       }
       const res3 = await commonRequest('/appdict/partsType', {
        method: 'get'
       })
       if(res3.code === '0') {
        setEnum( (val) => {
          return {
            ...val,
            part: res3.data.map((i: any) => ({label: i.name, value: i.code}))
          }
        })
        setTimeout(() => {
          console.log(manageValueEnum)
        }, 200);
       }
    })()
  }, [params, type])
  return (
    <div className='content' >
      <div className={styles.wrap}>
      <div className="tit">
        <span style={{background: 'white', paddingRight: 10}}>商品管理</span>
      </div>
      <Radio.Group onChange={e => {
          setType(e.target.value);
          tableRef.current?.reloadAndRest()
        }} defaultValue="rent" size="large">
        <Radio.Button value="rent" >租凭管理</Radio.Button>
        <Radio.Button value="sall">二手设备管理</Radio.Button>
        <Radio.Button value="part">配件管理</Radio.Button>
      </Radio.Group>
      <Button type='primary' style={{float: 'right'}} onClick={() => {
        history.push(addLocMap[type])
      }}>新增</Button>
      <ProTable
        // dataSource={dataList}
        actionRef={tableRef}
        pagination={{pageSize: 8}}
        columns={[
          {
            title: '商品ID',
            dataIndex: 'id',
            hideInSearch: true
          },
          {
            title: '商品标题',
            dataIndex: type === 'part' ? 'partsName' : 'equipName',
            hideInSearch: true
          },
          {
            title: '设备类型',
            dataIndex:  type === 'part' ? 'partsType' :'equipTypeText',
            valueType: 'cascader',
            fieldProps: {
              options:manageValueEnum[type] ,
          }},
          {
            title: '设备型号',
            dataIndex: type === 'part' ? 'partsModel' : 'equipModel',
            hideInSearch: true

          },
          {
            title: '缩略图',
            dataIndex: 'mainImgPath',
            hideInSearch: true,
            render(text){
              return <img src={'/lease-center/' + text} alt="" style={{width: 80,height:80 }} />
            }
          }, {
            title: '所在地',
            dataIndex: 'releaseCityName',
            hideInSearch: true

          }, {
            title: { 'sall': '金额', 'rent': '租金', part: '金额' }[type],
            dataIndex: { 'sall': 'salePrice', 'rent': 'monthlyRent', part: 'price' }[type],
            hideInSearch: true
          },
          {
            title: '状态',
            dataIndex: 'status',
            valueEnum:{
              '0': '上架',
              '-1': '下架'
            }
          },
          {
            title: '操作',
            dataIndex: 'id',
            hideInSearch: true,
            renderText(text, record, index, action) {
              return <>
              <Button type='link' onClick={async () => {
               const res = await commonRequest( apiStatusMap[type], {
                method: 'put',
                data: {
                  ids: [record.id],
                 status: record.status === 0 ? -1 : 0
                }
               })
               if(res.code === '0') {
                tableRef.current?.reload()
               }
              }}>上架</Button>
              <br />
              <Button type='link' 
                onClick={() => {
                  history.push({
                    pathname: addLocMap[type],
                    state: record
                  })
                }}
              >修改</Button>
              <br />
              <Button type='link' onClick={() => {
                history.push(`/${locaMap[type]}?id=${record.id}`)
              }}>预览</Button>
              </>
            },
          },
        ]}
        request={async({pageSize, current, ...others}, sort, filter) => {
            let conditions = []
            others?.status!==undefined && conditions.push({
              column: 'status',
              operator: 'eq',
              value: others?.status
            })
            if(others?.equipTypeText?.length) {
              conditions.push({
                column: 'equip_type',
                operator: 'eq',
                value: others?.equipTypeText?.[others?.equipTypeText.length -1]
              })
            }else if(others?.partsType?.length) {
              conditions.push({
                column: 'parts_type',
                operator: 'eq',
                value: others?.partsType?.[others?.partsType.length -1]
              })
            }
            keyword &&  conditions.push({
              column: type === 'part' ? 'parts_name' :'equip_name',
              operator: 'like',
              value: keyword
            })
            const res = await commonRequest(apiMap[type], {
              method: 'post',
              data: {
                size: pageSize,
                current,
                conditions
              },
             })
            return {
              data: res.data.records,
              total: res.data.total
            }
        }}
        search={{
          optionRender: (searchConfig, formProps, dom) => [
            <Input placeholder='商品名查询' style={{width: 140}} onChange={(e) => {
              setKeyword(e.target.value)
            }}/>,
            ...dom,
           ,
          ],
        }}
        rowSelection={{
          // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
          // 注释该行则默认不显示下拉选项
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        }}
        rowKey="id"
        tableAlertOptionRender={({selectedRowKeys}) => {
          return (
            <Space size={16}>
              <a onClick={async () => {
                const res = await commonRequest( apiStatusMap[type], {
                  method: 'put',
                  data: {
                    ids: selectedRowKeys,
                    status: 0
                  }
                })
                if(res.code === '0') {
                  tableRef.current?.reload()
                }
              }}  >批量上架</a>
              <a
              onClick={async () => {
                const res = await commonRequest( apiStatusMap[type], {
                  method: 'put',
                  data: {
                    ids: selectedRowKeys,
                    status: -1
                  }
                })
                if(res.code === '0') {
                  tableRef.current?.reload()
                }
              }}
              >批量下架</a>
              <a
                onClick={async () => {
                  Modal.confirm({
                    title: '提示',
                    content: '该操作会删除选中的数据，是否继续？',
                    onOk: async() => {
                      const res = await commonRequest( apiDelMap[type], {
                        method: 'delete',
                        data: {
                          ids: selectedRowKeys
                        }
                      })
                      if(res.code === '0') {
                        tableRef.current?.reload()
                      }
                    }
                  })
                }}
              >批量删除</a>
            </Space>
          );
        }}
        options={false}
        tableExtraRender={() => <span style={{color: '#858585', fontSize: 18, padding: '0 30px'}}>商品总数: {tableRef.current?.pageInfo?.total}</span>}
      />
      </div>
    </div>
  );
}

export default Product;
