<template>
  <div class="sign-in-form">
    <v-form
      @submit.prevent="submit"
    >
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="form.login"
              :label="'sign-in-form.login-lbl' | globalize"
              :disabled="formMixin.isDisabled"
            />
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="form.password"
              :label="'sign-in-form.password-lbl' | globalize"
              :disabled="formMixin.isDisabled"
            />
          </v-col>
          <v-col cols="12" md="12">
            <v-btn
              type="submit"
              color="primary"
              :disabled="formMixin.isDisabled"
            >
              {{ 'sign-in-form.submit-btn' | globalize }}
            </v-btn>
            <v-progress-circular
              v-if="formMixin.isDisabled"
              indeterminate
              color="primary"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
  import FormMixin from '@/vue/mixins/form.mixin'
  import { vuexTypes } from '@/vuex'
  import { mapActions } from 'vuex'
  import { Bus } from '@/js/helpers/event-bus'
  import { vueRoutes } from '@/vue-router/routes'

  export default {
    name: 'SignInForm',
    mixins: [FormMixin],
    data () {
      return {
        form: {
          login: '',
          password: '',
        },
      }
    },
    methods: {
      ...mapActions({
        loginAccount: vuexTypes.LOG_IN,
      }),
      async submit () {
        this.disableForm()
        try {
          await this.loginAccount({
            email: this.form.login,
            password: this.form.password,
          })
          await this.$router.push(vueRoutes.dashboard)
        } catch (error) {
          Bus.error('sign-in-form.error-on-sign-in')
        }
        this.enableForm()
      },
    },
  }
</script>

<style scoped>

</style>
