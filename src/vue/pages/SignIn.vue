<template>
  <div class="sign-in">
    <transition name="auth-transition" mode="out-in">
      <div class="sign-in__wrapper">
        <div class="sign-in__info">
          <div class="sign-in__info-backdrop" />
          <h1 class="sign-in__title text-h2 text--lighten-1">
            <img src="/static/branding/logo.png" class="logo-image">
          </h1>
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
      vueRoutes,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables.scss';

.logo-image { width: 50%; }

.sign-in {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  &__title {
    text-align: center;
    color: $col-sign-in-info-txt;
    z-index: $z-sign-in-title;
  }

  &__subtitle {
    color: $col-sign-in-info-txt;
    z-index: $z-sign-in-title;
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
      width: 100%;
      height: 100%;
      z-index: $z-sign-in-backdrop;
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
