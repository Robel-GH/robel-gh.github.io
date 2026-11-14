<template>
  <button
    class="theme-btn"
    type="button"
    :aria-label="label"
    :title="label"
    @click="switchTheme"
  >
    <!-- A sun that turns into a crescent moon: the sun shows in dark mode, the moon in light mode. -->
    <svg
      class="theme-icon"
      :class="mode === 'dark' ? 'is-sun' : 'is-moon'"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <mask id="theme-moon-mask">
        <rect
          width="24"
          height="24"
          fill="white"
        />
        <circle
          class="moon-cut"
          cx="17"
          cy="7"
          r="7"
          fill="black"
        />
      </mask>
      <circle
        class="sun-core"
        cx="12"
        cy="12"
        r="9"
        fill="currentColor"
        mask="url(#theme-moon-mask)"
      />
      <g
        class="sun-rays"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      >
        <path d="M12 1.5v2" /><path d="M12 20.5v2" /><path d="M1.5 12h2" /><path d="M20.5 12h2" />
        <path d="m4.6 4.6 1.4 1.4" /><path d="m18 18 1.4 1.4" /><path d="m4.6 19.4 1.4-1.4" /><path d="m18 6 1.4-1.4" />
      </g>
    </svg>
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
  overflow: visible;
}
.sun-core,
.moon-cut,
.sun-rays {
  transform-box: fill-box;
  transform-origin: center;
  transition: transform .5s cubic-bezier(.2, .83, .23, 1), opacity .3s;
}
/* Sun: a small disc with its rays out, and the cut-out moved away. */
.is-sun .sun-core { transform: scale(.55); }
.is-sun .moon-cut { transform: translate(9px, -9px); }
.is-sun .sun-rays { transform: rotate(0); opacity: 1; }
/* Moon: a full disc with a bite taken out, and the rays folded away. */
.is-moon .sun-core { transform: scale(1); }
.is-moon .moon-cut { transform: translate(0, 0); }
.is-moon .sun-rays { transform: rotate(-60deg) scale(.4); opacity: 0; }
@media (prefers-reduced-motion: reduce) {
  .sun-core,
  .moon-cut,
  .sun-rays { transition: none; }
}
</style>
