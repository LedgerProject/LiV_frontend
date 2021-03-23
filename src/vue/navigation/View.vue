<template>
  <v-main class="view">
    <div class="view__wrapper">
      <template v-if="isAuthPages">
        <transition
          name="auth-transition"
          mode="out-in"
        >
          <router-view />
        </transition>
      </template>
      <template v-else>
        <transition
          name="in-app-transition"
          mode="out-in"
        >
          <router-view />
        </transition>
        <app-footer
          class="view__footer"
        />
      </template>
    </div>
  </v-main>
</template>

<script>
import { vueRoutes } from '@/vue-router/routes'
import AppFooter from '@/vue/navigation/Footer'

export default {
  name: 'view',
  components: { AppFooter },
  computed: {
    isAuthPages () {
      return this.$route.name === vueRoutes.signIn.name ||
          this.$route.name === vueRoutes.signUp.name
    }
  }
}
</script>

<style lang="scss" scoped>
.view__wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.view__footer {
  margin-top: auto;
}

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
