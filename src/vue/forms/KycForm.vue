<template>
  <v-form
    class="kyc-form"
    @submit.prevent="submit"
  >
    <v-container class="py-0">
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            label="Company (disabled)"
            disabled
          />
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            class="purple-input"
            label="User Name"
          />
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            label="Email Address"
            class="purple-input"
          />
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            label="First Name"
            class="purple-input"
          />
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            label="Last Name"
            class="purple-input"
          />
        </v-col>

        <v-col cols="12">
          <v-text-field
            label="Adress"
            class="purple-input"
          />
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            label="City"
            class="purple-input"
          />
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            label="Country"
            class="purple-input"
          />
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            class="purple-input"
            label="Postal Code"
            type="number"
          />
        </v-col>

        <v-col cols="12">
          <v-textarea
            class="purple-input"
            label="About Me"
            value="Lorem ipsum dolor sit amet, adipiscing elit."
          />
        </v-col>

        <v-col
          cols="12"
          class="text-right"
        >
          <v-btn
            color="success"
            class="mr-0"
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
  import { KycFormer } from '@/js/formers/KycFormer'
  import { Bus } from '@/js/helpers/event-bus'
  import { api } from '@/api'

  export default {
    name: 'KycForm',
    mixins: [FormMixin],
    props: {
      former: {
        type: KycFormer,
        default: new KycFormer(),
      },
    },
    data () {
      return {
        form: {
          firstName: this.former.attrs.firstName,
          middleName: this.former.attrs.middleName,
          lastName: this.former.attrs.lastName,
          address: this.former.attrs.address,
          country: this.former.attrs.country,
          city: this.former.attrs.city,
          postalCode: this.former.attrs.postalCode,
          passportNumber: this.former.attrs.passportNumber,
          about: this.former.attrs.about,
        },
      }
    },
    computed: {
    },
    methods: {
      async submit () {
        this.disableForm()
        try {
          await api.post(`/${this.account.id}/kyc`, this.former.buildOps())
        } catch (error) {
          Bus.error('kyc-form.submit-error')
        }
        this.enableForm()
      },
    },
  }
</script>

<style scoped>

</style>
