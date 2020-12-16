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
        :data="tableData"
      >
        <template slot="columns">
          <th>Project</th>
          <th>Status</th>
          <th>Completion</th>
        </template>

        <template slot-scope="{row}">
          <th scope="row">
            <div class="media align-items-center">
              <a href="#" class="avatar rounded-circle mr-3">
                <img alt="Image placeholder" :src="row.img">
              </a>
              <div class="media-body">
                <span class="name mb-0 text-sm">{{ row.title }}</span>
              </div>
            </div>
          </th>
          <td>
            <badge class="badge-dot mr-4" :type="row.statusType">
              <i :class="`bg-${row.statusType}`"></i>
              <span class="status">{{ row.status }}</span>
            </badge>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <span class="completion mr-2">{{ row.completion }}%</span>
              <div>
                <base-progress
                  :type="row.statusType"
                  :show-percentage="false"
                  class="pt-0"
                  :value="row.completion"
                />
              </div>
            </div>
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
    title: String
  },
  data() {
    return {
      tableData: [
        {
          img: 'img/theme/bootstrap.jpg',
          title: 'Argon Design System',
          budget: '$2500 USD',
          status: 'pending',
          statusType: 'warning',
          completion: 60
        },
        {
          img: 'img/theme/angular.jpg',
          title: 'Angular Now UI Kit PRO',
          budget: '$1800 USD',
          status: 'completed',
          statusType: 'success',
          completion: 100
        },
        {
          img: 'img/theme/sketch.jpg',
          title: 'Black Dashboard',
          budget: '$3150 USD',
          status: 'delayed',
          statusType: 'danger',
          completion: 72
        },
        {
          img: 'img/theme/react.jpg',
          title: 'React Material Dashboard',
          budget: '$4400 USD',
          status: 'on schedule',
          statusType: 'info',
          completion: 90
        },
        {
          img: 'img/theme/vue.jpg',
          title: 'Vue Paper UI Kit PRO',
          budget: '$2200 USD',
          status: 'completed',
          statusType: 'success',
          completion: 100
        }
      ]
    }
  }
}
</script>
<style>
</style>
