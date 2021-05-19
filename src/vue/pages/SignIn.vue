<template>
  <div class="sign-in">
    <transition name="auth-transition" mode="out-in">
      <div class="sign-in__wrapper">
        <div
          class="sign-in__info"
          :style="{
            backgroundImage: infoBackground,
          }"
        >
          <div class="sign-in__info-backdrop" />
          <h1 class="sign-in__title text-h2 text--lighten-1">
            {{ 'sign-in.title' | globalize }}
          </h1>
          <div class="sign-in__subtitle">
            {{ 'sign-in.subtitle' | globalize }}
          </div>
          <v-btn
            class="mx-0 mt-2"
            color="primary"
            depressed
            :to="vueRoutes.signUp"
          >
            {{ 'sign-in.sign-up-link' | globalize }}
          </v-btn>
        </div>
        <div class="sign-in__form">
          <sign-in-form />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import SignInForm from '@/vue/forms/SignInForm'
import { vueRoutes } from '@/vue-router/routes'

export default {
  name: 'sign-in',
  components: { SignInForm },
  data () {
    return {
      infoBackground: `url(${require('@/assets/images/login.jpg')})`,
      vueRoutes
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/scss/variables.scss";

.sign-in {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  &__title {
    color: $col-sign-in-info-txt;
    z-index: 1;
  }

  &__subtitle {
    color: $col-sign-in-info-txt;
    z-index: 1;
  }

  &__wrapper {
    overflow: hidden;
    display: flex;
    max-width: 85rem;
    min-height: 70vh;
    border-radius: 2rem;
  }

  &__info {
    overflow: hidden;
    position: relative;
    background-size: cover;
    background-position: center center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    padding: 2.5rem;

    &-backdrop {
      position: absolute;
      top: 0;
      left: 0;
      background: $col-sign-in-info-backdrop;
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

  &__title {
    text-align: center;
  }
}
</style>
