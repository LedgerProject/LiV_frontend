<template>
  <v-app v-if="isAppInitialized">
    <template v-if="isLoggedIn">
      <dashboard-core-app-bar />

      <dashboard-core-drawer />

      <dashboard-core-view />

      <dashboard-core-settings />
    </template>
    <template v-else>
      <router-view />
    </template>
    <notification />
  </v-app>
</template>

<script>
  import Notification from '@/vue/common/Notification'
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import { vuexTypes } from '@/vuex'

  export default {
    name: 'App',
    components: {
      Notification,
      DashboardCoreAppBar: () => import('@/vue/navigation/AppBar'),
      DashboardCoreDrawer: () => import('@/vue/navigation/Drawer'),
      DashboardCoreSettings: () => import('@/vue/navigation/Settings'),
      DashboardCoreView: () => import('@/vue/navigation/View'),
    },
    data () {
      return {
        isAppInitialized: false,
      }
    },
    computed: {
      ...mapGetters([
        vuexTypes.jwtToken,
        vuexTypes.isLoggedIn,
      ]),
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
        loadAccount: vuexTypes.LOAD_ACCOUNT,
      }),
      async initApp () {
        await this.loadAccount(this.jwtToken)
        this.isAppInitialized = true
      },
    },
  }
</script>
