import React from 'react';
import styles from './index.module.less';
import { Button } from 'antd'
import { useHistory } from 'umi';
function NewsItemDetail({item}: {item: any}) {
  const { title,publishTime,headUrl } = item
  const history = useHistory()
  return (
    <div className={styles['item-wrap']}>
      <img src={headUrl} alt="" style={{width: 238, height: 165}} />
      <div className="rg">
        <div className="tit">{title}</div>
        <div className="time">{publishTime}</div>
        <div className="text">在各方共同努力下，第三届中国国际进口博览会开幕了！首先，我代表中国政府和中国人民，并以我个人的名义，向各位嘉宾，表示热烈的欢迎！对各位新老朋友，表示诚挚的问候！</div>
        <Button type='ghost' className='detail' onClick={() => {history.push('/news/detail?id=' + item.id)}}>查看详情</Button>
      </div>
    </div>
  );
}

export default NewsItemDetail;
