<template>
  <svg
    :class="$attrs.class || 'w-6 h-6'"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    v-html="path"
    data-testid="base-icon"
  >
  </svg>
</template>

<script>
import icons from '../icons'

export default {
  props: ['name'],

  data() {
    return {
      path: icons[this.name]
    }
  }
}
</script>
