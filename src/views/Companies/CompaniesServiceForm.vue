<template>
  <div class="company-service-form">
    <b-form @submit.prevent="submit">
      <b-form-group>
        <base-input
          v-model="form.firstname"
          label="firstname"
          placeholder="firstname"
          type="text"
        />
        <base-input
          v-model="form.middlename"
          label="middlename"
          placeholder="middlename"
          type="text"
        />
        <base-input
          v-model="form.lastname"
          label="lastname"
          placeholder="lastname"
          type="text"
        />
        <base-input
          v-model="form.passportID"
          label="passportID"
          placeholder="passportID"
          type="text"
        />
        <base-input
          v-model="form.email"
          label="email"
          placeholder="email"
          type="email"
        />
      </b-form-group>
      <b-form-group>
        <b-form-file
          v-model="form.file"
          placeholder="Choose a file or drop it here..."
        />
      </b-form-group>
      <b-form-group>
        <b-button variant="primary" type="submit">
          Send
        </b-button>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import {api} from "@/api";

const EVENTS = {
  submitted: 'submitted',
}

export default {
  name: "company-service-form",
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
      email: '',
      file: null
    }
  }),
  methods: {
    async submit () {
      try {
        const buildedData = {
          ...this.form,
          userEmail: this.form.email,
          institution: this.service.institution,
          service: this.service.name,
          status: 'In progress'
        }
        await api.post('/services/addServiceStatus', {
          ...buildedData
        })
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
    }
  }
}
</script>
