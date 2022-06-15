import React, { useState } from 'react';
import styles from './index.module.less';
import { Row, Col, Button, Pagination } from 'antd'
function Course() {
  const [curDevice, setCurDevice] = useState('all')
  return (
    <div className='content'>

     <div className={styles['search']}>
      <div className={styles.line}>
        <div className="lf">培训类别</div>
        <Row className="rg" gutter={[20, 15]}>
          <Col><Button  size='small' type={curDevice === 'all' ? 'primary' : 'text'}>全部</Button></Col>
          <Col><Button  size='small' type="text">继续教育</Button></Col>
          <Col><Button  size='small' type="text">岗前培训</Button></Col>
        </Row>
      </div>
     </div>

    <div className={styles['course-wrap']}>
        {
          new Array(8).fill(1).map(i => <div style={{display: 'inline-block', width: '50%', marginTop: 25}}>
            <div className='item' >
            <img src="/images/repair-bg.png" style={{width: 248, height: 166}} />
            <div className="rg">
              <div className="tit">深度机器学习辅导Kaggle1对1指导pytorch培训课程python数据分析 </div>
              <div className="stit">合肥安弘工程设备租赁有限公司</div>
              <div className="add">福州市</div>
              <div className="price">￥16500元</div>
            </div>
          </div>
          </div>)
        }
    </div>

     <div style={{margin: '40px auto 60px auto', textAlign: 'center'}}>
       <Pagination showQuickJumper defaultCurrent={2} total={500}  />
       </div>
    </div>
  );
}

export default Course;
