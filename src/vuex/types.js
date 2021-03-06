const mutations = {
  // root
  POP_STATE: 'POP_STATE',
  CLEAR_STATE: 'CLEAR_STATE',

  // auth
  SET_JWT_TOKEN: 'SET_JWT_TOKEN',

  // account
  SET_ACCOUNT: 'SET_ACCOUNT',

  // kyc
  SET_KYC: 'SET_KYC',

  // sidebar
  SET_SIDEBAR: 'SET_SIDEBAR'
}

const actions = {
  // root
  LOG_IN: 'LOG_IN',
  LOG_OUT: 'LOG_OUT',

  // auth
  LOAD_JWT_TOKEN: 'LOAD_JWT_TOKEN',

  // account
  VERIFY_JWT: 'VERIFY_JWT',
  LOAD_ACCOUNT: 'LOAD_ACCOUNT',

  // kyc
  LOAD_KYC: 'LOAD_KYC'
}

const getters = {
  // root
  isLoggedIn: 'isLoggedIn',

  // auth
  jwtToken: 'jwtToken',

  // account
  account: 'account',
  isAccountGeneral: 'isAccountGeneral',
  isAccountNotary: 'isAccountNotary',
  isAccountRegistry: 'isAccountRegistry',

  // account
  kyc: 'kyc',
  isKycExist: 'isKycExist'
}

export const vuexTypes = {
  ...mutations,
  ...actions,
  ...getters
}
