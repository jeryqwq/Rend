import React from 'react';
const routes  = { path: '/', component: '@/layouts/index', routes:[
  {
    path: '/',
    label: '首页',
    key: '/',
    component: '@/pages/index/index',
    showmenu: 0
  },
  {
    label: '全部设备',
    key: 'allDevice',
    path:'/allDevice',
    component: '@/pages/allDevice/index',
  },
  {
    label: '二手设备',
    key: 'allDevice?type=old',
    path:'/allDevice',
    component: '@/pages/allDevice/index',
  },
  {
    label: '设备维修',
    key: 'repair',
    path:'/repair',
    component: '@/pages/repair/index',
  },
  {
    label: '培训课程',
    key: 'course',
    path:'/course',
    component: '@/pages/course/index',
  },
  {
    label: '配件商城',
    key: 'part',
    path:'/part',
    component: '@/pages/part/index',
  },
  {
    label: '行业动态',
    key: 'news',
    path:'/news',
    component: '@/pages/news/index',
  },
  {
    label: '动态详情',
    key: 'news/detail',
    path:'/news/detail',
    component: '@/pages/news/detail',
    hide: true
  },
] }

export const MenuRouter = routes.routes.filter(i => !i.hide)
export default [
  {
    path: '/login', component: '@/pages/login/index'
  },
  routes,
];
