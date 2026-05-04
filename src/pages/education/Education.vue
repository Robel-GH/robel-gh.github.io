<template>
  <v-container class="education-timeline">
    <v-row justify="center" class="ma-4">
      <v-col cols="12" md="11">
        <!-- Section Header -->
        <div class="section-header text-center mb-8">
          <div class="header-decoration">
            <v-icon icon="mdi-school" size="x-large" class="header-icon"></v-icon>
          </div>
          <h2 class="section-title text-h5 ml-2 font-weight-bold mb-2 animate__animated animate__fadeIn">
            Educational Background
          </h2>
          <div class="title-underline"></div>
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
              <div class="timeline-date text-h6 font-weight-bold">{{ education.period }}</div>
            </template>

            <!-- Education Card -->
            <v-card class="elevation-16 timeline-card" variant="text" rounded="lg">
              <v-card-item class="pa-4">
                <v-card-title class="text-h6 font-weight-bold d-flex align-center edu-card-title">
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
                  <!-- Skills Section -->
                  <div v-if="education.skills && education.skills.length" class="mb-4">
                    <div class="font-weight-medium mb-3 text-subtitle-2 edu-sub-label">
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
                      >{{ skill }}</v-chip>
                    </div>
                  </div>

                  <!-- Achievements Section -->
                  <div v-if="education.achievements && education.achievements.length">
                    <v-expansion-panels variant="accordion" class="achievement-panel">
                      <v-expansion-panel>
                        <v-expansion-panel-title class="text-subtitle-2 edu-sub-label">
                          <v-icon icon="mdi-trophy" class="me-2" size="small"></v-icon>
                          View Achievements & Accomplishments
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                          <ul class="achievement-list">
                            <li
                              v-for="(achievement, index) in education.achievements"
                              :key="index"
                            >{{ achievement }}</li>
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
        skills: [' PyTorch', 'Keras', 'Transformers','Pandas','Numpy','Scikit-learn','Crew AI','Python','TypeScript','R','Vue.js', 'Node.js', 'Scrum','Agile','Jira','CI/CD','Cuda','Tableau','Docker','AWS','Git','REST APIs'],
        achievements: [
          'Runner up in Keke AI Student Competition(Built an agent using A* & IDA search algorithm)',
          'Implemented Dyanmic PDDL visualizer',
          'Developed a multimodal medical-report generator (Fine-tuned ResNet-50 encoder + GPT-2 decoder) for Indiana chest X-rays',
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
        skills: [ 'Python','JavaScript','Java','C','C++','React','Django','Kotlin', 'Database Design', 'API Development'],
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
        institution: 'Shire Preparatory School',
        description: 'Foundation studies in natural science and computer basics.',
        color: 'info',
        icon: 'mdi-code-tags',
        skills: ['HTML','Windows','MS-Excel', 'MS-Powerpoint', 'MS-Word','File Management','Typing','Computer Literacy'],
        achievements: [
          "Graduated with Distinction "
        ]
      }
    ])

    return { timelineDensity, educationList }
  }
}
</script>

<style scoped>
/* ─── Section Header — gradient here, font/size from global ────────────────── */
.section-title {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 50%, rgb(var(--v-theme-info)) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  display: inline-block;
}

/* ─── Layout ─────────────────────────────────────────────────────────────────── */
.education-timeline {
  padding: 4rem 0;
  max-width: 1200px;
  margin: 0 auto;
}

/* ─── Timeline Date ──────────────────────────────────────────────────────────── */
.timeline-date {
  font-family: 'Cormorant Garant', Georgia, serif !important;
  font-size: 1.05rem !important;
  letter-spacing: 0.02em;
  color: rgb(var(--v-theme-primary));
  opacity: 0.9;
}

/* ─── Education Card ─────────────────────────────────────────────────────────── */
.timeline-card {
  border-left: 4px solid rgb(var(--v-theme-primary));
  transition: transform 0.35s cubic-bezier(0.34, 1.2, 0.64, 1),
              box-shadow 0.35s ease;
  width: 100%;
  max-width: 100%;
  margin: 0.5rem 0;
  box-shadow: 0 4px 16px rgba(var(--v-theme-primary), 0.12);
}
.timeline-card:hover {
  transform: translateY(-5px) translateX(3px);
  box-shadow: 0 12px 32px rgba(var(--v-theme-primary), 0.22);
}

/* Degree title — cinematic serif */
.edu-card-title {
  font-family: 'Cormorant Garant', Georgia, serif !important;
  font-weight: 600 !important;
  font-size: 1.15rem !important;
  letter-spacing: 0.02em;
  line-height: 1.35;
}

/* Sub-labels inside card — body font */
.edu-sub-label {
  font-family: 'Jost', sans-serif !important;
}

/* ─── Skills ─────────────────────────────────────────────────────────────────── */
.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* ─── Achievements ───────────────────────────────────────────────────────────── */
.achievement-panel { margin-top: 1rem; }

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
}
.achievement-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: rgb(var(--v-theme-primary));
  font-weight: bold;
}

/* ─── Timeline Item Animations ───────────────────────────────────────────────── */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0);    }
}
.v-timeline-item {
  opacity: 0;
  animation: fadeInUp 0.65s ease forwards;
}
.v-timeline-item:nth-child(1) { animation-delay: 0.15s; }
.v-timeline-item:nth-child(2) { animation-delay: 0.35s; }
.v-timeline-item:nth-child(3) { animation-delay: 0.55s; }

:deep(.v-timeline) { padding: 0 1rem; }
:deep(.v-timeline-item__opposite) { flex: 0 0 auto; min-width: 120px; }

/* ─── Responsive ─────────────────────────────────────────────────────────────── */
@media (max-width: 960px) {
  .education-timeline                        { padding: 2rem 0; }
  :deep(.v-timeline)                         { padding: 0 0.5rem; }
  :deep(.v-timeline-item__opposite)          { min-width: 100px; }
  .timeline-card                             { margin: 0.25rem 0; }
}
@media (max-width: 600px) {
  .education-timeline                        { padding: 1.5rem 0; }
  :deep(.v-timeline)                         { padding: 0; }
  :deep(.v-timeline-item__opposite)          { min-width: 80px; font-size: 0.875rem; }
  .timeline-card                             { margin: 0.25rem 0; border-left-width: 3px; }
  .skills-container                          { gap: 0.25rem; }
  .skills-container .v-chip                  { font-size: 0.75rem; height: 24px; }
}
@media (max-width: 400px) {
  :deep(.v-timeline-item__opposite)          { min-width: 70px; font-size: 0.75rem; }
  .timeline-card                             { border-left-width: 2px; }
  .skills-container .v-chip                  { font-size: 0.7rem; height: 22px; }
}

/* Dark mode */
:deep(.v-theme--dark) .timeline-card        { box-shadow: 0 4px 16px rgba(var(--v-theme-primary), 0.2); }
:deep(.v-theme--dark) .timeline-card:hover  { box-shadow: 0 12px 32px rgba(var(--v-theme-primary), 0.3); }
</style>