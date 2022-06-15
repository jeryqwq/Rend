import React from 'react';
import {Button } from 'antd';
import styles from './index.module.less';
function DeviceItem({ width, height }: { width?: number, height?: number }) {
  return (
    <div className={`${styles['item-wrap']}`}>
      <div className={`${styles['img-wrap']}`}>
        <img
          width={width || 220}
          height={  height }
          src="/images/repair-bg.png"
        />
        </div>
        <div className="line">
          <div className="lf"><span style={{color: '#D90B18', fontSize: 18}}>¥9000</span> /月</div>
          <div className="rg">福州市</div>
        </div>
      <div style={{textAlign: 'left'}}>出租挖掘机</div>
   </div>
  );
}

export default DeviceItem;
