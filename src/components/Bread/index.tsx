import React from 'react';
import { Breadcrumb } from 'antd';

function Bread({ breads }: {breads: Array<React.ReactNode>}) {
  return (
      <Breadcrumb style={{marginBottom: 20}}>
        <Breadcrumb.Item>当前位置</Breadcrumb.Item>
        { breads.map(i => <Breadcrumb.Item>{i}</Breadcrumb.Item>) }
      </Breadcrumb>
  );
}

export default Bread;
