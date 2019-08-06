import Vue from 'vue'
import Router from 'vue-router'
// 登录页
import AdminLogin from '@/views/login'
// 系统首页
import Index from '@/views/index'
// 桌面展示
import Desk from '@/views/desk'
// 中国信息
import ChinaCity from '@/views/tree/chinaCity'
// 地址信息
import Address from '@/views/address/szAddress'
// 系统服务器信息页面
import SystemInfo from '@/views/systemInfo'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AdminLogin',
      component: AdminLogin
    },{
      path: '/index',
      name: 'Index',
      component: Index,
      redirect: '/index/desk',
      children: [
      	{
      		path: '/index/desk',
      		name: 'Desk',
      		component: Desk
      	},
      	{
      		path: '/index/tree',
      		name: 'ChinaCity',
      		component: ChinaCity
      	},
      	{
      		path: '/index/address',
      		name: 'Address',
      		component: Address
      	},
      	{
      		path: '/index/system',
      		name: 'SystemInfo',
      		component: SystemInfo
      	}
      ]
    }
  ]
})
