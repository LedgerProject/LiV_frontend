<template>
  <v-container class="will-request-details">
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <material-card>
          <template v-slot:heading>
            <h1 class="heading-2">
              {{ willRequest.documentHash }}
            </h1>
          </template>
          <v-card-text>
            <v-row>
              <v-col
                cols="12"
                md="5"
              >
                <div class="text-h4 mb-5">
                  {{ 'will-request-details.creator-title' | globalize }}
                </div>
                <v-simple-table>
                  <template v-slot:default>
                    <tbody>
                      <tr>
                        <td>
                          {{ `will-request-details.email` | globalize }}
                        </td>
                        <td>
                          {{ willRequest.creator.email }}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {{ `will-request-details.role` | globalize }}
                        </td>
                        <td>
                          {{ willRequest.creator.role | globalizeUserRole }}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {{ `will-request-details.address` | globalize }}
                        </td>
                        <td>
                          {{ willRequest.creator.address }}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {{ `will-request-details.full-name` | globalize }}
                        </td>
                        <td>
                          {{ willRequest.creator.fullName }}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {{ `will-request-details.passport-number` |
                            globalize }}
                        </td>
                        <td>
                          {{ willRequest.creator.passportNumber }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
              <v-col
                cols="12"
                md="2"
              />
              <v-col
                cols="12"
                md="5"
              >
                <div class="text-h4 mb-5">
                  {{ 'will-request-details.recipient-title' | globalize }}
                </div>
                <v-simple-table>
                  <template v-slot:default>
                    <tbody>
                      <tr>
                        <td>
                          {{ `will-request-details.email` | globalize }}
                        </td>
                        <td>
                          {{ willRequest.recipient.email }}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {{ `will-request-details.role` | globalize }}
                        </td>
                        <td>
                          {{ willRequest.recipient.role | globalizeUserRole }}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {{ `will-request-details.address` | globalize }}
                        </td>
                        <td>
                          {{ willRequest.recipient.address }}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {{ `will-request-details.full-name` | globalize }}
                        </td>
                        <td>
                          {{ willRequest.recipient.fullName }}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {{ `will-request-details.passport-number` |
                          globalize }}
                        </td>
                        <td>
                          {{ willRequest.recipient.passportNumber }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                md="12"
              >
                <a
                  :href="willRequest.documentLink"
                  target="_blank"
                >
                  <v-btn
                    class="v-btn mr-3"
                    color="primary"
                    :href="willRequest.documentLink"
                    target="_blank"
                  >
                    {{ 'will-request-details.load-file' | globalize }}
                  </v-btn>
                </a>
                <template
                  v-if="isAccountNotary"
                >
                  <template v-if="isWillRequestSubmitted">
                    <v-btn
                      class="mr-3"
                      color="success"
                      :disabled="formMixin.isDisabled"
                      @click="approveWillRequest"
                    >
                      {{ 'will-request-details.approve-btn' | globalize }}
                    </v-btn>
                    <v-btn
                      color="error"
                      :disabled="formMixin.isDisabled"
                      @click="rejectWillRequest"
                    >
                      {{ 'will-request-details.reject-btn' | globalize }}
                    </v-btn>
                  </template>
                  <template v-else-if="isWillRequestNotified">
                    <v-btn
                      color="primary"
                      :disabled="formMixin.isDisabled"
                      @click="releaseWillRequest"
                    >
                      {{ 'will-request-details.release-btn' | globalize }}
                    </v-btn>
                  </template>
                </template>
                <template v-else-if="isAccountRegistry">
                  <v-btn
                    v-if="isWillRequestApproved"
                    color="success"
                    :disabled="formMixin.isDisabled"
                    @click="notifyWillRequest"
                  >
                    {{ 'will-request-details.notify-btn' | globalize }}
                  </v-btn>
                </template>
                <v-progress-circular
                  v-if="formMixin.isDisabled"
                  indeterminate
                />
              </v-col>
            </v-row>
          </v-card-text>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MaterialCard from '@/vue/common/base/MaterialCard'
import FormMixin from '@/vue/mixins/form.mixin'
import { WillRequestRecord } from '@/js/records/will-request.record'
import { Bus } from '@/js/helpers/event-bus'
import { api } from '@/api'
import { WILL_REQUEST_STATUSES } from '@/js/const/will-statuses.const'
import { mapGetters } from 'vuex'
import { vuexTypes } from '@/vuex'
import { notifyWillRequest, releaseWillRequest } from '@/js/helpers/will-request-helper'

export default {
  name: 'will-request-details',
  components: { MaterialCard },
  mixins: [FormMixin],
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isLoaded: false,
      isLoadFailed: false,
      willRequest: new WillRequestRecord(),
      WILL_REQUEST_STATUSES
    }
  },
  computed: {
    ...mapGetters([
      vuexTypes.isAccountGeneral,
      vuexTypes.isAccountNotary,
      vuexTypes.isAccountRegistry
    ]),
    isWillRequestSubmitted () {
      return +this.willRequest.statusId === WILL_REQUEST_STATUSES.submitted
    },
    isWillRequestApproved () {
      return +this.willRequest.statusId === WILL_REQUEST_STATUSES.approved
    },
    isWillRequestNotified () {
      return +this.willRequest.statusId === WILL_REQUEST_STATUSES.notified
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
        const { data } = await api.get(`/will-requests/${this.id}`)
        this.willRequest = new WillRequestRecord(data)
      } catch (error) {
        Bus.error(error)
        this.isLoadFailed = true
      }
      this.isLoaded = true
    },
    async approveWillRequest () {
      this.disableForm()
      try {
        await api.post('/will-requests/approve', [{
          willRequestId: this.id
        }])
        await this.loadWillRequest()
        Bus.success('will-request-details.approve-success')
      } catch (error) {
        Bus.error('will-request-details.approve-error')
      }
      this.enableForm()
    },
    async rejectWillRequest () {
      this.disableForm()
      try {
        await api.post('/will-requests/reject', [{
          willRequestId: this.id
        }])
        await this.loadWillRequest()
        Bus.success('will-request-details.reject-success')
      } catch (error) {
        Bus.error('will-request-details.reject-error')
      }
      this.enableForm()
    },
    async notifyWillRequest () {
      this.disableForm()
      try {
        await notifyWillRequest(this.id)
        await this.loadWillRequest()
        Bus.success('will-request-details.notify-success')
      } catch (error) {
        Bus.error('will-request-details.notify-error')
      }
      this.enableForm()
    },
    async releaseWillRequest () {
      this.disableForm()
      try {
        await releaseWillRequest(this.id)
        await this.loadWillRequest()
        Bus.success('will-request-details.release-success')
      } catch (error) {
        Bus.error('will-request-details.release-error')
      }
      this.enableForm()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
