<template>
  <div
    class="card shadow"
    :class="type === 'dark' ? 'bg-default': ''"
  >
    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark': ''"
        :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
        tbody-classes="list"
        :data="statuses"
      >
        <template slot="columns">
          <th>Institution</th>
          <th>Service</th>
          <th>Status</th>
        </template>

        <template slot-scope="{row}">
          <th scope="row">
            <div class="media align-items-center">
              <a href="#" class="avatar rounded-circle mr-3">
                <i class="ni ni-paper-diploma" />
              </a>
              <div class="media-body">
                <span class="name mb-0 text-sm">{{ row.institution }}</span>
              </div>
            </div>
          </th>
          <td>
            <badge class="badge-dot mr-4">
              <span class="status">{{ row.service }}</span>
            </badge>
          </td>
          <td>
            <badge class="badge-dot mr-4" :type="getStatusColor(row.status)">
              <i :class="`bg-${getStatusColor(row.status)}`"></i>
              <span class="status">{{ row.status }}</span>
            </badge>
          </td>
        </template>
      </base-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'projects-table',
  props: {
    type: {
      type: String
    },
    statuses: {
      type: Array,
      required: true
    }
  },
  methods: {
    getStatusColor (statusStr) {
      return statusStr.toLowerCase() === 'in progress'
        ? 'primary'
        : 'success'
    }
  },
}
</script>
<style>
</style>
