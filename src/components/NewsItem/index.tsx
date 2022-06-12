import React from 'react';
import styles from './index.module.less';
function News({ index }: {index: number}) {
  return (
    <div className={styles['item-wrap']} style={{flexDirection: index % 2 === 0 ? 'column' : 'column-reverse'}}>
      <img src="/images/gqpx.png" height={200} width='100%'/>
      <div className={`item ${ index % 2 === 1 && 'sty2'  }`} >
        <p className='tit'>工程机械竞争优势进一步增强</p>
        <p className='stit'>习近平总书记指出，一个国家一定要有正确的战略选择，
我国是个大国，必须发展实体经济，</p>
      </div>
    </div>
  );
}

export default News;
