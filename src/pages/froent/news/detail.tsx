import React from 'react';
import { Breadcrumb, Pagination } from 'antd';
import styles from './index.module.less';
import {
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons'
import Bread from '@/components/Bread';
import { Link } from 'umi';
function Detail() {
  return (
    <div className='content' style={{background: 'white', margin: '30px auto 20px auto', textAlign:'center'}}>
      <Bread breads={['新闻要素', '新闻详情']}/>
      <h1>找冷链战略合作中国重汽 开辟用户服务新模式</h1>
      <div className="time">发布时间：2020/07/03</div>
      <div className={styles['prev-next']}>
        <div className="lf"><LeftOutlined />上一篇</div>
        <Link to="/news">返回列表</Link>
        <div className="rg">下一篇<RightOutlined /></div>
      </div>
    </div>
  );
}

export default Detail;
