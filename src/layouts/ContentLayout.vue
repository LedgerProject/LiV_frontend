<template>
  <div class="main-wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot="links">
        <sidebar-item
          :link="{
            name: vueRoutes.companies.name,
            path: vueRoutes.companies.name,
            icon: 'ni ni-tv-2 text-primary',
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: vueRoutes.statuses.name,
            path: vueRoutes.statuses.name,
            icon: 'ni ni-box-2 text-primary',
          }"
        >
        </sidebar-item>
      </template>
    </side-bar>
    <div class="main-content">
      <dashboard-navbar
        class="main-content__header"
        type="primary"
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
import DashboardNavbar from '@/navigations/Navbar.vue'
import ContentFooter from '@/navigations/Footer.vue'
import { FadeTransition } from 'vue2-transitions'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import { vueRoutes } from '@/routes/routes'

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
  methods: {
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

<style lang="scss" scoped>

.main-wrapper {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}

.main-content {
  overflow: hidden auto;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.05fr 1fr auto;

  &__header {
    position: relative;
  }
}
</style>
