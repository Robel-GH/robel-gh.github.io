<template>
  <v-container fluid class="education-container py-8">
    <!-- Section Header -->
    <div class="section-header text-center mb-8">
      <div class="header-decoration">
        <v-icon icon="mdi-school" size="x-large" class="header-icon" color="secondary"></v-icon>
      </div>
      <h2 class="section-edu-title ml-2 mb-2 animate__animated animate__fadeIn">
        Educational Background
      </h2>
      <div class="title-underline"></div>
    </div>

    <!-- Marquee Container -->
    <div class="marquee-container" @mouseenter="pauseMarquee" @mouseleave="resumeMarquee">
      <div class="marquee-track" :class="{ paused: isPaused }" ref="marqueeTrack">
        <div
          v-for="edu in loopedEducationList"
          :key="edu.loopKey"
          class="marquee-item"
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              v-bind="props"
              :elevation="isHovering ? 20 : 8"
              :class="{ 'on-hover': isHovering }"
              class="education-card"
              rounded="xl"
              variant="text"
            >
              <!-- Card Title -->
              <v-card-title class="text-h5 pa-6 d-flex align-center edu-card-title">
                <v-avatar
                  v-if="edu.logo"
                  size="38"
                  class="title-logo-avatar me-3"
                  rounded="lg"
                >
                  <v-img
                    :src="edu.logo"
                    :alt="`${edu.institution} logo`"
                    contain
                    class="title-logo-img"
                  ></v-img>
                </v-avatar>

                <v-icon
                  v-else
                  :color="edu.color"
                  size="32"
                  class="me-3"
                >
                  {{ edu.icon }}
                </v-icon>

                <strong>{{ edu.degree }}</strong>
              </v-card-title>

              <v-card-text class="pa-6">
                <v-row>
                  <!-- Left: Visual Panel -->
                  <v-col cols="12" md="5">
                    <v-card
                      class="visual-panel h-100"
                      :class="{ 'visual-panel-hover': isHovering }"
                      elevation="4"
                      rounded="lg"
                    >
                      <!-- Decorative top band -->
                      <div class="panel-band" :style="{ background: `rgb(var(--v-theme-${edu.color}))` }"></div>

                      <div class="panel-body d-flex flex-column align-center justify-center pa-6">
                        <!-- Institution logo/icon bubble -->
                        <div
                          class="icon-bubble mb-5"
                          :class="{ 'logo-bubble': edu.logo }"
                          :style="{
                            background: edu.logo ? 'rgba(255,255,255,0.94)' : `rgba(var(--v-theme-${edu.color}), 0.12)`,
                            borderColor: `rgba(var(--v-theme-${edu.color}), 0.3)`
                          }"
                        >
                          <v-img
                            v-if="edu.logo"
                            :src="edu.logo"
                            :alt="`${edu.institution} logo`"
                            contain
                            class="institution-logo"
                          ></v-img>

                          <v-icon
                            v-else
                            :color="edu.color"
                            size="52"
                          >
                            {{ edu.icon }}
                          </v-icon>
                        </div>

                        <!-- Institution -->
                        <div class="text-center mb-4">
                          <div class="institution-name text-subtitle-1 font-weight-bold mb-1">
                            {{ edu.institution }}
                          </div>
                          <v-divider class="my-3 mx-4"></v-divider>

                          <!-- Period chip -->
                          <v-chip
                            :color="edu.color"
                            variant="tonal"
                            size="default"
                            class="period-chip mt-1"
                          >
                            <v-icon start size="16">mdi-calendar-range</v-icon>
                            {{ edu.period }}
                          </v-chip>
                        </div>

                        <!-- Decorative dots -->
                        <div class="dot-row mt-3">
                          <span
                            v-for="n in 3"
                            :key="n"
                            class="dot"
                            :style="{ background: `rgba(var(--v-theme-${edu.color}), ${0.25 * n})` }"
                          ></span>
                        </div>
                      </div>
                    </v-card>
                  </v-col>

                  <!-- Right: Content -->
                  <v-col cols="12" md="7">
                    <v-card
                      variant="text"
                      class="pa-4 content-card h-100"
                      :class="{ 'content-card-hover': isHovering }"
                    >
                      <v-card-title class="text-h5 mb-3 content-title">
                      
                        <v-icon icon="mdi-tools" size="small" class="me-2"></v-icon>
                         Skills
                       
                       
                      </v-card-title>
                      <v-divider class="mb-4"></v-divider>

                      <!-- Skills -->
                      <div v-if="edu.skills && edu.skills.length" class="mb-4">
                        
                        <v-chip-group>
                          <v-chip
                            v-for="skill in edu.skills"
                            :key="skill"
                            color="primary"
                            variant="outlined"
                            size="small"
                            class="ma-1"
                          >
                            {{ skill }}
                          </v-chip>
                        </v-chip-group>
                      </div>

                      <!-- Achievements -->
                      <v-card-actions class="mt-2 pa-0">
                        <v-expansion-panels variant="accordion" class="achievement-panel w-100">
                          <v-expansion-panel>
                            <v-expansion-panel-title class="text-subtitle-2 edu-sub-label">
                              <v-icon icon="mdi-trophy" class="me-2" size="small"></v-icon>
                              View Achievements & Accomplishments
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                              <ul class="achievement-list">
                                <li
                                  v-for="(achievement, index) in edu.achievements"
                                  :key="index"
                                >
                                  {{ achievement }}
                                </li>
                              </ul>
                            </v-expansion-panel-text>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-hover>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, onBeforeUnmount } from 'vue'
