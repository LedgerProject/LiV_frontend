<template>
  <material-card
    class="v-card--material-chart"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-slot:heading>
      <chartist
        :data="data"
        :event-handlers="eventHandlers"
        :options="options"
        :ratio="ratio"
        :responsive-options="responsiveOptions"
        :type="type"
        style="max-height: 150px;"
      />
    </template>

    <slot
      slot="reveal-actions"
      name="reveal-actions"
    />

    <slot />

    <slot
      slot="actions"
      name="actions"
    />
  </material-card>
</template>

<script>
import MaterialCard from '@/vue/common/base/MaterialCard'

export default {
  name: 'material-chart-card',
  components: { MaterialCard },
  inheritAttrs: false,

  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    eventHandlers: {
      type: Array,
      default: () => ([]),
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    ratio: {
      type: String,
      default: undefined,
    },
    responsiveOptions: {
      type: Array,
      default: () => ([]),
    },
    type: {
      type: String,
      required: true,
      validator: v => ['Bar', 'Line', 'Pie'].includes(v),
    },
  },
}
</script>

<style lang="scss">
  .v-card--material-chart {

    p { color: $col-chart-card-text; }

    .v-card--material__heading {
      max-height: 18.5rem;

      .ct-label {
        color: inherit;
        opacity: 0.7;
        font-size: 0.975rem;
        font-weight: 100;
      }

      .ct-grid { stroke: $col-chart-card-grid-stroke; }

      .ct-series-a .ct-point,
      .ct-series-a .ct-line,
      .ct-series-a .ct-bar,
      .ct-series-a .ct-slice-donut {
        stroke: $col-chart-card-grid-stroke-secondary;
      }

      .ct-series-a .ct-slice-pie,
      .ct-series-a .ct-area {
        fill: $col-chart-card-grid-stroke-third;
      }
    }
  }
</style>
