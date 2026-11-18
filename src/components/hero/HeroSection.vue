<template>
  <section
    id="home"
    ref="section"
    class="hero"
    aria-label="Introduction"
    @pointermove="onPointerMove"
    @pointerleave="resetTilt"
  >
    <div
      class="hero-bg"
      :style="{ transform: bgTransform }"
    />
    <div class="hero-grid" />

    <div class="container hero-inner">
      <div class="hero-left">
        <div class="hero-text">
          <ul
            class="hero-status"
            aria-label="Current status"
          >
            <li
              v-for="chip in heroChips"
              :key="chip.label"
            >
              <StatusChip
                :label="chip.label"
                :short-label="chip.shortLabel"
                :tone="chip.tone"
              />
            </li>
          </ul>
          <h1 class="hero-title hero-name">
            <span>{{ owner.firstName }}</span><span class="outline">{{ owner.lastName }}</span>
          </h1>
          <p class="hero-role">
            {{ profile.title }}<span v-if="profile.subtitle">: {{ profile.subtitle }}</span>
          </p>

          <div class="hero-bottom">
            <div>
              <p class="hero-desc">
                {{ profile.summary }}
              </p>
              <div class="hero-actions">
                <a
                  class="pill primary"
                  href="/projects"
                >
                  View projects <AppIcon name="arrow-right" />
                </a>
                <a
                  class="pill"
                  :href="owner.resume"
                  target="_blank"
                  rel="noopener"
                ><AppIcon name="file" /> Résumé</a>
                <a
                  v-for="link in profileLinks"
                  :key="link.label"
                  class="pill pill-social"
                  :href="link.href"
                  target="_blank"
                  rel="noopener"
                  :aria-label="link.label"
                ><AppIcon :name="link.icon" /> <span class="pill-label">{{ link.label }}</span></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <HeroCard :tilt="cardTransform" />
    </div>
  </section>
</template>

<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'
import { ref } from 'vue'
import StatusChip from '@/components/ui/StatusChip.vue'
import { heroChips, owner, socialLinks } from '@/data/site'
import { profile } from '@/data/focus'
import { prefersReducedMotion } from '@/composables/useReducedMotion'
import HeroCard from './HeroCard.vue'

const profileLinks = socialLinks.filter((link) => !link.href.startsWith('mailto:'))

const section = ref(null)
const bgTransform = ref('')
const cardTransform = ref('')

// Gentle parallax on the background and a 3D tilt on the card, for mouse users only.
const tiltEnabled = () => !prefersReducedMotion() && window.matchMedia('(pointer: fine)').matches

function onPointerMove (event) {
  if (!tiltEnabled()) return
  const rect = section.value.getBoundingClientRect()
  const x = event.clientX / rect.width - 0.5
  const y = event.clientY / rect.height - 0.5
  bgTransform.value = `translate(${x * 20}px, ${y * 18}px)`
  cardTransform.value = `rotateY(${x * 6}deg) rotateX(${-y * 5}deg)`
}

function resetTilt () {
  bgTransform.value = ''
  cardTransform.value = ''
}
</script>

<style scoped>
/* Square bottom so the hero joins the tech band; the band carries the rounded corners. */
.hero {
  border-radius: 0;
}
.hero-status {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0 0 30px;
  padding: 0;
  list-style: none;
  color: var(--hero-ink, #fff);
}
/* The first name stays on one line, so the size follows the column width. */
.hero-left {
  container-type: inline-size;
}
.hero-name {
  font-size: clamp(40px, 6vw, 104px);
  font-size: min(13cqi, 120px);
}
.hero-name span:first-child {
  white-space: nowrap;
}
.hero-role {
  margin: 22px 0 0;
  font: 600 clamp(19px, 1.9vw, 27px)/1.25 var(--display);
  letter-spacing: -.03em;
  color: var(--hero-ink, #fff);
}
.hero-role span {
  font-weight: 400;
  color: var(--hero-mute, #ced2cc);
}
.hero-bottom {
  margin-top: 26px;
}
.hero-desc {
  max-width: none;
  margin: 0;
}
/* The text block takes the width of the name, and the summary fills that width exactly. */
.hero-text {
  width: fit-content;
  max-width: 100%;
}
.hero-bottom {
  contain: inline-size;
}
.hero-actions {
  margin-top: 26px;
}
/* Phones: all four buttons share one row (GitHub and LinkedIn become icons), and the
   status chips sit in one row below them. */
@media (max-width: 760px) {
  .hero-text {
    display: flex;
    flex-direction: column;
    width: auto;
  }
  .hero-status {
    order: 5;
    flex-wrap: nowrap;
    gap: 8px;
    margin: 22px 0 0;
  }
  .hero-actions {
    flex-wrap: nowrap;
    gap: 6px;
  }
  .hero-actions .pill {
    min-height: 38px;
    padding: 0 11px;
    gap: 6px;
    font-size: 12px;
  }
  .hero-actions .pill :deep(svg) {
    width: 14px;
    height: 14px;
  }
  .hero-actions .pill-social {
    width: 38px;
    padding: 0;
  }
  /* The label stays available to screen readers. */
  .pill-label {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
}
/* Small phones (iPhone SE): tighter buttons, and no arrow on the main button. */
@media (max-width: 374px) {
  .hero-actions .pill:not(.pill-social) {
    padding: 0 9px;
  }
}
@media (max-width: 359px) {
  .hero-actions .pill.primary :deep(svg) {
    display: none;
  }
}
</style>
