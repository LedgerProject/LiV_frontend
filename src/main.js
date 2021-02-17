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
import Vuetify from 'vuetify/lib/framework'
import Vuelidate from 'vuelidate'
import i18n from '@/i18n'
import App from '@/vue/App.vue'
import router from '@/vue-router'
import { buildStore } from './vuex'

import { globalize } from '@/vue/filters/globalize'
import { globalizeUserRole } from '@/vue/filters/globalizeUserRole'
import { globalizeWillRequestStatus } from '@/vue/filters/globalizeWillRequestStatus'

Vue.use(Vuelidate)
Vue.use(Vuetify)

Vue.filter('globalize', globalize)
Vue.filter('globalizeUserRole', globalizeUserRole)
Vue.filter('globalizeWillRequestStatus', globalizeWillRequestStatus)

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
      dark: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
  lang: {
    t: (key, ...params) => i18n.t(key, params),
  },
})
const store = buildStore()

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
