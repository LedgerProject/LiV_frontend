<template>
  <v-form
    class="sign-in-form"
    @submit.prevent="isFormValid() && submit()"
  >
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="form.login"
            :label="'sign-in-form.login-lbl' | globalize"
            :error-messages="getFieldErrorMessage('form.login')"
            :disabled="formMixin.isDisabled"
            @blur="touchField('form.login')"
          />
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="form.password"
            type="password"
            :label="'sign-in-form.password-lbl' | globalize"
            :error-messages="getFieldErrorMessage('form.password')"
            :disabled="formMixin.isDisabled"
            @blur="touchField('form.password')"
          />
        </v-col>
        <v-col cols="12" md="12">
          <v-btn
            type="submit"
            :disabled="formMixin.isDisabled"
          >
            {{ 'sign-in-form.submit-btn' | globalize }}
          </v-btn>
          <v-progress-circular
            v-if="formMixin.isDisabled"
            indeterminate
          />
          <v-btn
            class="mr-3"
            color="primary"
            depressed
            href="http://livpoc.com/index_encuesta.php"
          >
            {{ 'sign-in.sign-up-link' | globalize }}
          </v-btn>
        </v-col>

      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import FormMixin from '@/vue/mixins/form.mixin'
import { vuexTypes } from '@/vuex'
import { mapActions } from 'vuex'
import { Bus } from '@/js/helpers/event-bus'
import { vueRoutes } from '@/vue-router/routes'
import { email, required } from 'vuelidate/lib/validators'

export default {
  name: 'sign-in-form',
  mixins: [FormMixin],
  data () {
    return {
      form: {
        login: '',
        password: ''
      }
    }
  },
  validations: {
    form: {
      login: { required, email },
      password: { required }
    }
  },
  methods: {
    ...mapActions({
      loginAccount: vuexTypes.LOG_IN
    }),
    async submit () {
      this.disableForm()
      try {
        await this.loginAccount({
          email: this.form.login,
          password: this.form.password
        })
        await this.$router.push(vueRoutes.willRequests)
      } catch (error) {
        if (error.response.status === 403) {
          Bus.error('sign-in-form.auth-error')
        } else if (error.response.status === 500) {
          Bus.error('sign-in-form.server-error')
        } else {
          Bus.error('sign-in-form.undefined-error')
        }
      }
      this.enableForm()
    }
  }
}
</script>
