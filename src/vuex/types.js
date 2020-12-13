const mutations = {
  SET_ACCOUNT: 'SET_ACCOUNT'
}

const actions = {
  LOAD_ACCOUNT: 'LOAD_ACCOUNT'
}

const getters = {
  isLoggedIn: 'isLoggedIn',
  account: 'account',
}

export const vuexTypes = {
  ...mutations,
  ...actions,
  ...getters
}
