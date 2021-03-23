<template>
  <v-navigation-drawer
    class="sidebar"
    v-model="sidebar"
    :expand-on-hover="false"
    :right="$vuetify.rtl"
    mobile-break-point="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <v-list-item>
      <v-list-item-avatar
        class="align-self-center"
        color="white"
        contain
      >
        <v-img
          src="https://demos.creative-tim.com/vuetify-material-dashboard/favicon.ico"
          max-height="30"
        />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>
          {{ CONFIG.APP_NAME }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider class="mb-2 mt-2" />

    <v-list
      expand
      dense
      nav
    >
      <v-list-item
        :to="vueRoutes.willRequests"
      >
        <v-list-item-icon>
          <v-icon>mdi-book</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{ 'pages-names.will-requests' | globalize }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { vueRoutes } from '@/vue-router/routes'
import { CONFIG } from '@/config'
import { vuexTypes } from '@/vuex'

export default {
  name: 'dashboard-core-drawer',
  data: () => ({
    vueRoutes,
    CONFIG
  }),
  computed: {
    sidebar: {
      get () {
        return this.$store.state.sidebar
      },
      set (val) {
        this.$store.commit(vuexTypes.SET_SIDEBAR, val)
      }
    }
  }
}
</script>
