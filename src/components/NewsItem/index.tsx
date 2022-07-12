import React from 'react';
import { useHistory } from 'umi';
import styles from './index.module.less';
function News({ index, item }: {index: number, item: any}) {
  const his = useHistory()
  return (
    <div className={styles['item-wrap']} 
    onClick={() => {
      his.push('/news/detail?id=' + item.id)
    }}
    style={{flexDirection: index % 2 === 0 ? 'column' : 'column-reverse', cursor: 'pointer'}} >
      <img src={item.headUrl} height={200} width='100%'/>
      <div className={`item ${ index % 2 === 1 && 'sty2'  }`} >
        <p className='tit'>{item.title}</p>
        <p className='stit'>{item.summary}</p>
      </div>
    </div>
  );
}

export default News;
