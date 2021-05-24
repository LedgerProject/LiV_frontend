<template>
  <div class="sign-up">
    <transition name="auth-transition" mode="out-in">
      <div class="sign-up__wrapper">
        <div
          class="sign-up__info"
          :style="{
          }"
        >
          <div class="sign-up__info-backdrop" />
          <h1 class="sign-up__title text-h2">
            {{ 'sign-up.title' | globalize }}
          </h1>
          <div class="sign-up__subtitle">
            {{ 'sign-up.subtitle' | globalize }}
          </div>
          <v-btn
            class="mx-0 mt-2"
            color="info"
            depressed
            :to="vueRoutes.signIn"
          >
            {{ 'sign-up.sign-in-link' | globalize }}
          </v-btn>
        </div>
        <div class="sign-up__form">
          <sign-up-form />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import SignUpForm from '@/vue/forms/SignUpForm'
import { vueRoutes } from '@/vue-router/routes'

export default {
  name: 'sign-up',
  components: { SignUpForm },
  data () {
    return {
      vueRoutes
    }
  }
}
</script>

<style lang="scss" scoped>
.sign-up {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  &__title {
    color: $col-sign-up-info-txt;
    z-index: 1;
  }

  &__subtitle {
    color: $col-sign-up-info-txt;
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
      background: $col-sign-up-info-backdrop;
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
