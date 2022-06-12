import React from 'react';
import {Image } from 'antd';
import styles from './index.module.less';
function DeviceItem() {
  return (
    <div className={styles['item-wrap']}>
      <div className={styles['img-wrap']}>
        <img
          width={220}
          height={225}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </div>
      <div className="line">
        <div className="lf">设备型号</div>
        <div className="rg">FRX22221</div>
      </div>
      <div className="line">
        <div className="lf">设备型号</div>
        <div className="rg">FRX22221</div>
      </div>
      <div className="line">
        <div className="lf">设备型号</div>
        <div className="rg">FRX22221</div>
      </div>
   </div>
  );
}

export default DeviceItem;