import 'animate.css'
import mitLogo from '@/assets/mit.png'
const isPaused = ref(false)
const marqueeTrack = ref(null)

const pauseMarquee = () => { isPaused.value = true }
const resumeMarquee = () => { isPaused.value = false }

let rafId = null
const updateMarqueeVars = () => {
  if (rafId) cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(() => {
    rafId = null
    const el = marqueeTrack.value
    if (!el) return
    const half = Math.round(el.scrollWidth / 2) || 0
    el.style.setProperty('--marquee-distance', `-${half}px`)
    const secs = Math.max(8, Math.round(half / 100))
    el.style.setProperty('--marquee-duration', `${secs}s`)
  })
}

let resizeObserver = null
let delayedUpdate = null

onMounted(async () => {
  await nextTick()
  updateMarqueeVars()
  delayedUpdate = setTimeout(updateMarqueeVars, 600)
  window.addEventListener('resize', updateMarqueeVars)

  if (window.ResizeObserver && marqueeTrack.value) {
    resizeObserver = new ResizeObserver(updateMarqueeVars)
    resizeObserver.observe(marqueeTrack.value)
  }
})

onBeforeUnmount(() => {
  if (delayedUpdate) clearTimeout(delayedUpdate)
  window.removeEventListener('resize', updateMarqueeVars)
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
  if (rafId) cancelAnimationFrame(rafId)
})

const educationList = ref([
  {
    id: 0,
    period: 'Apr, 2026 - Present',
    degree: 'International Visiting Scholar',
    institution: 'York University',
    color: 'primary',
    icon: 'mdi-school',
    logo: 'https://www.yorku.ca/wp-content/themes/york2020/apple-touch-icon.png',
    skills: ['PyTorch', 'Generative models', 'Transformers', 'Pandas', 'Numpy', 'Python', 'Cuda', 'Git'],
    achievements: [
      'Conducting research on controlled counterfactual editing of chest X-rays using diffusion-based generative models',
      'Working with MIMIC-CXR data to study pathology-specific image editing while preserving patient anatomy and acquisition style',
      'Developing research workflows for evaluating whether medical AI models rely on clinical signals or shortcut correlations',
      'Exploring anatomy-preserving generative methods for creating clinically meaningful image pairs for robustness and explainability studies',
      'Strengthening research experience in medical imaging, generative AI, trustworthy ML, and GPU-based deep learning experimentation'
    ]
  },
  {
    id: 1,
    period: 'Sep, 2024 - Present',
    degree: 'Master of Artificial Intelligence and Computer Science',
    institution: 'University of Calabria',
    color: 'primary',
    icon: 'mdi-school',
    logo: 'https://cdn.jsdelivr.net/gh/UniversitaDellaCalabria/unicms-template-unical@1.9.0/src/unicms_template_unical/static/images/favicon/favicon-32x32.png',
    skills: ['PyTorch', 'Keras', 'Transformers', 'Pandas', 'Numpy', 'Scikit-learn', 'Crew AI', 'Python', 'TypeScript', 'R', 'Vue.js', 'Node.js', 'Scrum', 'Agile', 'Jira', 'CI/CD', 'Cuda', 'Tableau', 'Docker', 'AWS', 'Git', 'REST APIs'],
    achievements: [
      'Runner up in Keke AI Student Competition (Built an agent using A* & IDA search algorithm)',
      'Implemented Dynamic PDDL Visualizer',
      'Developed a multimodal medical-report generator (Fine-tuned ResNet-50 encoder + GPT-2 decoder) for Indiana chest X-rays',
      'Developed University Project Phonebook and Messaging App'
    ]
  },
  {
    id: 2,
    period: '2014 - 2019',
    degree: 'Bachelor of Science in Computer Science and Engineering',
    institution: 'Mekelle Institute of Technology - Mekelle University',
    color: 'secondary',
    icon: 'mdi-laptop',
    logo: mitLogo,
    skills: ['Python', 'JavaScript', 'Java', 'C', 'C++', 'React', 'Django', 'Kotlin', 'Database Design', 'API Development'],
    achievements: [
      'Graduated with Honors (3.93 CGPA)',
      'Developed e-equb web application for final year project',
      'Developed driver drowsiness detection system for mini-project'
    ]
  },
  {
    id: 3,
    period: '2012 - 2014',
    degree: 'Diploma in Natural Sciences',
    institution: 'Shire Preparatory School',
    color: 'info',
    icon: 'mdi-school',
    skills: ['HTML', 'Windows', 'MS Excel', 'MS PowerPoint', 'MS Word', 'File Management', 'Typing', 'Computer Literacy'],
    achievements: [
      'Graduated with Distinction'
    ]
  }
])

