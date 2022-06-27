import Bread from '@/components/Bread';
import React from 'react';
import { Checkbox, InputNumber, Button } from 'antd';
import styles from './index.module.less';
function ShopCar() {
  return (
    <div className='content' style={{paddingTop: 20}}>
      <Bread breads={['我的购物车']} />
      <table style={{width: '100%', fontSize: 16, color: '#333'}} className={styles.tableWrap}>
        <thead style={{background: '#F2F2F2',border: '1px solid #DCDCDC', height: 60, textAlign: 'center'}}>
          <tr>
            <td style={{width: 100}}><Checkbox onChange={() => {}}>全选</Checkbox></td>
            <td style={{width: 420}}>商品信息</td>
            <td style={{width: 130}}>单价</td>
            <td style={{width: 120}}>数量</td>
            <td style={{width: 170}}>小记</td>
            <td style={{width: 170}}>操作</td>
          </tr>
        </thead>
        <tbody style={{lineHeight: '60px'}}>
          <tr  style={{width: 100, textAlign: 'center'}}>
            <td row-gap={6}><Checkbox onChange={() => {}}>商家</Checkbox></td>
          </tr>
          <tr className='prods_cont'>
            <td  className='checkbox1'><Checkbox style={{marginLeft: 25}}  onChange={() => {}}></Checkbox></td>
            <td>
              <div className='product-info'>
                  <img src="" alt="" style={{width: 100, height: 100}}/>
                 <div>
                 <div>福建省福州市鼓楼区挖掘机设备出租</div>
                  <div>挖掘机  沃尔沃  LL222</div>
                 </div>
              </div>
            </td>
            <td>
            ￥5500.00
            </td>
            <td><InputNumber addonBefore="+" addonAfter="$" defaultValue={100} /></td>
            <td>￥5500.00</td>
            <td><Button type='text'>移入收藏夹</Button> 
            <br/>
              <Button type='text'>删除</Button>
            </td>
          </tr>
        </tbody>
      
      </table>
      <div className={ styles.actions }>
       <div className="lf">
       <Checkbox style={{margin: '0 70px 0 20px'}}>全选</Checkbox>
        <span>删除</span>
        <span style={{margin: '0 100px 0 40px'}}>移入收藏夹</span>
        <span className="prices">
          <div>共 <span className='num' style={{fontSize: 16}}>6</span> 件商品， 以选择 <span className='num' style={{fontSize: 16}}>4</span> 件</div>
          <div>商品合计 : <span className='num'> ¥1245.00</span>   活动优惠 : <span className="num">
            -¥0.00</span></div>
        </span>
        <span style={{marginLeft: 50}}>应付总额: <span className='price-bg'>¥1245.00</span></span>
       </div>
        <span className="action">下单</span>
      </div>
      
      <div className={styles.line3}>
      <div className="tit">其他商家相关货品推荐</div>
      <div className="others">
        { 
          new Array(5).fill(1).map(i =>  <div className="item">
          <img src="" style={{width: 210, height: 185}} alt="" />
          <div className="itit">
          福建省福州市鼓楼区挖掘机设备出租
          </div>
          <div className="price">
            ¥153414元 <span style={{color: '#666666', fontSize: 13}}>/月</span>
          </div>
          <div className="add">
            地区： 福州市
          </div>
        </div>)
        }
      </div>
    </div>
    </div>
  );
}

export default ShopCar;
