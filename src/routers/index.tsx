import React from 'react';

  const routes  = { path: '/', component: '@/layouts/index', routes:[
  {
    path: '/',
    label: '首页',
    key: '/',
    component: '@/pages/froent/index/index',
    showmenu: 0
  },
  {
    label: '全部设备',
    key: 'allDevice',
    path:'/allDevice',
    component: '@/pages/froent/allDevice/index',
  },
  {
    label: '二手设备',
    key: 'allDevice?type=old',
    path:'/allDevice',
    component: '@/pages/froent/allDevice/index',
  },
  {
    label: '设备维修',
    key: 'repair',
    path:'/repair',
    component: '@/pages/froent/repair/index',
  },
  {
    label: '培训课程',
    key: 'course',
    path:'/course',
    component: '@/pages/froent/course/index',
  },
  {
    label: '配件商城',
    key: 'part',
    path:'/part',
    component: '@/pages/froent/part/index',
  },
  {
    label: '行业动态',
    key: 'news',
    path:'/news',
    component: '@/pages/froent/news/index',
  },
  {
    label: '动态详情',
    key: 'news/detail',
    path:'/news/detail',
    component: '@/pages/froent/news/detail',
    hide: true
  },
  {
    label: '设备出租',
    key: 'productRent',
    path:'/productRent',
    component: '@/pages/froent/productRent/index',
    hide: true
  },
  {
    label: '求租设备',
    key: 'forRent',
    path:'/forRent',
    component: '@/pages/froent/forRent/index',
  },
] }
const saleRouter = {
  path: '/saler',
  component: '@/layouts/back',
  exact: true,
  routes: [
    {
      path: '/saler',
      label: '商家中心',
      key:'/saler',
      component: '@/pages/back/index',
    },{
      label: '商品管理',
      key: 'product'
    },{
      label: '培训管理',
      key: 'course'
    }
    ,{
      label: '维修管理',
      key: 'repair'
    },{
      label: '数据分析',
      key: 'dataAnys'
    },{
      label: '账号资料',
      key: 'file',
      hide: false
    }
  ]
}
export const MenuRouter = routes.routes.filter(i => !i.hide)
export const ShowSaleRouter = saleRouter.routes.filter(i => !i.hide)
export default [
  {
    path: '/login', component: '@/pages/login/index'
  },
  saleRouter,
  routes,
];
