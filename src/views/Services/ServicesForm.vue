<template>
  <div class="services-form">
    <b-form @submit.prevent="submit">
      <b-form-group>
        <base-input
          v-model="form.firstname"
          label="First name"
          placeholder="First name"
          type="text"
        />
        <base-input
          v-model="form.middlename"
          label="Middle name"
          placeholder="Middle name"
          type="text"
        />
        <base-input
          v-model="form.lastname"
          label="Last name"
          placeholder="Last name"
          type="text"
        />
        <base-input
          v-model="form.passportID"
          label="Passport ID"
          placeholder="Passport ID"
          type="text"
        />
      </b-form-group>
      <b-form-group>
        <b-form-file
          v-model="form.file"
          placeholder="Choose a file or drop it here..."
        />
      </b-form-group>
      <b-form-group>
        <template v-if="isPending">
          <scale-loader
            color="#525f7f"
          />
        </template>
        <template v-else>
          <b-button variant="primary" type="submit">
            Send
          </b-button>
        </template>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import {api} from "@/api";
import {mapGetters} from "vuex";
import {vuexTypes} from "@/vuex";
import { ScaleLoader } from '@saeris/vue-spinners'

const EVENTS = {
  submitted: 'submitted',
}

export default {
  name: "services-form",
  components: { ScaleLoader },
  props: {
    service: {
      type: Object,
      required: true
    },
  },
  data: _ => ({
    form: {
      firstname: '',
      middlename: '',
      lastname: '',
      passportID: '',
      file: null
    },
    isPending: false,
  }),
  computed: {
    ...mapGetters([
      vuexTypes.account,
    ]),
    theFile () {
      console.log(this.form.file)
      return this.form.file
    }
  },
  methods: {
    async submit () {
      this.isPending = true
      try {
        await this.addServiceStatus()
        await this.addKycData()
        this.$notify({
          type: 'success',
          message: 'Success'
        })
        this.$emit(EVENTS.submitted)
      } catch (error) {
        this.$notify({
          type: 'danger',
          message: 'Error on create request!'
        })
      }
      this.isPending = false
    },
    async addServiceStatus () {
      const serviceData = {
        ...this.form,
        userEmail: this.account.email,
        institution: this.service.institution,
        service: this.service.name,
        status: 'In progress'
      }
      await api.post('/services/addServiceStatus', {
        ...serviceData
      })
    },
    async addKycData () {
      const kycData = {
        firstName: this.form.firstname,
        middleName: this.form.middlename,
        lastName: this.form.lastname,
        passportID: this.form.passportID,
        email: this.account.email,
        file: 'some file'
      }
      await api.post('users/addKYC', {
        ...kycData
      })
    },
  }
}
</script>
