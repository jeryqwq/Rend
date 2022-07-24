import React from 'react';
import { Breadcrumb } from 'antd';
import { useHistory } from 'umi';

const locMap = {
  '二手设备': '/sallList',
  '全部设备': '/allDevice',
  '新机出售': '/newDevice',
  '设备出租': '/rentList'
}

function Bread({ breads }: {breads: Array<React.ReactNode>}) {
  const history = useHistory()
  return (
      <Breadcrumb style={{marginBottom: 20}}>
        <Breadcrumb.Item>当前位置</Breadcrumb.Item>
        { breads.map(i => <Breadcrumb.Item key={i} style={{cursor:'pointer'}} onClick={() => {
          locMap[i] && history.push(locMap[i] )
        }}>{i}</Breadcrumb.Item>) }
      </Breadcrumb>
  );
}

export default Bread;
