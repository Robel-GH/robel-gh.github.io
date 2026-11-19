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
      href="/projects"
      aria-label="Open the Meal Checker App project: volunteer offer, free"
      @click.prevent="openProject('meal-checker')"
    >
      <span class="offer-blink">VOLUNTEER OFFER, FREE</span><strong>Meal Checker App</strong><small>QR code meal tracking</small>
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
import { useProjectDialog } from '@/composables/useProjectDialog'

defineProps({
  // CSS transform for the pointer tilt, set by HeroSection
  tilt: { type: String, default: '' },
})

const areas = ['Software', 'AI / ML', 'Mobile']

// The volunteer offer note opens the Meal Checker App case study.
const { openProject } = useProjectDialog()
</script>

<style scoped>
/* The "Volunteer offer, free" label fades gently in and out to draw the eye. */
/* The pill's own padding is pulled back, so its text lines up with the lines below it. */
.offer-blink {
  align-self: flex-start;
  margin-left: -13px;
  padding: 6px 13px;
  border: 1px solid color-mix(in srgb, currentColor 35%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, currentColor 10%, transparent);
  font: 600 14px/1.2 var(--mono);
  letter-spacing: .08em;
  animation: offer-blink 1.6s ease-in-out infinite alternate;
}
/* A slightly smaller app name, so the offer label leads. */
.field-notes strong {
  font-size: clamp(17px, 1.6vw, 22px);
}
@media (max-width: 760px) {
  .offer-blink {
    margin-left: -10px;
    padding: 4px 10px;
    font-size: 11px;
  }
  .field-notes strong {
    font-size: clamp(13px, 3.4vw, 18px);
  }
}
@keyframes offer-blink {
  from { opacity: 1; }
  to { opacity: .25; }
}
@media (prefers-reduced-motion: reduce) {
  .offer-blink { animation: none; }
}
/* The field note opens the Meal Checker App case study. */
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
