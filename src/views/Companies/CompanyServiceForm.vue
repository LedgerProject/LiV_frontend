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
      </b-form-group>
      <b-form-group>
        <b-form-file
          v-model="form.file"
          :state="Boolean(form.file)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        />
      </b-form-group>
      <b-form-group>
        <b-button type="submit">
          Send
        </b-button>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
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
      file: null
    }
  }),
  methods: {
    submit () {
      alert(this.form)
      this.$emit(EVENTS.submitted)
    }
  }
}
</script>
