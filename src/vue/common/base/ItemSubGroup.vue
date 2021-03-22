<template>
  <item-group
    :item="item"
    text
    sub-group
  />
</template>

<script>
import ItemGroup from '@/vue/common/base/ItemGroup'

export default {
  name: 'item-sub-group',
  components: { ItemGroup },
  props: {
    item: {
      type: Object,
      default: () => ({
        avatar: undefined,
        group: undefined,
        title: undefined,
        children: []
      })
    }
  }
}
</script>
