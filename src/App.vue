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
  }
}
</script>
