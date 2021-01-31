<template>
  <div class="SignUpForm">
    <v-form
      @submit.prevent="submit"
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
              v-model="form.firstName"
              :label="'sign-up-form.first-name-lbl' | globalize"
              :disabled="formMixin.isDisabled"
            />
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="form.lastName"
              :label="'sign-up-form.last-name-lbl' | globalize"
              :disabled="formMixin.isDisabled"
            />
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="form.email"
              :label="'sign-up-form.email-lbl' | globalize"
              :disabled="formMixin.isDisabled"
            />
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="form.password"
              type="password"
              :label="'sign-up-form.password-lbl' | globalize"
              :disabled="formMixin.isDisabled"
            />
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="form.repeatPassword"
              type="password"
              :label="'sign-up-form.repeat-password-lbl' | globalize"
              :disabled="formMixin.isDisabled"
            />
          </v-col>
          <v-col cols="12" md="12">
            <v-btn
              type="submit"
              color="primary"
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

  export default {
    name: 'SignUpForm',
    mixins: [FormMixin],
    data () {
      return {
        form: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          repeatPassword: '',
          userRole: USER_ROLES.general,
        },
        vueRoutes,
        USER_ROLES,
      }
    },
    methods: {
      ...mapActions({
        loginAccount: vuexTypes.LOG_IN,
      }),
      async submit () {
        this.disableForm()
        try {
          const endpoint = this.form.userRole === USER_ROLES.general
            ? '/users/signup'
            : '/users/signup-notary-registry'
          await api.post(endpoint, {
            firstName: this.form.firstName,
            lastName: this.form.lastName,
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
          await this.$router.push(vueRoutes.dashboard)
        } catch (error) {
          Bus.error('sign-up-form.error-submit')
        }
        this.enableForm()
      },
    },
  }
</script>

<style scoped>

</style>
