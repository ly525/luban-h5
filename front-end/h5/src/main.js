import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import './registerServiceWorker'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// !#zh 请注意，务必使用 font-awesome@4.7.0 版本
import 'font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = false
Vue.use(Antd)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
