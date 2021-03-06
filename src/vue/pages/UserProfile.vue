<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <template v-if="isLoaded">
        <template v-if="isLoadFailed">
          <v-col
            cols="12"
            md="12"
          >
            <v-alert
              border="right"
              colored-border
              type="error"
              elevation="2"
            >
              {{ 'user-profile.loading-error-msg' | globalize }}
            </v-alert>
          </v-col>
        </template>
        <template v-else>
          <v-col
            cols="12"
            md="8"
          >
            <material-card>
              <template v-slot:heading>
                <div class="text-h3 font-weight-light">
                  Edit Profile
                </div>

                <div class="text-subtitle-1 font-weight-light">
                  Complete your profile
                </div>
              </template>

              <v-form>
                <account-form
                  :former="former"
                  @submit="loadAccount"
                />
              </v-form>
            </material-card>
          </v-col>
          <v-col
            cols="12"
            md="4"
            class="mt-3"
          >
            <material-card
              class="v-card-profile"
              avatar="https://elasticbeanstalk-eu-west-1-454319366185.s3-eu-west-1.amazonaws.com/Portrait_Placeholder.png"
            >
              <v-card-text class="text-center">
                <h6 class="text-h4 mb-1 grey--text">
                  {{ account.role | globalizeUserRole }}
                </h6>

                <h4 class="text-h3 font-weight-light mb-3">
                  {{ account.fullName }}
                </h4>

                <h6 class="text-h6 mb-1 grey--text">
                  {{ account.passportNumber }}
                </h6>
              </v-card-text>
            </material-card>
          </v-col>
        </template>
      </template>
      <template v-else>
        <v-col
          cols="12"
          md="8"
        >
          <v-skeleton-loader
            type="article, article, article, actions"
          />
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-skeleton-loader
            type="card-avatar, article"
          />
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import MaterialCard from '@/vue/common/base/MaterialCard'
import AccountForm from '@/vue/forms/AccountForm'
import { AccountFormer } from '@/js/formers/AccountFormer'
import { mapActions, mapGetters } from 'vuex'
import { vuexTypes } from '@/vuex'
import { Bus } from '@/js/helpers/event-bus'

export default {
  name: 'user-profile',
  components: {
    AccountForm,
    MaterialCard
  },
  data () {
    return {
      isLoaded: false,
      isLoadFailed: false,
      former: new AccountFormer()
    }
  },
  computed: {
    ...mapGetters([
      vuexTypes.jwtToken,
      vuexTypes.account
    ])
  },
  async created () {
    await this.loadAccount()
  },
  methods: {
    ...mapActions({
      loadAccountStore: vuexTypes.LOAD_ACCOUNT
    }),
    async loadAccount () {
      this.isLoaded = false
      this.isLoadFailed = false
      try {
        await this.loadAccountStore(this.jwtToken)
        this.former = new AccountFormer(this.account)
      } catch (error) {
        Bus.error('user-profile.loading-error-msg')
        this.isLoadFailed = true
      }
      this.isLoaded = true
    },
    reloadAccount () {
      this.loadAccount()
    }
  }
}
</script>
