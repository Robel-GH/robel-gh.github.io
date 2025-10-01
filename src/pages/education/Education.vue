<template>
  <v-container class="education-timeline" >
    <v-row justify="center" class="ma-4">
      <v-col cols="12" md="11">
        <!-- Header -->
        <div class="text-center mb-8">
          <h2 class="text-h5 font-weight-bold primary--text">
            Educational Background
          </h2>
          <p class="text-subtitle-1 text-medium-emphasis">
            My Academic Journey
          </p>
        </div>

        <!-- Timeline -->
        <v-timeline side="end" align="start" :density="timelineDensity">
          <v-timeline-item
            v-for="education in educationList"
            :key="education.id"
            :dot-color="education.color"
            size="small"
            fill-dot
          >
            <!-- Timeline Date -->
            <template v-slot:opposite>
              <div class="text-h6 font-weight-bold">{{ education.period }}</div>
            </template>

            <!-- Education Card -->
            <v-card class="elevation-16 timeline-card" variant="text" rounded="lg">
              <v-card-item class="pa-4">
                <v-card-title class="text-h6 font-weight-bold d-flex align-center">
                  <v-icon 
                    :icon="education.icon" 
                    class="me-3"
                    :color="education.color"
                    size="24"
                  ></v-icon>
                  {{ education.degree }}
                </v-card-title>
                
                <v-card-subtitle class="pt-2 text-subtitle-1 d-flex align-center">
                  <v-icon icon="mdi-school" class="me-2" size="small"></v-icon>
                  {{ education.institution }}
                </v-card-subtitle>

                <v-card-text class="pt-3">
                  <p class="mb-4 text-body-1">{{ education.description }}</p>
                  
                  <!-- Skills Section -->
                  <div v-if="education.skills && education.skills.length" class="mb-4">
                    <div class="font-weight-medium mb-3 text-subtitle-2">
                      <v-icon icon="mdi-tools" class="me-2" size="small"></v-icon>
                      Key Skills & Technologies
                    </div>
                    <div class="skills-container">
                      <v-chip
                        v-for="skill in education.skills"
                        :key="skill"
                        color="primary"
                        variant="outlined"
                        size="small"
                        class="ma-1"
                      >
                        {{ skill }}
                      </v-chip>
                    </div>
                  </div>

                  <!-- Achievements Section -->
                  <div v-if="education.achievements && education.achievements.length">
                    <v-expansion-panels variant="accordion" class="achievement-panel">
                      <v-expansion-panel>
                        <v-expansion-panel-title class="text-subtitle-2">
                          <v-icon icon="mdi-trophy" class="me-2" size="small"></v-icon>
                          View Achievements & Accomplishments
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                          <ul class="achievement-list">
                            <li
                              v-for="(achievement, index) in education.achievements"
                              :key="index"
                            >
                              {{ achievement }}
                            </li>
                          </ul>
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
  name: 'EducationTimeline',
  
  setup() {
    const { mobile } = useDisplay()

    const timelineDensity = computed(() => mobile.value ? 'compact' : 'default')

    const educationList = ref([
      {
        id: 1,
        period: 'Sep, 2024 - Present',
        degree: 'Master of Artificial Intelligence and Computer Science',
        institution: 'University of Calabria',
        description: 'Focusing on advanced software engineering principles and modern web technologies.',
        color: 'primary',
        icon: 'mdi-school',
        skills: ['Vue.js', 'Node.js', 'Scrum','Agile','Jira','CI/CD','Deep Learning','Cuda','Tensorflow','Data Visualization','Docker','AWS','CI/CD','Docker','Git','Linux','REST APIs','TypeScript','AWS'],
        achievements: [
          'Developed for University Project Phonebook and Messaging App',
          
        ]
      },
      {
        id: 2,
        period: '2014 - 2019',
        degree: 'Bachelor of Science in Computer Science and Engineering',
        institution: 'Mekelle Institute of Technology - Mekelle University',
        description: 'Comprehensive study of software development fundamentals and practical applications.',
        color: 'secondary',
        icon: 'mdi-laptop',
        skills: ['JavaScript', 'Python', 'Database Design', 'API Development'],
        achievements: [
          'Graduated with Honors (3.93 CGPA)',
          'Developed e-equb web application for final year project',
          'Developed driver drowiness detection system for mini-project'
        ]
      },
      {
        id: 3,
        period: '2012 - 2014',
        degree: 'Diploma in Natural Sciences',
        institution: 'Shire Priparatory School',
        description: 'Foundation studies in natural science and computer basics.',
        color: 'info',
        icon: 'mdi-code-tags',
        skills: ['MS-Excel', 'MS-Powerpoint', 'MS-Word'],
        achievements: [
          "Graduated with Distinction "
        ]
      }
    ])

    return {
      timelineDensity,
      educationList
    }
  }
}
</script>

<style scoped>
.education-timeline {
  padding: 4rem 0;
  max-width: 1200px;
  margin: 0 auto;
}

.timeline-card {
  border-left: 4px solid rgb(var(--v-theme-primary));
  transition: all 0.3s ease;
  width: 100%;
  max-width: 100%;
  margin: 0.5rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.timeline-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Skills container styling */
.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* Achievement panel styling */
.achievement-panel {
  margin-top: 1rem;
}

.achievement-list {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}

.achievement-list li {
  position: relative;
  padding-left: 1.5em;
  margin-bottom: 0.75em;
  line-height: 1.5;
  color: rgb(var(--v-theme-on-surface));
}

.achievement-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: rgb(var(--v-theme-primary));
  font-weight: bold;
}

/* Animation classes */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.v-timeline-item {
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
}

.v-timeline-item:nth-child(1) { animation-delay: 0.2s; }
.v-timeline-item:nth-child(2) { animation-delay: 0.4s; }
.v-timeline-item:nth-child(3) { animation-delay: 0.6s; }

/* Timeline responsive adjustments */
:deep(.v-timeline) {
  padding: 0 1rem;
}

:deep(.v-timeline-item__opposite) {
  flex: 0 0 auto;
  min-width: 120px;
}

/* Responsive Styles */
@media (max-width: 960px) {
  .education-timeline {
    padding: 2rem 0;
  }
  
  :deep(.v-timeline) {
    padding: 0 0.5rem;
  }
  
  :deep(.v-timeline-item__opposite) {
    min-width: 100px;
  }
  
  .timeline-card {
    margin: 0.25rem 0;
  }
}

@media (max-width: 600px) {
  .education-timeline {
    padding: 1.5rem 0;
  }
  
  :deep(.v-timeline) {
    padding: 0;
  }
  
  :deep(.v-timeline-item__opposite) {
    min-width: 80px;
    font-size: 0.875rem;
  }
  
  .timeline-card {
    margin: 0.25rem 0;
    border-left-width: 3px;
  }
  
  .skills-container {
    gap: 0.25rem;
  }
  
  .skills-container .v-chip {
    font-size: 0.75rem;
    height: 24px;
  }
}

@media (max-width: 400px) {
  :deep(.v-timeline-item__opposite) {
    min-width: 70px;
    font-size: 0.75rem;
  }
  
  .timeline-card {
    border-left-width: 2px;
  }
  
  .skills-container .v-chip {
    font-size: 0.7rem;
    height: 22px;
  }
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .timeline-card {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  .timeline-card:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  }
}
</style>