import Vue from 'vue';
import VueRouter from 'vue-router';
import { vueRoutes } from "@/routes/routes";

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
          path: '/services',
          name: vueRoutes.services.name,
          component: () => import('@/views/Services'),
          beforeEnter: inAppRouteGuard,
        },
        {
          path: '/profile',
          name: vueRoutes.profile.name,
          component: () => import('@/views/Profile'),
          beforeEnter: inAppRouteGuard,
        }
      ]
    },
  ],
});

export default router;
const isLoggedIn = false

function redirectRouteGuard (to, from, next) {
  if (isLoggedIn) {
    if (to.name === vueRoutes.app.name) {
      next(vueRoutes.services)
    } else {
      next()
    }
  } else {
    next(vueRoutes.login)
  }
}

function authPageGuard (to, from, next) {
  if (isLoggedIn) {
    next(vueRoutes.app)
  } else {
    next()
  }
}

function inAppRouteGuard (to, from, next) {
  if (isLoggedIn) {
    next()
  } else {
    next(vueRoutes.app)
  }
}
