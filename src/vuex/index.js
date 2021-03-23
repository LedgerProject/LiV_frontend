import Vue from 'vue'
import account from './modules/account.module'
import auth from './modules/auth.module'
import { sessionStoragePlugin } from './plugins/session-storage'
import _isEmpty from 'lodash/isEmpty'
import Vuex from 'vuex'
import { vuexTypes } from '@/vuex/types'

Vue.use(Vuex)

export const rootModule = {
  state: {
    sidebar: null
  },
  mutations: {
    [vuexTypes.POP_STATE] () {},
    [vuexTypes.CLEAR_STATE] () {},
    [vuexTypes.SET_SIDEBAR] (state, payload) {
      state.sidebar = payload
    }
  },
  actions: {
    async [vuexTypes.LOG_OUT] ({ commit }) {
      commit(vuexTypes.CLEAR_STATE)
    },
    async [vuexTypes.LOG_IN] ({ getters, dispatch }, { email, password }) {
      await dispatch(vuexTypes.LOAD_JWT_TOKEN, { email, password })
      await dispatch(vuexTypes.LOAD_ACCOUNT, getters[vuexTypes.jwtToken])
    }
  },
  getters: {
    [vuexTypes.isLoggedIn]: (_, getters) =>
      !_isEmpty(getters[vuexTypes.account])
  }
}

let store

function buildStore () {
  store = new Vuex.Store({
    ...rootModule,
    modules: {
      account,
      auth
    },
    plugins: [sessionStoragePlugin]
  })

  store.commit(vuexTypes.POP_STATE)

  return store
}

buildStore()

export { store, buildStore }
export { vuexTypes } from './types'
