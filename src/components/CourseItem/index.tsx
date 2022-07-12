import React from 'react';
import { useHistory } from 'umi';
import styles from './index.module.less';
function CourseItem({item}: {item: any}) {
  const history = useHistory()

  return (
    <div className={styles['item-wrap']} style={{cursor: 'pointer'}} onClick={() => {
      history.push('/courseDetail?id=' + item.id)
    }}>
      <img src={'/lease-center/' + item.mainImgPath}style={{width: 386, height: 140}}/>
      <div className="tit">{item.courseName}    <span className="stit">{item.courseTypeText}</span></div>
      <div className="text">{item.description}</div>
    </div>
  );
}

export default CourseItem;
