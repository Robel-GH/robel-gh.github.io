<template>
  <Transition name="back-top">
    <a
      v-show="visible"
      class="back-top"
      href="/"
      aria-label="Back to top"
      title="Back to top"
    ><AppIcon
      name="arrow-up"
      size="24"
    /></a>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { useWindowScroll } from '@/composables/useWindowScroll'

// Floats in the bottom-right corner once the visitor has scrolled past most of the hero.
const scroll = useWindowScroll()
const visible = computed(() => scroll.y > scroll.height * 0.8)
</script>

<style scoped>
.back-top {
  position: fixed;
  right: clamp(16px, 3vw, 32px);
  bottom: clamp(16px, 3vw, 32px);
  z-index: 90;
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--nav-active);
  color: var(--nav-active-ink);
  box-shadow: 0 12px 30px -12px rgba(0, 0, 0, .45);
  transition: transform .25s;
}
.back-top :deep(svg) {
  stroke-width: 2.75;
}
.back-top:hover {
  transform: translateY(-4px);
}
.back-top-enter-active,
.back-top-leave-active {
  transition: opacity .25s, transform .25s;
}
.back-top-enter-from,
.back-top-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
/* Smaller on phones. */
@media (max-width: 760px) {
  .back-top {
    width: 40px;
    height: 40px;
  }
  .back-top :deep(svg) {
    width: 18px;
    height: 18px;
    stroke-width: 2.5;
  }
}
@media (prefers-reduced-motion: reduce) {
  .back-top,
  .back-top-enter-active,
  .back-top-leave-active {
    transition: none;
  }
  .back-top:hover {
    transform: none;
  }
}
</style>
