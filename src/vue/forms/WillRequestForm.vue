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
            :disabled="formMixin.isDisabled || former.isUpdateOpBuilder"
            @change="former.setAttr('email', form.email)"
            @blur="touchField('form.email')"
          />
        </v-col>
        <v-col cols="12" md="12">
          <v-file-input
            v-model="form.document"
            :error-messages="getFieldErrorMessage('form.document')"
            :label="'will-request-form.document-lbl' | globalize"
            :disabled="formMixin.isDisabled || former.isUpdateOpBuilder"
            @change="former.setAttr('document', form.document)"
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
  import { WillRequestFormer } from '@/js/formers/WillRequestFormer'
  import { Bus } from '@/js/helpers/event-bus'
  import { api } from '@/api'
  import { vueRoutes } from '@/vue-router/routes'
  import { WILL_REQUEST_STATUSES } from '@/js/const/will-statuses.const'
  import { email, required } from 'vuelidate/lib/validators'

  const EVENTS = {
    submitted: 'submitted',
  }

  export default {
    name: 'WillRequestForm',
    mixins: [FormMixin],
    props: {
      former: {
        type: WillRequestFormer,
        default: () => new WillRequestFormer(),
      },
    },
    data () {
      return {
        form: {
          email: this.former.attrs.email,
          document: this.former.attrs.document,
        },
        WILL_REQUEST_STATUSES,
      }
    },
    validations: {
      form: {
        email: { required, email },
        document: { required },
      },
    },
    methods: {
      async submit () {
        this.disableForm()
        try {
          const willRequest = await this.former.buildOps()
          await api.post('/will-requests/create', willRequest, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          await this.$router.push(vueRoutes.willRequestsList)
        } catch (error) {
          Bus.error('will-request-form.error-sending')
        }
        this.enableForm()
      },
      selectFile (value) {
        this.form.document = value
      },
      async approveWillRequest () {
        this.disableForm()
        try {
          await api.post(`/will-requests/approve/${this.former.attrs.id}`)
          await this.$router.push(vueRoutes.willRequestsList)
        } catch (error) {
          Bus.error('will-request-form.error-sending')
        }
        this.enableForm()
      },
      async rejectWillRequest () {
        this.disableForm()
        try {
          await api.get(`/will-requests/reject/${this.former.attrs.id}`)
          this.$emit(EVENTS.submitted)
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
