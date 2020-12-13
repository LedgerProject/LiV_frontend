import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/account.module'
import { vuexTypes } from '@/vuex/types'
import _isEmpty from 'lodash/isEmpty'

Vue.use(Vuex)

export const rootModule ={
  state: {},
  mutations: {},
  actions: {},
  getters: {
    [vuexTypes.isLoggedIn]: (_, getters) => _isEmpty(getters[vuexTypes.account])
  }
}

let store
function buildStore () {
  store = new Vuex.Store({
    ...rootModule,
    module: {
      account
    }
  })
  return store
}
buildStore()

export { store, buildStore }
export { vuexTypes } from './types'
