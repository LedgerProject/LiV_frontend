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
import vuetify from '@/plugins/vuetify'
import i18n from '@/i18n'
import { buildStore } from './vuex'
import { globalizeUserRole } from '@/vue/filters/globalizeUserRole'
import { globalize } from '@/vue/filters/globalize'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'

Vue.config.productionTip = false
const store = buildStore()

Vue.filter('globalizeUserRole', globalizeUserRole)
Vue.filter('globalize', globalize)

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
