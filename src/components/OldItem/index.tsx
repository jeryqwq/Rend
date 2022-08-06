import React from 'react';
import {Image } from 'antd';
import styles from './index.module.less';
import { useHistory } from 'umi';
function DeviceItem({item}: { item: any }) {
  const history = useHistory()
  return (
    <div className={styles['item-wrap']} style={{cursor: 'pointer'}}>
      <div className={styles['img-wrap']} onClick={() => {
        history.push('/productDetail?id=' + item.id)
      }}>
        <img
          width={220}
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
