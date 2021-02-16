<template>
  <v-form
    class="will-request-form"
    @submit.prevent="isFormValid() && submit()"
  >
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="form.firstName"
            :error-messages="getFieldErrorMessage('form.firstName')"
            :label="'will-request-form.first-name-lbl' | globalize"
            :disabled="formMixin.isDisabled || former.isUpdateOpBuilder"
            @change="former.setAttr('firstName', form.firstName)"
            @blur="touchField('form.firstName')"
          />
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="form.middleName"
            :error-messages="getFieldErrorMessage('form.middleName')"
            :label="'will-request-form.middle-name-lbl' | globalize"
            :disabled="formMixin.isDisabled || former.isUpdateOpBuilder"
            @change="former.setAttr('middleName', form.middleName)"
            @blur="touchField('form.middleName')"
          />
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="form.lastName"
            :error-messages="getFieldErrorMessage('form.lastName')"
            :label="'will-request-form.last-name-lbl' | globalize"
            :disabled="formMixin.isDisabled || former.isUpdateOpBuilder"
            @change="former.setAttr('lastName', form.lastName)"
            @blur="touchField('form.lastName')"
          />
        </v-col>
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
          <v-text-field
            v-model="form.address"
            :error-messages="getFieldErrorMessage('form.address')"
            :label="'will-request-form.address-lbl' | globalize"
            :disabled="formMixin.isDisabled || former.isUpdateOpBuilder"
            @change="former.setAttr('address', form.address)"
            @blur="touchField('form.address')"
          />
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="form.passportNumber"
            :error-messages="getFieldErrorMessage('form.passportNumber')"
            :label="'will-request-form.passport-number-lbl' | globalize"
            :disabled="formMixin.isDisabled || former.isUpdateOpBuilder"
            @change="former.setAttr('passportNumber', form.passportNumber)"
            @blur="touchField('form.passportNumber')"
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
          <template v-if="former.isUpdateOpBuilder">
            <template
              v-if="
                +former._initAttrs.statusId !==
                  WILL_REQUEST_STATUSES.rejected &&
                  +former._initAttrs.statusId !==
                  WILL_REQUEST_STATUSES.approved
              "
            >
              <v-btn
                type="button"
                color="success"
                :disabled="formMixin.isDisabled"
                @click.prevent="approveWillRequest"
              >
                {{ 'will-request-form.approve-btn' | globalize }}
              </v-btn>
              <v-btn
                type="button"
                color="error"
                :disabled="formMixin.isDisabled"
                @click.prevent="rejectWillRequest"
              >
                {{ 'will-request-form.reject-btn' | globalize }}
              </v-btn>
            </template>
          </template>
          <template v-else>
            <v-btn
              type="submit"
              :disabled="formMixin.isDisabled"
            >
              {{ 'will-request-form.submit-btn' | globalize }}
            </v-btn>
          </template>
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
          firstName: this.former.attrs.firstName,
          middleName: this.former.attrs.middleName,
          lastName: this.former.attrs.lastName,
          address: this.former.attrs.address,
          passportNumber: this.former.attrs.passportNumber,
          document: this.former.attrs.document,
        },
        WILL_REQUEST_STATUSES,
      }
    },
    validations: {
      form: {
        email: { required, email },
        firstName: { required },
        middleName: { required },
        lastName: { required },
        address: { required },
        passportNumber: { required },
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
