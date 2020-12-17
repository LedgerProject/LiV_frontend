<template>
  <div class="services-single">
    <b-card-group columns class="services-single__wrapper">
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
            @click="serviceId = service.id; isServiceModalShown = true"
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
        <div class="services-single__item-header">
          <div class="services-single__item-title">
            {{ currentService.name }}
          </div>
          <div class="services-single__item-description">
            {{ currentService.description }}
          </div>
        </div>
      </template>
      <services-form
        :service="currentService"
      />
    </modal>
  </div>
</template>

<script>
import ServicesForm from "./ServicesForm";
export default {
  name: "services-single",
  components: {ServicesForm},
  data: _ => ({
    isServiceModalShown: false,
    serviceId: '',
  }),
  computed: {
    services () {
      return [
        {
          id: '1',
          institution: 'Notary',
          name: 'Will Issuance',
          description: 'Egestas sed sed risus pretium quam vulputate. Euismod nisi porta lorem mollis aliquam ut porttitor. Pellentesque sit amet porttitor eget dolor morbi. Massa tincidunt dui ut ornare lectus sit amet est. Sagittis nisl rhoncus mattis rhoncus. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel. Sollicitudin ac orci phasellus egestas tellus rutrum tellus. ',
          disabled: false
        },
        {
          id: '2',
          institution: 'Notary',
          name: 'Dolor sit',
          description: 'Egestas sed sed risus pretium quam vulputate. Euismod nisi porta lorem mollis aliquam ut porttitor. Pellentesque sit amet porttitor eget dolor morbi. Massa tincidunt dui ut ornare lectus sit amet est. Sagittis nisl rhoncus mattis rhoncus. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel. Sollicitudin ac orci phasellus egestas tellus rutrum tellus. ',
          disabled: true
        },
        {
          id: '3',
          institution: 'Notary',
          name: 'Amet consesteur',
          description: 'Egestas sed sed risus pretium quam vulputate. Euismod nisi porta lorem mollis aliquam ut porttitor. Pellentesque sit amet porttitor eget dolor morbi. Massa tincidunt dui ut ornare lectus sit amet est. Sagittis nisl rhoncus mattis rhoncus. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel. Sollicitudin ac orci phasellus egestas tellus rutrum tellus. ',
          disabled: true
        },
        {
          id: '4',
          institution: 'Notary',
          name: 'Egestas sed',
          description: 'Egestas sed sed risus pretium quam vulputate. Euismod nisi porta lorem mollis aliquam ut porttitor. Pellentesque sit amet porttitor eget dolor morbi. Massa tincidunt dui ut ornare lectus sit amet est. Sagittis nisl rhoncus mattis rhoncus. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel. Sollicitudin ac orci phasellus egestas tellus rutrum tellus. ',
          disabled: true
        },
        {
          id: '5',
          institution: 'Notary',
          name: 'quam vulputate',
          description: 'Egestas sed sed risus pretium quam vulputate. Euismod nisi porta lorem mollis aliquam ut porttitor. Pellentesque sit amet porttitor eget dolor morbi. Massa tincidunt dui ut ornare lectus sit amet est. Sagittis nisl rhoncus mattis rhoncus. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel. Sollicitudin ac orci phasellus egestas tellus rutrum tellus. ',
          disabled: true
        },
        {
          id: '6',
          institution: 'Notary',
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
.services-single {
  width: 100%;

  &__wrapper {
    padding: 1rem;
  }

  &__item {

    &-header {
      display: flex;
      flex-direction: column;
    }

    &-title {
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    &-description {
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 1.5rem;
    }
  }
}
</style>
