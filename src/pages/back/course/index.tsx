import { ActionType, ProTable } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import { Button,Input, Table, Space, Modal } from 'antd'
import {EditOutlined} from '@ant-design/icons';
import styles from './index.module.less';
import { useHistory } from 'umi';
import { commonRequest } from '@/server/common';
function Product() {
  const history = useHistory()
  const [courseType, setType] = useState<any>({});
  const tableRef = useRef<ActionType>()
  const [keyword, setKeyword] = useState('')
  useEffect(() => {
    (async() => {
      const res = await commonRequest('/appdict/kcpxlx', { method: 'get' })
      if(res.code === '0') {
        let _data:any = {}
        res.data?.forEach((i:any) => {
          _data[i.code] = i.name
        })
        setType(_data)
      }
    })()
  }, [])
  return (
    <div className='content' >
      <div className={styles.wrap}>
      <div className="tit">
        <span style={{background: 'white', paddingRight: 10}}>培训管理</span>
      <Button size='large' 
      onClick={() => {
        history.push('/addCourse')
      }}
      type='primary' style={{float: 'right', marginTop: 10}}>新增</Button>
      </div>
      <ProTable
        actionRef={tableRef}
        request={async ({pageSize, current, ...others}) => {
          let conditions = []
          others?.status!==undefined && conditions.push({
            column: 'status',
            operator: 'eq',
            value: others?.status
          })
          others?.courseTypeText!==undefined && conditions.push({
            column: 'course_type',
            operator: 'eq',
            value: others?.courseTypeText
          })
          keyword &&  conditions.push({
            column:'course_name',
            operator: 'like',
            value: keyword
          })
          const res2 = await commonRequest('/trainingCourse/pageMy', { method: 'post',
          data: {
            size: pageSize,
            current,
            conditions
          },})
          if(res2.code !== '0') {
            return {}
          }
          return {
            total: res2.data.total,
            data: res2.data.records,
            size: pageSize,
          }
        }}
        columns={[
          {
            title: '课程ID',
            dataIndex: 'id',
            hideInSearch: true,
            copyable: true
          },
          {
            title: '课程标题',
            dataIndex: 'courseName',
            hideInSearch: true
          },
          {
            title: '课程类型',
            dataIndex: 'courseTypeText',
            valueEnum:courseType
          },
          {
          title: '缩略图',
          dataIndex: 'mainImgPath',
          hideInSearch: true,
          render(text){
            return <img src={'/lease-center/' + text} alt="" style={{width: 80,height:80 }} />
          }
         },
          {
            title: '发布地区',
            dataIndex: 'releaseCityName',
            hideInSearch: true
          }, {
            title: '价格',
            dataIndex: 'price',
            hideInSearch: true
          },
          {
            title: '状态',
            dataIndex: 'status',
            valueEnum:{
              '0': '上架',
              '1': '下架'
            }
          },
          {
            title: '是否推荐',
            dataIndex: 'isRecomm',
            valueEnum: {
              '1': '是',
              '0': '否'
            },
            hideInSearch: true
          },
          {
            title: '操作',
            dataIndex: 'id',
            hideInSearch: true,
            renderText(text, record, index, action) {
              return <>
              <Button type='link' onClick={async () => {
               const res = await commonRequest('/trainingCourse/batchShelf', {
                method: 'put',
                data: {
                  ids: [record.id],
                 status: record.status === 0 ? -1 : 0
                }
               })
               if(res.code === '0') {
                tableRef.current?.reload()
               }
              }}>{ record.status === 0 ? '下架' : '上架' }</Button>
              <br />
              <Button type='link' onClick={async () => {
               const res = await commonRequest('/trainingCourse/batchRecommed', {
                method: 'put',
                data: {
                  ids: [record.id],
                 status: record.isRecomm === 0 ? 1 : 0
                }
               })
               if(res.code === '0') {
                tableRef.current?.reload()
               }
              }}>{ record.isRecomm === 0 ? '推荐' : '非推荐' }</Button>
              <br />
              <Button type='link'
                onClick={() => {
                  history.push({
                    pathname: '/addCourse',
                    state: record
                  })
                }}
              >修改</Button>
              <br/>
              <Button type='link' onClick={() => {
                history.push(`/courseDetail?id=${record.id}`)
              }}>预览</Button>
              </>
            },
          },
        ]}
        search={{
          optionRender: (searchConfig, formProps, dom) => [
            <Input placeholder='商品名查询' style={{width: 140}} onChange={(e) => {
              setKeyword(e.target.value)
            }}/>,
            ...dom,
           ,
          ],
        }}
        rowKey="id"
        rowSelection={{
          // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
          // 注释该行则默认不显示下拉选项
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        }}
        tableAlertOptionRender={({selectedRowKeys}) => {
          return (
            <Space size={16}>
              <a onClick={async () => {
                const res = await commonRequest('/trainingCourse/batchShelf', {
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
                const res = await commonRequest('/trainingCourse/batchShelf', {
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
                  const res = await commonRequest('/trainingCourse/batchRecommed', {
                    method: 'put',
                    data: {
                      ids: selectedRowKeys,
                     status: 1
                    }
                   })
                   if(res.code === '0') {
                    tableRef.current?.reload()
                   }
                }}
              >批量推荐</a>
               <a
                onClick={async () => {
                  const res = await commonRequest('/trainingCourse/batchRecommed', {
                    method: 'put',
                    data: {
                      ids: selectedRowKeys,
                     status: 0
                    }
                   })
                   if(res.code === '0') {
                    tableRef.current?.reload()
                   }
                }}
              >批量非推荐</a>
              <a
                onClick={async () => {
                  Modal.confirm({
                    title: '提示',
                    content: '该操作会删除选中的数据，是否继续？',
                    onOk: async() => {
                      const res = await commonRequest('/trainingCourse', {
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
