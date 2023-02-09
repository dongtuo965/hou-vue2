import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import HomeView from '../views/HomeView.vue'
import Layout from '@/components/Layout'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'Login',
    // component: () => import('../views/LoginInterFace.vue')
    component: () => import('../views/Login.vue')
  },
  {
    path: '/layout',
    component: Layout,
    meta: { title: '工作台' },
    redirect: '/home', // 重定向 防止页面进来空白  默认选中侧边栏上的文字
    children: [
      {
        path: '/home',
        name: 'home',
        meta: { title: '首页' },
        component: () => import('../views/HomeView')
      },
      {
        path: '/crud/antv',
        name: 'g6',
        meta: {title: '组织图'},
        component: () => import('@/views/crud/DefinedComponent')
      },
      {
        path: '/crud',
        name: 'crud',
        component: () => import('@/views/crud/CrudPage'),
        meta: {title: '增删改查'},
        children: [
          {
            path: '/crud/crudpage',
            name: 'crudpage',
            meta: {title: '增删改查'},
            component: () => import('@/views/crud/CrudPage')
          },

          ]},

        {
          path: '/usermanager',
          name: 'usermanager',
          // component: () => import('../views/UserManager.vue'),
          meta: {title: '用户管理'},
          component: {render(c) { return c('router-view') }},
          redirect: '/usermanager/GouWuChe',
          children: [
            {
              path: '/usermanager/importantpeople',
              name: 'importantpeople',
              meta: {title: '重点人员管理'},
              component: () => import('../views/ImportantPeople')
            },
            {
              path: '/usermanager/GouWuChe',
              name: 'gouwuche',
              meta: {title: '商品列表'},
              component: () => import('../views/GouWuChe'),
              children: [
                {
                  path: '/usermanager/GouWuChe/shopinfo',
                  name: 'ShopInfo',
                  meta: {title: '商品详情'},
                  component: () => import('../views/ShopInfo')
                },]
            },
            // {
            //   path: '/usermanager/GouWuChe/shopinfo',
            //   name: 'ShopInfo',
            //   meta: {title: '商品详情'},
            //   component: () => import('../views/ShopInfo')
            // },
            {
              path: '/usermanager/whitename',
              name: 'whitename',
              meta: {title: '白名单管理'},
              component: () => import('../views/WhiteName')
            },
            {
              path: '/usermanager/uploadfile',
              name: 'uploadfile',
              meta: {title: '文件上传'},
              component: () => import('../views/UploadFile')
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
