<template>
  <v-container fluid>
    <material-card>
      <template v-slot:heading>
        <v-row
          class="align-center"
        >
          <template v-if="isAccountGeneral || isAccountNotary">
            <v-select
              v-model="filters.status"
              class="will-requests-list__select-status"
              :label="'will-requests-list.select-status-lbl' | globalize"
              :items="WILL_REQUEST_STATUSES_SELECT"
              @change="reloadList"
            />
          </template>
          <template v-if="isAccountGeneral">
            <v-select
              v-model="filters.recipientId"
              class="will-requests-list__select-owner mx-5"
              :label="'will-requests-list.select-owner-lbl' | globalize"
              :items="OWNER_SELECT"
              @change="reloadList"
            />
          </template>
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
                  {{ 'will-requests-list.loading-error' | globalize }}
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
  </v-container>
</template>

<script>
  import MaterialCard from '@/vue/common/base/MaterialCard'
  import WillRequestsTable from '@/vue/pages/willRequests/WillRequestsTable'
  import { WillRequestRecord } from '@/js/records/will-request.record'
  import { globalize } from '@/vue/filters/globalize'
  import { globalizeWillRequestStatus } from '@/vue/filters/globalizeWillRequestStatus'
  import { WILL_REQUEST_STATUSES } from '@/js/const/will-statuses.const'
  import { vueRoutes } from '@/vue-router/routes'
  import { mapGetters } from 'vuex'
  import { vuexTypes } from '@/vuex'
  import { Bus } from '@/js/helpers/event-bus'
  import { api } from '@/api'

  export default {
    name: 'WillRequestsList',
    components: { MaterialCard, WillRequestsTable },
    data () {
      return {
        isLoaded: false,
        isLoadFalse: false,
        willRequests: [],
        filters: {
          status: WILL_REQUEST_STATUSES.submitted,
          recipientId: 0,
        },
        vueRoutes,
        WILL_REQUEST_STATUSES,
      }
    },
    computed: {
      ...mapGetters([
        vuexTypes.account,
        vuexTypes.isAccountGeneral,
        vuexTypes.isAccountNotary,
        vuexTypes.isAccountRegistry,
      ]),
      WILL_REQUEST_STATUSES_SELECT () {
        return Object.values(this.WILL_REQUEST_STATUSES).map(status => ({
          text: globalizeWillRequestStatus(status),
          value: status,
        }))
      },
      OWNER_SELECT () {
        return [
          {
            text: globalize('will-requests-list.from-me-opt'),
            value: 0,
          },
          {
            text: globalize('will-requests-list.for-me-opt'),
            value: this.account.id,
          },
        ]
      },
    },
    async created () {
      await this.loadWillRequests()
    },
    methods: {
      getFilters () {
        return {
          ...(
            this.isAccountGeneral
              ? { creatorId: this.account.id }
              : {}
          ),
          ...(
            this.filters.recipientId
              ? { recipientId: this.filters.recipientId }
              : {}
          ),
          // REFACTOR!!!
          status: this.filters.status,
          ...(
            this.isAccountRegistry
              ? { status: WILL_REQUEST_STATUSES.approved }
              : {}
          ),
        }
      },
      async loadWillRequests () {
        this.isLoaded = false
        this.isLoadFalse = false
        try {
          const { data } = await api.get('/will-requests/', {
            params: {
              pageDto: {
                order: 'desc',
                limit: 100,
              },
              filterDto: {
                ...this.getFilters(),
              },
            },
          })
          this.willRequests = data.map(el => new WillRequestRecord(el))
        } catch (error) {
          Bus.error('will-requests-list.loading-error')
          this.isLoadFalse = true
        }
        this.isLoaded = true
      },
      reloadList () {
        this.loadWillRequests()
      },
    },
  }
</script>

<style lang="scss" scoped>
.will-requests-list {

  &__select-status {
    max-width: 15rem;
  }

  &__select-owner {
    max-width: 15rem;
  }
}
</style>
