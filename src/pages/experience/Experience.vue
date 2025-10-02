<template>
  <v-container class="portfolio-section py-8" fluid>
    <v-row justify="center">
      <v-col cols="12" md="11">
        <!-- Header Section -->
        <h2 class="text-h5 text-center mb-8 font-weight-bold primary--text animate__animated animate__fadeIn">
          Professional Experience
        </h2>

        <!-- Experience Cards Grid -->
        <v-row align="start">
          <v-col
            v-for="(job, index) in workExperience"
            :key="job.id"
            cols="12"
            sm="6"
            lg="6"
            class="animate__animated"
            :class="index % 2 === 0 ? 'animate__fadeInLeft' : 'animate__fadeInRight'"
            :style="{ animationDelay: `${index * 0.15}s` }"
            align-self="start"
          >
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                v-bind="props"
                class="experience-card"
                :class="{ 'card-hover': isHovering }"
                :elevation="isHovering ? 8 : 2"
                rounded="xl"
                variant="text"
              
                @click="toggleExpanded(job.id)"
              >
                <!-- Card Header with Image -->
                <div class="card-header">
                  <div class="company-logo">
                    <v-avatar size="70" class="logo-avatar">
                      <v-img :src="job.logo || job.image" :alt="job.company" cover></v-img>
                    </v-avatar>
                    <div class="logo-glow"></div>
                  </div>
                  
                  <div class="header-content">
                    <h3 class="job-title text-h6">{{ job.title }}</h3>
                    <div class="company-info text-body-2">
                      <v-icon icon="mdi-office-building" size="small" class="me-2"></v-icon>
                      <span>{{ job.company }}</span>
                    </div>
                    <v-chip 
                      size="small" 
                      variant="tonal" 
                      color="primary" 
                      class="period-chip"
                    >
                      <v-icon icon="mdi-calendar" size="small" class="me-1"></v-icon>
                      {{ job.period }}
                    </v-chip>
                  </div>
                </div>

                <!-- Card Content -->
                <v-card-text class="card-content">
                  <!-- <p class="job-description text-body-2">{{ job.description }}</p> -->
                  
                  <!-- Key Highlights -->
                  <div v-if="expandedId !== job.id" class="highlights-section">
                    <!-- <h4 class="section-title text-subtitle-2">
                      <v-icon icon="mdi-star" size="small" class="me-2"></v-icon>
                      Key Highlights
                    </h4> -->
                    <ul class="highlights-list">
                      <li
                        v-for="(highlight, hIndex) in getResponsibilityPreview(job)"
                        :key="`highlight-${job.id}-${hIndex}`"
                        class="highlight-item"
                      >
                        {{ highlight }}
                      </li>
                    </ul>
                  </div>

                  <!-- Skills Preview -->
                  <div v-if="expandedId !== job.id" class="skills-preview">
                    <h4 class="section-title text-subtitle-2">
                      <v-icon icon="mdi-tools" size="small" class="me-2"></v-icon>
                      Skills
                    </h4>
                    <div class="skills-container">
                      <v-chip
                        v-for="skill in getSkillPreview(job)"
                        :key="`skill-${job.id}-${skill}`"
                        color="primary"
                        variant="outlined"
                        size="small"
                        class="more-chip"
                      >
                        {{ skill }}
                      </v-chip>
                      <v-chip
                        v-if="job.skills && job.skills.length > 3"
                        size="small"
                        variant="outlined"
                        color="primary"
                        class="more-chip"
                      >
                        +{{ job.skills.length - 3 }} more
                      </v-chip>
                    </div>
                  </div>
                  
                </v-card-text>
                

                <!-- Expandable Content -->
                <v-expand-transition>
                  <div v-if="expandedId === job.id" class="expanded-content">
                    <v-divider class="content-divider"></v-divider>
                    
                    <v-card-text class="expanded-text">
                      <!-- Full Responsibilities -->
                      <div class="full-responsibilities">
                        <!-- <h4 class="section-title text-subtitle-2">
                          <v-icon icon="mdi-clipboard-list" size="small" class="me-2"></v-icon>
                          Key Responsibilities
                        </h4> -->
                        <ul class="responsibilities-list">
                          <li
                            v-for="(resp, rIndex) in job.responsibilities"
                            :key="`resp-${job.id}-${rIndex}`"
                            class="responsibility-item"
                          >
                            {{ resp }}
                          </li>
                        </ul>
                      </div>

                      <!-- All Skills -->
                      <div class="all-skills">
                        <h4 class="section-title text-subtitle-2">
                          <v-icon icon="mdi-code-tags" size="small" class="me-2"></v-icon>
                          All Skills
                        </h4>
                        <div class="skills-grid">
                          <v-chip
                            v-for="skill in job.skills"
                            :key="`all-skill-${job.id}-${skill}`"
                            color="primary"
                            variant="outlined"
                            size="small"
                            class="more-chip"
                          >
                            {{ skill }}
                          </v-chip>
                        </div>
                      </div>
                    </v-card-text>
                  </div>
                </v-expand-transition>

                <!-- Action Button -->
                <v-card-actions class="card-actions">
                  <v-btn
                    variant="tonal"
                    color="primary"
                    rounded="xl"
                    class="expand-btn"
                    :aria-expanded="expandedId === job.id ? 'true' : 'false'"
                  >
                    <span>{{ expandedId === job.id ? 'Show Less' : 'Show More' }}</span>
                    <v-icon
                      :icon="expandedId === job.id ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                      class="ms-2"
                    ></v-icon>
                  </v-btn>
                </v-card-actions>

                <!-- Decorative Elements -->
                <div class="card-decoration">
                  <div class="decoration-circle"></div>
                  <div class="decoration-line"></div>
                </div>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'WorkExperience',
  
  setup() {
    const expandedId = ref(null)
    const workExperience = ref([
    {
        id: 1,
        title: 'Assistant Lecturer',
        company: 'Mekelle Institute of Technology - Mekelle University',
        period: 'June, 2021 - Present',
        logo: '/images/mit.jpg',
        image: '/images/mit.jpg',
        description: 'Taught computer science courses and supervised student projects.',
        responsibilities: [
          'Delivered lectures and tutorials in Computer Science and Engineering courses, communicating complex concepts clearly to undergraduate students.',
          'Developed and implemented hands-on laboratory exercises and programming assignments',
          ' Advised students on internship projects and capstones, guiding project scope, technical design, implementation strategies, and professional deliverables.',
          'Coordinated student project teams and oversaw code repositories, version control workflows, and integration/testing practices.'
        ],
        skills: [ 'Python','PyTorch','Tensorflow', 'Pandas','Numpy','Scipy', 'Java', 'Data Structures', 'Algorithms', 'Computer Graphics','Distributed Systems'],
        isHovering: false
      },
      {
        id: 2,
        title: 'Fullstack Developer',
        company: 'Tekeze Technologies PLC',
        period: 'July, 2020 - September, 2024',
        logo: '/images/guna.jpg',
        image: 'https://cdn.vuetifyjs.com/docs/images/components/v-empty-state/teamwork.png',
        description: 'Working as a full-stack developer focusing on web applications and enterprise solutions.',
        responsibilities: [
        'Led end-to-end development of 2 enterprise web apps (Sales Management, Indigent Management), reducing manual workflows by 80% and boosting client revenue.',
          'Designed and implemented real-time analytics dashboards with dynamic reporting features, enabling stakeholders to make data-driven decisions and respond to market trends 70% faster.',
          'Drove a 40% improvement in operational efficiency through process automation, workflow optimization, and adoption of agile methodologies, reducing redundancies and accelerating project delivery.',
          'Improved team code quality by 45% via PR reviews and CI/CD pipeline optimization.'
        ],
        skills: ['Vue.js','React', 'Node.js','TypeScript', 'JavaScript', 'MangoDB','MySQL', 'PostgreSQL', 'Firebase', 'Docker', 'AWS', 'Jira', 'CI/CD' ,'Git', 'REST APIs', 'Agile'],
        isHovering: false
      },
     
      {
        id: 3,
        title: 'Junior ICT Officer',
        company: 'Guna Trading House PLC',
        period: 'December 2019 - July 2020',
        logo: '/images/guna-logo.png',
        image: '/images/guna-logo.png',
        description: 'Provided technical support and maintained IT infrastructure.',
        responsibilities: [
          'Scheduled preventive maintenance of ICT devices in Shire and Humera branches.',
          'Installed and configured LANs of Shire and Humera branches.',
          'Undertaken hardware and software maintenance of computers, printers, and etworking devices on a daily and weekly schedule.',
          'Delivered successful training sessions on the ERP system  to the employees  in Shire and Humera branches.'
        ],
        skills: ['Networking','ERP', 'System Maintenance', 'IT Support', 'Troubleshooting'],
        isHovering: false
      },
      {
        id: 4,
        title: 'College Lecturer',
        company: 'Oxfo-Business and Technology College',
        period: 'October, 2019 - December, 2019',
        logo: '/images/oxfo.jpg',
        image: '/images/oxfo.jpg',
        description: 'Taught computer science and programming courses at college level.',
        responsibilities: [
          'Developed and delivered lectures on programming and IT subjects',
          'Created assessment materials and graded student work',
          'Provided academic advice to students',
        ],
        skills: ['Java', 'Data Structure', 'Python', 'C++', 'C', 'HTML', 'CSS', 'JavaScript'],
        isHovering: false
      }
    ])

    const getResponsibilityPreview = (job) => {
      if (!job || !job.responsibilities) return []
      return job.responsibilities.slice(0, 2)
    }

    const getSkillPreview = (job) => {
      if (!job || !job.skills) return []
      return job.skills.slice(0, 3)
    }

    const toggleExpanded = (jobId) => {
      expandedId.value = expandedId.value === jobId ? null : jobId
    }

    return {
      workExperience,
      expandedId,
      getResponsibilityPreview,
      getSkillPreview,
      toggleExpanded
    }
  }
}
</script>

