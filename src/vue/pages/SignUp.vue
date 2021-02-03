<template>
  <v-container class="sign-up">
    <v-row>
      <v-col>
        <v-card>
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
                    <h1 class="sign-in__title display-3">
                      {{ title }}
                    </h1>
                    <div class="sign-in__subtitle blockquote">
                      {{ subtitle }}
                    </div>
                    <v-btn
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
}
</style>
