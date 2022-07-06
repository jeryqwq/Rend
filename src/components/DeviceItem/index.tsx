import React from 'react';
import {Button } from 'antd';
import styles from './index.module.less';
function DeviceItem({ width, height, item }: { width?: number, height?: number, item: any }) {
  return (
    <div className={`${styles['item-wrap']}`}>
      <div className={`${styles['img-wrap']}`}>
        <img
          width={width || 220}
          height={  height }
          src={'/lease-center/' + item.mainImgPath}
        />
        </div>
        <div className="line">
          <div className="lf"><span style={{color: '#D90B18', fontSize: 18}}>¥{item.monthlyRent}</span> /月</div>
          <div className="rg">{item.releaseCityName}</div>
        </div>
      <div style={{textAlign: 'left'}}>{item.equipName}</div>
   </div>
  );
}

export default DeviceItem;
