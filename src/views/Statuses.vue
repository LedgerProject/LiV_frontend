<template>
  <div class="statuses">
    <statuses-table />
  </div>
</template>

<script>
import StatusesTable from '@/views/Statuses/StatusesTable'
export default {
  name: "statuses",
  components: {
    StatusesTable
  }
}
</script>

<style lang="scss" scoped>
  .statuses {
    width: 100%;
    padding: 1rem;
  }
</style>
