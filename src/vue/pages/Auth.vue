<template>
  <transition name="auth-transition">
    <router-view />
  </transition>
</template>

<script>
  export default {
    name: 'Auth',
  }
</script>

<style lang="scss" scoped>
.auth-transition-enter-active {
  animation: auth-transition 0.5s ease-in-out;
}

.auth-transition-leave-active {
  animation: auth-transition 0.5s ease-in-out reverse;
}

@keyframes auth-transition {
  0% {
    opacity: 0;
    margin-top: -10rem;
  }
  100% {
    opacity: 1;
    margin-top: 0;
  }
}
</style>
