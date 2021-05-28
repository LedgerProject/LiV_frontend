<template>
  <div class="will-requests-table">
    <v-simple-table>
      <thead>
        <tr>
          <th class="primary--text">
            {{ 'will-requests-table.id-th' | globalize }}
          </th>
          <th class="primary--text">
            {{ 'will-requests-table.creator-th' | globalize }}
          </th>
          <th class="primary--text">
            {{ 'will-requests-table.recipient-th' | globalize }}
          </th>
          <th class="primary--text">
            {{ 'will-requests-table.status-th' | globalize }}
          </th>
          <th
            v-if="!isAccountGeneral"
            class="text-right primary--text"
          >
            {{ 'will-requests-table.action-th' | globalize }}
          </th>
        </tr>
      </thead>

      <tbody>
        <router-link
          v-for="item in willRequests"
          :key="item.id"
          class="will-request-table"
          :to="{
            ...vueRoutes.willRequestDetails,
            params: {
              id: item.id
            }
          }"
          tag="tr"
        >
          <td>
            {{ item.id }}
          </td>
          <td>
            {{ item.creator.fullName || item.creator.email }}
          </td>
          <td>
            {{ item.recipient.fullName || item.recipient.email }}
          </td>
          <td>
            {{ item.statusId | globalizeWillRequestStatus }}
          </td>
          <td
            v-if="!isAccountGeneral"
            @click.stop
          >
            <v-menu left>
              <template
                v-slot:activator="{ on, attrs }"
              >
                <v-btn
                  class="float-right"
                  icon
                  outlined
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <template v-if="isAccountNotary">
                  <!-- eslint-disable-next-line max-len -->
                  <template v-if="+item.statusId === WILL_REQUEST_STATUSES.submitted">
                    <v-list-item>
                      <v-list-item-title>
                        <v-btn
                          text
                          @click="approveWillRequest(item.id)"
                        >
                          {{ 'will-requests-table.approve-btn' | globalize }}
                        </v-btn>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>
                        <v-btn
                          text
                          @click="rejectWillRequest(item.id)"
                        >
                          {{ 'will-requests-table.reject-btn' | globalize }}
                        </v-btn>
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                  <!-- eslint-disable-next-line max-len -->
                  <template v-else-if="+item.statusId === WILL_REQUEST_STATUSES.notified">
                    <v-list-item>
                      <v-list-item-title>
                        <v-btn
                          text
                          @click="releaseWillRequest(item.id)"
                        >
                          {{ 'will-requests-table.release-btn' | globalize }}
                        </v-btn>
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                </template>
                <!-- eslint-disable-next-line max-len -->
                <template v-if="isAccountRegistry && +item.statusId === WILL_REQUEST_STATUSES.approved">
                  <v-list-item>
                    <v-list-item-title>
                      <v-btn
                        text
                        @click="notifyWillRequest(item.id)"
                      >
                        {{ 'will-requests-table.notify-btn' | globalize }}
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                </template>
              </v-list>
            </v-menu>
          </td>
        </router-link>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
import FormMixin from '@/vue/mixins/form.mixin'
import { vueRoutes } from '@/vue-router/routes'
import { Bus } from '@/js/helpers/event-bus'
import { WILL_REQUEST_STATUSES } from '@/js/const/will-statuses.const'
import { vuexTypes } from '@/vuex'
import { mapGetters } from 'vuex'
import {
  approveWillRequest,
  notifyWillRequest,
  rejectWillRequest,
  releaseWillRequest,
} from '@/js/helpers/will-request-helper'

const EVENTS = {
  submitted: 'submitted',
}

export default {
  name: 'will-requests-table',
  mixins: [FormMixin],
  props: {
    willRequests: {
      type: Array, /** {@link WillRequestRecord} **/
      required: true,
    },
  },
  data () {
    return {
      vueRoutes,
      WILL_REQUEST_STATUSES,
    }
  },
  computed: {
    ...mapGetters([
      vuexTypes.isAccountGeneral,
      vuexTypes.isAccountNotary,
      vuexTypes.isAccountRegistry,
    ]),
  },
  methods: {
    async rejectWillRequest (willRequestId) {
      this.disableForm()
      try {
        rejectWillRequest(willRequestId)
        this.$emit(EVENTS.submitted)
        Bus.success('will-requests-table.reject-success')
      } catch (error) {
        Bus.error('will-request-table.reject-error')
      }
      this.enableForm()
    },
    async approveWillRequest (willRequestId) {
      this.disableForm()
      try {
        approveWillRequest(willRequestId)
        this.$emit(EVENTS.submitted)
        Bus.success('will-requests-table.approve-success')
      } catch (error) {
        Bus.error('will-request-table.approve-error')
      }
      this.enableForm()
    },
    async notifyWillRequest (willRequestId) {
      try {
        await notifyWillRequest(willRequestId)
        this.$emit(EVENTS.submitted)
        Bus.success('will-requests-table.notify-success')
      } catch (error) {
        Bus.error('will-requests-table.notify-error')
      }
    },
    async releaseWillRequest (willRequestId) {
      try {
        releaseWillRequest(willRequestId)
        this.$emit(EVENTS.submitted)
        Bus.success('will-requests-table.release-success')
      } catch (error) {
        Bus.error('will-requests-table.release-error')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.will-request-table {
  cursor: pointer;
}
</style>
