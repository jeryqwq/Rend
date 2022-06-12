import React from 'react';
import styles from './index.module.less';
function CourseItem() {
  return (
    <div className={styles['item-wrap']}>
      <img src='/images/gqpx.png' width={386}/>
      <div className="tit">八大员岗前培训    <span className="stit">面向施工现场专业人员培训</span></div>
      <div className="text">旅工员(土建、装防装修、没备安装、市政工程)
质量员(土建、装饰装体、设备安装、市政工程)
材料员、机械员、劳务员、资料员,标准员</div>
    </div>
  );
}

export default CourseItem;
