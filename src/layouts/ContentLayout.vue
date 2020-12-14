<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot="links">
        <sidebar-item
          :link="{
            name: vueRoutes.services.name,
            path: vueRoutes.services.name,
            icon: 'ni ni-tv-2 text-primary',
          }"
        >
        </sidebar-item>
      </template>
    </side-bar>
    <div class="main-content">
      <dashboard-navbar
        class="main-content__header"
        :type="$route.meta.navbarType"
      />

      <div
        class="main-content__body"
        @click="$sidebar.displaySidebar(false)"
      >
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
      </div>
      <content-footer
        v-if="!$route.meta.hideFooter"
        class="main-content__footer"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-new */
import DashboardNavbar from '@/navigations/Navbar.vue';
import ContentFooter from '@/navigations/Footer.vue';
import { FadeTransition } from 'vue2-transitions';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { vueRoutes } from '@/routes/routes'
import {vuexTypes} from "@/vuex";
import {mapActions} from "vuex";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    FadeTransition
  },
  data: _ => ({
    vueRoutes,
  }),
  async created () {
    await this.loadAccount(this.$cookies.get('token'))
  },
  methods: {
    ...mapActions({
      loadAccount: vuexTypes.LOAD_ACCOUNT,
    }),
    initScrollbar() {
      let isWindows = navigator.platform.startsWith('Win');
      if (isWindows) {
        initScrollbar('sidenav');
      }
    }
  },
  mounted() {
    this.initScrollbar()
  }
};
</script>

<style lang="scss">
.main-content {
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;

  &__header {
    position: relative;
  }

  &__body {

  }

  &__footer {

  }
}
</style>
