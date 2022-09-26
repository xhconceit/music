<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import useScroll from './use-scroll'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'scroll',
  props: {
    click: {
      type: Boolean,
      default: true
    },
    probeType: {
      type: Number,
      default: 0
    }
  },
  emits: ['scroll'],
  setup (props, { emit }) {
    const rootRef = ref(null)
    const scroll = useScroll(rootRef, props, emit)
    return {
      rootRef,
      scroll
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
