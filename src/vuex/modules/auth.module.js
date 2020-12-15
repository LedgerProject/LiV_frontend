import { vuexTypes } from '@/vuex/types'
import { api } from "@/api";
import _get from "lodash/get";

export const state = {
  jwtToken: ''
}
export const mutations = {
  [vuexTypes.SET_JWT_TOKEN] (state, jwtToken) {
    state.jwtToken = jwtToken
  }
}
export const actions = {
  async [vuexTypes.LOAD_JWT_TOKEN] ({ commit }, { email, password }) {
    // const { data } = await api.post('/login', {
    //   email: email,
    //   password: password
    // })
    commit(vuexTypes.SET_JWT_TOKEN, 'h kjsdfakjhs dgfkjha sdkjhfakshdgfakshd gfkhadsgkhfagsdkjfagsdjkhfgakjs gfasdf')
  }
}
export const getters = {
  [vuexTypes.jwtToken]: state => state.jwtToken
}

export default {
  state,
  mutations,
  actions,
  getters
}
