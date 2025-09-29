<template>
  <v-container  class="work-experience py-8">
   <v-row justify="center">
    <v-col cols="12" md="11" >
       <v-row justify="center" class="mt-16" >
      <v-col cols="12" md="11" >
        <h2 class="text-h4 text-center mb-8 font-weight-bold primary--text animate__animated animate__fadeIn">
          Professional Experience
          <div class="title-underline"></div>
        </h2>
      </v-col>
    </v-row>

    <!-- Timeline for md and up -->
    <v-row justify="center" class="d-none d-md-flex mb-6">
      <v-col cols="12" md="11">
        <v-timeline side="start" align="alternate" truncate-line="both">
          <v-timeline-item
            v-for="(job, index) in workExperience"
            :key="`tl-${job.id}`"
            :dot-color="'primary'"
            :icon="job.icon || 'mdi-briefcase'"
            fill-dot
          >
            <template #opposite>
              <div class="text-body-2 text-medium-emphasis">{{ job.period }}</div>
            </template>

            <v-sheet rounded="xl" elevation="2" class="pa-4 experience-sheet animate__animated"
              :class="index % 2 === 0 ? 'animate__fadeInLeft' : 'animate__fadeInRight'">
              <div class="d-flex align-center justify-space-between mb-2">
                <div class="d-flex align-center">
                  <v-avatar size="36" class="me-3">
                    <v-img :src="job.logo || job.image" :alt="job.company" cover></v-img>
                  </v-avatar>
                  <div>
                    <div class="text-subtitle-1 font-weight-medium">{{ job.title }}</div>
                    <div class="text-body-2 text-medium-emphasis d-flex align-center">
                      <v-icon icon="mdi-office-building" size="small" class="me-1"></v-icon>
                      {{ job.company }}
                    </div>
                  </div>
                </div>
                <v-chip size="small" variant="tonal" color="primary">
                  <v-icon icon="mdi-calendar" size="small" class="me-1"></v-icon>
                  {{ job.period }}
                </v-chip>
              </div>

              <div class="text-body-2 opacity-80 mb-3">{{ job.description }}</div>

              <div class="font-weight-medium mb-1">Key Highlights</div>
              <ul class="responsibilities-list mb-3">
                <li
                  v-for="(resp, rIndex) in getResponsibilityPreview(job)"
                  :key="`tlp-${job.id}-${rIndex}`"
                  class="responsibility-item"
                >
                  {{ resp }}
                </li>
              </ul>

              <div class="d-flex align-center flex-wrap">
                <v-chip
                  v-for="skill in getSkillPreview(job)"
                  :key="`tls-${job.id}-${skill}`"
                  color="primary"
                  variant="tonal"
                  size="small"
                  class="skill-chip"
                >
                  {{ skill }}
                </v-chip>
                <v-chip
                  v-if="job.skills && job.skills.length > 3"
                  size="small"
                  variant="text"
                  class="ms-1 opacity-70"
                >
                  +{{ job.skills.length - 3 }} more
                </v-chip>
              </div>

              <v-expand-transition>
                <div v-if="expandedId === job.id" :id="`details-${job.id}`" class="mt-3">
                  <v-divider class="my-3"></v-divider>
                  <div class="font-weight-medium mb-2">Key Responsibilities:</div>
                  <ul class="responsibilities-list">
                    <li 
                      v-for="(resp, rIndex) in job.responsibilities" 
                      :key="`tlf-${job.id}-${rIndex}`"
                      class="responsibility-item"
                    >
                      {{ resp }}
                    </li>
                  </ul>

                  <div class="skills-section mt-4">
                    <div class="font-weight-medium mb-2">Skills:</div>
                    <v-chip-group>
                      <v-chip
                        v-for="skill in job.skills"
                        :key="`tlfsk-${job.id}-${skill}`"
                        color="primary"
                        variant="tonal"
                        size="small"
                        class="skill-chip"
                      >
                        {{ skill }}
                      </v-chip>
                    </v-chip-group>
                  </div>
                </div>
              </v-expand-transition>

              <v-btn
                variant="tonal"
                @click="expandedId = expandedId === job.id ? null : job.id"
                class="mt-2"
                rounded
                :aria-expanded="expandedId === job.id ? 'true' : 'false'"
                :aria-controls="`details-${job.id}`"
              >
                {{ expandedId === job.id ? 'Show Less' : 'Show More' }}
                <v-icon
                  :icon="expandedId === job.id ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                  class="ms-2"
                ></v-icon>
              </v-btn>
            </v-sheet>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>

    <!-- Cards kept for mobile only -->
    <v-row justify="center" class="d-md-none" >
      <v-col
        v-for="(job, index) in workExperience"
        :key="job.id"
        cols="12"
        sm="6"
        md="6"
        lg="4"
        xl="3"
        
      >
        <v-card
          class="experience-card glass gradient-border animate__animated"
          :class="index % 2 === 0 ? 'animate__slideInLeft' : 'animate__slideInRight'"
          :style="{ animationDelay: `${index * 0.2}s` }"
          elevation="16"
          rounded="xl"
          variant="elevated"
          min-height="300"
         
        >
          <v-hover v-slot="{ isHovering, props }">
            <div>
              <div>
                <v-expand-transition>
                  <v-card
                    class="mobile-card"
                    elevation="0"
                  >
                    <v-img
                      :src="job.image"
                      :alt="job.title"
                      height="200"
                      cover
                      class="mobile-image image-transform"
                    >
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="primary"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                      <div class="period-chip" aria-hidden="true">
                        <v-chip size="small" variant="tonal" color="primary" class="elevate">
                          <v-icon icon="mdi-calendar" size="small" class="me-1"></v-icon>
                          {{ job.period }}
                        </v-chip>
                      </div>
                      <div class="company-badge" :aria-label="`Company: ${job.company}`">
                        <v-avatar size="28" class="me-2">
                          <v-img :src="job.logo || job.image" :alt="job.company" cover></v-img>
                        </v-avatar>
                        <span class="company-name">{{ job.company }}</span>
                      </div>
                      <div class="mobile-overlay">
                        <v-card-title class="text-white">
                          <v-icon 
                            :icon="job.icon || 'mdi-briefcase'"
                            color="white"
                            class="me-2"
                          ></v-icon>
                          {{ job.title }}
                        </v-card-title>
                        <div class="text-white text-body-2 d-flex align-center opacity-80">
                          <v-icon icon="mdi-office-building" class="me-2" color="white"></v-icon>
                          {{ job.company }}
                        </div>
                      </div>
                    </v-img>

                    <v-card-item>
                      <v-card-subtitle class="py-2">
                        <p class="text-body-2 mb-0 opacity-80">{{ job.description }}</p>
                      </v-card-subtitle>

                      <v-card-text>
                        <v-divider class="my-3"></v-divider>
                        <div v-if="expandedId !== job.id" class="preview-block">
                          <div class="font-weight-medium mb-1">Key Highlights</div>
                          <ul class="responsibilities-list mb-3">
                            <li
                              v-for="(resp, rIndex) in getResponsibilityPreview(job)"
                              :key="`p-${job.id}-${rIndex}`"
                              class="responsibility-item"
                            >
                              {{ resp }}
                            </li>
                          </ul>
                          <div class="d-flex align-center flex-wrap">
                            <v-chip
                              v-for="skill in getSkillPreview(job)"
                              :key="`ps-${job.id}-${skill}`"
                              color="primary"
                              variant="tonal"
                              size="small"
                              class="skill-chip"
                            >
                              {{ skill }}
                            </v-chip>
                            <v-chip
                              v-if="job.skills && job.skills.length > 3"
                              size="small"
                              variant="text"
                              class="ms-1 opacity-70"
                            >
                              +{{ job.skills.length - 3 }} more
                            </v-chip>
                          </div>
                        </div>
                        
                        <v-expand-transition>
                          <div v-if="expandedId === job.id">
                            <div class="font-weight-medium mb-2">Key Responsibilities:</div>
                            <ul class="responsibilities-list">
                              <li 
                                v-for="(resp, rIndex) in job.responsibilities" 
                                :key="rIndex"
                                class="responsibility-item"
                              >
                                {{ resp }}
                              </li>
                            </ul>

                            <div class="skills-section mt-4">
                              <div class="font-weight-medium mb-2">Skills:</div>
                              <v-chip-group>
                                <v-chip
                                  v-for="skill in job.skills"
                                  :key="skill"
                                  color="primary"
                                  variant="tonal"
                                  size="small"
                                  class="skill-chip"
                                >
                                  {{ skill }}
                                </v-chip>
                              </v-chip-group>
                            </div>
                          </div>
                        </v-expand-transition>

                        <v-btn
                          variant="tonal"
                          @click="expandedId = expandedId === job.id ? null : job.id"
                          class="mt-2"
                          rounded
                          :aria-expanded="expandedId === job.id ? 'true' : 'false'"
                          :aria-controls="`details-${job.id}`"
                        >
                          {{ expandedId === job.id ? 'Show Less' : 'Show More' }}
                          <v-icon
                            :icon="expandedId === job.id ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                            class="ms-2"
                          ></v-icon>
                        </v-btn>
                      </v-card-text>
                    </v-card-item>
                  </v-card>
                </v-expand-transition>
              </div>
            </div>
          </v-hover>
        </v-card>
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
        title: 'Fullstack Developer',
        company: 'Tekeze Technologies PLC',
        period: 'July, 2020 - September, 2024',
        logo: '/images/guna.png',
        image: 'https://cdn.vuetifyjs.com/docs/images/components/v-empty-state/teamwork.png',
        description: 'Working as a full-stack developer focusing on web applications and enterprise solutions.',
        responsibilities: [
          'Developing and maintaining web applications using Vue.js and Node.js',
          'Collaborating with cross-functional teams to define and implement new features',
          'Optimizing application performance and scalability',
          'Writing clean, maintainable, and efficient code'
        ],
        skills: ['Vue.js', 'Node.js', 'JavaScript', 'SQL', 'Git', 'REST APIs', 'Agile'],
        isHovering: false
      },
      {
        id: 2,
        title: 'Assistant Lecturer',
        company: 'Mekelle Institute of Technology - Mekelle University',
        period: 'June, 2021 - Present',
        logo: '/images/mit.jpg',
        image: '/images/mit.jpg',
        description: 'Taught computer science courses and supervised student projects.',
        responsibilities: [
          'Teaching programming fundamentals to undergraduate students',
          'Developing course materials and assignments',
          'Conducting laboratory sessions',
          'Mentoring student projects'
        ],
        skills: ['Teaching', 'Python', 'Java', 'Data Structures', 'Algorithms', 'Project Management'],
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
          'Managing network infrastructure and security',
          'Providing technical support to staff',
          'Maintaining hardware and software systems',
          'Implementing IT policies and procedures'
        ],
        skills: ['Network Administration', 'System Maintenance', 'IT Support', 'Troubleshooting'],
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
          'Developing and delivering lectures on programming and IT subjects',
          'Creating assessment materials and grading student work',
          'Providing academic advice to students',
          'Participating in curriculum development'
        ],
        skills: ['Teaching', 'Curriculum Development', 'Assessment', 'Mentoring', 'Technical Writing'],
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

    return {
      workExperience,
      expandedId,
      getResponsibilityPreview,
      getSkillPreview
    }
  }
}
</script>

