<template>
  <v-container class="experience-timeline">
    <v-row justify="center" class="ma-4">
      <v-col cols="12" md="11">
        <!-- Section Header -->
        <div class="section-header text-center mb-8">
          <div class="header-decoration">
            <v-icon icon="mdi-briefcase" size="x-large" class="header-icon" color="secondary"></v-icon>
          </div>
          <h2 class="section-exp-title ml-2 mb-2 animate__animated animate__fadeIn">
            Professional Experience
          </h2>
          <div class="title-underline"></div>
        </div>

        <!-- Timeline -->
        <v-timeline side="end" align="start" :density="timelineDensity">
          <v-timeline-item
            v-for="job in workExperience"
            :key="job.id"
            :dot-color="job.color"
            size="small"
            fill-dot
          >
            <!-- Timeline Date -->
            <template v-slot:opposite>
              <div class="timeline-date text-h6 font-weight-bold">
                {{ job.period }}
              </div>
            </template>

            <!-- Experience Card -->
            <v-card class="timeline-card" variant="text" rounded="lg">
              <v-card-item class="pa-4">
                <v-card-title class="text-h6 font-weight-bold d-flex align-start exp-card-title">
                  <v-icon
                    :icon="job.icon"
                    class="exp-title-icon me-3"
                    :color="job.color"
                    size="24"
                  ></v-icon>
                  <span class="exp-title-text">{{ job.title }}</span>
                </v-card-title>

                <v-card-subtitle class="pt-2 text-subtitle-1 d-flex align-start exp-card-subtitle">
                  <v-icon icon="mdi-office-building" class="exp-subtitle-icon me-2" size="small"></v-icon>
                  <span class="exp-company-text">{{ job.company }}</span>
                </v-card-subtitle>

                <v-card-text class="pt-3">
                  <!-- Responsibilities Section -->
                  <div v-if="job.responsibilities && job.responsibilities.length" class="mb-4">
                    <div class="font-weight-medium mb-3 text-subtitle-2 exp-sub-label responsibility-heading">
                      <v-icon icon="mdi-format-list-bulleted" class="me-2" size="small"></v-icon>
                      <span>Responsibilities</span>
                    </div>
                    <ul class="responsibility-list">
                      <li
                        v-for="(resp, index) in job.responsibilities"
                        :key="index"
                      >
                        {{ resp }}
                      </li>
                    </ul>
                  </div>

                  <!-- Skills Section -->
                  <div v-if="job.skills && job.skills.length">
                    <v-expansion-panels variant="accordion" class="skills-panel">
                      <v-expansion-panel>
                        <v-expansion-panel-title class="text-subtitle-2 exp-sub-label skills-panel-title">
                          <v-icon icon="mdi-tools" class="me-2" size="small"></v-icon>
                          <span class="skills-panel-title-text">View Skills & Technologies</span>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                          <div class="skills-container">
                            <v-chip
                              v-for="skill in job.skills"
                              :key="skill"
                              color="primary"
                              variant="outlined"
                              size="small"
                              class="skill-chip"
                            >
                              {{ skill }}
                            </v-chip>
                          </div>
                        </v-expansion-panel-text>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </div>
                </v-card-text>
              </v-card-item>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'

