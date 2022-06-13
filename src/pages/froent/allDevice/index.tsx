import React, { useState } from 'react';
import styles from './index.module.less';
import { Row, Col, Button, Pagination } from 'antd'
function AllDevice() {
  const [curDevice, setCurDevice] = useState('all')
  return (
    <div className='content'>

     <div className={styles['search']}>
      <div className={styles.line}>
        <div className="lf">设备</div>
        <Row className="rg" gutter={[20, 15]}>
          <Col><Button  size='small' type={curDevice === 'all' ? 'primary' : 'text'}>全部</Button></Col>
          <Col><Button  size='small' type="text">挖掘机</Button></Col>
          <Col><Button  size='small' type="text">装载机</Button></Col>
          <Col><Button  size='small' type="text">xxx设备</Button></Col>
        </Row>
      </div>

      <div className={styles.line}>
        <div className="lf">品牌</div>
        <Row className="rg" gutter={15}>
          <Col><Button  size='small' type={curDevice === 'all' ? 'primary' : 'text'}>全部</Button></Col>
          <Col><Button  size='small' type="text">挖掘机</Button></Col>
          <Col><Button  size='small' type="text">装载机</Button></Col>
          <Col><Button  size='small' type="text">xxx设备</Button></Col>
        </Row>
      </div>

      <div className={styles.line}>
        <div className="lf">地区</div>
        <Row className="rg" gutter={15}>
          <Col><Button  size='small' type={curDevice === 'all' ? 'primary' : 'text'}>全部</Button></Col>
          { new Array(20).fill(1).map(i => <Col style={{marginBottom: 10}}><Button  size='small' type="text">挖掘机</Button></Col>) }
        </Row>
      </div>
     </div>

      <div className={styles['devices']}>
        <div className={styles.lf}><Row gutter={10}>
        { new Array(12).fill(1).map(i => <Col style={{marginBottom: 5}}>
          <div className={`${styles['item-wrap']} ${ styles.hover }`}>
            <div className={`${styles['img-wrap']}`}>
              <img
                width={210}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
              </div>
              <div className="line">
                <div className="lf"><span style={{color: '#D90B18', fontSize: 18}}>¥9000</span> /月</div>
                <div className="rg">福州市</div>
              </div>
            <div style={{textAlign: 'left', margin: 10}}>出租挖掘机</div>
            <div className='comp'>合肥安弘工程设备租赁有限公司</div> 
            <Button type={'primary'} size='middle' style={{width: '100%'}} className={styles.detail}>查看详情</Button>
        </div>
        </Col>) }
      </Row></div>
      <div className={styles.rg}>
        <div className={styles.hotPrice}>特价推荐</div>
       {
         new Array(3).fill(1).map(() =>  <div className={`${styles['item-wrap']}`} style={{padding: 0, width: 220}}>
         <div className={`${styles['img-wrap']}`} style={{padding: 0}}>
           <img
             width={220}
             style={{height: 220}}
             src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
           />
           </div>
           <div className="line">
             <div className="lf"><span style={{color: '#D90B18', fontSize: 18}}>¥9000</span> /月</div>
             <div className="rg">福州市</div>
           </div>
         <div style={{textAlign: 'left',margin: '0 10px'}}>出租挖掘机</div>
     </div>)
       }
       
      </div>
      </div>

       <div style={{margin: '40px auto 60px auto', textAlign: 'center'}}>
       <Pagination showQuickJumper defaultCurrent={2} total={500}  />
       </div>
    </div>
  );
}

export default AllDevice;
