import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/editor', // #!zh 编辑器页面，核心功能部分
      name: 'editor',
      component: () => import('./views/About.vue')
    },
    {
      path: '/form-stat', // #!zh 表单统计页面
      name: 'form-stat',
      component: () => import('./views/About.vue')
    }
  ]
})
