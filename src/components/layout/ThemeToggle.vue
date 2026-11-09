<template>
  <button
    class="theme-btn"
    type="button"
    :aria-label="label"
    :title="label"
    @click="switchTheme"
  >
    <!-- A half-filled circle (light and dark); it turns half a circle when the theme changes. -->
    <svg
      class="theme-icon"
      :class="{ dark: mode === 'dark' }"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    ><circle
      cx="12"
      cy="12"
      r="9"
    /><path
      d="M12 3a9 9 0 0 1 0 18Z"
      fill="currentColor"
      stroke="none"
    /></svg>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useColorTheme } from '@/composables/useColorTheme'
import { useToast } from '@/composables/useToast'

const { mode, toggle } = useColorTheme()
const toast = useToast()

const label = computed(() => `Switch to ${mode.value === 'dark' ? 'light' : 'dark'} theme`)

function switchTheme () {
  toggle()
  toast.show(mode.value === 'dark' ? 'Dark theme' : 'Light theme')
}
</script>

<style scoped>
.theme-icon {
  transition: transform .45s cubic-bezier(.2, .83, .23, 1);
}
.theme-icon.dark {
  transform: rotate(180deg);
}
@media (prefers-reduced-motion: reduce) {
  .theme-icon { transition: none; }
}
</style>
