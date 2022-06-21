import React, { useEffect, useState } from 'react';
import { Breadcrumb, message } from 'antd';
import styles from './index.module.less';
import {
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons'
import Bread from '@/components/Bread';
import { Link, useLocation, useHistory } from 'umi';
import { appNewItem, getNextOrprev } from '@/server/news';
function Detail() {
  const { query } = useLocation() as any
  const [newItem, setNewItem] = useState<any>({})
  const history = useHistory()
  useEffect(() => {
    (async () => {
      const res = await appNewItem(query.id)
      if(res.code ==='0') {
        setNewItem(res.data)
      }
    })()
  }, [query.id])
  return (
    <div className='content' style={{background: 'white', margin: '30px auto 20px auto', textAlign:'center'}}>
      <Bread breads={['新闻要素', '新闻详情']}/>
      <h1>{newItem.title}</h1>
      <div className="time">发布时间：{newItem.publishTime}</div>
      <div dangerouslySetInnerHTML={{__html: newItem.content}} style={{textAlign:'left', padding: 50}}>
      </div>
      <div className={styles['prev-next']}>
        <div className="lf" style={{cursor: 'pointer'}} onClick={async () => {
          const res = await getNextOrprev('s', newItem.id)
          if(res.code === '0') {
            if(res.data) {
            setNewItem(res.data)
            }else{
              message.info('没有了!')
            }
          }
        }}><LeftOutlined />上一篇</div>
        <Link to="/news">返回列表</Link>
        <div className="rg" style={{cursor: 'pointer'}} onClick={async () => {
          const res = await getNextOrprev('x', newItem.id)
          if(res.code === '0') {
            if(res.data) {
              setNewItem(res.data)
              }else{
                message.info('没有了!')
            }
          }
        }}>下一篇<RightOutlined /></div>
      </div>
    </div>
  );
}

export default Detail;
