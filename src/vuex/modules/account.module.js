import { vuexTypes } from '@/vuex/types'
import { api } from "@/api";

export const state = {
  account: {}
}
export const mutations = {
  [vuexTypes.SET_ACCOUNT] (state, account) {
    state.account = account
  }
}
export const actions = {
  async [vuexTypes.LOAD_ACCOUNT] ({ commit }, token) {
    // const { data } = await api.post('/validate', {
    //   jwt: token
    // })
    commit(vuexTypes.SET_ACCOUNT, {
      id: '1',
      firstname: 'firstname',
      lastname: 'lastname',
      email: 'qwerty1@gmail.com'
    })
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
