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
            @change="former.setAttr('email', form.email)"
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
            @change="former.setAttr('firstName', form.firstName)"
            label="First Name"
            class="purple-input"
          />
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="form.secondName"
            @change="former.setAttr('secondName', form.secondName)"
            label="Second Name"
            class="purple-input"
          />
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="form.lastName"
            @change="former.setAttr('lastName', form.lastName)"
            label="Last Name"
            class="purple-input"
          />
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="form.address"
            @change="former.setAttr('address', form.address)"
            label="Address"
            class="purple-input"
            maxlength="256"
          />
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="form.nif"
            @change="former.setAttr('nif', form.nif)"
            label="Passport Number"
            class="purple-input"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="form.birthday"
            @change="former.setAttr('birthday', form.birthday)"
            label="Birthday"
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

const EVENTS = {
  submit: 'submit'
}

export default {
  name: 'account-form',
  mixins: [FormMixin],
  props: {
    former: {
      type: AccountFormer,
      default: new AccountFormer()
    }
  },
  data () {
    return {
      form: {
        email: this.former.attrs.email,
        address: this.former.attrs.address,
        firstName: this.former.attrs.firstName,
        birthday: this.former.attrs.birthday,
        secondName: this.former.attrs.secondName,
        lastName: this.former.attrs.lastName,
        nif: this.former.attrs.nif
      }
    }
  },
  validations: {
    form: {
      email: { required },
      address: { required },
      firstName: { required },
      secondName: { required },
      birthday: { required },
      lastName: { required },
      nif: { required }
    }
  },
  methods: {
    async submit () {
      this.disableForm()
      try {
        await api.post('/users/addKYC', this.former.buildOps(), {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        Bus.success('account-form.submit-success')
        this.$emit(EVENTS.submit)
      } catch (error) {
        Bus.error('account-form.submit-error')
      }
      this.enableForm()
    },
    isFormValid () {
      const regSimpleString = /[a-zA-Z0-9]$/
      const regAddress = /[a-zA-Z0-9.,\s]$/
      const regBirthday = /^((0?[1-9]|1[012])[/](0?[1-9]|[12][0-9]|3[01])[/](19|20)?[0-9]{2})*$/

      const result = regAddress.test(this.form.address) &&
        regSimpleString.test(this.form.nif) &&
        regBirthday.test(this.form.birthday) &&
        regSimpleString.test(this.form.lastName) &&
        regSimpleString.test(this.form.secondName) &&
        regSimpleString.test(this.form.firstName)

      if (!result) {
        Bus.error('account-form.invalid-char')
      }

      return result
    }
  }
}
</script>

<style scoped>

</style>
