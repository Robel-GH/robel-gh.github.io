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
                  class="pill"
                  :href="link.href"
                  target="_blank"
                  rel="noopener"
                ><AppIcon :name="link.icon" /> {{ link.label }}</a>
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
/* Phones: the three secondary buttons share one row, and the status chips move below them. */
@media (max-width: 760px) {
  .hero-text {
    display: flex;
    flex-direction: column;
  }
  .hero-status {
    order: 5;
    margin: 22px 0 0;
  }
  .hero-actions {
    display: grid;
    grid-template-columns: repeat(3, max-content);
    gap: 8px;
  }
  .hero-actions .pill.primary {
    grid-column: 1 / -1;
    justify-self: start;
  }
  .hero-actions .pill:not(.primary) {
    min-height: 38px;
    padding: 0 13px;
    gap: 7px;
    font-size: 12px;
  }
  .hero-actions .pill:not(.primary) :deep(svg) {
    width: 15px;
    height: 15px;
  }
}
</style>
