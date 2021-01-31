<template>
  <v-container class="UpdateWillRequests">
    <v-row />
  </v-container>
</template>

<script>
  import { WillRequestRecord } from '@/js/records/will-request.record'
  import { WillRequestFormer } from '@/js/formers/WillRequestFormer'
  import { Bus } from '@/js/helpers/event-bus'
  import { api } from '@/api'

  export default {
    name: 'UpdateWillRequests',
    data () {
      return {
        isLoaded: false,
        isLoadFailed: false,
        former: new WillRequestFormer(),
        willRequest: {},
      }
    },
    async created () {
      await this.loadWillRequest()
    },
    methods: {
      async loadWillRequest () {
        this.isLoaded = false
        this.isLoadFailed = false
        try {
          const { data } = await api.get(`/will-requests/${this.$route.params.id}`)
          this.willRequest = new WillRequestRecord(data)
        } catch (error) {
          Bus.error('update-will-request.loading-error')
          this.isLoadFailed = true
        }
        this.isLoaded = true
      },
    },
  }
</script>

<style scoped>

</style>
