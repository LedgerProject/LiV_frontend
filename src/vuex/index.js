import Vue from 'vue'
import account from './modules/account.module'
import kyc from './modules/kyc.module'
import auth from './modules/auth.module'
import Vuex from 'vuex'
import { vuexTypes } from '@/vuex/types'
import { sessionStoragePlugin } from './plugins/session-storage'

Vue.use(Vuex)

export const rootModule = {
    state: {
        barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
        barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
        drawer: null,
    },
    mutations: {
        [vuexTypes.POP_STATE] () {},
        [vuexTypes.CLEAR_STATE] () {},
        SET_BAR_IMAGE (state, payload) {
            state.barImage = payload
        },
        SET_DRAWER (state, payload) {
            state.drawer = payload
        },
    },
    actions: {
        async [vuexTypes.LOG_OUT] ({ commit }) {
            commit(vuexTypes.CLEAR_STATE)
        },
        async [vuexTypes.LOG_IN] ({ getters, dispatch }, { email, password }) {
            await dispatch(vuexTypes.LOAD_JWT_TOKEN, { email, password })
            await dispatch(vuexTypes.LOAD_ACCOUNT, getters[vuexTypes.jwtToken])
        },
    },
    getters: {
        [vuexTypes.isLoggedIn]:
            (_, getters) => Boolean(getters[vuexTypes.account].email),
    },
}

let store

function buildStore () {
    store = new Vuex.Store({
        ...rootModule,
        modules: {
            account,
            kyc,
            auth,
        },
        plugins: [sessionStoragePlugin],
    })

    store.commit(vuexTypes.POP_STATE)

    return store
}

buildStore()

export { store, buildStore }
export { vuexTypes } from './types'
