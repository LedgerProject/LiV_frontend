<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    color="transparent"
    flat
    height="75"
  >
    <v-btn
      class="mr-3 d-lg-none"
      elevation="1"
      fab
      small
      @click="setDrawer(!drawer)"
    >
      <v-icon>
        {{ `mdi-chevron-${drawer ? 'left' : 'right'}` }}
      </v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
    />

    <v-spacer />

    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          class="ml-2"
          min-width="0"
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-account</v-icon>
          {{ account.email }}
        </v-btn>
      </template>

      <v-list
        :tile="false"
        min-width="250"
        nav
      >
        <v-list-item
          :to="vueRoutes.profile"
        >
          {{ 'app-bar.profile-link' | globalize }}
        </v-list-item>
        <v-list-item
          @click="logOut"
        >
          {{ 'app-bar.log-out' | globalize }}
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
  // Utilities
  import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
  import { vuexTypes } from '@/vuex'
  import { vueRoutes } from '@/vue-router/routes'

  export default {
    name: 'DashboardCoreAppBar',
    data: () => ({
      vueRoutes,
    }),
    computed: {
      ...mapState([
        'drawer',
      ]),
      ...mapGetters([
        vuexTypes.account,
      ]),
    },
    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
      ...mapActions({
        logOutAccount: vuexTypes.LOG_OUT,
      }),
      async logOut () {
        await this.logOutAccount()
        window.location.reload()
      },
    },
  }
</script>
