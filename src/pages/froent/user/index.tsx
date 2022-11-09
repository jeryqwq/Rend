import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.less';
import { Button, Modal, message, Upload } from 'antd';
import { commonRequest, uploadImg } from '@/server/common';
import useUserInfo from '@/hooks/useLogin';
import { useHistory } from 'umi';
import { orderStatus } from '@/constants/var';
import {
  ActionType,
  ProForm,
  ProFormInstance,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import { getUuid } from '@/utils';
const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>点击上传</div>
  </div>
);
function User() {
  const { user } = useUserInfo();
  const userInfo = user.user;
  const [orders, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const history = useHistory();
  const tableRent = useRef<ActionType>();
  const tableBuy = useRef<ActionType>();
  const payFormRef = useRef<ProFormInstance>();

  useEffect(() => {
    reload();
  }, []);
  const reload = async () => {
    const res = await commonRequest('/mallOrderMaster/pageMy', {
      method: 'post',
      data: {
        current: 0,
        size: 99999,
      },
    });
    if (res.code === '0') {
      setOrder(res.data.records);
      setTotal(res.data.total);
    }
  };
  return (
    <div className={styles['user-wrap']}>
      <div className="line1">
        <img
          src="images/store.png"
          style={{ width: 80, height: 80, borderRadius: '50%', marginLeft: 20 }}
          alt=""
        />
        <div className="center">
          <div className="tit">{userInfo.name}</div>
          <div className="auth">
            {userInfo.type === 2 ? '企业认证' : '个人'}
          </div>
        </div>
        <div className="rg">
          {/* <div className="item">
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
          </div> */}
        </div>
      </div>
      {/* <div className="line2"></div> */}
      <div className="line3">
        <div className="tit">我的订单</div>
        <div className="order">
          {orders.map((i: any) => (
            <div className="item">
              <img
                src={'/lease-center/' + i?.details[0]?.mainImgPath}
                style={{ width: 100, height: 100 }}
                alt=""
              />
              <div style={{ width: 300 }}>
                <div>{i.receiveUser}</div>
                <div>
                  {i.provinceName}, {i.cityName}{' '}
                </div>
                <div>{i.address}</div>
              </div>
              <div className="status">{orderStatus[i.orderStatus as 10]}</div>
              <div className="price">¥{i.orderMoney}</div>
              <div className="action">
                {/* <Button style={{background: '#FE2525', border: 'none'}} type="primary">xxxx</Button> */}
                <Button
                  type={'text'}
                  onClick={() => history.push(`/userCenter/order?id=${i.id}`)}
                >
                  查看订单
                </Button>
                <br />
                <Button
                  type={'text'}
                  onClick={() => {
                    Modal.confirm({
                      title: '是否删除该订单?',
                      onOk: async () => {
                        const res = await commonRequest('/mallOrderMaster', {
                          method: 'delete',
                          data: {
                            ids: [i.id],
                          },
                        });
                        if (res.code === '0') {
                          message.success('取消成功！');
                          reload();
                        }
                      },
                    });
                  }}
                >
                  取消订单
                </Button>
                {i.paymentMethod === 3 && (
                  <>
                    <br />
                    <Button
                      type={'text'}
                      onClick={() => {
                        let img = '',
                          serviceId = '';
                        function Comp() {
                          const [fileList, setFileList] = useState([]);
                          return (
                            <ProForm submitter={false} formRef={payFormRef}>
                              <ProFormText name="remarks" label="描述" />
                              <ProForm.Item
                                required
                                label="相关凭证"
                                style={{ width: '100%' }}
                              >
                                <Upload
                                  listType="picture-card"
                                  accept=".png,.jpg,.jpeg"
                                  maxCount={1}
                                  fileList={fileList.map((i) => ({
                                    url: '/lease-center/' + i,
                                    uid: i,
                                    name: '预览图',
                                  }))}
                                  onChange={async (e) => {
                                    const file = e.file.originFileObj;
                                    const res = await uploadImg(file as File, {
                                      serviceId: i.id,
                                      serviceType: 'PAY_IMG',
                                      sort: fileList.length,
                                    });
                                    if (res.code === '0') {
                                      setFileList([res.data.path]);
                                      img = res.data.path;
                                      serviceId = res.data.serviceId;
                                    }
                                  }}
                                >
                                  {fileList.length >= 8 ? null : uploadButton}
                                </Upload>
                              </ProForm.Item>
                            </ProForm>
                          );
                        }
                        Modal.confirm({
                          content: <Comp />,
                          title: '请上传支付成功的相关素材信息',
                          okText: '确定',
                          cancelText: '取消',
                          async onOk() {
                            const val = payFormRef.current?.getFieldsValue();
                            if (!img) {
                              message.error('请先上传相关凭证');
                              return false;
                            }
                            const res = await commonRequest(
                              '/mallOrderMaster/offlinePaymentApplication',
                              {
                                method: 'post',
                                data: {
                                  orderId: i.id,
                                  remarks: val.remarks,
                                  imgPath: img,
                                  id: serviceId,
                                },
                              },
                            );
                            if (res.code === '0') {
                              message.success('保存成功！');
                            }
                          },
                        });
                      }}
                    >
                      上传支付凭证
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="line3">
        <div className="tit">我的求购</div>
        <div className="order">
          <ProTable
            search={false}
            actionRef={tableBuy}
            columns={[
              {
                dataIndex: 'equipModel',
                title: '求购型号',
              },
              {
                dataIndex: 'equipBrand',
                title: '求购品牌',
              },
              {
                dataIndex: 'contactNumber',
                title: '联系人',
              },
              {
                dataIndex: 'releaseCityName',
                title: '城市',
              },
              {
                dataIndex: 'reviceOrganName',
                title: '指派商家',
              },
              {
                dataIndex: 'isNew',
                title: '类型',
                render(text) {
                  return text === 0 ? '二手' : '新机';
                },
              },
              {
                dataIndex: 'id',
                title: '操作',
                render(tx, item) {
                  return (
                    <>
                      <Button
                        type={'link'}
                        onClick={() => {
                          history.push({
                            pathname: `/forBuy`,
                            state: item,
                          });
                        }}
                      >
                        编辑
                      </Button>
                      <Button
                        type={'link'}
                        onClick={async () => {
                          Modal.confirm({
                            content: '是否删除？',
                            onOk: async () => {
                              const res = await commonRequest(
                                '/equipmentPurchase',
                                {
                                  method: 'delete',
                                  data: {
                                    ids: [tx],
                                  },
                                },
                              );
                              if (res.code === '0') {
                                tableBuy.current?.reloadAndRest();
                                message.success('删除成功');
                              }
                            },
                          });
                        }}
                      >
                        删除
                      </Button>
                    </>
                  );
                },
              },
            ]}
            pagination={{
              pageSize: 10,
            }}
            request={async ({ pageSize, current }) => {
              const res = await commonRequest('/equipmentPurchase/pageMySend', {
                method: 'post',
                data: {
                  size: pageSize,
                  current,
                },
              });
              if (res.code === '0') {
                return {
                  data: res.data.records,
                  current,
                  total: res.data.total,
                };
              }
              return {};
            }}
          />
        </div>
      </div>
      <div className="line3">
        <div className="tit">我的求租</div>
        <div className="order">
          <ProTable
            pagination={{
              pageSize: 10,
            }}
            actionRef={tableRent}
            search={false}
            columns={[
              {
                dataIndex: 'equipName',
                title: '品牌名称',
              },
              {
                dataIndex: 'equipType',
                title: '品牌类型',
              },
              {
                dataIndex: 'contactName',
                title: '联系人',
              },
              {
                dataIndex: 'detailAddress',
                title: '详细地址',
              },
              {
                dataIndex: 'reviceOrganName',
                title: '指派商家',
              },
              {
                dataIndex: 'id',
                title: '操作',
                render(tx, item) {
                  return (
                    <>
                      <Button
                        type={'link'}
                        onClick={() => {
                          history.push({
                            pathname: `/forRent`,
                            state: item,
                          });
                        }}
                      >
                        编辑
                      </Button>
                      <Button
                        type={'link'}
                        onClick={async () => {
                          Modal.confirm({
                            content: '是否删除？',
                            onOk: async () => {
                              const res = await commonRequest(
                                '/equipmentRent',
                                {
                                  method: 'delete',
                                  data: {
                                    ids: [tx],
                                  },
                                },
                              );
                              if (res.code === '0') {
                                tableRent.current?.reloadAndRest();
                                message.success('删除成功');
                              }
                            },
                          });
                        }}
                      >
                        删除
                      </Button>
                    </>
                  );
                },
              },
            ]}
            request={async ({ pageSize, current }) => {
              const res = await commonRequest('/equipmentRent/pageMySend', {
                method: 'post',
                data: {
                  size: pageSize,
                  current,
                },
              });
              if (res.code === '0') {
                return {
                  data: res.data.records,
                  current,
                  total: res.data.total,
                };
              }
              return {};
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default User;
