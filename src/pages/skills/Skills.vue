<template>
  <v-container class="skills-container py-4" fluid>
    <v-row justify="center">
      <v-col cols="12" md="11">
        <!-- Section Header -->
        <div class="section-header text-center mb-8">
          <div class="header-decoration">
            <v-icon icon="mdi-tools" size="x-large" class="header-icon"></v-icon>
          </div>
          <h2 class="section-title text-h5 ml-2 font-weight-bold mb-2 animate__animated animate__fadeIn">
            Technical Skills & Expertise
          </h2>
          <div class="title-underline"></div>
        </div>

        <v-card class="skills-card animate__animated animate__fadeInUp" variant="text" rounded="xl">
          <!-- Mobile Layout (Horizontal Tabs) -->
          <div v-if="mobile" class="mobile-layout">
            <v-tabs
              v-model="activeTab"
              direction="horizontal"
              show-arrows
              slider-color="secondary"
              density="comfortable"
              class="mobile-tabs"
            >
              <v-tab
                v-for="category in skillCategories"
                :key="category.id"
                :value="category.id"
                class="text-caption mobile-tab"
              >
                <v-icon :icon="category.icon" size="small" class="me-1"></v-icon>
                <span class="mobile-tab-text">{{ category.name }}</span>
              </v-tab>
            </v-tabs>

            <v-window v-model="activeTab" class="pa-4">
              <v-window-item
                v-for="category in skillCategories"
                :key="category.id"
                :value="category.id"
              >
                <v-row>
                  <v-col
                    v-for="skill in category.skills"
                    :key="skill.name"
                    cols="12"
                    class="animate__animated animate__fadeIn"
                  >
                    <v-hover v-slot="{ isHovering, props }">
                      <v-card
                        v-bind="props"
                        :elevation="isHovering ? 10 : 2"
                        :class="{ 'on-hover': isHovering }"
                        class="skill-card"
                      >
                        <v-card-item>
                          <v-card-title class="d-flex align-center skill-card-title">
                            <v-icon :icon="skill.icon" :color="category.color" size="large" class="me-2"></v-icon>
                            {{ skill.name }}
                          </v-card-title>
                          <v-card-subtitle class="pt-2">
                            Experience: {{ skill.years }} {{ skill.years === 1 ? 'year' : 'years' }}
                          </v-card-subtitle>
                          <v-card-text>
                            <div class="d-flex justify-space-between align-center mb-1">
                              <span class="text-body-2">Proficiency</span>
                              <span class="text-caption font-weight-bold">{{ skill.level }}%</span>
                            </div>
                            <v-progress-linear
                              :model-value="skill.level"
                              :color="category.color"
                              height="8"
                              rounded
                              class="skill-progress"
                            >
                              <template v-slot:default>
                                <div class="skill-progress-overlay"></div>
                              </template>
                            </v-progress-linear>
                            <v-expand-transition>
                              <div v-if="isHovering" class="mt-4">
                                <div class="text-caption">{{ skill.description }}</div>
                                <v-chip-group class="mt-2">
                                  <v-chip
                                    v-for="tech in skill.technologies"
                                    :key="tech"
                                    :color="category.color"
                                    size="small"
                                    variant="outlined"
                                    class="text-caption"
                                  >{{ tech }}</v-chip>
                                </v-chip-group>
                              </div>
                            </v-expand-transition>
                          </v-card-text>
                        </v-card-item>
                      </v-card>
                    </v-hover>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </div>

          <!-- Desktop Layout (Vertical Tabs) -->
          <v-row v-else no-gutters>
            <v-col cols="12" md="3" class="pr-md-4">
              <v-tabs
                v-model="activeTab"
                direction="vertical"
                show-arrows
                slider-color="secondary"
                density="comfortable"
              >
                <v-tab
                  v-for="category in skillCategories"
                  :key="category.id"
                  :value="category.id"
                  class="text-subtitle-1 tab-label"
                >
                  <v-icon start :icon="category.icon" class="me-2"></v-icon>
                  {{ category.name }}
                </v-tab>
              </v-tabs>
            </v-col>

            <v-col cols="12" md="9">
              <v-window v-model="activeTab" class="pa-6">
                <v-window-item
                  v-for="category in skillCategories"
                  :key="category.id"
                  :value="category.id"
                >
                  <v-row>
                    <v-col
                      v-for="skill in category.skills"
                      :key="skill.name"
                      cols="12" sm="6" md="4"
                      class="animate__animated animate__fadeIn"
                    >
                      <v-hover v-slot="{ isHovering, props }">
                        <v-card
                          v-bind="props"
                          :elevation="isHovering ? 10 : 2"
                          :class="{ 'on-hover': isHovering }"
                          class="skill-card"
                        >
                          <v-card-item>
                            <v-card-title class="d-flex align-center skill-card-title">
                              <v-icon :icon="skill.icon" :color="category.color" size="large" class="me-2"></v-icon>
                              {{ skill.name }}
                            </v-card-title>
                            <v-card-subtitle class="pt-2">
                              Experience: {{ skill.years }} {{ skill.years === 1 ? 'year' : 'years' }}
                            </v-card-subtitle>
                            <v-card-text>
                              <div class="d-flex justify-space-between align-center mb-1">
                                <span class="text-body-2">Proficiency</span>
                                <span class="text-caption font-weight-bold">{{ skill.level }}%</span>
                              </div>
                              <v-progress-linear
                                :model-value="skill.level"
                                :color="category.color"
                                height="8"
                                rounded
                                class="skill-progress"
                              >
                                <template v-slot:default>
                                  <div class="skill-progress-overlay"></div>
                                </template>
                              </v-progress-linear>
                              <v-expand-transition>
                                <div v-if="isHovering" class="mt-4">
                                  <div class="text-caption">{{ skill.description }}</div>
                                  <v-chip-group class="mt-2">
                                    <v-chip
                                      v-for="tech in skill.technologies"
                                      :key="tech"
                                      :color="category.color"
                                      size="small"
                                      variant="outlined"
                                      class="text-caption"
                                    >{{ tech }}</v-chip>
                                  </v-chip-group>
                                </div>
                              </v-expand-transition>
                            </v-card-text>
                          </v-card-item>
                        </v-card>
                      </v-hover>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import 'animate.css'

