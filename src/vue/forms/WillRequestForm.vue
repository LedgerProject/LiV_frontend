<template>
  <v-form
    class="will-request-form"
    @submit.prevent="submitWill()"
  >
    <v-container>
      <v-row>
        <div v-if="userType === '0'">
        <!-- <v-col cols="12" md="12">
          <v-text-field
            v-model="form.email"
            :error-messages="getFieldErrorMessage('form.email')"
            :label="'will-request-form.email-lbl' | globalize"
            :disabled="formMixin.isDisabled"
            @blur="touchField('form.email')"
          />
        </v-col> -->
          <v-col cols="12" md="12">
            <h2>{{ $t('will-request-form.will-blueprint')}}</h2>
            <v-file-input
              v-model="form.document"
              :error-messages="getFieldErrorMessage('form.document')"
              :label="'will-request-form.document-lbl' | globalize"
              :disabled="formMixin.isDisabled"
              @blur="touchField('form.document')"
            />
          </v-col>
          <v-col cols="12" md="12">
            <h2>{{ $t('will-request-form.recipients')}}</h2>
            <v-text-field
              v-for="(item,index) in recipientEmails"
              :key="item.id"
              v-model="recipientEmails[index].email"
              :disabled="formMixin.isDisabled"
              :error-messages="getFieldErrorMessage('recipientEmails[' + index + '].email')"
              :label="'will-request-form.email-lbl' | globalize"
              @blur="touchField('recipientEmails[' + index + '].email')"
            />
            <div @click="addRecipient" class="add-recipient"><i>+</i>{{ $t('will-request-form.add-another-rec')}}</div>
          </v-col>
          <v-col cols="12" md="12">
            <v-expansion-panels>
              <v-expansion-panel >
                <v-expansion-panel-header>
                  <h2>{{ $t('will-request-form.knowledge-test')}}</h2>
                </v-expansion-panel-header>
                <v-expansion-panel-content v-for="(q, i) in questions" :key="q.id">
                  <v-text-field
                    v-model="questions[i].question"
                    :label="'will-request-form.enter-answer' | globalize"
                    :disabled="formMixin.isDisabled"
                  />
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-btn
              type="submit"
              :disabled="formMixin.isDisabled"
              @click.prevent="compareAnswers"
              class="mt-3"
            >
              {{ 'will-request-form.pass-test' | globalize }}
            </v-btn>
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
        </div>
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
  submitted: 'submitted'
}

export default {
  name: 'will-request-form',
  mixins: [FormMixin],
  data () {
    return {
      form: {
        document: null,
        questionsConfirmResult: false
      },
      recipientEmails: [
        {
          id: 1,
          email: ''
        }
      ],
      questions: [
        {
          id: 1,
          question: ''
        },
        {
          id: 2,
          question: ''
        }
      ]
    }
  },
  validations: {
    form: {
      document: { required }
    },
    recipientEmails: {
      required,
      $each: {
        email: {
          required, email
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      vuexTypes.account
    ]),
    emailTotal () {
      return this.recipientEmails.reduce((total, item) => {
        return total + item.email + ','
      }, '')
    },
    userType () {
      return this.$store.getters.account.role
    }
  },
  methods: {
    async submit () {
      this.disableForm()
      try {
        const formData = new FormData()
        let emailString = ''

        this.recipientEmails.forEach((item, index) => {
          if (index === this.recipientEmails.length - 1) {
            emailString += item.email
          } else {
            emailString += item.email + ', '
          }
        })

        formData.append('sender_id', this.account.id)
        formData.append('recipient_email', emailString)
        formData.append('file', this.form.document)
        await api.post('/will-requests/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        Bus.success('will-request-form.created-success-msg')
        this.$emit(EVENTS.submitted)
        await this.$router.push(vueRoutes.willRequestsList)
      } catch (error) {
        Bus.error('will-request-form.error-sending')
      }
      this.enableForm()
    },
    addRecipient () {
      this.recipientEmails.push({
        id: this.recipientEmails.length + 1,
        email: ''
      })
    },
    compareAnswers () { // confirm that answers are correct
      // let result = false

      // this.questions.every(item => {
      //   if (item.answer.trim().toLowerCase() === item.trueAnswer.trim().toLowerCase()) {
      //     result = true
      //   } else {
      //     result = false
      //     return false
      //   }
      // })
      // this.questionsConfirmResult = result
      return this.questions[0].question.length && this.questions[1].question.length
    },
    submitWill () {
      return this.isFormValid() && this.submit()
    }
  }
}
</script>

<style scoped>
.add-recipient{
  cursor: pointer;
}

.add-recipient i{
  display: inline-block;
  margin-right: 10px;
}
</style>
