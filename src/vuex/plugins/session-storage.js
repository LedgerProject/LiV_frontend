import {vuexTypes} from "@/vuex";

export const sessionStoragePlugin = store => {
  store.subscribe((mutation, state) => {
    switch (mutation.type) {
      case vuexTypes.SET_JWT_TOKEN: {
        setLocalStorage(state)
        break;
      }
      default: {
        setLocalStorage(state)
        break;
      }
    }
  })
}


function setLocalStorage (state) {
  localStorage.setItem('liv-storage', JSON.stringify({
    account: state.account,
    auth: state.auth,
  }))
}
