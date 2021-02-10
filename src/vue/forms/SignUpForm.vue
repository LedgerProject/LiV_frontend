<template>
  <div class="SignUpForm">
    <v-form
      @submit.prevent="isFormValid() && submit()"
    >
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-btn
              v-for="role in USER_ROLES"
              :key="`account-tole-${role}`"
              :color="form.userRole === role ? 'primary' : ''"
              :disabled="formMixin.isDisabled"
              @click="form.userRole = role"
            >
              {{ role | globalizeUserRole }}
            </v-btn>
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="form.email"
              :error-messages="getFieldErrorMessage('form.email')"
              :label="'sign-up-form.email-lbl' | globalize"
              :disabled="formMixin.isDisabled"
              @blur="touchField('form.email')"
            />
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="form.password"
              :error-messages="getFieldErrorMessage('form.password')"
              type="password"
              :label="'sign-up-form.password-lbl' | globalize"
              :disabled="formMixin.isDisabled"
              @blur="touchField('form.password')"
            />
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="form.repeatPassword"
              :error-messages="getFieldErrorMessage('form.repeatPassword')"
              type="password"
              :label="'sign-up-form.repeat-password-lbl' | globalize"
              :disabled="formMixin.isDisabled"
              @blur="touchField('form.repeatPassword')"
            />
          </v-col>
          <v-col cols="12" md="12">
            <v-btn
              type="submit"
              color="primary"
              :disabled="formMixin.isDisabled"
            >
              {{ 'sign-up-form.submit-btn' | globalize }}
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
  import { USER_ROLES } from '@/js/const/user-roles.const'
  import { vueRoutes } from '@/vue-router/routes'
  import { mapActions } from 'vuex'
  import { vuexTypes } from '@/vuex'
  import { Bus } from '@/js/helpers/event-bus'
  import { api } from '@/api'
  import { email, required } from 'vuelidate/lib/validators'
  // import _pbkdf2 from 'crypto-js/pbkdf2'
  // import sha512 from 'crypto-js/sha512'
  import pbkdf2 from 'pbkdf2'

  export default {
    name: 'SignUpForm',
    mixins: [FormMixin],
    data () {
      return {
        form: {
          email: 'qwerty@gmail.com',
          password: 'qwerty',
          repeatPassword: 'qwerty',
          userRole: USER_ROLES.general,
          salt: '',
        },
        vueRoutes,
        USER_ROLES,
      }
    },
    validations: {
      form: {
        email: { required, email },
        password: { required },
        repeatPassword: {
          required,
          // sameAs: sameAs('form.password'),
        },
      },
    },
    methods: {
      ...mapActions({
        loginAccount: vuexTypes.LOG_IN,
      }),
      async submit () {
        this.disableForm()
        try {
          const derivedKey = this.createKeyPair()
          console.log(derivedKey)
          if (this.form.password) return
          const endpoint = this.form.userRole === USER_ROLES.general
            ? '/users/signup'
            : '/users/signup-notary-registry'
          await api.post(endpoint, {
            email: this.form.email,
            password: this.form.password,
            ...(
              this.form.userRole !== USER_ROLES.general
                ? {}
                : {}
            ),
          })
          await this.loginAccount({
            email: this.form.email,
            password: this.form.password,
          })
          await this.$router.push(vueRoutes.willRequests)
        } catch (error) {
          Bus.error('sign-up-form.error-submit')
        }
        this.enableForm()
      },
      createKeyPair () {
        this.form.salt = 'salt'
        return pbkdf2.pbkdf2(this.form.password, this.form.salt)
      },
    },
  }
</script>

<style scoped>

</style>
