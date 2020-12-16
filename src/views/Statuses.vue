<template>
  <div class="statuses">
    <statuses-table class="statuses__table" />
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

    &__table {
      overflow: auto;
    }

    @media screen and (max-width: 767px) {
      display: flex;
      justify-content: center;

      &__table {
        width: 90vw;
      }
    }
  }
</style>
