import React from 'react';
const saleRouter = {
  path: '/saler',
  component: '@/layouts/back',
  routes: [
    {
        path: '/saler',
        label: '商家中心',
        key:'/saler',
        exact: true,
        component: '@/pages/back/index',
    },
    {
      path: '/saler/product',
      label: '商品管理',
      key: '/saler/product',
      exact: true,
      component: '@/pages/back/product/index',
    },{
      path: '/saler/course',
      label: '培训管理',
      key: '/saler/course',
      exact: true,
      component: '@/pages/back/course/index',
    }
    ,{
      path: '/saler/repair',
      label: '维修管理',
      key: '/saler/repair',
      exact: true,
      component: '@/pages/back/repair/index',
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
    key: 'sallList',
    path:'/sallList',
    component: '@/pages/froent/sallList/index',
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
    hide: true

  },
  {
    label: '发布二手',
    key: 'sallOld',
    path:'/sallOld',
    hide: true,
    component: '@/pages/froent/sallOld/index',
  },
  {
    label: '求购设备',
    key: 'forBuy',
    path:'/forBuy',
    component: '@/pages/froent/forBuy/index',
    hide: true

  },
  {
    label: '设备详情',
    key: 'productDetail',
    path:'/productDetail',
    component: '@/pages/froent/productDetail/index',
    hide: true
  },
  {
    label: '出租详情',
    key: 'rentDetail',
    path:'/rentDetail',
    component: '@/pages/froent/rentDetail/index',
    hide: true
  },
  {
    label: '购物车',
    key: 'shoppingCart',
    path:'/shoppingCart',
    component: '@/pages/froent/shopCart/index',
    hide: true
  },
  {
    label: '用户中心',
    key: 'userCenter',
    path:'/userCenter',
    component: '@/layouts/user',
    hide: true,
    routes: [
      {
        label: '我的订单',
        key: 'userCenter',
        path:'/userCenter/',
        component: '@/pages/froent/user',
      },
      {
        label: '我的订单',
        key: 'userCenter',
        path:'/userCenter/order',
        component: '@/pages/froent/order',
      }
    ]
  },
] }

console.log('totalPage:', routes.routes.length + saleRouter.routes.length)
export const MenuRouter = routes.routes.filter(i => !i.hide)
export const ShowSaleRouter = saleRouter.routes.filter(i => !i.hide)
export default [
  {
    path: '/login', component: '@/pages/login/index'
  },
  saleRouter,
  routes,
];
