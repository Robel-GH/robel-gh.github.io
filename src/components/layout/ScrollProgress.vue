<template>
  <div
    id="pageProgress"
    aria-hidden="true"
    :style="{ transform: `scaleX(${progress})` }"
  />
</template>

<script setup>
import { computed } from 'vue'
import { useWindowScroll } from '@/composables/useWindowScroll'

const scroll = useWindowScroll()
const progress = computed(() => Math.min(1, scroll.y / (scroll.docHeight - scroll.height || 1)))
</script>
