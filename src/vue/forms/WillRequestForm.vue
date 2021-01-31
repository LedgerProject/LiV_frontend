<template>
  <v-form
    class="will-request-form"
    @submit.prevent="submit"
  >
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="form.firstName"
            :label="'will-request-form.first-name-lbl' | globalize"
            :disabled="formMixin.isDisabled"
            @change="former.setAttr('firstName', form.firstName)"
          />
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="form.middleName"
            :label="'will-request-form.middle-name-lbl' | globalize"
            :disabled="formMixin.isDisabled"
            @change="former.setAttr('middleName', form.middleName)"
          />
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="form.lastName"
            :label="'will-request-form.last-name-lbl' | globalize"
            :disabled="formMixin.isDisabled"
            @change="former.setAttr('lastName', form.lastName)"
          />
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="form.email"
            :label="'will-request-form.email-lbl' | globalize"
            :disabled="formMixin.isDisabled"
            @change="former.setAttr('email', form.email)"
          />
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="form.address"
            :label="'will-request-form.address-lbl' | globalize"
            :disabled="formMixin.isDisabled"
            @change="former.setAttr('address', form.address)"
          />
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="form.passportNumber"
            :label="'will-request-form.passport-number-lbl' | globalize"
            :disabled="formMixin.isDisabled"
            @change="former.setAttr('passportNumber', form.passportNumber)"
          />
        </v-col>
        <v-col cols="12" md="12">
          <v-file-input
            v-model="form.document"
            :label="'will-request-form.document-lbl' | globalize"
            :disabled="formMixin.isDisabled"
            @change="former.setAttr('document', form.document)"
          />
        </v-col>
        <v-col cols="12" md="12">
          <template v-if="former.isUpdateOpBuilder">
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
          <template v-else>
            <v-btn
              type="submit"
              color="primary"
              :disabled="formMixin.isDisabled"
            >
              {{ 'will-request-form.submit-btn' | globalize }}
            </v-btn>
          </template>
          <v-progress-circular
            v-if="formMixin.isDisabled"
            indeterminate
            color="primary"
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
      }
    },
    methods: {
      async submit () {
        this.disableForm()
        try {
          await api.post('/will-requests/create', this.former.buildOps(), {
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
