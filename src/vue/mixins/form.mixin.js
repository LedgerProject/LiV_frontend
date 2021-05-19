import { validationMixin } from 'vuelidate'
import FormValidationMixin from '@/vue/mixins/form-validation.mixin'

export default {
  components: {},
  mixins: [validationMixin, FormValidationMixin],
  data: _ => ({
    formMixin: {
      isDisabled: false,
      isPending: false,
      isConfirmationShown: false
    }
  }),
  methods: {
    disableForm () {
      this.formMixin.isDisabled = true
    },
    enableForm () {
      this.formMixin.isDisabled = false
    },
    showConfirmation () {
      this.disableForm()
      this.formMixin.isConfirmationShown = true
    },
    hideConfirmation () {
      this.enableForm()
      this.formMixin.isConfirmationShown = false
    },
    async hideConfirmationAfterSubmit (submit) {
      this.formMixin.isPending = true
      await submit()
      this.hideConfirmation()
      this.formMixin.isPending = false
    }
  }
}