const { mobile } = useDisplay()
const activeTab = ref(0)

const skillCategories = ref([
  {
    id: 0,
    name: 'Frontend',
    icon: 'mdi-monitor-dashboard',
    color: 'teal',
    skills: [
      {
        name: 'Vue.js',
        icon: 'mdi-vuejs',
        level: 99,
        years: 5,
        description: 'Expert in Vue 2/3, Vuex, Pinia, and Vue Router',
        technologies: ['Vuetify','Options API', 'Composition API','Javascript', 'TypeScript']
      },
      {
        name: 'React',
        icon: 'mdi-react',
        level: 95,
        years: 3,
        description: 'Proficient in React and its ecosystem',
        technologies: ['Redux', 'Hooks', 'Material-UI']
      }
    ]
  },
  {
    id: 1,
    name: 'Backend',
    icon: 'mdi-server',
    color: 'indigo',
    skills: [
      {
        name: 'Node.js',
        icon: 'mdi-nodejs',
        level: 90,
        years: 4,
        description: 'Server-side JavaScript with Node.js',
        technologies: ['Express.js', 'REST APIs', 'WebSockets']
      },
      {
        name: 'Python',
        icon: 'mdi-language-python',
        level: 85,
        years: 3,
        description: 'Python for backend and data science',
        technologies: ['Django', 'Flask', 'FastAPI']
      }
    ]
  },
  {
    id: 2,
    name: 'Database',
    icon: 'mdi-database',
    color: 'deep-orange',
    skills: [
      {
        name: 'MongoDB',
        icon: 'mdi-leaf',
        level: 88,
        years: 4,
        description: 'NoSQL database design and optimization',
        technologies: ['Mongoose', 'Atlas', 'Aggregation']
      },
      {
        name: 'SQL',
        icon: 'mdi-table',
        level: 85,
        years: 4,
        description: 'Relational databases and query optimization',
        technologies: ['MySQL', 'PostgreSQL', 'Firebase']
      }
    ]
  },
  {
    id: 3,
    name: 'AI / ML',
    icon: 'mdi-brain',
    color: 'cyan',
    skills: [
      {
        name: 'Machine Learning',
        icon: 'mdi-chart-scatter-plot',
        level: 80,
        years: 1,
        description: 'Implementing ML algorithms and models',
        technologies: ['scikit-learn', 'TensorFlow', 'Keras', 'NumPy']
      },
      {
        name: 'Deep Learning',
        icon: 'mdi-neural-network',
        level: 80,
        years: 1,
        description: 'Neural network architecture and training',
        technologies: ['PyTorch', 'CNN', 'RNN', 'Transfer Learning','GAN','LSTM','Transformer']
      }
    ]
  },
  {
    id: 4,
    name: 'DevOps & Tools',
    icon: 'mdi-console-line',
    color: 'teal',
    skills: [
      {
        name: 'Git & GitHub',
        icon: 'mdi-git',
        level: 95,
        years: 5,
        description: 'Version control and collaboration',
        technologies: ['Git Flow', 'GitHub Actions', 'Pull Requests', 'Code Review']
      },
      {
        name: 'Agile & Scrum',
        icon: 'mdi-sync',
        level: 90,
        years: 2,
        description: 'Agile methodologies and team management',
        technologies: ['Product backlogging','Sprint Planning', 'Daily Standups', 'Sprint Review', 'Sprint Retrospectives']
      },
      {
        name: 'Project Tools',
        icon: 'mdi-tools',
        level: 88,
        years: 2,
        description: 'Project management and tracking tools',
        technologies: ['Jira','Slack']
      }
    ]
  }
])
</script>

