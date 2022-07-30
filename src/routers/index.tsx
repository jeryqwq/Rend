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
    },
   
    
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
    key: '/allDevice',
    path:'/allDevice',
    component: '@/pages/froent/allDevice/index',
  },
  {
    label: '设备租赁',
    key: '/rentList',
    path:'/rentList',
    component: '@/pages/froent/rentList/index',
  },
  {
    label: '新机出售',
    key: '/newDevice',
    path:'/newDevice',
    component: '@/pages/froent/newDevice/index',
  },
  {
    label: '二手设备',
    key: '/sallList',
    path:'/sallList',
    component: '@/pages/froent/sallList/index',
  },
 
  {
    label: '设备维修',
    key: '/repair',
    path:'/repair',
    component: '@/pages/froent/repair/index',
  },
  {
    label: '技能培训',
    key: '/course',
    path:'/course',
    component: '@/pages/froent/course/index',
  },
  {
    label: '配件商城',
    key: '/part',
    path:'/part',
    component: '@/pages/froent/part/index',
  },
  {
    label: '物流运输',
    key: '/transport',
    path:'/transport',
    component: '@/pages/froent/transport/index',
  },
  {
    label: '机手求职',
    key: '/findJob',
    path:'/findJob',
    component: '@/pages/froent/findJob/index',
  },
  {
    label: '行业动态',
    key: '/news',
    path:'/news',
    component: '@/pages/froent/news/index',
  },
  {
    label: '动态详情',
    key: '/news/detail',
    path:'/news/detail',
    component: '@/pages/froent/news/detail',
    hide: true
  },
  {
    label: '新增零件',
    key: '/addPart',
    path:'/addPart',
    component: '@/pages/froent/addPart',
    hide: true
  },
  {
    label: '新增课程',
    key: '/addCourse',
    path:'/addCourse',
    component: '@/pages/froent/addCourse',
    hide: true
  },
  {
    label: '课程详情',
    key: '/courseDetail',
    path:'/courseDetail',
    component: '@/pages/froent/courseDetail',
    hide: true
  },
  {
    label: '设备出租',
    key: '/productRent',
    path:'/productRent',
    component: '@/pages/froent/productRent/index',
    hide: true
  },
  {
    label: '下单成功',
    key: '/orderSuccess',
    path:'/orderSuccess',
    component: '@/pages/froent/orderSuccess/index',
    hide: true
  },
  {
    label: '地址选择',
    key: '/orderAddress',
    path:'/orderAddress',
    component: '@/pages/froent/orderAddress/index',
    hide: true
  },
  {
    label: '求租设备',
    key: '/forRent',
    path:'/forRent',
    component: '@/pages/froent/forRent/index',
    hide: true
  },
  {
    label: '配件详情',
    key: '/partDetail',
    path:'/partDetail',
    component: '@/pages/froent/partDetail/index',
    hide: true
  },
  {
    label: '发布二手',
    key: '/sallOld',
    path:'/sallOld',
    hide: true,
    component: '@/pages/froent/sallOld/index',
  },
  {
    label: '发布新机',
    key: '/sallNew',
    path:'/sallNew',
    hide: true,
    component: '@/pages/froent/sallNew/index',
  },
  {
    label: '求购设备',
    key: '/forBuy',
    path:'/forBuy',
    component: '@/pages/froent/forBuy/index',
    hide: true
  },
  {
    label: '求购新机',
    key: '/forNew',
    path:'/forNew',
    component: '@/pages/froent/forNew/index',
    hide: true
  },
  {
    label: '设备详情',
    key: '/productDetail',
    path:'/productDetail',
    component: '@/pages/froent/productDetail/index',
    hide: true
  },
  {
    label: '新机详情',
    key: '/newDetail',
    path:'/newDetail',
    component: '@/pages/froent/newDetail/index',
    hide: true
  },
  {
    label: '出租详情',
    key: '/rentDetail',
    path:'/rentDetail',
    component: '@/pages/froent/rentDetail/index',
    hide: true
  },
  {
    label: '购物车',
    key: '/shoppingCart',
    path:'/shoppingCart',
    component: '@/pages/froent/shopCart/index',
    hide: true
  },
  {
    label: '品牌商认证',
    key: '/salerAuth',
    path:'/salerAuth',
    component: '@/pages/froent/salerAuth/index',
    hide: true
  },
  {
    label: '施工单位认证',
    key: '/buyAuth',
    path:'/buyAuth',
    component: '@/pages/froent/buyAuth/index',
    hide: true
  },
  {
    label: '品牌列表',
    key: '/brandList',
    path:'/brandList',
    component: '@/pages/froent/brandList/index',
    hide: true
  },
  {
    label: '用户中心',
    key: '/userCenter',
    path:'/userCenter',
    component: '@/layouts/user',
    hide: true,
    routes: [
      {
        label: '用户中心',
        key: '/userCenter/',
        path:'/userCenter/',
        component: '@/pages/froent/user',
      },
      {
        label: '我的订单',
        key: '/userCenter/order',
        path:'/userCenter/order',
        component: '@/pages/froent/order',
      },
      {
        label: '消息',
        key: '/userCenter/message',
        path:'/userCenter/message',
        component: '@/pages/froent/message',
      },
      {
        label: '个人信息',
        key: '/userCenter/userInfo',
        path:'/userCenter/userInfo',
        component: '@/pages/froent/userInfo',
      },
      {
        label: '安全管理',
        key: '/userCenter/safeSetting',
        path:'/userCenter/safeSetting',
        component: '@/pages/froent/safeSetting',
      },
      {
        label: '地址管理',
        key: '/userCenter/address',
        path:'/userCenter/address',
        component: '@/pages/froent/address',
      }
      ,{
        path: '/userCenter/myRepair',
        label: '维修管理',
        key: '/userCenter/myRepair',
        exact: true,
        component: '@/pages/back/myRepair/index',
      }
    ]
  },
] }

console.log('totalPage:', routes.routes.length + saleRouter.routes.length + 7)
export const MenuRouter = routes.routes.filter(i => !i.hide)
export const ShowSaleRouter = saleRouter.routes.filter(i => !i.hide)
export default [
  {
    path: '/login', component: '@/pages/login/index'
  },
  saleRouter,
  routes,
];
