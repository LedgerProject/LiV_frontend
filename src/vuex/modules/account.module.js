import { vuexTypes } from '@/vuex/types'
import { api } from '@/api'
import { AccountRecord } from '@/js/records/account.record'
import { USER_ROLES } from '@/js/const/user-roles.const'

export const state = {
    account: {},
}
export const mutations = {
    [vuexTypes.SET_ACCOUNT] (state, account) {
        state.account = account
      console.log(state.account)
    },
}
export const actions = {
    async [vuexTypes.LOAD_ACCOUNT] ({ commit }, token) {
        let result = {}
        try {
            const { data } = await api.post('/users/verifyJWT', {
                jwt: token,
            })
            result = data
        } catch (error) {
            result = {}
        }
        commit(vuexTypes.SET_ACCOUNT, result)
    },
}
export const getters = {
    [vuexTypes.account]: state => new AccountRecord(state.account),
    [vuexTypes.isAccountGeneral]: (_, getters) =>
        +getters[vuexTypes.account].role === USER_ROLES.general,
    [vuexTypes.isAccountNotary]: (_, getters) =>
        +getters[vuexTypes.account].role === USER_ROLES.notary,
    [vuexTypes.isAccountRegistry]: (_, getters) =>
        +getters[vuexTypes.account].role === USER_ROLES.registry,
}

export default {
    state,
    mutations,
    actions,
    getters,
}