<style scoped>
/* ─── Section Header — gradient applied here, font/size comes from global ──── */
.section-title {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 50%, rgb(var(--v-theme-info)) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  display: inline-block;
}

/* ─── Skills Card Shell ─────────────────────────────────────────────────────── */
.skills-card {
  border-radius: 18px;
  overflow: hidden;
}

/* ─── Individual Skill Cards ────────────────────────────────────────────────── */
.skill-card {
  height: 100%;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.3s ease;
  border-radius: 14px;
}
.skill-card.on-hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(var(--v-theme-primary), 0.18) !important;
}

/* Card title uses body font from global */
.skill-card-title {
  font-family: 'Jost', sans-serif !important;
  font-weight: 600 !important;
  letter-spacing: 0.01em;
}

/* ─── Progress Bar ──────────────────────────────────────────────────────────── */
.skill-progress {
  position: relative;
  overflow: hidden;
}
.skill-progress-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.25) 50%,
    rgba(255,255,255,0) 100%
  );
  animation: shimmer 2.2s infinite;
}

@keyframes shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%);  }
}

/* ─── Tabs ──────────────────────────────────────────────────────────────────── */
.v-tab, .tab-label {
  text-transform: none !important;
  letter-spacing: 0.4px;
  font-family: 'Jost', sans-serif !important;
}

/* ─── Mobile Layout ─────────────────────────────────────────────────────────── */
.mobile-layout     { width: 100%; }
.mobile-tabs       { border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity)); }
.mobile-tab        { min-width: auto !important; padding: 8px 12px !important;
                     font-size: 0.75rem !important; text-transform: none !important;
                     letter-spacing: 0.25px !important; }
.mobile-tab-text   { display: inline-block; max-width: 60px;
                     overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* ─── Animate.css timing ────────────────────────────────────────────────────── */
.animate__animated { animation-duration: 0.8s; }

/* ─── Responsive ────────────────────────────────────────────────────────────── */
@media (max-width: 960px) {
  .skills-container { padding: 1rem; }
  .skill-card       { margin-bottom: 1rem; }
}
@media (max-width: 600px) {
  .skills-container   { padding: 0.5rem; }
  .skill-card         { margin-bottom: 0.75rem; }
  .mobile-tab         { padding: 6px 8px !important; font-size: 0.7rem !important; }
  .mobile-tab-text    { max-width: 50px; }
}
@media (max-width: 400px) {
  .skills-container   { padding: 0.25rem; }
  .mobile-tab         { padding: 4px 6px !important; font-size: 0.65rem !important; }
  .mobile-tab-text    { max-width: 35px; }
  .skill-card         { margin-bottom: 0.5rem; padding: 0.75rem !important; }
  .skill-card .v-card-title { font-size: 0.9rem !important; }
  .skill-card .v-card-text  { font-size: 0.8rem !important; }
}
@media (max-width: 960px) and (orientation: landscape) {
  .skills-container { padding: 0.5rem; }
  .mobile-tabs      { overflow-x: auto; white-space: nowrap; }
}
</style>