<style scoped>
.work-experience {
  min-height: 100vh;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  background:
    radial-gradient(1200px 200px at 10% 0%, rgba(25, 118, 210, 0.06), transparent 60%),
    radial-gradient(1200px 200px at 90% 0%, rgba(38, 166, 154, 0.06), transparent 60%);
}

.title-underline {
  width: 60px;
  height: 4px;
  background: rgb(var(--v-theme-primary));
  margin: 1rem auto;
  border-radius: 2px;
}

.experience-card {
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid rgba(0,0,0,0.05);
  background: linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0.5));
}

.gradient-border {
  position: relative;
}

.gradient-border::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 1px;
  background: linear-gradient(135deg, rgba(25,118,210,0.35), rgba(38,166,154,0.35));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  pointer-events: none;
}

.experience-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1) !important;
}

.h-100 {
  height: 100%;
}

.image-transform {
  transition: all 0.5s ease;
}

.scale-up {
  transform: scale(1.05);
}

.experience-card:hover .image-transform {
  transform: scale(1.06);
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  padding: 2rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
}

.show-overlay {
  opacity: 1;
  transform: translateY(0);
}

.responsibilities-list {
  list-style-type: none;
  padding-left: 0;
}

.responsibility-item {
  position: relative;
  padding-left: 1.5em;
  margin-bottom: 0.75em;
  line-height: 1.6;
  transition: all 0.3s ease;
}

