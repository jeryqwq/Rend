import React from 'react';
import styles from './index.module.less';
import { Button } from 'antd'
import { useHistory } from 'umi';
function NewsItemDetail({item}: {item: any}) {
  const { title,publishTime,headUrl, summary } = item
  const history = useHistory()
  return (
    <div className={styles['item-wrap']}>
      <img src={'/lease-center/' + item.headUrl} style={{height: 200, width: 350, marginRight: 10}}/>
      <div className="rg">
        <div className="tit">{title}</div>
        <div className="time">{publishTime}</div>
        <div className="text" title={summary}>{summary}</div>
        <Button type='ghost' className='detail' onClick={() => {history.push('/news/detail?id=' + item.id)}}>查看详情</Button>
      </div>
    </div>
  );
}

export default NewsItemDetail;
