import Bread from '@/components/Bread';
import React, { useState } from 'react';
import { useLocation } from 'umi';
import { Descriptions, Button, Tabs } from 'antd';
import styles from './index.module.less';
const { TabPane } = Tabs
function ProductDetail() {
  const location = useLocation() as any
  const id = location.query.id
  const [productInfo, setProduct] = useState<any>({})
  return (
    <div className='content' style={{marginTop: 20}}>
      <Bread breads={['全部设备', '挖掘机', '商品详情']}/>
      <div className={styles.line1}>
        <div className="lf">
          <img src="/images/gqpx.png" alt="" style={{width: '100%', height: 300}}/>
          <div className="subs">
            <img src="" alt="" />
          </div>
        </div>
        <div className="rg">
          <div className="tit">福建省福州市鼓楼区挖掘机设备出租</div>
          <div className="part1">
            租金:<span className='price'>¥165000 /元</span>/月
          </div>
          <Descriptions column={1} contentStyle={{color: '#333', fontSize: 15}}  labelStyle={{width: 105, color: '#666666', fontSize: 15}}>
            <Descriptions.Item label="地区">Zhou Maomao</Descriptions.Item>
            <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
            <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
            <Descriptions.Item label="Remark">empty</Descriptions.Item>
          </Descriptions>
          <div className="actions">
            <Button type={'primary'} color="#FF4302" size='large' style={{width: 190, height: 44}}>立即订购</Button>
            <Button size='large' color="#FF4302" style={{marginLeft: 38,width: 190, height: 44}}>加入购物车</Button>
          </div>
        </div>
      </div>

    <div className={styles.line2}>
      <div className="lf">
        <div className="tit">商家</div>
        <img src="" alt="" />xxx
        <div className="person">
          <div className="label">顺丰认证:</div>
          <div className="label">经营摩好:xxx</div>
        </div>
        <div className="other">商家还在供应</div>
        <img />
        <div className="ot-tit">
          福建省福走势
        </div>
        <div className="price">
          ¥153414元 /月
        </div>
      </div>
      <div className="rg">
      <Tabs type="card">
      <TabPane tab="产品详情" key="1">
        <p>Content of Tab Pane 1</p>
        <p>Content of Tab Pane 1</p>
        <p>Content of Tab Pane 1</p>
      </TabPane>
      <TabPane tab="注意事项" key="2">
        <p>Content of Tab Pane 2</p>
        <p>Content of Tab Pane 2</p>
        <p>Content of Tab Pane 2</p>
      </TabPane>
      </Tabs>
      </div>
    </div>

    </div>
  );
}

export default ProductDetail;
