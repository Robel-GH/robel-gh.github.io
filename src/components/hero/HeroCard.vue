<template>
  <div class="hero-orbit-wrap hero-group-wrap float-y">
    <div
      id="orbit"
      class="orbit hero-group"
      :style="{ transform: tilt || undefined }"
    >
      <div class="orbit-glow" />
      <span
        class="card-sweep"
        aria-hidden="true"
      />
      <div
        class="orbit-technical-lines"
        aria-hidden="true"
      >
        <span /><span /><span />
      </div>
      <div class="hero-group-top">
        <span>HOW I WORK</span><span>SPEC, TESTS, METRICS</span>
      </div>

      <IdentityDiagram />

      <div
        class="hero-group-side"
        aria-hidden="true"
      >
        WEB, MOBILE, MACHINE LEARNING
      </div>
      <div class="hero-group-bottom">
        <div class="group-kicker">
          WHAT I BUILD WITH <i />
        </div>
        <div class="group-title">
          {{ profile.stack }}
        </div>
        <div class="group-areas">
          <span
            v-for="area in areas"
            :key="area"
          >{{ area }}</span>
        </div>
      </div>
    </div>
    <a
      class="field-notes"
      href="#meal-checker"
    >
      <span>VOLUNTEER OFFER, FREE</span><strong>Meal Checker</strong><small>QR code meal tracking</small>
    </a>
    <div
      class="orbit-serial"
      aria-hidden="true"
    >
      SHIP, MEASURE, IMPROVE
    </div>
  </div>
</template>

<script setup>
import { profile } from '@/data/focus'
import IdentityDiagram from './IdentityDiagram.vue'

defineProps({
  // CSS transform for the pointer tilt, set by HeroSection
  tilt: { type: String, default: '' },
})

const areas = ['Software', 'AI / ML', 'Mobile']
</script>

<style scoped>
/* The field note links to the Meal Checker offer in the About section. */
.field-notes small {
  font: 500 12px/1.3 var(--body);
  color: var(--field-note-ink, #D7F6EA);
  opacity: .8;
}
.field-notes:hover {
  border-color: currentColor;
}
@media (max-width: 760px) {
  .field-notes small { font-size: 10px; }
}
/* Phones: leave room above the card so the field note never covers the buttons. */
@media (max-width: 760px) {
  .hero-group-wrap {
    padding-top: 44px;
  }
  .field-notes {
    top: 0;
  }
}
</style>
