import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
// import './registerServiceWorker'
// import ElementUI from 'element-ui'
import Antd from 'ant-design-vue'

// import 'element-ui/lib/theme-chalk/index.css'
import 'ant-design-vue/dist/antd.css'
// !#zh 请注意，务必使用 font-awesome@4.7.0 版本
import 'font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = false
Vue.use(Antd)
// Vue.use(ElementUI)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