export default {
  name: 'WorkExperience',

  setup() {
    const { mobile } = useDisplay()
    const timelineDensity = computed(() => mobile.value ? 'compact' : 'default')

    const workExperience = ref([
      {
        id: 1,
        title: 'Vue.js Front-End Developer',
        company: 'Upwork Freelance Contract',
        period: 'Nov, 2025 - April, 2026',
        color: 'primary',
        icon: 'mdi-laptop',
        responsibilities: [
          'Built production-ready Vue.js 3 components for a live travel booking platform, reducing redundant render cycles by approximately 30% through Pinia-optimized state and computed-property restructuring.',
          'Delivered 4 feature iterations end to end  requirements, implementation, unit testing, and release support  using Vue.js 3, TypeScript, Vuetify 3, Vite, Vue Router, HTML5, and CSS3.',
          'Designed reusable component APIs from stakeholder requirements, improving maintainability through Composition API patterns, single-responsibility boundaries, and documented props/events.'
        ],
        skills: ['Vue.js 3', 'TypeScript', 'Vuetify 3', 'Pinia', 'Vite', 'Vue Router', 'HTML5', 'CSS3']
      },
      {
        id: 2,
        title: 'Working Student, Frontend Software Developer',
        company: 'Farming Revolution GmbH',
        period: 'Oct, 2025 - Jan, 2026',
        color: 'secondary',
        icon: 'mdi-robot',
        responsibilities: [
          'Developed React/Ionic internal tools supporting Farming GT, an AI-powered autonomous weeding robot used in field operations across 10+ countries.',
          'Integrated Apollo GraphQL/Hasura queries, mutations, and subscriptions for real-time bag, tag, crop, ground-truth, file-path, and evaluation workflows in an AI vision pipeline.',
          'Implemented bulk operations for tagging, crop assignment, archiving, evaluation creation, annotation command generation, and file-copy/download workflows to standardize high-volume data operations.',
          'Improved ML evaluation dashboards with expandable cards, score views, status indicators, evaluator configuration displays, and modal TagPicker interactions for technical and field-operations users.'
        ],
        skills: ['React', 'Ionic', 'Apollo GraphQL', 'Hasura', 'TypeScript', 'JavaScript', 'GraphQL']
      },
      {
        id: 3,
        title: 'Assistant Lecturer',
        company: 'Mekelle Institute of Technology - Mekelle University',
        period: 'Jun, 2021 - Present',
        color: 'info',
        icon: 'mdi-school',
        responsibilities: [
          'Delivered lectures and tutorials in Computer Science and Engineering courses, communicating complex concepts clearly to undergraduate students.',
          'Developed and implemented hands-on laboratory exercises and programming assignments.',
          'Advised students on internship projects and capstones, guiding project scope, technical design, implementation strategies, and professional deliverables.',
          'Coordinated student project teams and oversaw code repositories, version control workflows, and integration/testing practices.'
        ],
        skills: ['Python', 'PyTorch', 'TensorFlow', 'Pandas', 'NumPy', 'SciPy', 'Java', 'Data Structures', 'Algorithms', 'Computer Graphics', 'Distributed Systems']
      },
      {
        id: 4,
        title: 'Fullstack Developer',
        company: 'Tekeze Technologies PLC',
        period: 'Jul, 2020 - Sep, 2024',
        color: 'success',
        icon: 'mdi-code-braces',
        responsibilities: [
          'Led end-to-end development of 2 enterprise web apps (Sales Management, Indigent Management), reducing manual workflows by 80% and boosting client revenue.',
          'Designed and implemented real-time analytics dashboards with dynamic reporting features, enabling stakeholders to make data-driven decisions and respond to market trends 70% faster.',
          'Drove a 40% improvement in operational efficiency through process automation, workflow optimization, and adoption of agile methodologies, reducing redundancies and accelerating project delivery.',
          'Improved team code quality by 45% via PR reviews and CI/CD pipeline optimization.'
        ],
        skills: ['Vue.js', 'React', 'Node.js', 'TypeScript', 'JavaScript', 'MongoDB', 'MySQL', 'PostgreSQL', 'Firebase', 'Docker', 'AWS', 'Jira', 'CI/CD', 'Git', 'REST APIs', 'Agile']
      },
      {
        id: 5,
        title: 'Junior ICT Officer',
        company: 'Guna Trading House PLC',
        period: 'Dec, 2019 - Jul, 2020',
        color: 'warning',
        icon: 'mdi-lan',
        responsibilities: [
          'Scheduled preventive maintenance of ICT devices in Shire and Humera branches.',
          'Installed and configured LANs of Shire and Humera branches.',
          'Undertaken hardware and software maintenance of computers, printers, and networking devices on a daily and weekly schedule.',
          'Delivered successful training sessions on the ERP system to the employees in Shire and Humera branches.'
        ],
        skills: ['Networking', 'ERP', 'System Maintenance', 'IT Support', 'Troubleshooting']
      },
      {
        id: 6,
        title: 'College Lecturer',
        company: 'Oxfo-Business and Technology College',
        period: 'Oct, 2019 - Dec, 2019',
        color: 'error',
        icon: 'mdi-teach',
        responsibilities: [
          'Developed and delivered lectures on programming and IT subjects.',
          'Created assessment materials and graded student work.',
          'Provided academic advice to students.'
        ],
        skills: ['Java', 'Data Structures', 'Python', 'C++', 'C', 'HTML', 'CSS', 'JavaScript']
      }
    ])

    return { timelineDensity, workExperience }
  }
}
</script>

