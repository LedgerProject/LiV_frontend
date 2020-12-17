<template>
  <div class="services-all">
    <b-card-group
      class="services-all__list"
      deck
    >
      <card
        v-for="service in services"
        :key="`service-${service.id}`"
        class="services-all__list-item"
        :disabled="service.disabled"
      >
        <template slot="header">
          <img
            :src="service.imgUrl"
            alt="">
        </template>
        <template>
          <div class="services-all__list-name">
            {{ service.name }}
          </div>
          <div class="services-all__list-excerpt">
            {{ service.excerpt }}
          </div>
        </template>
        <template slot="footer">
          <router-link
            class="btn btn-primary"
            :to="{
              ...vueRoutes.servicesSingle,
              params: { id: service.id },
            }"
          >
            Go
          </router-link>
        </template>
      </card>
    </b-card-group>
  </div>
</template>

<script>
import vueRoutes from "@/routes/routes"

export default {
  name: "services-all",
  data: _ => ({
    vueRoutes,
  }),
  computed: {
    services() {
      return [
        {
          id: '1',
          imgUrl: 'https://blog.suretysolutions.com/hs-fs/hubfs/bigstock-Notary-Public-Tools--120299054.jpg?width=828&name=bigstock-Notary-Public-Tools--120299054.jpg',
          name: 'Notary',
          excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo a diam sollicitudin tempor id eu. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Magna eget est lorem ipsum dolor sit amet. Sapien faucibus et molestie ac feugiat sed lectus. At quis risus sed vulputate odio. Sed libero enim sed faucibus turpis in eu mi bibendum. Molestie nunc non blandit massa.',
          disabled: false
        },
        {
          id: '2',
          imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9T4mUSWrJXIT7fALBu4YEieuTtUeuCwcX9A&usqp=CAU',
          name: 'Law Firm',
          excerpt: 'Egestas sed sed risus pretium quam vulputate. Euismod nisi porta lorem mollis aliquam ut porttitor. Pellentesque sit amet porttitor eget dolor morbi. Massa tincidunt dui ut ornare lectus sit amet est. Sagittis nisl rhoncus mattis rhoncus. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel. Sollicitudin ac orci phasellus egestas tellus rutrum tellus.',
          disabled: true
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.services-all {
  width: 100%;

  &__list {
    padding: 3rem;

    &-item {

      img {
        max-height: 25rem;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &-name {
      font-weight: bold;
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }
  }
}
</style>
