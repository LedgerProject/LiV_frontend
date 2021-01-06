import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/account.module'
import auth from './modules/auth.module'
import { vuexTypes } from '@/vuex/types'
import _isEmpty from 'lodash/isEmpty'
import {sessionStoragePlugin} from "@/vuex/plugins/session-storage"

Vue.use(Vuex)

export const rootModule = {
  state: {},
  mutations: {
    [vuexTypes.POP_STATE] () {},
    [vuexTypes.CLEAR_STATE] () { },
  },
  actions: {
      async [vuexTypes.LOG_OUT] ({ commit  }) {
        commit(vuexTypes.CLEAR_STATE)
    },
    async [vuexTypes.LOG_IN] ({ getters, dispatch }, { email, password }) {
      await dispatch(vuexTypes.LOAD_JWT_TOKEN, { email, password })
      await dispatch(vuexTypes.LOAD_ACCOUNT, getters[vuexTypes.jwtToken])
    }
  },
  getters: {
    [vuexTypes.isLoggedIn]: (_, getters) => !_isEmpty(getters[vuexTypes.account])
  }
}

let store
function buildStore () {
  store = new Vuex.Store({
    ...rootModule,
    modules: {
      account,
      auth,
    },
    plugins: [sessionStoragePlugin]
  })
  store.commit(vuexTypes.POP_STATE)
  return store
}
buildStore()

export { store, buildStore }
export { vuexTypes } from './types'
