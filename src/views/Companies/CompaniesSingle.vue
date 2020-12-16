<template>
  <div class="company">
    <b-card-group columns class="company__services">
      <card
        v-for="service in services"
        :key="`service-${service.id}`"
        :disabled="service.disabled"
      >
        <template slot="header">
          {{ service.name }}
        </template>
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
      <companies-service-form
        :service="currentService"
      />
    </modal>
  </div>
</template>

<script>
import CompaniesServiceForm from "@/views/Companies/CompaniesServiceForm";
export default {
  name: "company",
  components: {CompaniesServiceForm},
  data: _ => ({
    isServiceModalShown: false,
    serviceId: '',
  }),
  computed: {
    services () {
      return [
        {
          id: '1',
          name: 'Lorem ipsum',
          description: 'Egestas sed sed risus pretium quam vulputate. Euismod nisi porta lorem mollis aliquam ut porttitor. Pellentesque sit amet porttitor eget dolor morbi. Massa tincidunt dui ut ornare lectus sit amet est. Sagittis nisl rhoncus mattis rhoncus. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel. Sollicitudin ac orci phasellus egestas tellus rutrum tellus. ',
          disabled: false
        },
        {
          id: '2',
          name: 'Dolor sit',
          description: 'Egestas sed sed risus pretium quam vulputate. Euismod nisi porta lorem mollis aliquam ut porttitor. Pellentesque sit amet porttitor eget dolor morbi. Massa tincidunt dui ut ornare lectus sit amet est. Sagittis nisl rhoncus mattis rhoncus. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel. Sollicitudin ac orci phasellus egestas tellus rutrum tellus. ',
          disabled: true
        },
        {
          id: '3',
          name: 'Amet consesteur',
          description: 'Egestas sed sed risus pretium quam vulputate. Euismod nisi porta lorem mollis aliquam ut porttitor. Pellentesque sit amet porttitor eget dolor morbi. Massa tincidunt dui ut ornare lectus sit amet est. Sagittis nisl rhoncus mattis rhoncus. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel. Sollicitudin ac orci phasellus egestas tellus rutrum tellus. ',
          disabled: true
        },
        {
          id: '4',
          name: 'Egestas sed',
          description: 'Egestas sed sed risus pretium quam vulputate. Euismod nisi porta lorem mollis aliquam ut porttitor. Pellentesque sit amet porttitor eget dolor morbi. Massa tincidunt dui ut ornare lectus sit amet est. Sagittis nisl rhoncus mattis rhoncus. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel. Sollicitudin ac orci phasellus egestas tellus rutrum tellus. ',
          disabled: true
        },
        {
          id: '5',
          name: 'quam vulputate',
          description: 'Egestas sed sed risus pretium quam vulputate. Euismod nisi porta lorem mollis aliquam ut porttitor. Pellentesque sit amet porttitor eget dolor morbi. Massa tincidunt dui ut ornare lectus sit amet est. Sagittis nisl rhoncus mattis rhoncus. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel. Sollicitudin ac orci phasellus egestas tellus rutrum tellus. ',
          disabled: true
        },
        {
          id: '6',
          name: 'mollis aliquam',
          description: 'Egestas sed sed risus pretium quam vulputate. Euismod nisi porta lorem mollis aliquam ut porttitor. Pellentesque sit amet porttitor eget dolor morbi. Massa tincidunt dui ut ornare lectus sit amet est. Sagittis nisl rhoncus mattis rhoncus. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel. Sollicitudin ac orci phasellus egestas tellus rutrum tellus. ',
          disabled: true
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
