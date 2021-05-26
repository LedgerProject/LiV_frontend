import Vue from 'vue'
import Router from 'vue-router'
import { vueRoutes } from '@/vue-router/routes'
import { store, vuexTypes } from '@/vuex'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: vueRoutes.app.name,
      redirect: vueRoutes.signIn,
      component: () => import('@/vue/navigation/View'),
      children: [
        {
          path: '/sign-in',
          name: vueRoutes.signIn.name,
          component: () => import('@/vue/pages/SignIn'),
          beforeEnter: authPageGuard
        },
        {
          path: '/sign-up',
          name: vueRoutes.signUp.name,
          component: () => import('@/vue/pages/SignUp'),
          beforeEnter: authPageGuard
        },
        {
          name: vueRoutes.profile.name,
          path: '/profile',
          component: () => import('@/vue/pages/UserProfile'),
          beforeEnter: inAppRouteGuard
        },
        {
          path: '/will-requests',
          name: vueRoutes.willRequests.name,
          component: () => import('@/vue/pages/WillRequests'),
          redirect: vueRoutes.willRequestsList,
          children: [
            {
              path: '/will-requests/list',
              name: vueRoutes.willRequestsList.name,
              component: () => import('@/vue/pages/willRequests/WillRequestsList'),
              beforeEnter: inAppRouteGuard
            },
            {
              path: '/will-requests/create',
              name: vueRoutes.createWillRequest.name,
              component: () => import('@/vue/pages/willRequests/CreateWillRequest'),
              beforeEnter: inAppRouteGuard,
              props: true
            },
            {
              path: '/will-requests/:id',
              name: vueRoutes.willRequestDetails.name,
              component: () => import('@/vue/pages/willRequests/WillRequestDetails'),
              props: true,
              beforeEnter: inAppRouteGuard
            }
          ]
        }
      ]
    }
  ]
})

function authPageGuard (to, from, next) {
  const isLoggedIn = store.getters[vuexTypes.isLoggedIn]
  if (isLoggedIn) {
    next(vueRoutes.willRequests)
  } else {
    next()
  }
}

function inAppRouteGuard (to, from, next) {
  const isLoggedIn = store.getters[vuexTypes.isLoggedIn]
  if (isLoggedIn) {
    next()
  } else {
    next(vueRoutes.signIn)
  }
}
