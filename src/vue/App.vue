<template>
  <v-app v-if="isAppInitialized">
    <template v-if="isLoggedIn">
      <dashboard-core-app-bar />

      <dashboard-core-drawer />
    </template>

    <router-view />

    <template v-if="isLoggedIn">
      <dashboard-core-footer />
    </template>

    <notification />
  </v-app>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  import { vuexTypes } from '@/vuex'
  import { Bus } from '@/js/helpers/event-bus'

  export default {
    name: 'app',
    components: {
      Notification: () => import('@/vue/common/Notification'),
      DashboardCoreAppBar: () => import('@/vue/navigation/AppBar'),
      DashboardCoreDrawer: () => import('@/vue/navigation/Drawer'),
      DashboardCoreFooter: () => import('@/vue/navigation/Footer'),
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
      this.$vuetify.theme.dark = true
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
        try {
          if (this.isLoggedIn) {
            await this.loadAccount(this.jwtToken)
          }
        } catch (error) {
          Bus.error('app.init-app-error-msg')
        }
        this.isAppInitialized = true
      },
    },
  }
</script>
