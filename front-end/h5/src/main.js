import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
import './plugins/index'

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
