<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none"
             version="1.1"
             xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default"
                   points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <!-- Table -->
      <b-row class="justify-content-center">
        <b-col lg="6" md="8">
          <b-card no-body class="bg-secondary border-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>Sign up with credentials</small>
              </div>
              <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                <b-form role="form" @submit.prevent="onSubmit">
                  <base-input
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-hat-3"
                    placeholder="Firstname"
                    name="Firstname"
                    :rules="{required: true}"
                    v-model="form.firstname"
                  >
                  </base-input>
                  <base-input
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-hat-3"
                    placeholder="Lastname"
                    name="Lastname"
                    :rules="{required: true}"
                    v-model="form.lastname"
                  >
                  </base-input>
                  <base-input
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-email-83"
                    placeholder="Email"
                    name="Email"
                    :rules="{required: true, email: true}"
                    v-model="form.email"
                  >
                  </base-input>
                  <base-input
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-lock-circle-open"
                    placeholder="password"
                    type="password"
                    name="Password"
                    :rules="{required: true, min: 6}"
                    v-model="form.password"
                  >
                  </base-input>
                  <div class="text-center">
                    <b-button type="submit" variant="primary" class="mt-4">
                      Create account
                    </b-button>
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
          <b-row class="mt-3">
            <b-col cols="6"/>
            <b-col cols="6" class="text-right">
              <router-link :to="vueRoutes.login" class="text-light"><small>Login to account</small></router-link>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { vueRoutes } from '@/routes/routes'
import Axios from "axios";
import {api} from "@/api";
import {mapActions} from "vuex";
import {vuexTypes} from "@/vuex";

export default {
  name: 'register',
  data() {
    return {
      form: {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      },
      vueRoutes
    }
  },
  methods: {
    ...mapActions({
      loginAccount: vuexTypes.LOG_IN,
    }),
    async onSubmit() {
      try {
        await api.post('/users/signup', {
          "firstName": this.form.firstname,
          "lastName": this.form.lastname,
          "email": this.form.email,
          "password": this.form.password
        })
        await this.loginAccount({
          email: this.form.email,
          password: this.form.password
        })
        await this.$router.push(vueRoutes.services)
      } catch (error) {
        console.log(error)
      }
    }
  }

};
</script>
<style></style>
