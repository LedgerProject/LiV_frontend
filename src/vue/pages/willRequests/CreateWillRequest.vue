<template>
  <v-container fluid>
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
            <will-request-form />
          </v-card-text>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import MaterialCard from '@/vue/common/base/MaterialCard'
  import WillRequestForm from '@/vue/forms/WillRequestForm'

  export default {
    name: 'CreateWillRequest',
    components: { MaterialCard, WillRequestForm },
  }
</script>

<style scoped>

</style>
