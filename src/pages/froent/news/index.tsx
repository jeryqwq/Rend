import React, { useEffect, useState } from 'react';
import { Breadcrumb, Pagination } from 'antd';
import styles from './index.module.less';
import NewsItemDetail from '@/components/NewsItemDetail';
import Bread from '@/components/Bread';
import { appNewsPage } from '@/server/news';
function News() {
  const [news, setNews] = useState([])
  const [total, setTotal] = useState(0)
  const [pageInfo, setPage] = useState({
    size: 8,
    current: 0
  })
  useEffect(() => {
    (async () => {
      const res = await appNewsPage(pageInfo)
      if(res.code === '0') {
        setNews(res.data.records)
        setTotal(res.data.total)
      }
    })()
  }, [pageInfo])
  return (
    <div className='content' style={{background: 'white', margin: '30px auto 20px auto'}}>
       <Bread breads={['行业动态']}/>
      <div className={styles['news-wrao']}>
        { news.map((i: any) => <div key={i.id}><NewsItemDetail item={i} /></div>) }
      </div>
      <div style={{margin: '40px auto 60px auto', textAlign: 'left'}}>
       <Pagination
            showQuickJumper
            defaultCurrent={pageInfo.current} 
            total={total}      
            onChange={(page,size) => {
              setPage({
                ...pageInfo,
                size,
                current: page
              })
            }}
            showTotal={(total, range) => `第${range[0]}-${range[1]} 总共 ${total} 条`}
        />
       </div>
    </div>
  );
}

export default News;
