<template>
  <v-form
    class="AccountForm"
    @submit.prevent="isFormValid() && submit()"
  >
    <v-container class="py-0">
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-text-field
            v-model="form.email"
            label="Email Address"
            class="purple-input"
          />
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="form.firstName"
            label="First Name"
            class="purple-input"
          />
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="form.middleName"
            label="Middle Name"
            class="purple-input"
          />
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="form.lastName"
            label="Last Name"
            class="purple-input"
          />
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="form.address"
            label="Address"
            class="purple-input"
          />
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="form.passportNumber"
            label="Passport Number"
            class="purple-input"
          />
        </v-col>

        <v-col
          cols="12"
          class="text-right"
        >
          <v-btn
            color="success"
            class="mr-0"
            type="submit"
            :disabled="!isFieldsValid"
          >
            Update Profile
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
  import FormMixin from '@/vue/mixins/form.mixin'
  import { Bus } from '@/js/helpers/event-bus'
  import { api } from '@/api'
  import { AccountFormer } from '@/js/formers/AccountFormer'
  import { required } from 'vuelidate/lib/validators'

  export default {
    name: 'account-form',
    mixins: [FormMixin],
    props: {
      former: {
        type: AccountFormer,
        default: new AccountFormer(),
      },
    },
    data () {
      return {
        form: {
          email: this.former.attrs.email,
          address: this.former.attrs.address,
          firstName: this.former.attrs.firstName,
          middleName: this.former.attrs.middleName,
          lastName: this.former.attrs.lastName,
          passportNumber: this.former.attrs.passportNumber,
        },
      }
    },
    validations: {
      form: {
        email: { required },
        address: { required },
        firstName: { required },
        middleName: { required },
        lastName: { required },
        passportNumber: { required },
      },
    },
    methods: {
      async submit () {
        this.disableForm()
        try {
          await api.post(`/${this.account.id}/kyc`, this.former.buildOps())
        } catch (error) {
          Bus.error('account-form.submit-error')
        }
        this.enableForm()
      },
    },
  }
</script>

<style scoped>

</style>
