<template>
  <v-card class="sign-up" elevation="10">
    <v-container>
      <v-row>
        <v-col>
          <div class="sign-up__wrapper">
            <div
              class="sign-up__info"
              :style="{
                backgroundImage: infoBackground,
              }"
            >
              <div class="sign-up__info-backdrop" />
              <h1 class="sign-up__title display-3">
                {{ 'sign-up.title' | globalize }}
              </h1>
              <div class="sign-up__subtitle">
                {{ 'sign-up.subtitle' | globalize }}
              </div>
              <v-btn
                class="mx-0 mt-2"
                depressed
                color="primary"
                :to="vueRoutes.signIn"
              >
                {{ 'sign-up.sign-in-link' | globalize }}
              </v-btn>
            </div>
            <div class="sign-up__form">
              <sign-up-form />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  import SignUpForm from '@/vue/forms/SignUpForm'
  import { vueRoutes } from '@/vue-router/routes'

  export default {
    name: 'SignUp',
    components: { SignUpForm },
    data () {
      return {
        title: 'lorem ipsum dolor sit amet',
        subtitle: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet ',
        infoBackground: `url(${require('@/assets/register.jpg')})`,
        vueRoutes,
      }
    },
  }
</script>

<style lang="scss" scoped>
.sign-up {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  &__title {
    color: $sign-up-col-text;
    z-index: 1;
  }

  &__subtitle {
    color: $sign-up-col-text;
    z-index: 1;
  }

  &__wrapper {
    display: flex;
    max-width: 85rem;
    min-height: 70vh;
  }

  &__info {
    position: relative;
    background-size: cover;
    background-position: center center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    padding: 2.5rem;
    border-radius: 1rem;

    &-backdrop {
      position: absolute;
      top: 0;
      left: 0;
      background: $sign-up-col-backdrop;
      width: 100%;
      height: 100%;
      z-index: 0;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    padding: 2.5rem;
  }
}
</style>
