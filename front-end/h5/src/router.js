import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/utils/auth'
import Home from './views/work-manager/index.vue'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      redirect: '/work-manager/list',
      meta: { requireAuth: true },
      children: [
        {
          path: '/work-manager/list',
          name: 'work-manager-list',
          meta: { requireAuth: true },
          component: () => import('@/views/work-manager/list.vue') },
        {
          path: '/work-manager/templates',
          name: 'work-manager-templates',
          component: () => import('@/views/work-manager/templates.vue')
        },
        {
          path: '/work-manager/form-stat',
          name: 'form-stat',
          component: () => import('@/views/work-manager/form-stat/index.vue')
        },
        {
          path: '/work-manager/stat-detail/:id',
          name: 'stat-detail',
          component: () => import('@/views/work-manager/form-stat/detail.vue')
        }
      ]
    },
    {
      path: '/Login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/editor/:workId', // #!zh 编辑器页面，核心功能部分
      name: 'editor',
      component: () => import('./views/Editor.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  let isAuthenticated = !!Auth.getToken()
  if (to.name !== 'login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})

export default router
