<template>
  <v-container class="CreateWillRequest">
    <v-row>
      <v-col cols="12" md="12">
        <material-card>
          <template v-slot:heading>
            <h1
              class="heading-2"
            >
              {{ 'create-will-request.title' | globalize }}
            </h1>
          </template>
          <v-card-text>
            <will-request-form
              :former="former"
            />
          </v-card-text>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import MaterialCard from '@/vue/common/base/MaterialCard'
  import WillRequestForm from '@/vue/forms/WillRequestForm'
  import { WillRequestFormer } from '@/js/formers/WillRequestFormer'
  import { WillRequestRecord } from '@/js/records/will-request.record'

  export default {
    name: 'CreateWillRequest',
    components: { MaterialCard, WillRequestForm },
    props: {
      willRequest: {
        type: WillRequestRecord,
        default: () => new WillRequestRecord(),
      },
    },
    data: () => ({
      former: new WillRequestFormer(),
    }),
    created () {
      this.former = new WillRequestFormer(this.willRequest)
      this.former.useCreateOpBuilder()
    },
  }
</script>

<style scoped>

</style>
