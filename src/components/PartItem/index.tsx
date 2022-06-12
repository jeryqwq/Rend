import React from 'react';
import {Image } from 'antd';
import styles from './index.module.less';
function DeviceItem() {
  return (
    <div className={styles['item-wrap']}>
      <div className={styles['img-wrap']}>
        <img
          width={210}
          height={185}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
        </div>
        <div className="line">
          <div className="lf"><span style={{color: '#D90B18', fontSize: 18}}>¥9000</span> </div>
          <div className="rg">福州市</div>
        </div>
      <div style={{textAlign: 'left'}}>久保田15洋马30玉柴徐工立派犀
牛小微挖掘机橡胶履带链条皮带</div>
   </div>
  );
}

export default DeviceItem;
