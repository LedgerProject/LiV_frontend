import {vuexTypes} from "@/vuex";

export const sessionStoragePlugin = store => {
  store.subscribe((mutation, state) => {
    switch (mutation.type) {
      case vuexTypes.SET_JWT_TOKEN: {
        setLocalStorage(state)
        break;
      }
      case vuexTypes.CLEAR_STATE: {
        localStorage.removeItem('liv-storage')
        store.replaceState({})
        break
      }
      case vuexTypes.POP_STATE: {
        let savedStore = localStorage.getItem('liv-storage')
        if (!savedStore) break
        savedStore = JSON.parse(savedStore)
        store.replaceState({
          ...state,
          account: savedStore.account,
          auth: savedStore.auth
        })
        break
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
