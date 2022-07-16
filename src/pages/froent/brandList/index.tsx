import React, { useEffect, useState } from 'react';
import { Row , Col} from 'antd'
import { commonRequest } from '@/server/common';
function BrandList() {
  const [brands, setBrand] = useState<any[]>([])
  useEffect(() => {
    (async() => {
      const res = await commonRequest('/mallBrandInfo/all', {
        method: 'post',
        data: {}
      })
      if(res.code === '0') {
        setBrand(res.data)
      }
    })()
  }, [])
  return (
    <div className='content' style={{margin: '20px auto 50px auto'}}>
      <div className="tit" style={{fontSize: 20, fontWeight: 'bold', borderBottom: 'solid 3px #105CCE', display: 'inline-block'}}>品牌设备</div>
      <Row gutter={[20, 20]} style={{textAlign: 'center',}}>
       {
        brands.map((i: any) =>  <Col style={{height: 140}} span="4">
          <img src={'/lease-center/' + i.brandLogo} style={{width: '100%', height: 120}}/>
          <div>{i.brandName}</div>
        </Col>)
       }
      </Row>
    </div>
  );
}

export default BrandList;
