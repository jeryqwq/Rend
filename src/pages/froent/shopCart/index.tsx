import Bread from '@/components/Bread';
import React, { useEffect, useState } from 'react';
import { Checkbox, InputNumber, Button, message } from 'antd';
import styles from './index.module.less';
import { commonRequest } from '@/server/common';
function ShopCar() {
  const [stores,setCarts] = useState<any>({})
  const [choose, setChoose] = useState<any>([])
  const [total, setTotal] = useState(0)
  const [flag,reload] = useState({})
  useEffect(() => {
    (async () => {
      const res = await commonRequest('/mallCart/myCart', {})
      if(res.code === '0') {
        let stores:any = {}
        setTotal(res.data?.length)
        res.data?.forEach((i: any) => {
          stores[i.storeName] ? stores[i.storeName].push(i) : (stores[i.storeName] = [i])
        })
        setCarts(stores)
      }
    })()
  }, [flag])
  const totalPrice = choose.map((i:any) => i.productAmount * i.nowPrice).reduce((a: number,b: number) => a + b, 0)
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
         {
          Object.keys(stores).map(storeName => <>
           <tr  style={{width: 100, textAlign: 'center'}}>
            <td row-gap={6}><Checkbox onChange={(e) => {
              const val = e.target.checked
              let temp:any = [...choose]
              stores[storeName].forEach((i:any) => {
                  if(val) {
                    if(!choose.some((j:any) => j.id === i.id)) {
                      temp.push(i)
                    }
                  }else{
                    const idx= temp.findIndex((j:any) => j.id === i.id)
                    idx !== -1 && temp.splice(idx, 1)
                  }
              })
             setChoose(temp)
            }} style={{lineHeight: '20px'}}>{storeName}</Checkbox></td>
          </tr>
            {
              stores[storeName].map((prod: any) =>  <tr className='prods_cont'>
              <td  className='checkbox1'>
                <Checkbox style={{marginLeft: 25}}  
                  checked={choose.some((i:any) => i.id === prod.id)}
                  onChange={() => {
                    const index = choose.findIndex((j:any) => j.id === prod.id)
                    if(index === -1) {
                      setChoose(choose.concat(prod))
                    }else{
                      choose.splice(index, 1)
                      setChoose([...choose])
                    }
                  }}></Checkbox></td>
              <td>
                <div className='product-info'>
                    <img src={'/lease-center/' + prod.mainImgPath} alt="" style={{width: 100, height: 100}}/>
                   <div>
                   <div>{prod.productName}</div>
                    <div>挖掘机  沃尔沃  LL222</div>
                   </div>
                </div>
              </td>
              <td>
              ￥{prod.nowPrice}
              </td>
              <td><InputNumber controls={false} addonBefore={<span style={{cursor: 'pointer'}} onClick={async() => {
                const res = await commonRequest('/mallCart/changeNum', {
                  method: 'put',
                  data: {
                    id: prod.id,
                  productAmount: prod.productAmount+ 1
                  }
                })
                if(res.code === '0') {
                  prod.productAmount++
                 setCarts({...stores})
                }
              }}>+</span>} addonAfter={<span style={{cursor: 'pointer'}} onClick={async () => {
                if( prod.productAmount > 1) {
                  const res = await commonRequest('/mallCart/changeNum', {
                    method: 'put',
                    data: {
                      id: prod.id,
                      productAmount: prod.productAmount - 1
                    }
                  })
                  if(res.code === '0') {
                    prod.productAmount--
                   setCarts({...stores})
                  }
                }
              }}>-</span>} defaultValue={1} value={prod.productAmount} onChange={async (val) => {
                const res = await commonRequest('/mallCart/changeNum', {
                  method: 'put',
                  data: {
                    id: prod.id,
                    productAmount: val
                  }
                })
                if(res.code === '0') {
                  prod.productAmount = res.data.productAmount
                 setCarts({...stores})
                }
              }}/></td>
              <td>￥{prod.productAmount * prod.nowPrice}</td>
              <td><Button type='text'>移入收藏夹</Button> 
              <br/>
                <Button type='text'
                  onClick={async () => {
                    const res = await commonRequest(`/mallCart/${prod.id}`, {
                      method: 'delete'
                    })
                    if(res.code ==='0') {
                      message.success('删除成功！')
                      reload({})
                    }
                  }}
                >删除</Button>
              </td>
            </tr>)
            }
          </>)
         }
        </tbody>
      
      </table>
      <div className={ styles.actions }>
       <div className="lf">
       <Checkbox style={{margin: '0 70px 0 20px'}}>全选</Checkbox>
        <span>删除</span>
        <span style={{margin: '0 100px 0 40px'}}>移入收藏夹</span>
        <span className="prices">
          <div>共 <span className='num' style={{fontSize: 16}}>{total}</span> 件商品， 以选择 <span className='num' style={{fontSize: 16}}>{choose.length}</span> 件</div>
          <div>商品合计 : <span className='num'> ¥{ totalPrice }</span>   活动优惠 : <span className="num">
            -¥0.00</span></div>
        </span>
        <span style={{marginLeft: 50}}>应付总额: <span className='price-bg'>¥{totalPrice}</span></span>
       </div>
        <span className="action" onClick={async () => {
          const res = await commonRequest('/mallOrderMaster/addOrder', {
            method: 'post',
            data:{
              "address": "福建省福州市鼓楼区东街口",
              "contactNumber": "138438714974",
              "productVos": choose.map((i: any) => ({
                "isCart": 1,
                "num": 1,
                "productId": i.productId,
                "type": i.type
              })),
              "receiveUser": "陈某人"
            }
          })
          if(res.code === '0') {
            message.success('订单生成成功，请前往个人中心查看!')
            reload({})
          }
        }}>下单</span>
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