<style scoped>
/* Import animate.css for animations */
@import 'animate.css';

.work-experience {
  min-height: 100vh;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  background: 
    radial-gradient(800px 300px at 20% 10%, rgba(25, 118, 210, 0.08), transparent 50%),
    radial-gradient(800px 300px at 80% 90%, rgba(38, 166, 154, 0.08), transparent 50%),
    radial-gradient(600px 200px at 50% 50%, rgba(156, 39, 176, 0.05), transparent 50%);
  position: relative;
  overflow: hidden;
}

.work-experience::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 25% 25%, rgba(25, 118, 210, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(38, 166, 154, 0.03) 0%, transparent 50%);
  pointer-events: none;
}

/* Header Styles - Removed custom styles to use Vuetify classes */

/* Removed section-underline styles */

/* Removed shimmer animation */

/* Experience Grid - Using Vuetify grid system */

/* Experience Card Styles */
.experience-card {
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  min-height: 250px;
  margin-bottom: 1rem;
  align-self: flex-start;
  width: 100%;
}

/* Removed glass card overlay effects */

.card-hover {
  transform: translateY(-5px);
  z-index: 10;
  position: relative;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Card Header */
.card-header {
  padding: 2rem 2rem 1rem;
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  position: relative;
}

.company-logo {
  position: relative;
  flex-shrink: 0;
}

.logo-avatar {
  border: 3px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.logo-glow {
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  background: linear-gradient(45deg, 
    rgba(25, 118, 210, 0.3), 
    rgba(38, 166, 154, 0.3), 
    rgba(156, 39, 176, 0.3));
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.glass-card:hover .logo-glow {
  opacity: 1;
}

.glass-card:hover .logo-avatar {
  transform: scale(1.1);
  border-color: rgba(255, 255, 255, 0.4);
}

.header-content {
  flex: 1;
  min-width: 0;
}

.job-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.3;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.company-info {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
}

.period-chip {
  align-self: flex-start;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-weight: 500;
}

/* Card Content */
.card-content {
  padding: 0 2rem 1rem;
  flex: 1;
}

.job-description {
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  font-weight: 400;
}

/* Section Styles */
.section-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
}

.highlights-section,
.skills-preview {
  margin-bottom: 1.5rem;
}

/* Lists */
.highlights-list,
.responsibilities-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.highlight-item,
.responsibility-item {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  line-height: 1.5;
  transition: all 0.3s ease;
  font-weight: 400;
}

.highlight-item::before,
.responsibility-item::before {
  content: '✦';
  position: absolute;
  left: 0;
  color: rgb(var(--v-theme-primary));
  font-weight: bold;
  font-size: 0.8rem;
}

.highlight-item:hover,
.responsibility-item:hover {
  transform: translateX(4px);
  color: rgb(var(--v-theme-on-surface));
}

/* Skills */
.skills-container,
.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-chip {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.skill-chip:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.more-chip {
  opacity: 0.7;
  font-style: italic;
}

/* Expanded Content */
.expanded-content {
  position: relative;
  z-index: 5;
  background: rgba(var(--v-theme-surface-variant), 0.05);
  border-top: 1px solid rgba(var(--v-theme-outline), 0.12);
}

.content-divider {
  border-color: rgba(255, 255, 255, 0.1);
}

.expanded-text {
  padding: 1.5rem 2rem;
}

.full-responsibilities,
.all-skills {
  margin-bottom: 1.5rem;
}

/* Card Actions */
.card-actions {
  padding: 1rem 2rem 2rem;
  justify-content: center;
}

.expand-btn {
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  text-transform: none;
  font-weight: 500;
}

.expand-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Decorative Elements */
.card-decoration {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  pointer-events: none;
  overflow: hidden;
}

.decoration-circle {
  position: absolute;
  top: -20px;
  right: -20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(45deg, 
    rgba(25, 118, 210, 0.1), 
    rgba(38, 166, 154, 0.1));
  opacity: 0.5;
}

.decoration-line {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 2px;
  height: 40px;
  background: linear-gradient(to bottom, 
    rgba(25, 118, 210, 0.3), 
    transparent);
}

/* Animations */
.animate__animated {
  animation-duration: 0.8s;
}

.animate__fadeInLeft,
.animate__fadeInRight {
  animation-duration: 0.6s;
}

/* Removed custom light mode colors - using Vuetify theming */

/* Removed custom dark mode card styles - using Vuetify theming */

/* Removed custom dark mode styles for section title - using Vuetify classes */

/* Removed custom dark mode colors - using Vuetify theming */

/* Dark mode adjustments for better contrast */
:deep(.v-theme--dark) .experience-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

:deep(.v-theme--dark) .experience-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
}

:deep(.v-theme--dark) .expanded-content {
  background: rgba(255, 255, 255, 0.03);
  border-top-color: rgba(255, 255, 255, 0.08);
}

/* Responsive Design - Using Vuetify breakpoints */

@media (max-width: 960px) {
  .card-header {
    padding: 1.5rem 1.5rem 1rem;
    gap: 1rem;
  }
  
  .card-content {
    padding: 0 1.5rem 1rem;
  }
  
  .expanded-text {
    padding: 1rem 1.5rem;
  }
  
  .card-actions {
    padding: 1rem 1.5rem 1.5rem;
  }
}

@media (max-width: 600px) {
  .card-header {
    padding: 1.5rem 1.5rem 1rem;
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
    gap: 1rem;
  }
  
  .header-content {
    width: 100%;
  }
  
  .card-content {
    padding: 0 1.5rem 1rem;
  }
  
  .expanded-text {
    padding: 1rem 1.5rem;
  }
  
  .card-actions {
    padding: 1rem 1.5rem 1.5rem;
  }
  
  .job-title {
    font-size: 1.2rem;
  }
  
  .skills-container,
  .skills-grid {
    gap: 0.375rem;
  }
  
  .logo-avatar {
    width: 60px !important;
    height: 60px !important;
  }
}

@media (max-width: 400px) {
  .card-header {
    padding: 1rem 1rem 0.5rem;
  }
  
  .card-content {
    padding: 0 1rem 0.5rem;
  }
  
  .expanded-text {
    padding: 0.5rem 1rem;
  }
  
  .card-actions {
    padding: 0.5rem 1rem 1rem;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .glass-card,
  .logo-avatar,
  .skill-chip,
  .expand-btn,
  .highlight-item,
  .responsibility-item {
    transition: none;
  }
  
  .animate__animated {
    animation: none;
  }
  
  /* Removed section-underline animation styles */
}
</style>
