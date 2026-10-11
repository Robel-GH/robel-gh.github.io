<template>
  <div
    class="marquee"
    role="region"
    aria-label="Tech stack"
  >
    <div class="marquee-track">
      <!-- Two identical groups so the loop is seamless; the copy is hidden from screen readers. -->
      <div
        v-for="copy in 2"
        :key="copy"
        class="marquee-group"
        :aria-hidden="copy === 2 ? 'true' : undefined"
      >
        <span
          v-for="item in marqueeItems"
          :key="item"
          class="marquee-item"
        >
          {{ item }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { marqueeItems } from '@/data/site'
</script>

<style scoped>
/* Square edges: the band continues straight on from the hero above it, with no seam. */
.marquee {
  border-radius: 0;
  border-top: 0;
}
</style>
