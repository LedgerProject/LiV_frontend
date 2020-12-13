import { vuexTypes } from '@/vuex/types'

export const state = {
  account: {}
}
export const mutations = {
  [vuexTypes.SET_ACCOUNT] ({state}, account) {
    state.account = account
  }
}
export const actions = {
  [vuexTypes.LOAD_ACCOUNT] ({ commit }) {
    const data = {
      name: 'name',
      surname: 'surname'
    }
    commit(vuexTypes.SET_ACCOUNT, data)
  }
}
export const getters = {
  [vuexTypes.account]: state => state.account
}

export default {
  state,
  mutations,
  actions,
  getters
}
