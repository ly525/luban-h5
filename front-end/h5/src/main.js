import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
// import './registerServiceWorker'
// import ElementUI from 'element-ui'
import { ColorPicker, Button } from 'element-ui'
import Antd from 'ant-design-vue'

// import 'element-ui/lib/theme-chalk/index.css'
import 'ant-design-vue/dist/antd.css'
// !#zh 请注意，务必使用 font-awesome@4.7.0 版本
import 'font-awesome/css/font-awesome.min.css'
import vClickOutside from 'v-click-outside'

Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(vClickOutside)

/**
 * #!en import element-ui color picker for bgcolor、color, because a-input(ant-design-vue) component do not support alpha
 * #!zh 引入 element-ui 颜色选择器，因为 ant-design-vue 没有提供颜色选择器，默认的 <a-input type="color" /> 不支持选择透明度
 *
 * https://github.com/ly525/luban-h5/issues/105
 */
Vue.component(Button.name, Button)
Vue.component(ColorPicker.name, ColorPicker)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
