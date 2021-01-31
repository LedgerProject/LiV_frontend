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
            redirect: vueRoutes.app,
        },
        {
            path: '/auth',
            name: vueRoutes.auth.name,
            redirect: vueRoutes.signIn,
            component: () => import('@/vue/pages/Auth'),
            children: [
                {
                    path: '/sign-in',
                    name: vueRoutes.signIn.name,
                    component: () => import('@/vue/pages/SignIn'),
                    beforeEnter: authPageGuard,
                },
                {
                    path: '/sign-up',
                    name: vueRoutes.signUp.name,
                    component: () => import('@/vue/pages/SignUp'),
                    beforeEnter: authPageGuard,
                },
                {
                    name: 'Notifications',
                    path: 'components/notifications',
                    component: () => import('@/vue/pages/Notifications'),
                    beforeEnter: authPageGuard,
                },
                {
                    name: 'Icons',
                    path: 'components/icons',
                    component: () => import('@/vue/pages/Icons'),
                    beforeEnter: authPageGuard,
                },
                {
                    name: 'Typography',
                    path: 'components/typography',
                    component: () => import('@/vue/pages/Typography'),
                    beforeEnter: authPageGuard,
                },
                {
                    name: 'Regular Tables',
                    path: 'tables/regular-tables',
                    component: () => import('@/vue/pages/RegularTables'),
                    beforeEnter: authPageGuard,
                },
                {
                    name: 'Google Maps',
                    path: 'maps/google-maps',
                    component: () => import('@/vue/pages/GoogleMaps'),
                    beforeEnter: authPageGuard,
                },
            ],
        },
        {
            path: '/',
            name: vueRoutes.app.name,
            component: () => import('@/vue/AppContent'),
            beforeEnter: redirectRouteGuard,
            children: [
                {
                    name: vueRoutes.profile.name,
                    path: '/profile',
                    component: () => import('@/vue/pages/UserProfile'),
                    beforeEnter: inAppRouteGuard,
                },
                {
                    path: '/dashboard',
                    name: vueRoutes.dashboard.name,
                    component: () => import('@/vue/pages/Dashboard'),
                    beforeEnter: inAppRouteGuard,
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
                            beforeEnter: inAppRouteGuard,
                        },
                        {
                            path: '/will-requests/:id',
                            name: vueRoutes.updateWillRequest.name,
                            component: () => import('@/vue/pages/willRequests/UpdateWillRequest'),
                            beforeEnter: inAppRouteGuard,
                        },
                        {
                            path: '/will-requests/create',
                            name: vueRoutes.createWillRequest.name,
                            component: () => import('@/vue/pages/willRequests/CreateWillRequest'),
                            beforeEnter: inAppRouteGuard,
                        },
                    ],
                },
            ],
        },
    ],
})

function redirectRouteGuard (to, from, next) {
    const isLoggedIn = store.getters[vuexTypes.isLoggedIn]
    if (isLoggedIn) {
        if (to.name === vueRoutes.app.name) {
            next(vueRoutes.dashboard)
        } else {
            next()
        }
    } else {
        next(vueRoutes.signIn)
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
