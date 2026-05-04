<template>
  <AppHeader />
  <v-main>
    <!-- Cinematic film-grain atmosphere overlay -->
    <div class="grain-overlay" aria-hidden="true"></div>
    <v-container class="py-12 px-2 px-md-4">
      <section id="about" class="section-block">
        <About />
      </section>

      <section id="skills" class="section-block">
        <Skills />
      </section>

      <section id="projects" class="section-block">
        <Projects />
      </section>

      <section id="education" class="section-block">
        <Education />
      </section>

      <section id="experience" class="section-block">
        <Experience />
      </section>

      <section id="contact" class="section-block">
        <Contact />
      </section>
    </v-container>
  </v-main>
  <AppFooter />
</template>

<script setup>
import AppHeader from '@/components/app-header/AppHeader.vue'
import AppFooter from '@/components/app-footer/AppFooter.vue'
import Education from '@/pages/education/Education.vue'
import Experience from '@/pages/experience/Experience.vue'
import About from '@/pages/about/About.vue'
import Skills from '@/pages/skills/Skills.vue'
import Contact from '@/pages/contact/Contact.vue'
import Projects from '@/pages/projects/Projects.vue'
</script>

<style>
/* ─── Cinematic Font Imports ───────────────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Jost:wght@300;400;500;600;700&display=swap');

:root {
  --font-display: 'Cormorant Garant', Georgia, 'Times New Roman', serif;
  --font-ui:      'Jost', 'Segoe UI', sans-serif;
}

/* ─── Base Typography Override ─────────────────────────────────────────────── */
body {
  font-family: var(--font-ui);
}

/* Vuetify cards, text, labels */
.v-card-text,
.v-card-subtitle,
.v-card-title,
.v-list-item__title,
.v-list-item__subtitle,
.v-tab__slider + .v-tab,
.v-chip__content,
.v-btn__content,
.v-expansion-panel-title {
  font-family: var(--font-ui) !important;
}

/* ─── Global Section Header — shared by all page components ────────────────── */
/*
  All components use this markup structure:
    <div class="section-header text-center mb-8">
      <div class="header-decoration"><v-icon class="header-icon" /></div>
      <h2 class="section-title ...">Title</h2>
      <div class="title-underline"></div>
    </div>
  The styles below apply globally so each component only needs component-
  specific overrides, not a full copy-paste of this block.
*/

.section-header {
  position: relative;
  margin-bottom: 3.5rem;
}

.section-header .header-decoration {
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
}

.section-header .header-icon {
  color: rgb(var(--v-theme-primary));
  filter: drop-shadow(0 0 20px rgba(var(--v-theme-primary), 0.55));
  animation: ci-float 3.5s ease-in-out infinite;
}

/* Cinematic display font for every section heading */
.section-header .section-title {
  font-family: var(--font-display) !important;
  font-size: clamp(1.9rem, 3.2vw, 2.75rem) !important;
  font-weight: 600 !important;
  letter-spacing: 0.06em !important;
  line-height: 1.15 !important;
  /* Gradient is still applied per-component via scoped CSS; this adds the font */
}

.section-header .title-underline {
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-secondary)), transparent);
  margin: 1.1rem auto 0;
  border-radius: 2px;
  animation: ci-expand-line 1s ease-out 0.4s both;
}

/* Global keyframe names prefixed ci- to avoid conflicts */
@keyframes ci-float {
  0%, 100% { transform: translateY(0);   }
  50%       { transform: translateY(-9px); }
}

@keyframes ci-expand-line {
  from { width: 0;    opacity: 0; }
  to   { width: 80px; opacity: 1; }
}

/* ─── Layout Sections ──────────────────────────────────────────────────────── */
.section-block {
  scroll-margin-top: 64px;
  margin-bottom: 88px;
  position: relative;
}

/* Subtle vertical thread between sections */
.section-block + .section-block::before {
  content: '';
  position: absolute;
  top: -44px;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 44px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(var(--v-theme-primary), 0.18),
    transparent
  );
}

/* ─── Film-Grain Overlay ───────────────────────────────────────────────────── */
.grain-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 220px 220px;
}

/* ─── Responsive ───────────────────────────────────────────────────────────── */
@media (max-width: 960px) {
  .section-block {
    margin-bottom: 60px;
  }
  .section-header .section-title {
    font-size: clamp(1.6rem, 5vw, 2.2rem) !important;
    letter-spacing: 0.04em !important;
  }
}

@media (max-width: 600px) {
  .section-block {
    margin-bottom: 44px;
  }
  .section-header .section-title {
    font-size: clamp(1.5rem, 6.5vw, 1.9rem) !important;
    letter-spacing: 0.02em !important;
  }
}
</style>