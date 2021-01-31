export default {
  components: {},
  mixins: [],
  data: _ => ({
    formMixin: {
      isDisabled: false,
      isPending: false,
      isConfirmationShown: false,
    },
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
    },
  },
}
