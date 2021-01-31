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
          :to="{
            ...vueRoutes.updateWillRequest,
            params: {
              id: item.requestId
            }
          }"
          tag="tr"
        >
          <td>
            {{ item.requestId }}
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
          <td>
            <template v-if="item.statusId === WILL_REQUEST_STATUSES.approved">
              <v-btn>
                {{ 'will-requests-table.reject-btn' | globalize }}
              </v-btn>
            </template>
            <template v-else>
              <v-btn>
                {{ 'will-requests-table.reject-btn' | globalize }}
              </v-btn>
            </template>
          </td>
        </router-link>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
  import { vueRoutes } from '@/vue-router/routes'
  import { WILL_REQUEST_STATUSES } from '@/js/const/will-statuses.const'

  export default {
    name: 'WillRequestsTable',
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
  }
</script>

<style scoped>

</style>
