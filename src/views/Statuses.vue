<template>
  <div class="statuses">
    <projects-table type="dark" title="Dark Table"></projects-table>
  </div>
</template>

<script>
import ProjectsTable from '@/components/Tables/ProjectsTable'
export default {
  name: "statuses",
  components: {
    ProjectsTable
  }
}
</script>

<style lang="scss" scoped>
  .statuses {
    width: 100%;
    padding: 1rem;
  }
</style>
