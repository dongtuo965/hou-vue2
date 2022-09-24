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
        path: '/about',
        name: 'about',
        meta: { title: '首页' },
        component: () => import('../views/AboutView')
      }
      //   {
      //     path: '/newsmanager',
      //     name: 'newsmanager',
      //     meta: {title: '首页'},
      //     component: () => import('../views/NewsManager')
      // },
 

    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
