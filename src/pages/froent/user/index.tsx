import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import { Button, Modal, message } from 'antd'
import { commonRequest } from '@/server/common';
import useUserInfo from '@/hooks/useLogin';
import { useHistory } from 'umi';
import { orderStatus } from '@/constants/var';

function User() {
  const {user} = useUserInfo()
  const userInfo  = user.user
  const [orders, setOrder] = useState([])
  const [total, setTotal] = useState(0)
  const history = useHistory()
  useEffect(() => {
    reload()
  }, [])
  const reload = async () => {
    const res = await commonRequest('/mallOrderMaster/pageMy', {
      method: 'post',
      data:{
        "current": 0,
        size: 99999
      }
    })
    if(res.code === '0') {
      setOrder(res.data.records)
      setTotal(res.data.total)
    }
  }
  return (
    <div className={styles['user-wrap']}>
      <div className="line1">
        <img src="" style={{width: 80, height: 80, borderRadius: '50%', marginLeft: 20}} alt="" />
        <div className="center">
          <div className="tit">{userInfo.name}</div>
          <div className="auth">品牌商认证</div>
        </div>
        <div className="rg">
          <div className="item">
            <div>关注供应商</div>
            <div className='num'>4</div>
          </div>
          <div className="item">
            <div>收藏</div>
            <div className='num'>4</div>
          </div>
          <div className="item">
            <div>优惠券</div>
            <div className='num'>4</div>
          </div>
        </div>
      </div>
      {/* <div className="line2"></div> */}
      <div className="line3">
        <div className="tit">我的订单</div>
        <div className="order">
          {
            orders.map((i:any) => <div className="item">
            <img src={'/lease-center/' + i?.details[0]?.mainImgPath} style={{width: 100, height: 100}} alt="" />
            <div style={{width: 300}}>
              <div>{i.receiveUser}</div>
              <div>{i.address}</div>
            </div>
            <div className="status">{orderStatus[i.orderStatus as 10]}</div>
            <div className="price">¥{i.orderMoney}</div>
            <div className="action">
              {/* <Button style={{background: '#FE2525', border: 'none'}} type="primary">xxxx</Button> */}
              <Button type={'text'} onClick={() => history.push(`/userCenter/order?id=${i.id}`)}>查看订单</Button>
              <br/>
              <Button type={'text'} onClick={() => {
                Modal.confirm({
                  title: '是否删除该订单?',
                  onOk: async () =>{
                    const res = await commonRequest('/mallOrderMaster', {
                      method: 'delete',
                      data: {
                        ids: [i.id]
                      }
                    })
                    if(res.code === '0') {
                      message.success('取消成功！')
                      reload()
                    }
                  }
                }) 

              }}>取消订单</Button>
            </div>
          </div>)
          }
        </div>
      </div>
    </div>
  );
}

export default User;
