<template>
  <base-nav
    container-classes="container-fluid"
    class="navbar-top navbar-expand"
    :type="type"
  >
    <a href="#" aria-current="page"
       class="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block active router-link-active">
      {{ $route.name }}
    </a>
    <!-- Navbar links -->
    <b-navbar-nav class="align-items-center ml-md-auto">
      <!-- This item dont have <b-nav-item> because item have data-action/data-target on tag <a>, wich we cant add -->
      <li class="nav-item d-sm-none">
        <a class="nav-link" href="#" data-action="search-show"
           data-target="#navbar-search-main">
          <i class="ni ni-zoom-split-in"></i>
        </a>
      </li>
    </b-navbar-nav>
    <b-navbar-nav class="align-items-center ml-auto ml-md-0">
      <base-dropdown
        menu-on-right
        class="nav-item"
        tag="li"
        title-tag="a"
        title-classes="nav-link pr-0"
      >
        <a href="#" class="nav-link pr-0" @click.prevent slot="title-container">
          <b-media no-body class="align-items-center">
            <span class="avatar avatar-sm rounded-circle" />
            <b-media-body class="ml-2 d-none d-lg-block">
              <span class="mb-0 text-sm  font-weight-bold">
                {{ fullName }}
              </span>
            </b-media-body>
          </b-media>
        </a>

        <template>
          <router-link :to="vueRoutes.profile" class="dropdown-item">
            <i class="ni ni-single-02"></i>
            <span>My profile</span>
          </router-link>
          <div class="dropdown-divider"></div>
          <b-dropdown-item
            @click="logOut"
          >
            <i class="ni ni-user-run"></i>
            <span>Logout</span>
          </b-dropdown-item>
        </template>
      </base-dropdown>
    </b-navbar-nav>
  </base-nav>
</template>
<script>
import { CollapseTransition } from 'vue2-transitions'
import { BaseNav, Modal } from '@/components'
import { vueRoutes } from '@/routes/routes'
import { mapActions, mapGetters } from "vuex"
import { vuexTypes } from "@/vuex"

export default {
  components: {
    CollapseTransition,
    BaseNav,
    Modal
  },
  props: {
    type: {
      type: String,
      default: 'default', // default|light
      description: 'Look of the dashboard navbar. Default (Green) or light (gray)'
    }
  },
  data() {
    return {
      vueRoutes,
    };
  },
  computed: {
    ...mapGetters([
      vuexTypes.account
    ]),
    fullName() {
      return `${this.account.firstname} ${this.account.lastname}`
    },
  },
  methods: {
    ...mapActions({
      logOutUser: vuexTypes.LOG_OUT,
    }),
    async logOut () {
      await this.logOutUser()
      window.location.reload()
    },
  }
};
</script>
