import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios' // 导入包
import './assets/css/global.css'

axios.defaults.baseURL = '' // 配置请求根路径
Vue.prototype.$http = axios // 包挂载到vue的原型对象上; 每个vue的组件能通过this直接访问到$http, 从而发起ajax请求

Vue.config.productionTip = false
// require('../mock/index')

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
