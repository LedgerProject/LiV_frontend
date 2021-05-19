<template>
  <div class="notification">
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :timeout="timeout"
      top
      right
      multi-line
    >
      <template>
        <v-icon class="notification__icon">
          <template v-if="color === COLORS.error">
            mdi-alert
          </template>
          <template v-else-if="color === COLORS.success">
            mdi-check-circle
          </template>
          <template v-else-if="color === COLORS.warning">
            mdi-comment-alert
          </template>
          <template v-else-if="color === COLORS.info">
            mdi-information
          </template>
        </v-icon>
      </template>
      {{ $t(message) }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { Bus } from '@/js/helpers/event-bus'

const COLORS = {
  error: 'error',
  success: 'success',
  warning: 'warning',
  info: 'info'
}

export default {
  name: 'notification',
  data () {
    return {
      snackbar: false,
      color: COLORS.info,
      timeout: 5000,
      message: '',
      COLORS
    }
  },
  created () {
    Bus.on(Bus.eventList.success, message => {
      this.message = message
      this.color = COLORS.success
      this.snackbar = true
    })
    Bus.on(Bus.eventList.error, message => {
      this.message = message
      this.color = COLORS.error
      this.snackbar = true
    })
    Bus.on(Bus.eventList.warning, message => {
      this.message = message
      this.color = COLORS.warning
      this.snackbar = true
    })
    Bus.on(Bus.eventList.info, message => {
      this.message = message
      this.color = COLORS.info
      this.snackbar = true
    })
  }
}
</script>

<style lang="scss" scoped>
.notification__icon {
  margin-right: 0.5rem;
}
</style>
