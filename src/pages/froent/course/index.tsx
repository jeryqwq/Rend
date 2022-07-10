import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import { Row, Col, Button, Pagination } from 'antd'
import { commonRequest } from '@/server/common';
import { useHistory } from 'umi';
function Course() {
  const [courseType, setType] = useState<any[]>([]);
  const [params, setParams] = useState<any>({
    "current": 1,
    "size": 8
  })
  const history = useHistory()
  const [total, setTotal] = useState<number>(0)
  const [list, setList] = useState<any[]>([])
  useEffect(() => {
    (async () => {
      const res = await commonRequest('/appdict/kcpxlx', { method: 'get' })
      if(res.code === '0') {
        setType(res.data)
      }
      let conditions:any[] = [];
      if(params.courseType) {
        conditions.push({ value: params.courseType, column: 'course_type', operator: 'eq'})
      }
       const res2 = await commonRequest('/trainingCourse/page', { method: 'post',
       data: {
        ...params,
        conditions
       } })
       if(res2.code === '0') {
        setTotal(res2.data.total)
        setList(res2.data.records)
       }
    })()
  }, [params])
  return (
    <div className='content'>
     <div className={styles['search']}>
      <div className={styles.line}>
        <div className="lf">培训类别</div>
        <Row className="rg" gutter={[20, 15]}>
        <Button  size='small' type={!params['courseType'] ? 'primary' : 'text'} onClick={() => {
           setParams({
            ...params,
            courseType: ''
          })
        }}>全部</Button>
        { courseType.map((i: any) => <Col><Button  size='small' 
         type={ params['courseType'] === i.code ? 'primary' : 'text' }
         onClick={() => {
          setParams({
            ...params,
            courseType: i.code
          })
         }}
         >{i.name}</Button></Col>) }
        </Row>
      </div>
     </div>

    <div className={styles['course-wrap']}>
        {
         list.map(i => <div 
         onClick={() => {
          history.push(`/courseDetail?id=${i.id}`)
         }}
         style={{display: 'inline-block', width: '50%', marginTop: 25, cursor: 'pointer'}}>
            <div className='item' >
            <img src="/images/repair-bg.png" style={{width: 248, height: 166}} />
            <div className="rg">
              <div className="tit">{i.courseName} </div>
              <div className="stit">{i.organName}</div>
              <div className="add">{i.releaseCityName}</div>
              <div className="price">￥{i.price}元</div>
            </div>
          </div>
          </div>)
        }
    </div>

     <div style={{margin: '40px auto 60px auto', textAlign: 'center'}}>
       <Pagination showQuickJumper onChange={(num: number, size) => {
         setParams({
           ...params,
           current: num,
           size
         })
       }} current={params.current} defaultCurrent={1} total={total}   />
       </div>
    </div>
  );
}

export default Course;
