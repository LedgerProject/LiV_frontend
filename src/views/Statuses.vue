<template>
  <div class="statuses">
    <template v-if="isLoaded">
      <template v-if="isLoadFailed">
        <b-alert show variant="danger">
          Error on load, please try to reload page
        </b-alert>
      </template>
      <template v-else>
        <template v-if="statuses.length">
          <statuses-table class="statuses__table" />
        </template>
        <template v-else>

        </template>
      </template>
    </template>
    <template v-else>
      <div>
        <b-skeleton-table
          :rows="5"
          :columns="4"
          :table-props="{ bordered: true, striped: true }"
        ></b-skeleton-table>
      </div>
    </template>
  </div>
</template>

<script>
import StatusesTable from '@/views/Statuses/StatusesTable'
import {api} from "@/api";
import {vuexTypes} from "@/vuex";
import {mapGetters} from "vuex";
export default {
  name: "statuses",
  components: {
    StatusesTable
  },
  data: _ => ({
    isLoaded: false,
    isLoadFailed: false,
    statuses: [],
  }),
  computed: {
    ...mapGetters([
      vuexTypes.account
    ])
  },
  async created () {
    await this.loadStatuses()
  },
  methods: {
    async loadStatuses () {
      this.isLoaded = false
      this.isLoadFailed = false
      try {
        await api.get('/services/getUserServices', {
          params: {
            email: this.account.email,
          }
        })
      } catch (error) {
        this.isLoadFailed = true
        console.log(error)
      }
      this.isLoaded = true
    }
  },
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
