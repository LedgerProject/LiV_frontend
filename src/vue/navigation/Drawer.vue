<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    :src="barImage"
    mobile-break-point="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img
        :gradient="`to bottom, ${barColor}`"
        v-bind="props"
      />
    </template>

    <v-divider class="mb-1" />

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

    <v-divider class="mb-2" />

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
  import { mapState } from 'vuex'
  import { vueRoutes } from '@/vue-router/routes'
  import { CONFIG } from '@/config'

  export default {
    name: 'dashboard-core-drawer',
    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      vueRoutes,
      CONFIG,
    }),

    computed: {
      ...mapState(['barColor', 'barImage']),
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
    },
  }
</script>

<style lang="scss">

</style>
