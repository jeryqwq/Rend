import { ActionType, ProTable } from '@ant-design/pro-components';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Button,Input, Table, Space, Radio, message, Modal, InputNumber } from 'antd'
import styles from './index.module.less';
import { commonRequest } from '@/server/common';
import { useHistory } from 'umi';
const apiMap = {
  rent: '/equipmentLease/pageMy',
  sall: '/equipmentSale/pageMy',
  part: '/equipmentParts/pageMy',
  new: '/equipmentSale/pageMy'
}
const apiStatusMap = {
  rent: '/equipmentLease/batchShelf',
  sall: '/equipmentSale/batchShelf',
  part: '/equipmentParts/batchShelf',
  new: '/equipmentSale/batchShelf',
}
const locaMap = {
  rent: 'rentDetail',
  sall: 'productDetail',
  part: 'partDetail',
  new: 'productDetail',

}
const apiDelMap = {
  rent: '/equipmentLease',
  sall: '/equipmentSale',
  part: '/equipmentParts',
  new: '/equipmentSale',
}
const addLocMap = {
  rent: '/productRent',
  sall: '/sallOld',
  part: '/addPart',
  new: '/sallNew',
}
function Product() {
 
  const history = useHistory()
  const tableRef = useRef<ActionType>()
  const [type, setType] = useState<'rent' | 'sall' | 'part' | 'new'>('rent')
  const [manageValueEnum, setEnum] = useState<Record<string, any>>({
    rent: [],
    sall: [],
    part: [],
    new: []
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
       }
    })()
  }, [type])
  return (
    <div className='content' >
      <div className={styles.wrap}>
      <div className="tit">
        <span style={{background: 'white', paddingRight: 10}}>????????????</span>
      </div>
      <Radio.Group onChange={e => {
          setType(e.target.value);
          tableRef.current?.reloadAndRest()
        }} defaultValue="rent" size="large">
        <Radio.Button value="rent" >??????????????????</Radio.Button>
        <Radio.Button value="new">??????????????????</Radio.Button>
        <Radio.Button value="sall">??????????????????</Radio.Button>
        <Radio.Button value="part">????????????</Radio.Button>
      </Radio.Group>
      <Button type='primary' style={{float: 'right'}} onClick={() => {
        history.push(addLocMap[type])
      }}>??????</Button>
      <ProTable
        // dataSource={dataList}
        actionRef={tableRef}
        pagination={{pageSize: 8}}
        columns={[
          {
            title: '??????ID',
            dataIndex: 'id',
            hideInSearch: true
          },
          {
            title: '????????????',
            dataIndex: type === 'part' ? 'partsName' : 'equipName',
            hideInSearch: true
          },
          {
            title: '????????????',
            dataIndex:  type === 'part' ? 'partsType' :'equipTypeText',
            valueType: 'cascader',
            fieldProps: {
              options:manageValueEnum[type] ,
          }},
          {
            title: '????????????',
            dataIndex: type === 'part' ? 'partsModel' : 'equipModel',
            hideInSearch: true

          },
          {
            title: '?????????',
            dataIndex: 'mainImgPath',
            hideInSearch: true,
            render(text){
              return <img src={'/lease-center/' + text} alt="" style={{width: 80,height:80 }} />
            }
          }, {
            title: '?????????',
            dataIndex: 'releaseCityName',
            hideInSearch: true

          }, {
            title: { 'sall': '??????', 'rent': '??????', part: '??????' }[type],
            dataIndex: { 'sall': 'salePrice', 'rent': 'monthlyRent', part: 'price' }[type],
            hideInSearch: true
          },
          {
            title: '??????',
            dataIndex: 'status',
            valueEnum:{
              '0': '??????',
              '-1': '??????'
            }
          },
          {
            title: '??????',
            dataIndex: 'id',
            hideInSearch: true,
            renderText(text, record, index, action) {
              return <>
              {
                type === 'part' && <>
                   <Button type='link' 
                      onClick={() => {
                        let _data = '';
                        Modal.confirm({
                          content: <InputNumber min={1}  onChange={(e) => {
                            _data = e
                          }}/>,
                          title: '?????????????????????',
                          onOk: async() => {
                            const res = await commonRequest('/equipmentStroeRecord', {
                              data: {
                                type: 1,
                                serviceType: 'EquipmentParts',
                                serviceId: text,
                                num: _data
                              },
                              method: 'post'
                            })
                            if(res.code === '0') {
                              message.info('????????????')
                              tableRef.current?.reloadAndRest()
                            }
                          },
                        })
                      }}
                    >??????</Button>
                    <br/>
                     <Button type='link' 
                         onClick={() => {
                          let _data = '';
                          Modal.confirm({
                            content: <InputNumber min={1} onChange={(e) => {
                              _data = e
                            }}/>,
                            title: '?????????????????????',
                            onOk: async() => {
                              const res = await commonRequest('/equipmentStroeRecord', {
                                data: {
                                  type: 2,
                                  serviceType: 'EquipmentParts',
                                  serviceId: text,
                                  num: _data
                                },
                                method: 'post'
                              })
                              if(res.code === '0') {
                                message.info('????????????')
                                tableRef.current?.reloadAndRest()
                              }
                            },
                          })
                        }}
                    >??????</Button>
                </>
              }
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
              }}>??????</Button>
              <br />
              <Button type='link' 
                onClick={() => {
                  history.push({
                    pathname: addLocMap[type],
                    state: record
                  })
                }}
              >??????</Button>
              <br />
              <Button type='link' onClick={() => {
                history.push(`/${locaMap[type]}?id=${record.id}`)
              }}>??????</Button>
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
            if(type === 'new' || type === 'sall') {
              conditions.push({
                column: 'is_new',
                operator: 'eq',
                value: type === 'new' ? 1 : 0
            })
            }
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
            <Input placeholder='???????????????' style={{width: 140}} onChange={(e) => {
              setKeyword(e.target.value)
            }}/>,
            ...dom,
           ,
          ],
        }}
        rowSelection={{
          // ????????????????????????: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
          // ??????????????????????????????????????????
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
              }}  >????????????</a>
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
              >????????????</a>
              <a
                onClick={async () => {
                  Modal.confirm({
                    title: '??????',
                    content: '???????????????????????????????????????????????????',
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
              >????????????</a>
            </Space>
          );
        }}
        options={false}
        tableExtraRender={() => <span style={{color: '#858585', fontSize: 18, padding: '0 30px'}}>????????????: {tableRef.current?.pageInfo?.total}</span>}
      />
      </div>
    </div>
  );
}

export default Product;
