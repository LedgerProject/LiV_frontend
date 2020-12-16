import Vue from 'vue';
import VueRouter from 'vue-router';
import { vueRoutes } from "@/routes/routes";
import {store, vuexTypes} from '@/vuex'

Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/auth',
      name: vueRoutes.auth.name,
      component: () => import('@/layouts/AuthLayout'),
      redirect: vueRoutes.login,
      children: [
        {
          path: '/login',
          name: vueRoutes.login.name,
          component: () => import('@/views/Login.vue'),
          beforeEnter: authPageGuard
        },
        {
          path: '/signup',
          name: vueRoutes.signup.name,
          component: () => import('@/views/Signup.vue'),
          beforeEnter: authPageGuard
        },
      ]
    },
    {
      path: '/',
      name: vueRoutes.app.name,
      component: () => import('@/layouts/ContentLayout'),
      beforeEnter: redirectRouteGuard,
      children: [
        {
          path: '/profile',
          name: vueRoutes.profile.name,
          component: () => import('@/views/Profile'),
          beforeEnter: inAppRouteGuard,
        },
        {
          path: '/statuses',
          name: vueRoutes.statuses.name,
          component: () => import('@/views/Statuses'),
          beforeEnter: inAppRouteGuard,
        },
        {
          path: '/companies',
          name: vueRoutes.companies.name,
          component: () => import('@/views/Companies'),
          redirect: vueRoutes.companiesAll,
          children: [
            {
              path: '/companies/all',
              props: true,
              name: vueRoutes.companiesAll.name,
              component: () => import('@/views/Companies/CompaniesAll'),
              beforeEnter: inAppRouteGuard
            },
            {
              path: '/companies/:id',
              props: true,
              name: vueRoutes.companiesSingle.name,
              component: () => import('@/views/Companies/CompaniesSingle'),
              beforeEnter: inAppRouteGuard
            },
          ]
        },
      ]
    },
  ],
});

export default router;

function redirectRouteGuard (to, from, next) {
  const isLoggedIn = store.getters[vuexTypes.isLoggedIn]
  if (isLoggedIn) {
    if (to.name === vueRoutes.app.name) {
      next(vueRoutes.companies)
    } else {
      next()
    }
  } else {
    next(vueRoutes.login)
  }
}

function authPageGuard (to, from, next) {
  const isLoggedIn = store.getters[vuexTypes.isLoggedIn]
  if (isLoggedIn) {
    next(vueRoutes.app)
  } else {
    next()
  }
}

function inAppRouteGuard (to, from, next) {
  const isLoggedIn = store.getters[vuexTypes.isLoggedIn]
  if (isLoggedIn) {
    next()
  } else {
    next(vueRoutes.app)
  }
}
