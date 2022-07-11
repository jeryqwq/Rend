import React from 'react';
import styles from './index.module.less';
function CourseItem({item}: {item: any}) {
  return (
    <div className={styles['item-wrap']}>
      <img src={'/lease-center/' + item.mainImgPath}style={{width: 386, height: 140}}/>
      <div className="tit">{item.courseName}    <span className="stit">{item.courseTypeText}</span></div>
      <div className="text">{item.description}</div>
    </div>
  );
}

export default CourseItem;
