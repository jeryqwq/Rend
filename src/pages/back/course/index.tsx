import { ProTable } from '@ant-design/pro-components';
import React from 'react';
import { Button,Input, Table, Space } from 'antd'
import styles from './index.module.less';
function Product() {
  return (
    <div className='content' >
      <div className={styles.wrap}>
      <div className="tit">
        <span style={{background: 'white', paddingRight: 10}}>培训管理</span>
      </div>
      <ProTable
        request={async () => {
          return {
            total: 10,
            data: new Array(8).fill(1).map(i => ({})),
            size: 8,
          }
        }}
        columns={[
          {
            title: '商品ID',
            dataIndex: 'id',
            hideInSearch: true
          },
          {
            title: '商品标题',
            dataIndex: 'id',
            hideInSearch: true

          },
          {
            title: '设备类型',
            dataIndex: 'id'
          },
          {
            title: '设备型号',
            dataIndex: 'id'
          },
          {
            title: '缩略图',
            dataIndex: 'id',
            hideInSearch: true
          }, {
            title: '所在地',
            dataIndex: 'id',
            hideInSearch: true

          }, {
            title: '租金',
            dataIndex: 'id',
            hideInSearch: true

          },
          {
            title: '状态',
            dataIndex: 'id',
          },
          {
            title: '操作',
            dataIndex: 'id',
            hideInSearch: true,
            renderText(text, record, index, action) {
              return <>
              <Button type='link'>上架</Button>
              <br />
              <Button type='link'>修改</Button>
              <br />

              <Button type='link'>预览</Button>
              </>
            },
          },
        ]}
        search={{
          optionRender: (searchConfig, formProps, dom) => [
            <Input placeholder='编号或商品名查询' style={{width: 140}}/>,
            ...dom,
           ,
          ],
        }}
        rowSelection={{
          // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
          // 注释该行则默认不显示下拉选项
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          // defaultSelectedRowKeys: [1],
        }}
        tableAlertOptionRender={() => {
          return (
            <Space size={16}>
              <a>批量上架</a>
              <a>批量下架</a>
              <a>批量删除</a>
              <a>新增商品</a>
            </Space>
          );
        }}
        options={false}
        tableExtraRender={() => <span style={{color: '#858585', fontSize: 18, padding: '0 30px'}}>商品总数: 50   已上架: 40   已下架: 10</span>}
      />
      </div>
    </div>
  );
}

export default Product;
