import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import HomeView from '../views/HomeView.vue'
import Layout from '@/components/Layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/layout',
    component: Layout,
    meta: { title: '首页' },
    redirect: '/home', // 重定向 防止页面进来空白  默认选中侧边栏上的文字
    children: [
      {
        path: '/home',
        name: 'home',
        meta: { title: '首页' },
        component: () => import('../views/HomeView')
      },

        {
          path: '/usermanager',
          name: 'usermanager',
          component: () => import('../views/UserManager.vue'),
          meta: {title: '用户管理'},
          children: [
            {
              path: '/usermanager/importantpeople',
              name: 'importantpeople',
              meta: {title: '重点人员管理'},
              component: () => import('../views/ImportantPeople')
            },
            {
              path: '/usermanager/whitename',
              name: 'whitename',
              meta: {title: '白名单管理'},
              component: () => import('../views/WhiteName')
            },
          ],

      },

      {
        path: '/systemset',
        name: 'systemset',
        meta: {title: '系统设置'},
        component: () => import('../views/SystemSet')
      },
      {
        path: '/echarts',
        name: 'echarts',
        meta: {title: '图表设置'},
        component: () => import('../views/ECharts')
      }

    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
