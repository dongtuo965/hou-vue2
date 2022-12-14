
<!--面包屑-->
<template>

  <el-breadcrumb separator=">">
    <!--      遍历路由信息并展示-->

    <el-breadcrumb-item v-for="(item,index) in lists" :key="item.path">
      <router-link :to="item.path">{{item.meta.title}}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>

</template>

<script>
  import Layout from "@/components/Layout";

  export default {
    name: "BradePath",
    data(){
      return{
        lists:[
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
            // meta: { title: '首页' },
            redirect: '/home', // 重定向 防止页面进来空白  默认选中侧边栏上的文字
            children: [
              {
                path: '/home',
                name: 'home',
                // meta: { title: '首页' },
                component: () => import('../views/HomeView')
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
                    path: '/usermanager/GouWuChe',
                    name: 'gouwuche',
                    meta: {title: '商品列表'},
                    component: () => import('../views/GouWuChe')
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
                   //定义一个数组 用于接收路由信息
      }
    },
    created() {
      console.log(this.$route.matched)
      this.lists = this.$route.matched  //获取路由内的全部信息
    },
    //这里必须使用监听，否则无法实时获取路由变动信息。
    // 监听后路由会实时变动，不然需要手动刷新路径才会改变
  watch:{
    $route(to,from)  {
      console.log(to)
      this.lists = to.matched

    }
  },
  }
</script>

