import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
Vue.use(ElementUI);
Vue.prototype.$axios = axios
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