<style scoped>
/* ─── Section Header ─────────────────────────────────────────────────────────── */
.section-exp-title {
  font-family: 'Jost', sans-serif;
  font-size: clamp(1.5rem, 2.5vw, 2rem) !important;
  font-weight: 600 !important;
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 50%, rgb(var(--v-theme-secondary)) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  display: inline-block;
}

/* ─── Layout ─────────────────────────────────────────────────────────────────── */
.experience-timeline {
  padding: 4rem 0;
  max-width: 1200px;
  margin: 0 auto;
}

/* ─── Timeline Date ──────────────────────────────────────────────────────────── */
.timeline-date {
  font-family: 'Jost', sans-serif;
  font-size: 1.05rem !important;
  letter-spacing: 0.02em;
  color: rgb(var(--v-theme-secondary));
  opacity: 0.9;
  line-height: 1.35;
  white-space: normal;
  overflow-wrap: break-word;
}

/* ─── Experience Card ────────────────────────────────────────────────────────── */
.timeline-card {
  border-left: 4px solid rgb(var(--v-theme-secondary));
  transition: transform 0.35s cubic-bezier(0.34, 1.2, 0.64, 1),
              box-shadow 0.35s ease;
  width: 100%;
  max-width: 100%;
  margin: 0.5rem 0;
  box-shadow: 0 4px 16px rgba(var(--v-theme-secondary), 0.12);
}
.timeline-card:hover {
  transform: translateY(-5px) translateX(3px);
  box-shadow: 0 12px 32px rgba(var(--v-theme-secondary), 0.22);
}

/* Job title — no truncation, multi-line safe */
.exp-card-title {
  font-family: 'Jost', sans-serif;
  font-weight: 600 !important;
  font-size: 1.15rem !important;
  letter-spacing: 0.02em;
  line-height: 1.35 !important;
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: unset !important;
  align-items: flex-start !important;
  min-width: 0;
}

.exp-title-icon {
  flex: 0 0 auto;
  margin-top: 0.12rem;
}

.exp-title-text {
  display: block;
  flex: 1 1 auto;
  min-width: 0;
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: unset !important;
  overflow-wrap: anywhere;
  word-break: normal;
  line-height: 1.35;
}

/* Company subtitle — no truncation, multi-line safe */
.exp-card-subtitle {
  font-family: 'Jost', sans-serif !important;
  line-height: 1.4 !important;
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: unset !important;
  align-items: flex-start !important;
  min-width: 0;
}

.exp-subtitle-icon {
  flex: 0 0 auto;
  margin-top: 0.15rem;
}

.exp-company-text {
  display: block;
  flex: 1 1 auto;
  min-width: 0;
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: unset !important;
  overflow-wrap: anywhere;
  word-break: normal;
  line-height: 1.4;
}

/* Sub-labels inside card */
.exp-sub-label {
  font-family: 'Jost', sans-serif !important;
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: unset !important;
  line-height: 1.35;
}

.responsibility-heading,
.skills-panel-title {
  display: flex;
  align-items: flex-start;
  min-width: 0;
}

.skills-panel-title-text {
  display: inline-block;
  min-width: 0;
  overflow-wrap: anywhere;
  white-space: normal !important;
  line-height: 1.35;
}

/* ─── Responsibilities ───────────────────────────────────────────────────────── */
.responsibility-list {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}
.responsibility-list li {
  position: relative;
  padding-left: 1.5em;
  margin-bottom: 0.75em;
  line-height: 1.55;
  color: rgb(var(--v-theme-on-surface));
  font-family: 'Jost', sans-serif;
  font-size: 0.95rem;
  overflow-wrap: anywhere;
}
.responsibility-list li::before {
  content: "✦";
  position: absolute;
  left: 0;
  color: rgb(var(--v-theme-secondary));
  font-size: 0.75rem;
  top: 0.2em;
}

