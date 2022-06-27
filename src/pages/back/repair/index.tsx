import React from 'react';
import styles from './index.module.less';
import {Button, Pagination} from 'antd'
function Repair() {
  return (
   <div className='content'>
     <div className={styles['repair-wrap']}>
      <div className="tit">
        <span style={{background: 'white', paddingRight: 10}}>维修管理</span>
      </div>
      <table >
        <thead>
          <tr>
            <td>需求ID</td>
            <td>品牌</td>
            <td>型号</td>
            <td>问题描述</td>
            <td>照片</td>
            <td>名字</td>
            <td>城市</td>
            <td>手机号</td>
            <td>状态</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
         {
          new Array(5).fill(1).map(i =>  <tr>
            <td>1111</td>
            <td>1111</td>
            <td>1111</td>
            <td>1111</td>
            <td><img style={{width: 80, height: 80}}/></td>
            <td>1111</td>
            <td>1111</td>
            <td>1111</td>
            <td>1111</td>
            <td><Button type={'link'}>接单</Button></td>
          </tr>)
         }
        </tbody>
      </table>
         <div className='page-wrap'>
         <Pagination 
         showQuickJumper
      onChange={(num: number, size) => {
        
       }} current={1} defaultCurrent={1} total={40}/>
         </div>
    </div>
   </div>
  );
}

export default Repair;
