import React from 'react';
import { Breadcrumb, Pagination } from 'antd';
import styles from './index.module.less';
import NewsItemDetail from '@/components/NewsItemDetail';
import Bread from '@/components/Bread';
function News() {
  return (
    <div className='content' style={{background: 'white', margin: '30px auto 20px auto'}}>
       <Bread breads={['行业动态']}/>
      <div className={styles['news-wrao']}>
        { new Array(6).fill(1).map(i => <NewsItemDetail />) }
      </div>
      <div style={{margin: '40px auto 60px auto', textAlign: 'left'}}>
       <Pagination 
            showQuickJumper 
            defaultCurrent={2} 
            total={500}      
            showTotal={(total, range) => `第${range[0]}-${range[1]} 总共 ${total} 条`}
        />
       </div>
    </div>
  );
}

export default News;