const loopedEducationList = computed(() => [
  ...educationList.value.map((edu) => ({ ...edu, loopKey: `first-${edu.id}` })),
  ...educationList.value.map((edu) => ({ ...edu, loopKey: `second-${edu.id}` }))
])
</script>

<style scoped>
/* ─── Section Header ─────────────────────────────────────────────────────────── */
.section-edu-title {
  font-family: 'Jost', sans-serif;
  font-size: clamp(1.5rem, 2.5vw, 2rem) !important;
  font-weight: 600 !important;
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 50%, rgb(var(--v-theme-info)) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
}

/* ─── Marquee ────────────────────────────────────────────────────────────────── */
.marquee-container {
  overflow: hidden;
  width: 100%;
  position: relative;
  padding: 1rem 0;
}
.marquee-track {
  display: flex;
  animation: marquee-scroll var(--marquee-duration, 30s) linear infinite;
  width: auto;
  will-change: transform;
}
.marquee-track.paused { animation-play-state: paused; }

.marquee-item {
  flex: 0 0 auto;
  width: 900px;
  margin-right: 2rem;
}

@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(var(--marquee-distance, -50%)); }
}

/* ─── Education Card ─────────────────────────────────────────────────────────── */
.education-card {
  transition: transform 0.35s cubic-bezier(0.34, 1.3, 0.64, 1), box-shadow 0.35s ease;
  overflow: hidden;
  height: 100%;
}
.education-card.on-hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 48px rgba(var(--v-theme-primary), 0.18) !important;
}

.edu-card-title {
  font-family: 'Jost', sans-serif;
  font-size: clamp(1.1rem, 1.8vw, 1.4rem) !important;
  letter-spacing: 0.02em !important;
  font-weight: 600 !important;
}

.title-logo-avatar {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(var(--v-theme-primary), 0.22);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  padding: 0.25rem;
}

.title-logo-img {
  width: 100%;
  height: 100%;
}

/* ─── Visual Panel (left column) ─────────────────────────────────────────────── */
.visual-panel {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.visual-panel-hover {
  transform: scale(1.02);
  box-shadow: 0 10px 32px rgba(var(--v-theme-primary), 0.18);
}

.panel-band {
  height: 6px;
  width: 100%;
  flex-shrink: 0;
}

.panel-body {
  flex: 1;
  min-height: 260px;
}

.icon-bubble {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.logo-bubble {
  padding: 0.9rem;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.12);
}

.institution-logo {
  width: 76px;
  height: 76px;
  position: relative;
  z-index: 2;
}

.on-hover .icon-bubble { transform: scale(1.08) rotate(5deg); }

.institution-name {
  font-family: 'Jost', sans-serif;
  line-height: 1.4;
}

.period-chip {
  font-family: 'Jost', sans-serif !important;
  font-weight: 500;
}

.dot-row { display: flex; gap: 8px; }
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

/* ─── Content Panel (right column) ──────────────────────────────────────────── */
.content-card {
  transition: all 0.3s ease;
  border-radius: 14px;
}
.content-title {
  font-family: 'Jost', sans-serif;
  font-weight: 600 !important;
  letter-spacing: 0.02em;
}
.tech-label, .edu-sub-label {
  font-family: 'Jost', sans-serif !important;
}

/* ─── Achievements ───────────────────────────────────────────────────────────── */
.achievement-panel { margin-top: 0.25rem; }
.achievement-list {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}
.achievement-list li {
  position: relative;
  padding-left: 1.5em;
  margin-bottom: 0.75em;
  line-height: 1.55;
  color: rgb(var(--v-theme-on-surface));
  font-family: 'Jost', sans-serif;
  font-size: 0.95rem;
}
.achievement-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: rgb(var(--v-theme-secondary));
  font-weight: bold;
}

/* ─── Chips ─────────────────────────────────────────────────────────────────── */
.v-chip {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  font-family: 'Jost', sans-serif !important;
}
.v-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(var(--v-theme-primary), 0.2);
}

/* ─── Responsive ────────────────────────────────────────────────────────────── */
@media (max-width: 1200px) { .marquee-item { width: 750px; } }
@media (max-width: 960px) {
  .marquee-item { width: 600px; }
  .panel-body { min-height: 200px; }
}
@media (max-width: 600px) {
  .marquee-item { width: 350px; }
  .panel-body { min-height: 160px; padding: 1rem !important; }
  .icon-bubble { width: 72px; height: 72px; }
  .institution-logo { width: 54px; height: 54px; }
  .content-card { padding: 0.75rem !important; }
  .content-title { font-size: 1.1rem !important; }
  .v-chip { font-size: 0.75rem !important; height: 24px !important; }
}
@media (max-width: 400px) {
  .marquee-item { width: 300px; }
  .icon-bubble { width: 60px; height: 60px; }
  .institution-logo { width: 44px; height: 44px; }
  .v-chip { font-size: 0.7rem !important; height: 22px !important; margin: 0.125rem !important; }
}

/* ─── Accessibility ─────────────────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; }
  .education-card, .visual-panel, .icon-bubble { transition: none; }
}
</style>
