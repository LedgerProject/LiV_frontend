<template>
  <v-container class="auth d-flex align-center justify-center">
    <v-row>
      <v-col>
        <transition name="auth-transition" mode="out-in">
          <router-view />
        </transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Auth',
  }
</script>

<style lang="scss" scoped>
.auth {
  height: 100%;
}

.auth-transition-enter-active {
  animation: auth-transition 0.35s ease-in-out;
}

.auth-transition-leave-active {
  animation: auth-transition 0.35s ease-in-out reverse;
}

@keyframes auth-transition {
  0% {
    opacity: 0;
    transform: translateY(-25%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
