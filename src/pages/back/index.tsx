import { commonRequest } from '@/server/common';
import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import { Empty, Modal } from 'antd';
import moment from 'moment';
import useUserInfo from '@/hooks/useLogin';
import { SketchOutlined } from '@ant-design/icons';
import { ProForm, ProFormText } from '@ant-design/pro-components';
const orderType = {
  TrainingCourse: '课程订单',
  EquipmentLease: '设备出租订单',
  EquipmentSale: '二手出售订单',
  EquipmentParts: '配件订单',
};
function Back() {
  const [add, setAdd] = useState<any>({});
  const [dataStatist, setDataIst] = useState<any>({});
  const [paddingOrder, setPadding] = useState([]);
  const [commons, setComm] = useState([]);
  const [lastRents, setLastRents] = useState([]);
  const [lastSells, setLastSells] = useState([]);
  const { user } = useUserInfo();
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await commonRequest('/appPoster/param/sjzx_dcl', {
        method: 'get',
      });
      if (res.code === '0') {
        setAdd(res.data);
      }
      const res2 = await commonRequest(
        '/businessCenter/getBusinessCenterStatistics',
        { method: 'get' },
      );
      if (res2.code === '0') {
        setDataIst(res2.data);
      }
      const res3 = await commonRequest('/businessCenter/getPendingOrders', {
        method: 'post',
        data: {
          size: 999,
          current: 0,
        },
      });
      if (res3.code === '0') {
        setPadding(res3.data.records || []);
      }
      const res4 = await commonRequest('/businessCenter/pageBusinessNotice', {
        method: 'post',
        data: {
          size: 999,
          current: 0,
        },
      });
      if (res4.code === '0') {
        setComm(res4.data.records || []);
      }
      const res5 = await commonRequest('/businessCenter/pageLatestPurchase', {
        method: 'post',
        data: {
          size: 999,
          current: 0,
        },
      });
      if (res5.code === '0') {
        setLastSells(res5.data.records || []);
      }
      const res6 = await commonRequest('/businessCenter/pageLatestRent', {
        method: 'post',
        data: {
          size: 999,
          current: 0,
        },
      });
      if (res6.code === '0') {
        setLastRents(res6.data.records || []);
      }
      const res11 = await commonRequest('/jobhunting/page', {
        data: {
          page: 0,
          size: 999,
        },
        method: 'post',
      });
      res11.code === '0' && setJobs(res11.data?.records || []);
    })();
  }, []);
  return (
    <div style={{ fontSize: 20 }} className="content">
      <div className={styles.line1}>
        <div className="lf">
          <div className="card">
            <div className="item">
              <div>{dataStatist.historicalViews}</div>
              <div className="label">本周浏览量</div>
            </div>
            <div className="item">
              <div>{dataStatist.communicationViews}</div>
              <div className="label">本周沟通量</div>
            </div>
            <div className="item">
              <div>{dataStatist.courseViews}</div>
              <div className="label">培训数</div>
            </div>
            <div className="item">
              <div>{dataStatist.repairViews}</div>
              <div className="label">维修数</div>
            </div>
            <div className="item">
              <div>{dataStatist.complaintViews}</div>
              <div className="label">投诉</div>
            </div>
          </div>
          <div className="order" style={{ overflow: 'auto' }}>
            <div className="tit">待处理</div>
            {!paddingOrder?.length ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              paddingOrder?.map((i: any) => (
                <div className="item">
                  <span className="type">
                    {orderType[i.type] || '出租订单'}
                  </span>
                  <span>{i.productName}</span>
                  <div
                    style={{
                      fontSize: 14,
                      color: '#666',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    订单号： {i.orderId}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="rg">
          <div className="comp">
            <div style={{ display: 'flex' }}>
              <img
                src="/images/store.png"
                style={{ width: 72, height: 72 }}
                alt=""
              />
              <span style={{ marginLeft: 10 }}>
                {' '}
                <span className="compname">{user.user.organName}</span>
                <div className="label">品牌商</div>
              </span>
            </div>
            <div className="item-info">
              <span>店铺信用等级</span>
              <span>
                <SketchOutlined />
              </span>
            </div>
            <div className="item-info">
              <span>保证金</span>
              <span className="status">已缴纳</span>
            </div>
            <div className="item-info">
              <span style={{ fontSize: 24, fontWeight: 'bold' }}>平台通知</span>
              <span>更多</span>
            </div>
            <div style={{ maxHeight: 200, overflow: 'auto' }}>
              {commons?.length ? (
                commons.map((i: any) => (
                  <div>
                    <div className="item-info" style={{ color: '#999' }}>
                      <span>{i.serviceTypeName}</span>
                      <span>{i.sendTime}</span>
                    </div>
                    <div
                      className="item-info"
                      style={{ color: '#010101', fontSize: 16 }}
                    >
                      {i.msg}
                    </div>
                  </div>
                ))
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </div>
          </div>
        </div>
      </div>
      <img
        src={'/lease-center/' + add.imgUrl}
        onClick={() => {
          window.open(add.outUrl);
        }}
        style={{ width: '100%', height: 250, margin: '30px 0 20px 0' }}
        alt=""
      />
      <div className={styles.line2}>
        <div className="item-info">
          <div className="tit">最新求租</div>
          {/* <span style={{fontSize: 14}}>更多</span> */}
        </div>
        <div className="rows">
          {lastRents.map((i: any) => (
            <marquee
              className="item-info"
              onClick={() => {
                console.log(i);
                Modal.confirm({
                  title: '求租详情',
                  width: 1000,
                  content: (
                    <ProForm readonly initialValues={i} submitter={false} grid>
                      <ProFormText
                        label="设备名称"
                        name={'equipName'}
                        colProps={{ span: 12 }}
                      />
                      <ProFormText
                        label="要求"
                        name={'remark'}
                        colProps={{ span: 12 }}
                      />
                      <ProFormText
                        label="联系人"
                        name={'contactName'}
                        colProps={{ span: 12 }}
                      />
                      <ProFormText
                        label="联系电话"
                        name={'contactNumber'}
                        colProps={{ span: 12 }}
                      />
                      <ProFormText
                        label="地区"
                        name={'releaseCityName'}
                        colProps={{ span: 12 }}
                      />
                      <ProFormText
                        label="地址"
                        name={'detailAddress'}
                        colProps={{ span: 12 }}
                      />
                      <ProFormText
                        label="求租公司"
                        name={'organName'}
                        colProps={{ span: 12 }}
                      />
                      <ProFormText
                        label="发布日期"
                        name={'startTime'}
                        colProps={{ span: 12 }}
                      />
                    </ProForm>
                  ),
                  icon: null,
                });
              }}
            >
              <span className="lf">
                [求租:{i.equipName}]要求:{i.remark}{' '}
              </span>
              <span style={{ color: '#999' }}>
                [{moment(i.createDate).format('yy-MM-DD')}]
              </span>
            </marquee>
          ))}
        </div>
      </div>

      <div className={styles.line2}>
        <div className="item-info">
          <div className="tit">最新求购</div>
          {/* <span style={{fontSize: 14}}>更多</span> */}
        </div>
        <div className="rows">
          {lastSells.map((i: any) => (
            <marquee
              className="item-info"
              onClick={() => {
                console.log(i);
                Modal.confirm({
                  title: '求购详情',
                  width: 1000,
                  content: (
                    <ProForm readonly initialValues={i} submitter={false} grid>
                      <ProFormText
                        label="求购类型"
                        name={'equipTypeText'}
                        colProps={{ span: 12 }}
                      />
                      <ProFormText
                        label="要求"
                        name={'remark'}
                        colProps={{ span: 12 }}
                      />
                      <ProFormText
                        label="联系人"
                        name={'createName'}
                        colProps={{ span: 12 }}
                      />
                      <ProFormText
                        label="联系电话"
                        name={'contactNumber'}
                        colProps={{ span: 12 }}
                      />
                      <ProFormText
                        label="地区"
                        name={'releaseCityName'}
                        colProps={{ span: 12 }}
                      />
                      <ProFormText
                        label="品牌"
                        name={'equipBrand'}
                        colProps={{ span: 12 }}
                      />
                      <ProFormText
                        label="型号"
                        name={'equipModel'}
                        colProps={{ span: 12 }}
                      />
                      <ProFormText
                        label="发布时间"
                        name={'createDate'}
                        colProps={{ span: 12 }}
                      />
                    </ProForm>
                  ),
                  icon: null,
                });
              }}
            >
              <span className="lf">
                [求购:{i.equipName}]要求:{i.remark}{' '}
              </span>
              <span style={{ color: '#999' }}>
                [{moment(i.createDate).format('yy-MM-DD')}]
              </span>
            </marquee>
          ))}
        </div>
      </div>

      <div className={styles.line2}>
        <div className="item-info">
          <div className="tit">最新求职</div>
          {/* <span style={{fontSize: 14}}>更多</span> */}
        </div>
        <div className="rows">
          {jobs.map((i: any) => (
            <marquee
              className="item-info"
              onClick={() => {
                console.log(i);
                Modal.confirm({
                  title: '求职详情',
                  width: 1000,
                  content: (
                    <ProForm readonly initialValues={i} submitter={false} grid>
                      <ProFormText
                        label="发布时间"
                        name={'createDate'}
                        colProps={{ span: 12 }}
                      />
                      <ProFormText
                        label="地区"
                        name={'cityName'}
                        colProps={{ span: 12 }}
                      />
                      <ProFormText
                        label="地址"
                        name={'detailAddress'}
                        colProps={{ span: 12 }}
                      />
                      <ProFormText
                        label="联系人"
                        name={'name'}
                        colProps={{ span: 12 }}
                      />
                      <ProFormText
                        label="联系电话"
                        name={'phone'}
                        colProps={{ span: 12 }}
                      />
                      <ProFormText
                        label="技能"
                        name={'specialty'}
                        colProps={{ span: 12 }}
                      />
                    </ProForm>
                  ),
                  icon: null,
                });
              }}
            >
              <span className="lf">
                [求职:{i.name}-{i.cityName}:{i.specialty}
              </span>
              <span style={{ color: '#999' }}>
                [{moment(i.createDate).format('yy-MM-DD')}]
              </span>
            </marquee>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Back;
