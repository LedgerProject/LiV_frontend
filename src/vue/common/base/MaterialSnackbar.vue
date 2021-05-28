<template>
  <v-snackbar
    v-model="internalValue"
    class="v-snackbar--material"
    v-bind="{
      ...$attrs,
      'color': 'transparent'
    }"
  >
    <material-alert
      v-model="internalValue"
      :color="$attrs.color"
      :dismissible="dismissible"
      :type="type"
      class="ma-0"
      dark
    >
      <slot />
    </material-alert>
  </v-snackbar>
</template>
<script>
import MaterialAlert from '@/vue/common/base/MaterialAlert'
export default {
  name: 'material-snackbar',
  components: { MaterialAlert },
  props: {
    dismissible: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: '',
    },
    value: Boolean,
  },

  data () {
    return {
      internalValue: this.value,
    }
  },

  watch: {
    internalValue (val, oldVal) {
      if (val === oldVal) return

      this.$emit('input', val)
    },
    value (val, oldVal) {
      if (val === oldVal) return

      this.internalValue = val
    },
  },
}
</script>

<style lang="scss">
.v-snackbar--material {
  margin-top: 3.2rem;
  margin-bottom: 3.2rem;

  .v-alert--material,
  .v-snack__wrapper { border-radius: 0.4rem; }

  .v-snack__content {
    overflow: visible;
    padding: 0;
  }
}
</style>
