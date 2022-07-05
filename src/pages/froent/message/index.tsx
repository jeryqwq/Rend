import { commonRequest } from '@/server/common';
import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import { Pagination } from 'antd'
function Message() {
  const [list, setList] = useState<any[]>()
  const [params, setParams] = useState({
    size: 8,
    current: 0
  })
  const [total, setTotal] = useState(0)
  useEffect(() => {
    (async() => {
      const res = commonRequest('/appnotice/page', {
        method: 'post',
        data:{
          ...params
        }
      })
      if(res.code === '0') {
        setList(res.data.records)
        setTotal(res.data.total)
      }
    })()
  },[])
  return (
    <div className={styles['msg-wrap']}>
     {
      list?.map(i =>  <div className="item">
      <div className="tit">
        <span> <img src="/images/rang.png" alt="" style={{marginRight: 10}} />系统通知</span>
        <span style={{color: '#999'}}>{i.sendTime	}</span>
      </div>
      <div className="stit">{i.serviceType}</div>
      <div className="txt">{i.msg	}</div>
    </div>)
     }
      <Pagination pageSize={params.size} current={params.current} 
      total={total}
      onChange={(page,size) => {
        setParams({
          size,
          current: page
        })
      }}/>
    </div>
  );
}

export default Message;
