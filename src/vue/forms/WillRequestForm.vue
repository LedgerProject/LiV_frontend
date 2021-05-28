<template>
  <v-form
    class="will-request-form"
    @submit.prevent="isFormValid() && submit()"
  >
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="form.email"
            :error-messages="getFieldErrorMessage('form.email')"
            :label="'will-request-form.email-lbl' | globalize"
            :disabled="formMixin.isDisabled"
            @blur="touchField('form.email')"
          />
        </v-col>
        <v-col cols="12" md="12">
          <v-file-input
            v-model="form.document"
            :error-messages="getFieldErrorMessage('form.document')"
            :label="'will-request-form.document-lbl' | globalize"
            :disabled="formMixin.isDisabled"
            @blur="touchField('form.document')"
          />
        </v-col>
        <v-col cols="12" md="12">
          <v-btn
            type="submit"
            :disabled="formMixin.isDisabled"
          >
            {{ 'will-request-form.submit-btn' | globalize }}
          </v-btn>
          <v-progress-circular
            v-if="formMixin.isDisabled"
            indeterminate
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import FormMixin from '@/vue/mixins/form.mixin'
import { Bus } from '@/js/helpers/event-bus'
import { vueRoutes } from '@/vue-router/routes'
import { email, required } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import { vuexTypes } from '@/vuex'
import { api } from '@/api'

const EVENTS = {
  submitted: 'submitted',
}

export default {
  name: 'will-request-form',
  mixins: [FormMixin],
  data () {
    return {
      form: {
        email: '',
        document: null,
      },
    }
  },
  validations: {
    form: {
      email: { required, email },
      document: { required },
    },
  },
  computed: {
    ...mapGetters([
      vuexTypes.account,
    ]),
  },
  methods: {
    async submit () {
      this.disableForm()
      try {
        const formData = new FormData()
        formData.append('sender_id', this.account.id)
        formData.append('recipient_email', this.form.email)
        formData.append('file', this.form.document)
        await api.post('/will-requests/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        Bus.success('will-request-form.created-success-msg')
        this.$emit(EVENTS.submitted)
        await this.$router.push(vueRoutes.willRequestsList)
      } catch (error) {
        Bus.error('will-request-form.error-sending')
      }
      this.enableForm()
    },
  },
}
</script>

<style scoped>

</style>
