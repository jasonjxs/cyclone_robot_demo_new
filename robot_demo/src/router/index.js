import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main'
import Home from '../views/robot/HomePage'
// import Home from '../components/dashboard/dashboard'
import Process from '../views/robot/ProcessPage'
import Command from '../views/robot/CommandPage'
import Machine from '../views/robot/MachinePage'
import FeedBack from '../views/robot/FeedBackPage'
import Monitor from '../views/robot/MonitorPage'
import ScriptHistory from '../views/robot/ScriptHistoryPage'
import ScriptRecovery from '../views/robot/ScriptRecoveryPage'
import UserManage from '../views/robot/UserManagePage'
import UserRole from '../views/robot/UserRolePage'
import TaskMonitor from '../views/robot/TaskMonitorPage'
import RPAControl from '../views/robot/RPAControl'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/control',
      name: '首页',
      component: Main,
      children:[
        {
          path: '/home',
          name: '首页',
          component: Home
        },
        {
          path: '/control',
          name: '综合监控',
          component: RPAControl
        },
        {
          path: '/process',
          name: '流程管理',
          component: Process
        },
        {
          path: '/command',
          name: '口令管理',
          component: Command
        },
        {
          path: '/machine',
          name: '机器管理',
          component: Machine
        },
        {
          path: '/feedback',
          name: '用户反馈',
          component: FeedBack
        },
        {
          path: '/monitor',
          name: '资源监控',
          component: Monitor
        },
        {
          path: '/scripthistory',
          name: '历史脚本',
          component: ScriptHistory
        },
        {
          path: '/scriptrecovery',
          name: '回收策略',
          component: ScriptRecovery
        },
        {
          path: '/usermanage',
          name: '用户管理',
          component: UserManage
        },
        {
          path: '/userrole',
          name: '角色管理',
          component: UserRole
        },
        {
          path: '/taskmonitor',
          name: '任务监控',
          component: TaskMonitor
        },
      ]
    },

  ]
})
