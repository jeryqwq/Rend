import React from 'react';
import {Image } from 'antd';
import styles from './index.module.less';
function DeviceItem({item}: {item: any}) {
  return (
    <div className={styles['item-wrap']}>
      <div className={styles['img-wrap']}>
        <img
          width={210}
          height={185}
          src={'/lease-center/' + item.mainImgPath}
        />
        </div>
        <div className="line">
          <div className="lf"><span style={{color: '#D90B18', fontSize: 18}}>¥{item.price}</span> </div>
          <div className="rg">{item.releaseCityName}</div>
        </div>
      <div style={{textAlign: 'left'}}>{item.partsName}</div>
   </div>
  );
}

export default DeviceItem;
