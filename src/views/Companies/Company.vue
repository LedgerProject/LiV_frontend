<template>
  <div class="company">
    <b-card-group columns class="company__services">
      <card
        v-for="service in services"
        :key="`service-${service.id}`"
      >
        <template slot="header">
          {{ service.name }}
        </template>serviceId
        <template>
          {{ service.description }}
        </template>
        <template slot="footer">
          <base-button
            @click="
              serviceId = service.id;
              isServiceModalShown = true
            "
          >
            Open
          </base-button>
        </template>
      </card>
    </b-card-group>
    <modal
      :show.sync="isServiceModalShown"
      hide-footer
    >
      <template
        v-if="currentService"
        slot="header"
      >
        <div class="company__services-item__header">
          <div class="company__services-item__title">
            {{ currentService.name }}
          </div>
          <div class="company__services-item__description">
            {{ currentService.description }}
          </div>
        </div>
      </template>
      <company-service-form
        :service="currentService"
      />
    </modal>
  </div>
</template>

<script>
import CompanyServiceForm from "@/views/Companies/CompanyServiceForm";
export default {
  name: "company",
  components: {CompanyServiceForm},
  data: _ => ({
    isServiceModalShown: false,
    serviceId: '',
  }),
  computed: {
    services () {
      return [
        {
          id: '1',
          name: 'service 1',
          description: 'asdj nfal sdjfakj fhlkajs dhflkajs hdflkjasdhflkja shdflkjasdhlf'
        },
        {
          id: '2',
          name: 'service 2',
          description: 'asdj nfal sdjfakj fhlkajs dhflkajs hdflkjasdhflkja shdflkjasdhlf'
        },
        {
          id: '3',
          name: 'service 3',
          description: 'asdj nfal sdjfakj fhlkajs dhflkajs hdflkjasdhflkja shdflkjasdhlf'
        },
        {
          id: '4',
          name: 'service 4',
          description: 'asdj nfal sdjfakj fhlkajs dhflkajs hdflkjasdhflkja shdflkjasdhlf'
        },
        {
          id: '5',
          name: 'service 5',
          description: 'asdj nfal sdjfakj fhlkajs dhflkajs hdflkjasdhflkja shdflkjasdhlf'
        },
        {
          id: '6',
          name: 'service 6',
          description: 'asdj nfal sdjfakj fhlkajs dhflkajs hdflkjasdhflkja shdflkjasdhlf'
        },
      ]
    },
    currentService () {
      return this.services.find(el => el.id === this.serviceId)
    }
  }
}
</script>

<style lang="scss" scoped>
.company {
  width: 100%;

  &__services {
    padding: 1rem;

    &-item {

      &__header {
        display: flex;
        flex-direction: column;
      }

      &__title {
        font-size: 1.25rem;
        font-weight: bold;
        margin-bottom: 1rem;
      }

      &__description {
        font-size: 1rem;
        font-weight: 500;
        margin-bottom: 1.5rem;
      }
    }
  }
}
</style>
