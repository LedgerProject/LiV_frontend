<template>
  <v-container class="sign-up">
    <v-row>
      <v-col>
        <transition name="auth-transition" mode="out-in">
          <v-card elevation="10">
            <v-container>
              <v-row>
                <v-col>
                  <div class="sign-up__wrapper">
                    <div
                      class="sign-up__info"
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
  import SignUpForm from '@/vue/forms/SignUpForm'
  import { vueRoutes } from '@/vue-router/routes'

  export default {
    name: 'SignUp',
    components: { SignUpForm },
    data () {
      return {
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
