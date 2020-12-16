<template>
  <div class="companies">
    <b-card-group
      class="companies__list"
      deck
    >
      <card
        v-for="company in companies"
        :key="`company-${company.id}`"
        class="companies__list-item"
        :disabled="company.disabled"
      >
        <template slot="header">
          <img
            src="https://lh3.googleusercontent.com/YGJ77qN9KiwctZgfqV8Bf3hNo0rZvcFaPKDTkvtS6kVbtwyCS80Pm6dpXzJCCLZE1Q"
            alt="">
        </template>
        <template>
          <div class="companies__list-name">
            {{ company.name }}
          </div>
          <div class="companies__list-excerpt">
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
import { vueRoutes } from '@/routes/routes'

export default {
  name: 'companies',
  data: _ => ({
    vueRoutes,
  }),
  computed: {
    companies () {
      return [
        {
          id: '1',
          name: 'asdflas jdfa sdhfkjas hdljkfahsdkjhfaklsdj hflkajs hdkljfashdlkfjhasl',
          excerpt: 'asdkj gfasd hgfjakh gkjfah gdkjfg ajkshdg jkag djkfg ads gasdg jkag dgf sdg jkfagds kjfgasdfsdf jkasd jkfg adsjkgf jdg jkagds kjfg asdkj gfajsdg dgs f jkhgkhg',
          disabled: false
        },
        {
          id: '2',
          name: 'asdflas jdfa sdhfkjas hdljkfahsdkjhfaklsdj hflkajs hdkljfashdlkfjhasl',
          excerpt: 'asdkj gfasd hgfjakh gkjfah gdkjfg ajkshdg jkag djkfg ads gasdg jkag dgf sdg jkfagds kjfgasdfsdf jkasd jkfg adsjkgf jdg jkagds kjfg asdkj gfajsdg dgs f jkhgkhg',
          disabled: true
        },
      ]
    }
  },
  methods: {
    openCompany (id) {
      console.log(id)
      this.$router.push({
        name: vueRoutes.company.name,
        params: id,
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .companies {
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
