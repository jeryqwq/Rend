import styles from './index.module.less';
import { Menu } from 'antd';
import { MenuRouter } from '@/routers';
import { Button, Carousel, Row, Col, BackTop, Popover, Modal } from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons';
import DeviceItem from '@/components/DeviceItem';
import OldItem from '@/components/OldItem';
import PartItem from '@/components/PartItem';
import CourseItem from '@/components/CourseItem';
import NewsItem from '@/components/NewsItem';
import { useHistory } from 'umi';
import { useEffect, useState } from 'react';
import { commonRequest, getDict, getEquipmentType } from '@/server/common';
import { mallBrandInfo } from '@/server/rent';
import { appNewsPage } from '@/server/news';
import dayjs from 'dayjs';
import { ProTable } from '@ant-design/pro-components';
const contentStyle: React.CSSProperties = {
  height: '400px',
  color: '#fff',
  lineHeight: '400px',
  textAlign: 'center',
  background: '#364d79',
};
export default function IndexPage() {
  const history = useHistory();
  const [prods, setProds] = useState([]);
  const [brands, setBrand] = useState<any[]>([]);
  const [rents, setRent] = useState<any[]>([]);
  const [sales, setSale] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [parts, setParts] = useState<any[]>([]);
  const [banners, setBanner] = useState<any[]>([]);
  const [course, setCourse] = useState<any[]>([]);
  const [buys, setBuy] = useState<any>({ list: [], total: 0 });
  const [jobs, setJobs] = useState<any>({ list: [], total: 0 });
  const [findJob, setFindjob] = useState<any>({ list: [], total: 0 });
  const [newRents, setnewRents] = useState<any>({ list: [], total: 0 });
  const [counts, setCount] = useState({});
  useEffect(() => {
    (async () => {
      const res12 = await commonRequest('/sysindex/getHomeCount', {
        method: 'get',
      });
      res12.code === '0' && setCount(res12.data);
      const res = await getEquipmentType();
      if (res.code === '0') {
        function trans(items: any[]): any {
          return items.map((i: any) => ({
            label: i.name,
            key: i.id,
            children: i.children ? trans(i.children) : undefined,
          }));
        }
        setProds(trans(res.data));
      }
      const res2 = await mallBrandInfo({
        page: 0,
        size: 6,
      });
      if (res2.code === '0') {
        setBrand(res2.data.records);
      }
      const res3 = await commonRequest('/equipmentLease/getRecommList', {
        method: 'get',
      });
      if (res3.code === '0') {
        setRent(res3.data);
      }
      const res4 = await commonRequest('/equipmentSale/getRecommList', {
        method: 'get',
      });
      if (res4.code === '0') {
        setSale(res4.data);
      }
      const res5 = await commonRequest('/appnews/findRecomand', {
        method: 'post',
      });
      if (res5.code === '0') {
        setNews(res5.data.slice(0, 3));
      }
      const res6 = await commonRequest('/equipmentParts/getRecommList', {
        method: 'get',
      });
      if (res6.code === '0') {
        setParts(res6.data.slice(0, 3));
      }
      const res7 = await commonRequest('/appnews/findLunbo', {
        method: 'get',
      });
      if (res7.code === '0') {
        setBanner(res7.data);
      }
      const res8 = await commonRequest('/trainingCourse/getRecommList', {
        method: 'get',
      });
      if (res8.code === '0') {
        setCourse(res8.data);
      }
      const res9 = await commonRequest('/equipmentPurchase/page', {
        data: {
          page: 0,
          size: 6,
        },
        method: 'post',
      });
      res9.code === '0' &&
        setBuy({
          list: res9.data?.records || [],
          total: res9.data.total,
        });
      const res10 = await commonRequest('/robotrecreuitment/page', {
        data: {
          page: 0,
          size: 6,
        },
        method: 'post',
      });
      res10.code === '0' &&
        setJobs({
          list: res10.data?.records || [],
          total: res10.data.total,
        });
      const res11 = await commonRequest('/jobhunting/page', {
        data: {
          page: 0,
          size: 6,
        },
        method: 'post',
      });
      res11.code === '0' &&
        setFindjob({
          list: res11.data?.records || [],
          total: res11.data.total,
        });
      const res13 = await commonRequest('/equipmentRent/page', {
        data: {
          page: 0,
          size: 6,
        },
        method: 'post',
      });
      res13.code === '0' &&
        setnewRents({
          list: res13.data?.records || [],
          total: res13.data.total,
        });
    })();
  }, []);
  return (
    <>
      <div className="content" style={{ margin: '20px auto' }}>
        <div className={styles['line1']}>
          <div className="lf">
            <Button
              type="primary"
              icon={<MenuFoldOutlined />}
              size="large"
              style={{ height: 40, width: 200 }}
            >
              全部产品
            </Button>
            <div className="menu-lf">
              <Menu
                style={{ height: '100%', overflow: 'auto' }}
                onClick={({ key }) => {
                  history.push('/allDevice?type=' + key);
                }}
                mode="vertical"
                theme="dark"
                items={prods}
              />
            </div>
          </div>
          <div className="rg">
            <div className="menu-wrap">
              <div className="content">
                {MenuRouter.map((i) => (
                  <div
                    className={`item `}
                    onClick={() => {
                      history.push(i.path);
                    }}
                  >
                    {i.other ? (
                      <Popover content={i.other} placement="bottomLeft">
                        {i.label}
                      </Popover>
                    ) : (
                      i.label
                    )}
                  </div>
                ))}
              </div>
            </div>
            <Carousel autoplay>
              {banners.map((i: any) => (
                <h3 style={contentStyle}>
                  <img
                    src={'/lease-center/' + i.headUrl}
                    style={{ width: '100%', height: '400px' }}
                  />
                </h3>
              ))}
            </Carousel>
          </div>
        </div>
      </div>

      <div style={{ paddingTop: 25, background: '#F6F6F6' }}>
        <div className="content">
          {/* <span style={{float: 'right',}}>更多</span> */}
          <Row gutter={12}>
            <Col span={8}>
              <div className={styles.dataItem}>
                <div className="lf">发布设备</div>
                <div className="rg">
                  <img src="/images/1068.png" /> {counts.fbsbNum}
                  <span className="unit">台</span>
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className={styles.dataItem}>
                <div className="lf">发布需求</div>
                <div className="rg">
                  <img src="/images/1069.png" /> {counts.fbxqNum}
                  <span className="unit">条</span>
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className={styles.dataItem}>
                <div className="lf">服务订单</div>
                <div className="rg">
                  <img src="/images/1070.png" /> {counts.orderNum}
                  <span className="unit">单</span>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div style={{ paddingTop: 25, background: '#F6F6F6' }}>
        <div className="content">
          {/* <span style={{float: 'right',}}>更多</span> */}
          <Row gutter={12}>
            <Col span={6}>
              <h2 className="title">最新求租 [{newRents?.total}]</h2>
              <span
                onClick={() => history.push('/saler')}
                style={{ float: 'right', cursor: 'pointer' }}
              >
                更多
              </span>
              {newRents?.list?.map((i) => (
                <div className={styles.item}>
                  <marquee className="lf">{i.equipName}</marquee>
                  <div className="rg">
                    [{dayjs(i.createDate).format('MM-DD HH:MM')}]
                  </div>
                </div>
              ))}
            </Col>
            <Col span={6}>
              <h2 className="title">最新求购[{buys.total}] </h2>{' '}
              <span
                onClick={() => history.push('/saler')}
                style={{ float: 'right', cursor: 'pointer' }}
              >
                更多
              </span>
              {buys.list?.map((i) => (
                <div className={styles.item}>
                  <marquee className="lf">{i.remark}</marquee>
                  <div className="rg">
                    [{dayjs(i.createDate).format('MM-DD HH:MM')}]
                  </div>
                </div>
              ))}
            </Col>
            <Col span={6}>
              <h2 className="title">机手招聘[{jobs.total}] </h2>
              <span
                style={{ float: 'right', cursor: 'pointer' }}
                onClick={() => {
                  Modal.confirm({
                    title: '招聘信息',
                    width: 1000,
                    icon: null,
                    content: (
                      <ProTable
                        // search={false}
                        request={async ({ pageSize, current, ...others }) => {
                          let conditions = [];
                          others?.workingYears !== undefined &&
                            conditions.push({
                              column: 'working_years',
                              operator: 'like',
                              value: others?.workingYears,
                            });
                          others?.address !== undefined &&
                            conditions.push({
                              column: 'address',
                              operator: 'like',
                              value: others?.address,
                            });
                          others?.countyName !== undefined &&
                            conditions.push({
                              column: 'county_name',
                              operator: 'like',
                              value: others?.countyName,
                            });
                          others?.provinceName !== undefined &&
                            conditions.push({
                              column: 'province_name',
                              operator: 'like',
                              value: others?.provinceName,
                            });
                          others?.skillRequirements !== undefined &&
                            conditions.push({
                              column: 'skill_requirements',
                              operator: 'like',
                              value: others?.skillRequirements,
                            });
                          const res = await commonRequest(
                            '/robotrecreuitment/page',
                            {
                              data: {
                                size: pageSize,
                                current,
                                conditions,
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
                        columns={[
                          {
                            dataIndex: 'address',
                            title: '详细地址',
                          },
                          {
                            dataIndex: 'countyName',
                            title: '市',
                          },
                          {
                            dataIndex: 'provinceName',
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
                          },
                          {
                            dataIndex: 'workingYears',
                            title: '工作年限',
                          },
                        ]}
                      />
                    ),
                  });
                }}
              >
                更多
              </span>
              {jobs.list?.map((i) => (
                <div className={styles.item}>
                  <marquee className="lf">
                    {i.countyName}, {i.cityName},要求：{i.skillRequirements}
                  </marquee>
                  <div className="rg">
                    [{dayjs(i.createDate).format('MM-DD HH:MM')}]
                  </div>
                </div>
              ))}
            </Col>
            <Col span={6}>
              <h2 className="title">机手求职[{findJob.total}]</h2>
              <span
                style={{ float: 'right', cursor: 'pointer' }}
                onClick={() => history.push('/saler')}
              >
                更多
              </span>
              {findJob.list?.map((i) => (
                <div className={styles.item}>
                  <marquee className="lf">
                    {i.name}-{i.cityName}:{i.specialty}
                  </marquee>
                  <div className="rg">
                    [{dayjs(i.createDate).format('MM-DD HH:MM')}]
                  </div>
                </div>
              ))}
            </Col>
          </Row>
        </div>
      </div>

      <div style={{ paddingTop: 25, background: '#F6F6F6' }}>
        <div className="content">
          {/* <span style={{float: 'right',}}>更多</span> */}
          <h2 className="title">为您推荐</h2>
          <Row gutter={12}>
            {rents.map((i: any) => (
              <Col>
                <DeviceItem item={i} />
              </Col>
            ))}
          </Row>
        </div>
      </div>

      <div style={{ paddingTop: 25, background: 'white' }}>
        <div className="content">
          <span
            style={{ float: 'right', cursor: 'pointer' }}
            onClick={() => {
              history.push('/brandList');
            }}
          >
            更多
          </span>
          <h2 className="title">品牌设备</h2>
          <Row gutter={12}>
            {brands.map((i) => (
              <Col span={4}>
                <div className={styles['brand-item']}>
                  <img
                    src={'/lease-center' + i.brandLogo}
                    width={190}
                    height={117}
                  />
                  <div className="tit">{i.brandName}</div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      <div style={{ paddingTop: 25, background: '#F6F6F6' }}>
        <div className="content">
          <a style={{ float: 'right', color: '#333' }} href="#/sallList">
            更多
          </a>
          <h2 className="title">设备推荐</h2>
          <Row gutter={12}>
            {sales.map((i: any) => (
              <Col>
                <OldItem item={i} />
              </Col>
            ))}
          </Row>
        </div>
      </div>

      <div style={{ padding: '25px 0', background: 'white' }}>
        <div className="content">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: 670 }}>
              <a style={{ float: 'right', cursor: 'pointer' }} href="#/part">
                更多
              </a>
              <h2 className="title">配件零件</h2>
              <Row gutter={15}>
                {parts.map((i) => (
                  <Col>
                    <PartItem item={i} />
                  </Col>
                ))}
              </Row>
            </div>
            <div style={{ width: 500 }}>
              <img src="/images/server.png" width={490} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '25px 0 20px 0', background: '#F6F6F6' }}>
        <div className="content">
          <a style={{ float: 'right', cursor: 'pointer' }} href="#/course">
            更多
          </a>
          <h2 className="title">培训课程</h2>
          <Row gutter={18}>
            {course.map((i) => (
              <Col>
                <CourseItem item={i} />
              </Col>
            ))}
          </Row>
        </div>
      </div>

      <div style={{ padding: '25px 0', background: 'white' }}>
        <div className="content">
          <a style={{ float: 'right', cursor: 'pointer' }} href="#/news">
            更多
          </a>
          <h2 className="title">行业资讯</h2>
          <Row gutter={0}>
            {news.map((i, idx) => (
              <Col span={8}>
                <NewsItem index={idx} item={i} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <BackTop />
    </>
  );
}
