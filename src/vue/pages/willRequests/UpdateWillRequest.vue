<template>
  <v-container class="UpdateWillRequests">
    <v-row>
      <v-col cols="12" md="12">
        <material-card>
          <template v-slot:heading>
            <h1
              class="heading-2"
            >
              {{ 'update-will-request.title' | globalize }}
              <v-btn
                class="float-right"
                text
                disabled
              >
                {{ former._initAttrs.statusId | globalizeWillRequest }}
              </v-btn>
            </h1>
          </template>
          <v-card-text>
            <template v-if="isLoaded">
              <template v-if="isLoadFailed">
                <v-alert
                  border="right"
                  colored-border
                  type="error"
                  elevation="2"
                >
                  {{ 'update-will-request.loading-error' | globalize }}
                </v-alert>
              </template>
              <template v-else>
                <will-request-form
                  :former="former"
                  @submitted="loadWillRequest"
                />
              </template>
            </template>
            <template v-else>
              <v-progress-linear indeterminate />
            </template>
          </v-card-text>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import MaterialCard from '@/vue/common/base/MaterialCard'
  import WillRequestForm from '@/vue/forms/WillRequestForm'
  import { WillRequestRecord } from '@/js/records/will-request.record'
  import { WillRequestFormer } from '@/js/formers/WillRequestFormer'
  import { Bus } from '@/js/helpers/event-bus'
  import { api } from '@/api'

  export default {
    name: 'UpdateWillRequests',
    components: { WillRequestForm, MaterialCard },
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
          this.former = new WillRequestFormer(this.willRequest)
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
