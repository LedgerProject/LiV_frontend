<template>
  <v-container class="sign-in">
    <v-row>
      <v-col cols="12" md="12">
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
                    <h1 class="sign-in__title display-3">
                      {{ 'sign-in.title' | globalize }}
                    </h1>
                    <div class="sign-in__subtitle blockquote">
                      {{ 'sign-in.subtitle' | globalize }}
                    </div>
                    <v-btn
                      depressed
                      color="primary"
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
        infoBackground: `url(${require('@/assets/login.jpg')})`,
        vueRoutes,
      }
    },
  }
</script>

<style lang="scss" scoped>
.sign-in {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  &__wrapper {
    display: flex;
    max-width: 85rem;
    min-height: 70vh;
  }

  &__info {
    background-size: cover;
    background-position: center center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    padding: 2.5rem;
    border-radius: 1rem;
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
