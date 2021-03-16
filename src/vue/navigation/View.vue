<template>
  <v-main>
    <transition
      :name="isAuthPages ? 'auth-transition' : 'in-app-transition'"
      mode="out-in"
    >
      <router-view />
    </transition>
  </v-main>
</template>

<script>
  import { vueRoutes } from '@/vue-router/routes'

  export default {
    name: 'dashboard-core-view',
    computed: {
      isAuthPages () {
        return this.$route.name === vueRoutes.signIn.name ||
          this.$route.name === vueRoutes.signUp.name
      },
    },
  }
</script>

<style lang="scss" scoped>
.auth-transition-enter-active {
  animation: auth-transition 0.15s ease-in-out;
}

.auth-transition-leave-active {
  animation: auth-transition 0.15s ease-in-out reverse;
}

@keyframes auth-transition {
  0% {
    opacity: 0;
    transform: scale(0.75);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.in-app-transition-enter-active {
  animation: in-app-transition 0.35s ease-in-out;
}

.in-app-transition-leave-active {
  animation: in-app-transition 0.35s ease-in-out reverse;
}

@keyframes in-app-transition {
  0% {
    //opacity: 0.25;
    filter: blur(1rem);
  }
  100% {
    //opacity: 1;
    filter: blur(0rem);
  }
}
</style>
