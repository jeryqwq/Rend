import React from 'react';
import styles from './index.module.less';
function News({ index, item }: {index: number, item: any}) {
  return (
    <div className={styles['item-wrap']} style={{flexDirection: index % 2 === 0 ? 'column' : 'column-reverse'}}>
      <img src={item.headUrl} height={200} width='100%'/>
      <div className={`item ${ index % 2 === 1 && 'sty2'  }`} >
        <p className='tit'>{item.title}</p>
        <p className='stit'>{item.summary}</p>
      </div>
    </div>
  );
}

export default News;
