import React from 'react';
import styles from './index.module.less';
function Back() {
  return (
    <div style={{fontSize: 20}} className="content">
      <div className={styles.line1}>
        <div className="lf">
          <div className="card">
            <div className="item">
              <div>1173</div>
              <div className='label'>本周浏览量</div>
            </div>
            <div className="item">
              <div>1173</div>
              <div className='label'>本周浏览量</div>
            </div>
            <div className="item">
              <div>1173</div>
              <div className='label'>本周浏览量</div>
            </div>
            <div className="item">
              <div>1173</div>
              <div className='label'>本周浏览量</div>
            </div>
            <div className="item">
              <div>1173</div>
              <div className='label'>本周浏览量</div>
            </div>
          </div>
          <div className="order">
            <div className="tit">待处理</div>
            {
              new Array(6).fill(1).map(i => 
              <div className="item">
                <span className="type">维修订单</span>
                <span >系统分配的新维修订单</span>
                <div style={{fontSize: 14, color: '#666'}}>订单号： 1231231223113</div>
             </div>)
            }
          </div>
        </div>
        <div className="rg">
          <div className="comp">
            <div style={{display: 'flex'}}>
                <img src="" style={{width: 72, height: 72}} alt="" />
                <span style={{marginLeft: 10}}> <span className='compname'>福州xxx公司</span>
                <div className='label'>品牌商</div></span>
            </div>
            <div className="item-info">
              <span>店铺信用等级</span>
              <span><img src="" style={{width: 35,height: 35}} alt="" /></span>
            </div>
            <div className="item-info">
              <span>保证金</span>
              <span className='status'>已缴纳</span>
            </div>
            <div className="item-info">
              <span style={{fontSize: 24, fontWeight: 'bold'}}>平台通知</span>
              <span>更多</span>
            </div>
            <div className="item-info" style={{color: '#999'}}>
              <span >服务到期通知</span>
              <span >2020</span>
            </div>
            <div className="item-info" style={{color: '#010101',paddingBottom: 10, fontSize: 16, borderBottom: 'solid 1px #D1CFD2'}}>
             您订购的XXX服务已经到期
            </div>
            <div className="item-info" style={{color: '#999'}}>
              <span >服务到期通知</span>
              <span >2020</span>
            </div>
            <div className="item-info" style={{color: '#010101', fontSize: 16}}>
             您订购的XXX服务已经到期
            </div>
          </div>
        </div>
      </div>
      <img src="" style={{width: '100%', height: 250, margin: '30px 0 20px 0'}} alt="" />
      <div className={styles.line2}>
        <div className="item-info">
          <div className="tit">最新求租</div>
          <span style={{fontSize: 14}}>更多</span>
        </div>
        <div className="rows">
         {
          new Array(3).fill(1).map(i =>  <div className="item">
            {
               new Array(6).fill(1).map(i => <div className="item-info">
               <span>xxxx求租</span>
               <span style={{color: '#999'}}>[4-01]</span>
             </div>)
            }
          
        </div>)
         }
        </div>
      </div>

      <div className={styles.line2}>
        <div className="item-info">
          <div className="tit">最新求购</div>
          <span style={{fontSize: 14}}>更多</span>
        </div>
        <div className="rows">
         {
          new Array(3).fill(1).map(i =><div className="item">
            {
               new Array(6).fill(1).map(i => <div className="item-info">
               <span>xxxx求租</span>
               <span style={{color: '#999'}}>[4-01]</span>
             </div>)
            }
        </div>)
         }
        </div>
      </div>

    </div>
  );
}

export default Back;
