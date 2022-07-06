import React from 'react';
import {Image } from 'antd';
import styles from './index.module.less';
function DeviceItem({item}: { item: any }) {
  return (
    <div className={styles['item-wrap']}>
      <div className={styles['img-wrap']}>
        <img
          width={220}
          height={225}
          src={'/lease-center/' + item.mainImgPath}
        />
      </div>
      <div className="line">
        <div className="lf">设备名称</div>
        <div className="rg">{item.equipName}</div>
      </div>
      <div className="line">
        <div className="lf">设备地区</div>
        <div className="rg">{item.releaseCityName}</div>
      </div>
      <div className="line">
        <div className="lf">设备价格</div>
        <div className="rg">{item.salePrice}</div>
      </div>
   </div>
  );
}

export default DeviceItem;
