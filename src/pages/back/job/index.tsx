import React, { Ref, useEffect, useRef, useState } from 'react';
import styles from './index.module.less';
import { Button, message, Form, Modal } from 'antd';
import {
  ActionType,
  ModalForm,
  ProForm,
  ProFormCascader,
  ProFormInstance,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { commonRequest } from '@/server/common';
import { useHistory } from 'umi';
import { orderStatus } from '@/constants/var';
import dayjs from 'dayjs';
import city from '@/constants/city';
function Repair() {
  const history = useHistory();
  const tableRef = useRef<ActionType>();
  const [typeEnum, setEnum] = useState({});
  const [form] = Form.useForm();

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
            招聘管理
          </span>
        </div>
        <ProTable
          headerTitle={
            <ModalForm
              title="新增招聘"
              trigger={<Button type="primary">新增招聘</Button>}
              form={form}
              autoFocusFirstInput
              modalProps={{
                destroyOnClose: true,
              }}
              onFinish={async (values) => {
                const res = await commonRequest('/robotrecreuitment', {
                  method: 'post',
                  data: {
                    provinceName: values.citys[0],
                    countyName: values.citys[1],
                    address: values.address,
                    salary: values.salary,
                    skillRequirements: values.skillRequirements,
                    workingYears: values.workingYears,
                  },
                });
                message.success('提交成功');
                tableRef.current?.reloadAndRest();
                return true;
              }}
            >
              <ProForm.Group>
                <ProFormText
                  width="md"
                  name="salary"
                  label="待遇"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                />
                <ProFormText
                  width="md"
                  name="skillRequirements"
                  label="要求"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                />
              </ProForm.Group>
              <ProForm.Group>
                <ProFormText
                  width="md"
                  name="workingYears"
                  label="工作年限"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                />
                <ProFormCascader
                  label="请选择城市"
                  colProps={{
                    span: 12,
                  }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  placeholder="请选择省市区"
                  fieldProps={{
                    options: city,
                    showSearch: true,
                  }}
                  name="citys"
                />
              </ProForm.Group>
              <ProForm.Group>
                <ProFormTextArea
                  style={{ width: 600 }}
                  name="address"
                  label="详细地址"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                />
              </ProForm.Group>
            </ModalForm>
          }
          search={false}
          rowKey={'id'}
          columns={[
            {
              dataIndex: 'address',
              hideInSearch: true,
              title: '详细地址',
            },
            {
              hideInSearch: true,
              dataIndex: 'countyName',
              title: '市',
            },
            {
              dataIndex: 'provinceName',
              hideInSearch: true,
              title: '省',
            },
            {
              dataIndex: 'salary',
              title: '待遇',
              hideInSearch: true,
            },
            {
              dataIndex: 'skillRequirements',
              title: '要求',
              hideInSearch: true,
            },
            {
              dataIndex: 'workingYears',
              hideInSearch: true,
              title: '工作年限',
            },
            {
              dataIndex: 'id',
              title: '操作',
              hideInSearch: true,
              render(text, item) {
                console.log(item, '--');
                return (
                  <>
                    <Button
                      type="link"
                      onClick={async () => {
                        Modal.confirm({
                          content: '是否删除该数据？',
                          title: '提示：',
                          async onOk() {
                            await commonRequest(
                              '/robotrecreuitment/' + item.id,
                              {
                                method: 'delete',
                              },
                            );
                            tableRef.current?.reload();
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
          actionRef={tableRef}
          request={async ({ pageSize, current, ...others }) => {
            let conditions = [];
            others?.workingYears !== undefined &&
              conditions.push({
                column: 'working_years',
                operator: 'eq',
                value: others?.workingYears,
              });

            const res = await commonRequest(
              '/robotrecreuitment/pageOrganSend',
              {
                data: {
                  size: pageSize,
                  current,
                  // conditions,
                },
                method: 'post',
              },
            );
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
