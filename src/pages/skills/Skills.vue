<template>
  <v-container class="skills-container py-8" fluid>
    <v-row justify="center">
      <v-col cols="12" md="11">
        <h2 class="text-h4 text-center mb-8 font-weight-bold primary--text animate__animated animate__fadeIn">
          Technical Skills & Expertise
        </h2>

        <v-card class="skills-card animate__animated animate__fadeInUp" variant="text" rounded="xl">
          <v-tabs
            v-model="activeTab"
            backgroundColor="primary"
            centered
            show-arrows
            slider-color="secondary"
          >
            <v-tab
              v-for="category in skillCategories"
              :key="category.id"
              :value="category.id"
              class="text-subtitle-1"
            >
              <v-icon start :icon="category.icon" class="me-2"></v-icon>
              {{ category.name }}
            </v-tab>
          </v-tabs>

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
                  cols="12"
                  sm="6"
                  md="4"
                  class="animate__animated animate__fadeIn"
                >
                  <v-hover v-slot="{ isHovering, props }">
                    <v-card
                      v-bind="props"
                      :elevation="isHovering ? 8 : 2"
                      :class="{ 'on-hover': isHovering }"
                      class="skill-card"
                    >
                      <v-card-item>
                        <v-card-title class="d-flex align-center">
                          <v-icon
                            :icon="skill.icon"
                            :color="category.color"
                            size="large"
                            class="me-2"
                          ></v-icon>
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
                            <template v-slot:default="{ value }">
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
                                >
                                  {{ tech }}
                                </v-chip>
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import 'animate.css'

const activeTab = ref(0)

const skillCategories = ref([
  {
    id: 0,
    name: 'Frontend',
    icon: 'mdi-monitor-dashboard',
    color: 'indigo',
    skills: [
      {
        name: 'Vue.js',
        icon: 'mdi-vuejs',
        level: 95,
        years: 5,
        description: 'Expert in Vue 2/3, Vuex, Pinia, and Vue Router',
        technologies: ['Vuetify','Options API', 'Composition API','Javascript', 'TypeScript']
      },
      {
        name: 'React',
        icon: 'mdi-react',
        level: 85,
        years: 3,
        description: 'Proficient in React and its ecosystem',
        technologies: ['Redux', 'Hooks', 'Material-UI']
      },
      {
        name: 'UI/UX',
        icon: 'mdi-palette-outline',
        level: 88,
        years: 4,
        description: 'Creating responsive and accessible interfaces',
        technologies: ['CSS3', 'SASS',  'Bootstrap']
      }
    ]
  },
  {
    id: 1,
    name: 'Backend',
    icon: 'mdi-server',
    color: 'deep-purple',
    skills: [
      {
        name: 'Node.js',
        icon: 'mdi-nodejs',
        level: 92,
        years: 5,
        description: 'Building scalable server-side applications',
        technologies: ['Express.js', 'REST APIs', 'WebSocket']
      },
      {
        name: 'Python',
        icon: 'mdi-language-python',
        level: 90,
        years: 3,
        description: 'Backend development and data processing',
        technologies: ['Django',  'Pandas','Numpy','Scipy']
      },
      {
        name: 'Java',
        icon: 'mdi-language-java',
        level: 80,
        years: 3,
        description: 'Enterprise application development',
        technologies: ['Spring Boot', 'Hibernate', 'Maven', 'JUnit']
      }
    ]
  },
  {
    id: 2,
    name: 'Databases',
    icon: 'mdi-database',
    color: 'blue',
    skills: [
      {
        name: 'MongoDB',
        icon: 'mdi-database-outline',
        level: 90,
        years: 5,
        description: 'NoSQL database design and optimization',
        technologies: ['Mongoose', 'Aggregation', 'Atlas', 'Indexing']
      },
      {
        name: 'MySQL',
        icon: 'mdi-database-settings',
        level: 90,
        years: 3,
        description: 'Database administration and optimization',
        technologies: ['SQL', 'Stored Procedures', 'Triggers', 'Views']

      },
      {
        name: 'PostgreSQL',
        icon: 'mdi-database-check',
        level: 85,
        years: 3,
        description: 'Relational database management',
        technologies: ['SQL', 'PL/pgSQL', 'Indexing', 'Performance Tuning']
      },
        {
            name: 'Firebase',
            icon: 'mdi-fire',
            level: 85,
            years: 1,
            description: 'Real-time database and authentication',
            technologies: ['Firestore', 'Realtime Database', 'Authentication', 'Storage']
        }
    ]
  },
  {
    id: 3,
    name: 'AI/ML',
    icon: 'mdi-brain',
    color: 'deep-orange',
    skills: [
      {
        name: 'Machine Learning',
        icon: 'mdi-chart-scatter-plot',
        level: 65,
        years: 1,
        description: 'Implementing ML algorithms and models',
        technologies: ['scikit-learn', 'TensorFlow', 'Keras', 'NumPy']
      },
      {
        name: 'Deep Learning',
        icon: 'mdi-neural-network',
        level: 60,
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
.skills-container {
  /* background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%); */
}

.skills-card {
  border-radius: 16px;
  overflow: hidden;
}

.skill-card {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 12px;
}

.skill-card.on-hover {
  transform: translateY(-5px);
}

.skill-progress {
  position: relative;
  overflow: hidden;
}

.skill-progress-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.3) 50%,
    rgba(255,255,255,0) 100%
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.v-tab {
  text-transform: none !important;
  letter-spacing: 0.5px;
}

/* Animate.css customization */
.animate__animated {
  animation-duration: 0.8s;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .skills-container {
    padding: 1rem;
  }
  
  .skill-card {
    margin-bottom: 1rem;
  }
}
</style>