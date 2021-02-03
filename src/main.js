// =========================================================
// * Vuetify Material Dashboard - v2.1.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// eslint-disable-next-line max-len
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from 'vue'
import App from '@/vue/App.vue'
import router from '@/vue-router'
import i18n from '@/i18n'
import Vuetify from 'vuetify/lib'
import Vuelidate from 'vuelidate'

import '@/scss/overrides.sass'
import 'chartist/dist/chartist.min.css'

import { buildStore } from './vuex'
import { globalize } from '@/vue/filters/globalize'
import { globalizeUserRole } from '@/vue/filters/globalizeUserRole'
import { globalizeWillRequest } from '@/vue/filters/globalizeWillRequest'

const store = buildStore()

Vue.use(require('vue-chartist'))
Vue.use(Vuetify)
Vue.use(Vuelidate)

Vue.filter('globalize', globalize)
Vue.filter('globalizeUserRole', globalizeUserRole)
Vue.filter('globalizeWillRequest', globalizeWillRequest)

const vuetify = new Vuetify({
  lang: {
    t: (key, ...params) => i18n.t(key, params),
  },
  themes: {
    light: {
      primary: '#4CAF50',
      secondary: '#9C27b0',
      accent: '#9C27b0',
      info: '#00CAE3',
      error: '#FF5252',
      success: '#4CAF50',
      warning: '#FFC107',
    },
    dark: {
      primary: '#4CAF50',
      secondary: '#9C27b0',
      accent: '#9C27b0',
      info: '#00CAE3',
      error: '#FF5252',
      success: '#4CAF50',
      warning: '#FFC107',
    },
  },
})

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
