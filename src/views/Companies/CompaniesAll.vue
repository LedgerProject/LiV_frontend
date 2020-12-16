<template>
  <div class="companies-all">
    <b-card-group
      class="companies-all__list"
      deck
    >
      <card
        v-for="company in companies"
        :key="`company-${company.id}`"
        class="companies-all__list-item"
        :disabled="company.disabled"
      >
        <template slot="header">
          <img
            src="https://lh3.googleusercontent.com/YGJ77qN9KiwctZgfqV8Bf3hNo0rZvcFaPKDTkvtS6kVbtwyCS80Pm6dpXzJCCLZE1Q"
            alt="">
        </template>
        <template>
          <div class="companies-all__list-name">
            {{ company.name }}
          </div>
          <div class="companies-all__list-excerpt">
            {{ company.excerpt }}
          </div>
        </template>
        <template slot="footer">
          <base-button @click="openCompany(company.id)">
            Go
          </base-button>
        </template>
      </card>
    </b-card-group>
  </div>
</template>

<script>
import vueRoutes from "@/routes/routes"

export default {
name: "companies-all",
  data: _ => ({
    vueRoutes,
  }),
  computed: {
    companies () {
      return [
        {
          id: '1',
          name: 'Notary',
          excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo a diam sollicitudin tempor id eu. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Magna eget est lorem ipsum dolor sit amet. Sapien faucibus et molestie ac feugiat sed lectus. At quis risus sed vulputate odio. Sed libero enim sed faucibus turpis in eu mi bibendum. Molestie nunc non blandit massa.',
          disabled: false
        },
        {
          id: '2',
          name: 'Law Firm',
          excerpt: 'Egestas sed sed risus pretium quam vulputate. Euismod nisi porta lorem mollis aliquam ut porttitor. Pellentesque sit amet porttitor eget dolor morbi. Massa tincidunt dui ut ornare lectus sit amet est. Sagittis nisl rhoncus mattis rhoncus. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel. Sollicitudin ac orci phasellus egestas tellus rutrum tellus.',
          disabled: true
        },
      ]
    }
  },
  methods: {
    async openCompany (id) {
      console.log(id)
      await this.$router.push({
        ...vueRoutes.companiesSingle,
        params: {
          id: id,
        },
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.companies-all {
  width: 100%;

  &__list {
    padding: 3rem;

    &-item {

      img {
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
