<template>
  <router-view />
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex"
import {vuexTypes} from "@/vuex"

export default {
  name: 'App',
  computed: {
    ...mapGetters([
      vuexTypes.jwtToken,
      vuexTypes.isLoggedIn
    ])
  },
  async created () {
    await this.initApp()
    this.watchChangesInLocalStorage()
  },
  methods: {
    ...mapMutations({
      popState: vuexTypes.POP_STATE,
      clearState: vuexTypes.CLEAR_STATE,
    }),
    ...mapActions({
      loadAccount: vuexTypes.LOAD_ACCOUNT
    }),
    async initApp () {
      await this.loadAccount(this.jwtToken)
    },
    watchChangesInLocalStorage () {
      window.onstorage = (storage) => {
        const isLocalStorageExists = localStorage.getItem('liv-storage')
        if ((this.isLoggedIn ||
          storage.newValue !== storage.oldValue) && isLocalStorageExists) {
          this.popState()
        } else {
          this.clearState()
        }
      }
    },
  }
}
</script>
