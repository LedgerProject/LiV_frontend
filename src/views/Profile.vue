<template>
  <div class="profile">
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header">
      <b-container fluid>
        <!-- Mask -->
        <span class="mask bg-gradient-success opacity-8"></span>
        <!-- Header container -->
        <b-container fluid class="d-flex align-items-center">
          <b-row>
            <b-col lg="7" md="10">
              <h1 class="display-2 text-white">Hello, {{ account.firstname }}</h1>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>

    <b-container fluid class="mt--6">
      <b-row>
        <b-col xl="12" class="order-xl-1">
          <profile-form />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ProfileForm from './Profile/ProfileForm.vue';
import {mapGetters} from "vuex";
import {vuexTypes} from "@/vuex";

export default {
  name: 'profile',
  components: {
    ProfileForm
  },
  data: _ => ({
  }),
  computed: {
    ...mapGetters([
      vuexTypes.account,
    ])
  },
};
</script>

<style lang="scss" scoped>
.profile {
  width: 100%;
}
</style>
