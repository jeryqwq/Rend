import { commonRequest } from '@/server/common';
import { ActionType, ProTable } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import {Button, message, Modal, Descriptions} from 'antd'

function MyRepair() {
  const tableRef = useRef<ActionType>()

  return (
    <div>
      <ProTable 
        search={false}
        actionRef={tableRef}
        columns={[
          {
            dataIndex: 'id',
            title: '需求ID',
            ellipsis: true,   
            copyable: true,
            hideInSearch: true
          },
          {
            dataIndex: 'equipModel',
            title: '型号',
            hideInSearch: true
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
            hideInSearch: true,
            width: 100
          }, {
            dataIndex: 'releaseCityName',
            title: '城市',
            hideInSearch: true
          }, 
          {
            dataIndex: 'status',
            title: '状态',
            hideInSearch: true,
            render(text){
              return <span>{ text === 0 ? '进行中': text === '10' ? '已完成' : '进行中' }</span>
            }
          },
          {
            dataIndex: 'takeUsers',
            title: '维修商家',
            hideInSearch: true,
          },
          {
            dataIndex: 'id',
            title: '操作',
            hideInSearch: true,
            render(text, i){
              return <>
                <Button type='link' onClick={async () => {
                  const res = await commonRequest(`/equipmentRepairInfo/${text}`, { method: 'delete' })
                  if(res.code === '0') {
                    message.success('取消成功!')
                    tableRef.current?.reload()
                  }
                }}>取消</Button>
                <Button type='link' onClick={() => {
                  Modal.confirm({
                    width: 700,
                    title: '维修详情',
                    content: <Descriptions column={2}>
                    <Descriptions.Item label="联系人">{i.contactName}</Descriptions.Item>
                    <Descriptions.Item label="联系电话">{i.contactNumber}</Descriptions.Item>
                    <Descriptions.Item label="创建时间">{i.createDate}</Descriptions.Item>
                    <Descriptions.Item label="品牌">{i.equipBrand}</Descriptions.Item>
                    <Descriptions.Item label="型号">
                     {i.equipModel}
                    </Descriptions.Item>
                    <Descriptions.Item label="图片"><img style={{width: 200}} src={'/lease-center/' + i.mainImgPath}/></Descriptions.Item>
                    <Descriptions.Item label="公司名称">{i.organName}</Descriptions.Item>
                    <Descriptions.Item label="描述">{i.problemDesc}</Descriptions.Item>
                    <Descriptions.Item label="城市">{i.releaseCityName}</Descriptions.Item>

                  </Descriptions>
                  })
                }}>查看</Button>
              </>
            }
          },
        ]}
        pagination={{
          pageSize: 10
        }}
        request={async ({pageSize, current, ...others}) => {
          const res = await commonRequest('/equipmentRepairInfo/pageMySend', { method: 'post', data: {
            size: pageSize,
            current,

          }})
          if(res.code === '0') {
            return {
              size: pageSize,
              data: res.data.records,
              total: res.data.total
            }
          }
          return  {

          }
        }}
      />
    </div>
  );
}

export default MyRepair;
