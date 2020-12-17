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
          <statuses-table
            class="statuses__table"
            :statuses="statuses"
          />
        </template>
        <template v-else>
          <b-alert show>
            Empty
          </b-alert>
        </template>
      </template>
    </template>
    <template v-else>
      <propagate-loader
        class="statuses__loader"
        color="#525f7f"
      />
    </template>
  </div>
</template>

<script>
import StatusesTable from '@/views/Statuses/StatusesTable'
import {api} from "@/api";
import {vuexTypes} from "@/vuex";
import {mapGetters} from "vuex";
import { PropagateLoader } from '@saeris/vue-spinners'

export default {
  name: "statuses",
  components: {
    StatusesTable,
    PropagateLoader,
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
        const { data } = await api.post('/services/getUserServices', {
          email: this.account.email,
        })
        this.statuses = data
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

    &__loader {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

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
