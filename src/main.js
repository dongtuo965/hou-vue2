import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import VueParticles from 'vue-particles'
import * as echarts from 'echarts'
Vue.use(ElementUI)

Vue.use(Antd)


Vue.use(VueParticles)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
new Vue({
  router,
  store,
  // axios,
  render: h => h(App)
}).$mount('#app')