/* ─── Skills ─────────────────────────────────────────────────────────────────── */
.skills-panel { margin-top: 0.5rem; }
.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-top: 0.25rem;
}

.skill-chip {
  height: auto !important;
  min-height: 26px;
  white-space: normal !important;
}

.skill-chip :deep(.v-chip__content),
.skills-container :deep(.v-chip__content) {
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: unset !important;
  overflow-wrap: anywhere;
  line-height: 1.2;
}

.skills-panel :deep(.v-expansion-panel-title) {
  min-height: auto !important;
  height: auto !important;
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: unset !important;
  line-height: 1.35;
  align-items: flex-start;
}

.skills-panel :deep(.v-expansion-panel-title__icon) {
  align-self: flex-start;
  margin-top: 0.1rem;
}

/* ─── Timeline Item Animations ───────────────────────────────────────────────── */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.v-timeline-item {
  opacity: 0;
  animation: fadeInUp 0.65s ease forwards;
}
.v-timeline-item:nth-child(1) { animation-delay: 0.10s; }
.v-timeline-item:nth-child(2) { animation-delay: 0.25s; }
.v-timeline-item:nth-child(3) { animation-delay: 0.40s; }
.v-timeline-item:nth-child(4) { animation-delay: 0.55s; }
.v-timeline-item:nth-child(5) { animation-delay: 0.70s; }
.v-timeline-item:nth-child(6) { animation-delay: 0.85s; }

:deep(.v-timeline) { padding: 0 1rem; }
:deep(.v-timeline-item__opposite) { flex: 0 0 auto; min-width: 120px; }

/* ─── Responsive ─────────────────────────────────────────────────────────────── */
@media (max-width: 960px) {
  .experience-timeline { padding: 2rem 0; }
  :deep(.v-timeline) { padding: 0 0.5rem; }
  :deep(.v-timeline-item__opposite) { min-width: 100px; }
  .timeline-card { margin: 0.25rem 0; }
}

@media (max-width: 600px) {
  .experience-timeline { padding: 1.5rem 0; }
  :deep(.v-timeline) { padding: 0; }
  :deep(.v-timeline-item__opposite) {
    min-width: 80px;
    max-width: 92px;
    white-space: normal;
  }

  .timeline-date {
    font-size: 0.78rem !important;
    line-height: 1.25;
  }

  .timeline-card {
    margin: 0.25rem 0;
    border-left-width: 3px;
  }

  .exp-card-title {
    font-size: 0.98rem !important;
    line-height: 1.3 !important;
    padding-right: 0 !important;
  }

  .exp-title-icon {
    margin-top: 0.08rem;
  }

  .exp-card-subtitle {
    font-size: 0.85rem !important;
    line-height: 1.3 !important;
  }

  .responsibility-list li {
    font-size: 0.88rem;
    line-height: 1.5;
  }

  .skills-container {
    gap: 0.25rem;
  }

  .skills-container .v-chip,
  .skill-chip {
    font-size: 0.75rem;
    min-height: 24px;
    height: auto !important;
  }
}

@media (max-width: 400px) {
  :deep(.v-timeline-item__opposite) {
    min-width: 70px;
    max-width: 78px;
  }

  .timeline-date {
    font-size: 0.68rem !important;
  }

  .timeline-card {
    border-left-width: 2px;
  }

  .exp-card-title {
    font-size: 0.92rem !important;
  }

  .exp-card-subtitle {
    font-size: 0.78rem !important;
  }

  .skills-container .v-chip,
  .skill-chip {
    font-size: 0.7rem;
    min-height: 22px;
    height: auto !important;
  }
}

/* ─── Dark Mode ──────────────────────────────────────────────────────────────── */
:deep(.v-theme--dark) .timeline-card { box-shadow: 0 4px 16px rgba(var(--v-theme-secondary), 0.2); }
:deep(.v-theme--dark) .timeline-card:hover { box-shadow: 0 12px 32px rgba(var(--v-theme-secondary), 0.3); }

/* ─── Accessibility ──────────────────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .timeline-card { transition: none; }
  .v-timeline-item { animation: none; opacity: 1; }
}
</style>
