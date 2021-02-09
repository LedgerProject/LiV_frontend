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
              {{ 'user-profile.loading-error' | globalize }}
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
                <div class="display-2 font-weight-light">
                  Edit Profile
                </div>

                <div class="subtitle-1 font-weight-light">
                  Complete your profile
                </div>
              </template>

              <v-form>
                <kyc-form
                  :former="former"
                />
              </v-form>
            </material-card>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <material-card
              class="v-card-profile"
              avatar="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
            >
              <v-card-text class="text-center">
                <h6 class="display-1 mb-1 grey--text">
                  CEO / CO-FOUNDER
                </h6>

                <h4 class="display-2 font-weight-light mb-3 black--text">
                  Alec Thompson
                </h4>

                <p class="font-weight-light grey--text">
                  Lorem ipsum dolor sit amet.
                </p>
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
  import KycForm from '@/vue/forms/KycForm'
  import { KycFormer } from '@/js/formers/KycFormer'
  import { mapActions, mapGetters } from 'vuex'
  import { vuexTypes } from '@/vuex'
  import { Bus } from '@/js/helpers/event-bus'

  export default {
    name: 'UserProfile',
    components: {
      KycForm,
      MaterialCard,
    },
    data () {
      return {
        isLoaded: false,
        isLoadFailed: false,
        former: new KycFormer(),
      }
    },
    computed: {
      ...mapGetters([
        vuexTypes.account,
        vuexTypes.kyc,
      ]),
    },
    async created () {
      await this.loadKyc()
    },
    methods: {
      ...mapActions({
        loadKycAction: vuexTypes.LOAD_KYC,
      }),
      async loadKyc () {
        this.isLoaded = false
        this.isLoadFailed = false
        try {
          await this.loadKycAction()
          this.former = new KycFormer(this.kyc)
        } catch (error) {
          Bus.error('user-profile.loading-error')
          this.isLoadFailed = true
        }
        this.isLoaded = true
      },
      reloadKyc () {
        this.loadKyc()
      },
    },
  }
</script>
