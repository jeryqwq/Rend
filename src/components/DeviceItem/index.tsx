import React from 'react';
import {Button } from 'antd';
import styles from './index.module.less';
import { useHistory } from 'umi';
function DeviceItem({ width, height, item }: { width?: number, height?: number, item: any }) {
  const history = useHistory()
  return (
    <div className={`${styles['item-wrap']}`}>
      <div className={`${styles['img-wrap']}`} onClick={() => {
        if(item.isNew === 1) {
          history.push('/newDetail?id=' + item.id + '&type=' + 'equipmentSale')
        }else if(item.isNew === 0) {
          history.push('/productDetail?id=' + item.id + '&type=' + 'equipmentSale')
        }else{
          history.push('/rentDetail?id=' + item.id + '&type=' + 'equipmentSale')
        }
      }}>
        <img
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
