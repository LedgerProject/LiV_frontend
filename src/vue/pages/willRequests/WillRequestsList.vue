<template>
  <material-card>
    <template v-slot:heading>
      <v-row>
        <v-btn
          class="ml-auto"
          color="info"
          :to="vueRoutes.createWillRequest"
        >
          {{ 'will-requests-list.create-will-request-btn' | globalize }}
        </v-btn>
      </v-row>
    </template>
    <v-card-text>
      <v-row class="will-requests-list">
        <v-col cols="12" lg="12">
          <template v-if="isLoaded">
            <template v-if="isLoadFalse">
              <v-alert
                border="right"
                colored-border
                type="error"
                elevation="2"
              >
                {{ 'will-requests-list.error-loading' | globalize }}
              </v-alert>
            </template>
            <template v-else-if="willRequests.length">
              <will-requests-table
                :will-requests="willRequests"
                @submitted="loadWillRequests"
              />
            </template>
            <template v-else>
              <v-alert
                border="right"
                colored-border
                type="info"
                elevation="2"
              >
                {{ 'will-requests-list.no-data-message' | globalize }}
              </v-alert>
            </template>
          </template>
          <template v-else>
            <v-progress-linear indeterminate />
          </template>
        </v-col>
      </v-row>
    </v-card-text>
  </material-card>
</template>

<script>
  import MaterialCard from '@/vue/common/base/MaterialCard'
  import WillRequestsTable from '@/vue/pages/willRequests/WillRequestsTable'
  import { Bus } from '@/js/helpers/event-bus'
  import { api } from '@/api'
  import { WillRequestRecord } from '@/js/records/will-request.record'
  import { vueRoutes } from '@/vue-router/routes'

  export default {
    name: 'WillRequestsList',
    components: { MaterialCard, WillRequestsTable },
    data () {
      return {
        isLoaded: false,
        isLoadFalse: false,
        willRequests: [],
        vueRoutes,
      }
    },
    async created () {
      await this.loadWillRequests()
    },
    methods: {
      async loadWillRequests () {
        this.isLoaded = false
        this.isLoadFalse = false
        try {
          const { data } = await api.get('/will-requests/')
          this.willRequests = data.map(el => new WillRequestRecord(el))
        } catch (error) {
          Bus.error('will-requests-list.loading-error')
          this.isLoadFalse = true
        }
        this.isLoaded = true
      },
    },
  }
</script>

<style scoped>

</style>
