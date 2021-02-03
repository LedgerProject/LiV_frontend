import { KycRecord } from '@/js/records/kyc.record'
import { api } from '@/api'
import { vuexTypes } from '@/vuex/types'

export const state = {
  kyc: {},
}
export const mutations = {
  [vuexTypes.SET_KYC] (state, kyc) {
    state.kyc = kyc
  },
}
export const actions = {
  async [vuexTypes.LOAD_KYC] ({ commit }, accountId) {
    const { data } = await api.post(`/users/${accountId}/kyc`)
    commit(vuexTypes.SET_KYC, data)
  },
}
export const getters = {
  [vuexTypes.kyc]: state => new KycRecord(state.kyc),
}

export default {
  state,
  mutations,
  actions,
  getters,
}