.responsibility-item::before {
  content: "→";
  position: absolute;
  left: 0;
  color: rgb(var(--v-theme-primary));
}

.responsibility-item:hover {
  transform: translateX(5px);
}

.skill-chip {
  transition: all 0.3s ease !important;
  margin: 0.25rem !important;
}

.skill-chip:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1) !important;
}

/* Mobile Styles */
.mobile-card {
  border-radius: 12px;
  overflow: hidden;
}

.mobile-image {
  position: relative;
}

.mobile-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.75), transparent);
  padding: 1rem 1.25rem 1.25rem;
  backdrop-filter: blur(2px);
}

.responsibility-item-mobile {
  position: relative;
  padding-left: 1.5em;
  margin-bottom: 0.5em;
  font-size: 0.9rem;
  line-height: 1.4;
}

.responsibility-item-mobile::before {
  content: "→";
  position: absolute;
  left: 0;
  color: rgb(var(--v-theme-primary));
}

.skill-chip-mobile {
  margin: 0.25rem !important;
}

.period-chip {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
}

.company-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  background: rgba(0,0,0,0.45);
  color: #fff;
  border-radius: 999px;
  backdrop-filter: blur(2px);
}

.company-name {
  font-size: 0.8rem;
  white-space: nowrap;
}

/* Animations */
.animate__animated {
  animation-duration: 0.8s;
}

/* Dark mode support */
:deep(.v-theme--dark) .experience-card {
  background: rgba(30, 30, 30, 0.9);
  border-color: rgba(255,255,255,0.08);
}

@media (max-width: 600px) {
  .experience-card {
    margin: 1rem;
  }
  
  .title-underline {
    width: 40px;
    margin: 0.5rem auto;
  }
}
</style>