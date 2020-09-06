import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {name: 'main'}
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/Auth.vue'),
    meta: {layout: 'empty', title: 'Авторизация'}
  },
  {
    path: '/profile/user/',
    name: 'main',
    component: () => import('../views/Profile/user/index.vue'),
    meta: {layout: 'main'},
    beforeEnter(to, from, next) {
      if (to.name === 'main') {
        next('/profile/user/settings')
      } else {
        next()
      }
    },
    children: [
      {
        path: 'settings',
        name: 'profileSettings',
        component: () => import('../views/Profile/user/ProfileSettings.vue'),
        meta: {layout: 'main', title: 'Профиль', siteContext: 'Для корректной работы кабинета, указывайте только настоящие данные'},
      },
      {
        path: 'support',
        name: 'profileSupport',
        component: () => import('../views/Profile/user/ProfileSupport.vue'),
        meta: {layout: 'main', title: 'Тех поддержка'},
        children: [
          {
            path: ':id',
            name: 'profileSupportRequest',
            component: () => import('../views/Profile/user/ProfileSupport.vue'),
            meta: {layout: 'main', title: 'Заявка'}
          }
        ]
      },
    ]
  },
  {
    path: '/profile/company',
    name: 'main-company',
    component: () => import('../views/Profile/company/index.vue'),
    meta: {layout: 'main'},
    beforeEnter(to, from, next) {
      if (to.name === 'main-company') {
        next('/profile/company/settings')
      } else {
        next()
      }
    },
    children: [
      {
        path: 'settings',
        name: 'companySettings',
        component: () => import('../views/Profile/company/ProfileSettings.vue'),
        meta: {layout: 'main', title: 'Профиль', siteContext: 'Для корректной работы кабинета, указывайте только настоящие данные'},
      },
      {
        path: 'support',
        name: 'companySupport',
        component: () => import('../views/Profile/company/ProfileSupport.vue'),
        meta: {layout: 'main', title: 'Тех поддержка'},
        children: [
          {
            path: ':id',
            name: 'companySupportRequest',
            component: () => import('../views/Profile/company/ProfileSupport.vue'),
            meta: {layout: 'main', title: 'Заявка'}
          }
        ]
      },
    ]
  },
  {
    path: '/my-cards',
    name: 'MyCards',
    component: () => import('../views/MyCards.vue'),
    meta: {layout: 'main', title: 'Мои карты'}
  },
  {
    path: '/paymaster-window',
    name: 'PaymasterWindow',
    component: () => import('../views/PaymasterWindow.vue'),
    meta: {layout: 'main', title: 'Окно кассира'}
  },
  {
    path: '/clients',
    name: 'Clients',
    component: () => import('../views/Clients.vue'),
    meta: {layout: 'main', title: 'Клиенты'}
  },
  {
    path: '/my-cards/:id',
    name: 'MyCardInfo',
    component: () => import('../views/MyCardInfo.vue'),
    meta: {layout: 'main', title: 'Мои карты'}
  },
  // {
  //   path: '/transactions/',
  //   name: 'Transactions',
  //   component: () => import('../views/Transactions.vue'),
  //   meta: {layout: 'main', title: 'Транзакции'},
  // },
  {
    path: '/user/admission/',
    name: 'TransAdmission',
    component: () => import('../components/transactions/Admission.vue'),
    meta: {layout: 'main', title: 'Начисления', hideTitle: true}
  },
  {
    path: '/user/write-off/',
    name: 'TransWriteOff',
    component: () => import('../components/transactions/WriteOff.vue'),
    meta: {layout: 'main', title: 'Списания', hideTitle: true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach((to, from) => {
  store.commit('setTitle', to.meta.title)
  store.commit('setSiteContext', to.meta.siteContext)
})

export default router
