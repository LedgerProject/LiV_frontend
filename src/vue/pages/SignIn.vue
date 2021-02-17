<template>
  <v-container class="sign-in">
    <v-row>
      <v-col>
        <transition name="auth-transition" mode="out-in">
          <v-card elevation="10">
            <v-container>
              <v-row>
                <v-col>
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
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import SignInForm from '@/vue/forms/SignInForm'
  import { vueRoutes } from '@/vue-router/routes'

  export default {
    name: 'SignIn',
    components: { SignInForm },
    data () {
      return {
        infoBackground: `url(${require('@/assets/images/login.jpg')})`,
        vueRoutes,
      }
    },
  }
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";

.sign-in {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  &__title {
    color: $sign-in-col-text;
    z-index: 1;
  }

  &__subtitle {
    color: $sign-in-col-text;
    z-index: 1;
  }

  &__wrapper {
    display: flex;
    max-width: 85rem;
    min-height: 70vh;
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
    border-radius: 1rem;

    &-backdrop {
      position: absolute;
      top: 0;
      left: 0;
      background: $sign-in-col-backdrop;
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
