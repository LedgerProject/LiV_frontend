<template>
  <v-main>
    <transition name="auth-transition" mode="out-in">
      <router-view />
    </transition>
  </v-main>
</template>

<script>
  export default {
    name: 'DashboardCoreView',
  }
</script>

<style lang="scss" scoped>
.auth-transition-enter-active {
  animation: auth-transition 0.35s ease-in-out;
}

.auth-transition-leave-active {
  animation: auth-transition 0.35s ease-in-out reverse;
}

@keyframes auth-transition {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
