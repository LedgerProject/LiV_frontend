<template>
  <card>
    <b-row align-v="center" slot="header" >
      <b-col cols="8" />
      <b-col cols="4" class="text-right">
        <base-button @click="updateProfile">Save</base-button>
      </b-col>
    </b-row>

    <b-form @submit.prevent="updateProfile">
      <h6 class="heading-small text-muted mb-4">User information</h6>
      <div class="pl-lg-4">
        <b-row >
          <b-col lg="6">
            <base-input
              type="text"
              label="First Name"
              placeholder="First Name"
              v-model="user.firstname"
            >
            </base-input>
          </b-col>
          <b-col lg="6">
            <base-input
              type="text"
              label="Last Name"
              placeholder="Last Name"
              v-model="user.lastname"
            >
            </base-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6">
            <base-input
              type="email"
              label="Email address"
              placeholder="mike@email.com"
              v-model="user.email"
            >
            </base-input>
          </b-col>
          <b-col lg="6">
            <base-input
              type="password"
              label="Password"
              placeholder="Password"
              v-model="user.password"
            >
            </base-input>
          </b-col>
        </b-row>
      </div>
      <hr class="my-4">
    </b-form>
  </card>
</template>
<script>
import {mapGetters} from "vuex";
import {vuexTypes} from "@/vuex";

export default {
  data() {
    return {
      user: {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      }
    };
  },
  computed: {
    ...mapGetters([
      vuexTypes.account
    ])
  },
  created () {
    this.populateProfile()
  },
  methods: {
    populateProfile () {
      this.user.firstname = this.account.firstname
      this.user.lastname = this.account.lastname
      this.user.email = this.account.email
    },
    updateProfile() {
      alert('Your data: ' + JSON.stringify(this.user));
    }
  }
};
</script>
<style></style>
