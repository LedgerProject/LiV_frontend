<template>
  <div class="will-requests-table">
    <v-simple-table>
      <thead>
        <tr>
          <th class="primary--text">
            ID
          </th>
          <th class="primary--text">
            Name
          </th>
          <th class="primary--text">
            Passport ID
          </th>
          <th class="primary--text">
            Status
          </th>
          <th class="text-right primary--text">
            Action
          </th>
        </tr>
      </thead>

      <tbody>
        <router-link
          v-for="item in willRequests"
          :key="item.id"
          class="will-request-table"
          :to="{
            ...vueRoutes.updateWillRequest,
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
            {{ item.fullName }}
          </td>
          <td>
            {{ item.passportId }}
          </td>
          <td>
            {{ item.statusId | globalizeWillRequest }}
          </td>
          <td
            @click.stop
          >
            <v-menu left>
              <template v-slot:activator="{ on, attrs }">
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
                <template
                  v-if="
                    +item.statusId !== WILL_REQUEST_STATUSES.rejected &&
                      +item.statusId !== WILL_REQUEST_STATUSES.approved
                  "
                >
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
  import { api } from '@/api'
  import { WILL_REQUEST_STATUSES } from '@/js/const/will-statuses.const'

  const EVENTS = {
    submitted: 'submitted',
  }

  export default {
    name: 'WillRequestsTable',
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
    methods: {
      async rejectWillRequest (willRequestId) {
        this.disableForm()
        try {
          await api.get(`/will-requests/reject/${willRequestId}`)
          this.$emit(EVENTS.submitted)
        } catch (error) {
          Bus.error('will-request-table.reject-error')
        }
        this.enableForm()
      },
      async approveWillRequest (willRequestId) {
        this.disableForm()
        try {
          await api.get(`/will-requests/approve/${willRequestId}`)
          this.$emit(EVENTS.submitted)
        } catch (error) {
          Bus.error('will-request-table.approve-error')
        }
        this.enableForm()
      },
    },
  }
</script>

<style lang="scss" scoped>
.will-request-table {
  cursor: pointer;
}
</style>
