<template>
  <v-container class="will-requests-list">
    <v-row>
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
            <will-requests-table />
          </template>
          <template v-else>
            <v-alert
              border="right"
              colored-border
              type="error"
              elevation="2"
            >
              {{ 'will-requests-list.no-data-message' | globalize }}
            </v-alert>
          </template>
        </template>
        <template v-else>
          <v-skeleton-loader />
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import WillRequestsTable from '@/vue/pages/willRequests/WillRequestsTable'
  import { Bus } from '@/js/helpers/event-bus'
  import { api } from '@/api'
  import { WillRequestRecord } from '@/js/records/will-request.record'
  export default {
    name: 'WillRequestsList',
    components: { WillRequestsTable },
    data () {
      return {
        isLoaded: false,
        isLoadFalse: false,
        willRequests: [],
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
          const { data } = await api.get('/will-requests')
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
