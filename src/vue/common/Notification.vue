<template>
  <div class="notification">
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :timeout="timeout"
      absolute
      top
      right
      multi-line
    >
      {{ $t(message) }}
    </v-snackbar>
  </div>
</template>

<script>
  import { Bus } from '@/js/helpers/event-bus'

  const COLORS = {
    error: 'error',
    success: 'success',
    warning: 'warning',
    info: 'info',
  }

  export default {
    name: 'Notification',
    data () {
      return {
        snackbar: false,
        color: COLORS.info,
        timeout: 5000,
        message: '',
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
    },
  }
</script>
