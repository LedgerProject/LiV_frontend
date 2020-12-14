<template>
  <div class="services">
    <base-header class="pt-0 pt-md-7 bg-gradient-success" />
    <b-card-group
      class="services__companies"
      deck
    >
      <card class="services__companies-item">
        <template slot="header">
          <img
            src="https://lh3.googleusercontent.com/YGJ77qN9KiwctZgfqV8Bf3hNo0rZvcFaPKDTkvtS6kVbtwyCS80Pm6dpXzJCCLZE1Q"
            alt="">
        </template>
        <template>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error illum ipsum labore omnis quas quibusdam repellat suscipit tenetur unde ut? Eius exercitationem laboriosam libero nulla.
        </template>
        <template slot="footer">
          <base-button>
            Go
          </base-button>
        </template>
      </card>
      <card class="services__companies-item">
        <template slot="header">
          <img
            src="https://lh3.googleusercontent.com/YGJ77qN9KiwctZgfqV8Bf3hNo0rZvcFaPKDTkvtS6kVbtwyCS80Pm6dpXzJCCLZE1Q"
            alt="">
        </template>
        <template>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi delectus ducimus illo impedit laborum maiores nisi vitae! Ducimus, magni non odio rem sequi veniam voluptatum.
        </template>
        <template slot="footer">
          <base-button>
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
  name: 'services',
  data: _ => ({
    vueRoutes,
  })
}
</script>

<style lang="scss" scoped>
  .services {
    width: 100%;

    &__companies {
      padding: 3rem;

      &-item {

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
</style>
