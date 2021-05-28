<template>
  <v-app-bar
    class="navbar"
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
      @click="setSidebar(!sidebar)"
    >
      <v-icon>
        {{ `mdi-chevron-${sidebar ? 'left' : 'right'}` }}
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
          {{ 'navbar.profile-link' | globalize }}
        </v-list-item>
        <v-list-item
          @click.stop="true"
        >
          <v-switch
            v-model="$vuetify.theme.dark"
            inset
          />
          <v-icon class="ml-auto">
            {{ `mdi-brightness-${$vuetify.theme.dark ? 3 : 5}` }}
          </v-icon>
        </v-list-item>
        <v-list-item
          @click="logOut"
        >
          {{ 'navbar.log-out' | globalize }}
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
  name: 'navbar',
  data: () => ({
    vueRoutes,
  }),
  computed: {
    ...mapState([
      'sidebar',
    ]),
    ...mapGetters([
      vuexTypes.account,
    ]),
  },
  methods: {
    ...mapMutations({
      setSidebar: vuexTypes.SET_SIDEBAR,
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
