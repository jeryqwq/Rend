import React, { Ref, useEffect, useRef, useState } from 'react';
import styles from './index.module.less';
import { Button, message, Modal } from 'antd';
import {
  ActionType,
  ProForm,
  ProFormInstance,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { commonRequest } from '@/server/common';
import { useHistory } from 'umi';
import { orderStatus } from '@/constants/var';
import dayjs from 'dayjs';
function Repair() {
  const history = useHistory();
  const tableRef = useRef<ActionType>();
  const [typeEnum, setEnum] = useState({});
  useEffect(() => {
    (async () => {
      const res = await commonRequest('/mallBrandInfo/all', {
        method: 'post',
        data: {},
      });
      if (res.code === '0') {
        let _data: any = {};
        res.data.forEach((i: any) => {
          _data[i.brandName] = i.brandName;
        });
        setEnum(_data);
      }
    })();
  }, []);
  return (
    <div className="content">
      <div className={styles['repair-wrap']}>
        <div className="tit">
          <span style={{ background: 'white', paddingRight: 10 }}>
            订单管理
          </span>
        </div>
        <ProTable
          rowKey={'id'}
          columns={[
            {
              dataIndex: 'id',
              title: '订单ID',
              ellipsis: true,
              copyable: true,
              hideInSearch: true,
            },
            // {
            //   dataIndex: 'cityName',
            //   title: '省',
            // },{
            //   dataIndex: 'countyName',
            //   title: '市',
            // },
            {
              dataIndex: 'createTime',
              hideInSearch: true,
              ellipsis: true,
              title: '下单时间',
            },
            {
              dataIndex: 'orderSn',
              ellipsis: true,
              title: '订单号',
            },
            {
              dataIndex: 'orderStatus',
              title: '订单状态',
              valueEnum: {
                '-1': '取消支付',
                1: '下单待支付',
                2: '已经支付',
                3: '已经发货',
                10: '结束',
              },
            },
            {
              dataIndex: 'orderType',
              title: '订单类型',
              valueEnum: {
                1: '租赁',
                2: '购买',
              },
            },
            {
              dataIndex: 'orderMoney',
              hideInSearch: true,
              ellipsis: true,
              title: '订单金额',
            },

            {
              dataIndex: 'address',
              hideInSearch: true,
              ellipsis: true,
              title: '地址',
            },
            {
              dataIndex: 'contactNumber',
              title: '手机号',
              hideInSearch: true,
            },
            {
              dataIndex: 'id',
              title: '操作',
              hideInSearch: true,
              render(text, item) {
                console.log(item, '--');
                return (
                  <>
                    {item.orderPayStatus === '10' && (
                      <Button
                        type="link"
                        onClick={async () => {
                          const info = await commonRequest(
                            '/mallOrderMaster/getPayVoucher/' + item.id,
                            {
                              method: 'post',
                              data: {},
                            },
                          );
                          console.log(info);
                          if (info.code === '0') {
                            Modal.confirm({
                              width: '500px',
                              title: '凭证信息',
                              content: (
                                <div>
                                  <h3>{info.data[0]?.remarks}</h3>
                                  <img
                                    src={
                                      '/lease-center/' + info.data[0]?.imgPath
                                    }
                                    width="400px"
                                    alt=""
                                  />
                                </div>
                              ),
                              async onOk() {
                                await commonRequest(
                                  '/mallOrderMaster/paid/' + item.id,
                                  {
                                    method: 'post',
                                    data: {},
                                  },
                                );
                                message.success('审核成功！');
                              },
                            });
                          }
                        }}
                      >
                        审核
                      </Button>
                    )}
                    {/* {
                      // orderStatus === 2
                      item.orderStatus === 2 && (
                        <Button
                          type="link"
                          onClick={async () => {
                            let _temp = {},
                              _ref: React.MutableRefObject<
                                ProFormInstance<any>
                              >;
                            function TempComp() {
                              _ref = useRef<ProFormInstance>();
                              return (
                                <ProForm
                                  formRef={_ref}
                                  submitter={false}
                                  onValuesChange={(val, values) => {
                                    _temp = values;
                                  }}
                                >
                                  <ProFormText
                                    name="shippingCompName"
                                    label="快递公司"
                                    rules={[{ required: true }]}
                                  />
                                  <ProFormText
                                    label="快递单号	"
                                    required
                                    rules={[{ required: true }]}
                                    name="shippingSn"
                                  />
                                </ProForm>
                              );
                            }
                            Modal.confirm({
                              icon: null,
                              content: <TempComp />,
                              async onOk() {
                                const res =
                                  await _ref?.current?.getFieldsValue();
                                await commonRequest(
                                  '/mallOrderMaster/translate',
                                  {
                                    method: 'post',
                                    data: {
                                      ...res,
                                      shippingTime: dayjs(new Date()),
                                      id: item.id
                                    },
                                  },
                                );
                                message.success('发货成功！');
                              },
                            });
                          }}
                        >
                          发货
                        </Button>
                      )
                    } */}
                    {/* {item.orderStatus === 10 && (
                      <Button
                        type="link"
                        onClick={async () => {
                          await commonRequest(
                            '/mallOrderMaster/complete/' + item.id,
                            {
                              method: 'post',
                              data: {},
                            },
                          );
                          message.success('订单已结束!');
                        }}
                      >
                        结束
                      </Button>
                    )} */}
                  </>
                );
              },
            },
          ]}
          pagination={{
            pageSize: 10,
          }}
          expandable={{
            expandedRowRender(item) {
              return (
                <ProTable
                  search={false}
                  dataSource={item.details || []}
                  columns={[
                    {
                      dataIndex: 'equipAmount',
                      title: '数量',
                    },
                    {
                      dataIndex: 'equipBrand',
                      title: '品牌',
                    },
                    {
                      dataIndex: 'equipId',
                      title: 'id',
                    },
                    {
                      dataIndex: 'equipName',
                      title: '名称',
                    },
                    {
                      dataIndex: 'equipPrice',
                      title: '单价',
                    },
                    {
                      dataIndex: 'mainImgPath',
                      title: '图片',
                      render(text) {
                        return (
                          <img
                            src={'/lease-center/' + text}
                            style={{ width: 80, height: 80 }}
                          />
                        );
                      },
                    },
                    {
                      dataIndex: 'equipAmount',
                      title: '数量',
                    },
                  ]}
                />
              );
            },
          }}
          actionRef={tableRef}
          request={async ({ pageSize, current, ...others }) => {
            let conditions = [];
            others?.orderStatus !== undefined &&
              conditions.push({
                column: 'order_status',
                operator: 'eq',
                value: others?.orderStatus,
              });
            others?.orderSn !== undefined &&
              conditions.push({
                column: 'order_sn',
                operator: 'like',
                value: others?.orderSn,
              });
            others?.orderType !== undefined &&
              conditions.push({
                column: 'order_type',
                operator: 'eq',
                value: others?.orderType,
              });
            const res = await commonRequest('/mallOrderMaster/pageByBrand', {
              data: {
                size: pageSize,
                current,
                conditions,
              },
              method: 'post',
            });
            if (res.code === '0') {
              return {
                data: res.data.records,
                total: res.data.total,
              };
            }
            return {};
          }}
        />
        <div className="page-wrap"></div>
      </div>
    </div>
  );
}

export default Repair;
