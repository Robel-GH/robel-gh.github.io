<template>
  <v-container fluid class="work-experience py-8">
    <v-row justify="center" class="mt-16" no-gutters>
      <v-col cols="12" md="11">
        <h2 class="text-h4 text-center mb-8 font-weight-bold primary--text animate__animated animate__fadeIn">
          Work Experience
          <div class="title-underline"></div>
        </h2>

        <div 
          v-for="(job, index) in workExperience" 
          :key="job.id"
          class="experience-container"
        >
          <v-card
            class="mb-8 experience-card animate__animated"
            :class="index % 2 === 0 ? 'animate__slideInLeft' : 'animate__slideInRight'"
            :style="{ animationDelay: `${index * 0.2}s` }"
            elevation="4"
            rounded="xl"
            variant="text"
          >
            <v-hover v-slot="{ isHovering, props }">
              <div>
                <!-- Desktop Layout -->
                <div class="d-none d-md-block">
                  <v-row no-gutters>
                    <v-col cols="5">
                      <v-img
                        :src="job.image"
                        :alt="job.title"
                        height="100%"
                        cover
                        class="image-transform h-100"
                        :class="{ 'scale-up': isHovering }"
                        style="border-radius: 12px 0 0 12px;"
                      >
                        <div class="image-overlay" :class="{ 'show-overlay': isHovering }">
                          <div class="d-flex align-center">
                            <v-icon 
                              :icon="job.icon || 'mdi-briefcase'"
                              color="white"
                              size="32"
                              class="me-2"
                            ></v-icon>
                            <h3 class="text-h5 text-white mb-0">{{ job.title }}</h3>
                          </div>
                        </div>
                      </v-img>
                    </v-col>
                    <v-col cols="7">
                      <v-card-item class="h-100">
                        <div class="d-flex flex-column h-100">
                          <div>
                            <v-card-title class="text-h5 mb-2">{{ job.title }}</v-card-title>
                            <v-card-subtitle class="py-2">
                              <div class="d-flex align-center company-info">
                                <v-icon icon="mdi-office-building" class="me-2"></v-icon>
                                {{ job.company }}
                              </div>
                              <div class="d-flex align-center period-info mt-1">
                                <v-icon icon="mdi-calendar" class="me-2"></v-icon>
                                {{ job.period }}
                              </div>
                            </v-card-subtitle>
                          </div>

                          <v-card-text class="flex-grow-1">
                            <p class="text-body-1 mb-4">{{ job.description }}</p>
                            
                            <div class="mb-4">
                              <div class="font-weight-medium mb-3 primary--text">Key Responsibilities:</div>
                              <ul class="responsibilities-list">
                                <li 
                                  v-for="(resp, rIndex) in job.responsibilities" 
                                  :key="rIndex"
                                  class="responsibility-item animate__animated animate__fadeInUp"
                                  :style="{ animationDelay: `${rIndex * 0.2}s` }"
                                >
                                  {{ resp }}
                                </li>
                              </ul>
                            </div>

                            <div class="skills-section mt-auto">
                              <div class="font-weight-medium mb-3 primary--text">Skills:</div>
                              <v-chip-group>
                                <v-chip
                                  v-for="(skill, sIndex) in job.skills"
                                  :key="skill"
                                  color="primary"
                                  variant="outlined"
                                  size="small"
                                  class="skill-chip animate__animated animate__fadeIn"
                                  :style="{ animationDelay: `${sIndex * 0.1}s` }"
                                >
                                  {{ skill }}
                                </v-chip>
                              </v-chip-group>
                            </div>
                          </v-card-text>
                        </div>
                      </v-card-item>
                    </v-col>
                  </v-row>
                </div>

                <!-- Mobile Layout -->
                <div class="d-md-none">
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
                        class="mobile-image"
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
                        <div class="mobile-overlay">
                          <v-card-title class="text-white">
                            <v-icon 
                              :icon="job.icon || 'mdi-briefcase'"
                              color="white"
                              class="me-2"
                            ></v-icon>
                            {{ job.title }}
                          </v-card-title>
                        </div>
                      </v-img>

                      <v-card-item>
                        <v-card-subtitle class="py-2">
                          <div class="d-flex align-center">
                            <v-icon icon="mdi-office-building" class="me-2"></v-icon>
                            {{ job.company }}
                          </div>
                          <div class="d-flex align-center mt-1">
                            <v-icon icon="mdi-calendar" class="me-2"></v-icon>
                            {{ job.period }}
                          </div>
                        </v-card-subtitle>

                        <v-card-text>
                          <p class="text-body-2 mb-4">{{ job.description }}</p>
                          
                          <v-expand-transition>
                            <div v-if="isHovering">
                              <div class="font-weight-medium mb-2">Key Responsibilities:</div>
                              <ul class="responsibilities-list">
                                <li 
                                  v-for="(resp, rIndex) in job.responsibilities" 
                                  :key="rIndex"
                                  class="responsibility-item-mobile"
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
                                    variant="outlined"
                                    size="x-small"
                                    class="skill-chip-mobile"
                                  >
                                    {{ skill }}
                                  </v-chip>
                                </v-chip-group>
                              </div>
                            </div>
                          </v-expand-transition>

                          <v-btn
                            block
                            variant="text"
                            @click="isHovering = !isHovering"
                            class="mt-2"
                            rounded
                          >
                            {{ isHovering ? 'Show Less' : 'Show More' }}
                            <v-icon
                              :icon="isHovering ? 'mdi-chevron-up' : 'mdi-chevron-down'"
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
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'WorkExperience',
  
  setup() {
    const workExperience = ref([
      {
        id: 1,
        title: 'Fullstack Developer',
        company: 'Tekeze Technologies PLC',
        period: 'July, 2020 - September, 2024',
        image: 'https://cdn.vuetifyjs.com/docs/images/components/v-empty-state/teamwork.png', // You'll need to add actual images
        description: 'Working as a full-stack developer focusing on web applications and enterprise solutions.',
        responsibilities: [
          'Developing and maintaining web applications using Vue.js and Node.js',
          'Collaborating with cross-functional teams to define and implement new features',
          'Optimizing application performance and scalability',
          'Writing clean, maintainable, and efficient code'
        ],
        skills: ['Vue.js', 'Node.js', 'JavaScript', 'SQL', 'Git', 'REST APIs', 'Agile']
      },
      {
        id: 2,
        title: 'Assistant Lecturer',
        company: 'Mekelle Institute of Technology - Mekelle University',
        period: 'June, 2021 - Present',
        image: 'https://vuetifyjs.b-cdn.net/docs/images/components/v-empty-state/astro-dog.svg',
        description: 'Taught computer science courses and supervised student projects.',
        responsibilities: [
          'Teaching programming fundamentals to undergraduate students',
          'Developing course materials and assignments',
          'Conducting laboratory sessions',
          'Mentoring student projects'
        ],
        skills: ['Teaching', 'Python', 'Java', 'Data Structures', 'Algorithms', 'Project Management']
      },
      {
        id: 3,
        title: 'Junior ICT Officer',
        company: 'Guna Trading House PLC',
        period: 'December 2019 - July 2020',
        image: 'https://cdn.vuetifyjs.com/docs/images/components/v-empty-state/connection.svg',
        description: 'Provided technical support and maintained IT infrastructure.',
        responsibilities: [
          'Managing network infrastructure and security',
          'Providing technical support to staff',
          'Maintaining hardware and software systems',
          'Implementing IT policies and procedures'
        ],
        skills: ['Network Administration', 'System Maintenance', 'IT Support', 'Troubleshooting']
      },
      {
        id: 4,
        title: 'College Lecturer',
        company: 'Oxfo-Business and Technology College',
        period: 'October, 2019 - December, 2019',
        image: 'https://vuetifyjs.b-cdn.net/docs/images/components/v-empty-state/astro-dog.svg',
        description: 'Taught computer science and programming courses at college level.',
        responsibilities: [
          'Developing and delivering lectures on programming and IT subjects',
          'Creating assessment materials and grading student work',
          'Providing academic advice to students',
          'Participating in curriculum development'
        ],
        skills: ['Teaching', 'Curriculum Development', 'Assessment', 'Mentoring', 'Technical Writing']
      }
    ])

    return {
      workExperience
    }
  }
}
</script>



<style scoped>
.work-experience {
  /* background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%); */
  min-height: 100vh;
}

.title-underline {
  width: 60px;
  height: 4px;
  background: var(--v-primary-base);
  margin: 1rem auto;
  border-radius: 2px;
}

.experience-card {
  overflow: hidden;
  transition: all 0.3s ease;
  /* background: rgba(255, 255, 255, 0.9); */
  backdrop-filter: blur(10px);
}

.experience-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1) !important;
}

.image-transform {
  transition: all 0.5s ease;
}

.scale-up {
  transform: scale(1.05);
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
  color: var(--v-primary-base);
}

.responsibility-item:hover {
  transform: translateX(5px);
}

.skill-chip {
  transition: all 0.3s ease !important;
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
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  padding: 1rem;
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
  color: var(--v-primary-base);
}

.skill-chip-mobile {
  margin: 0.25rem !important;
}

/* Animations */
.animate__animated {
  animation-duration: 0.8s;
}

/* Dark mode support */
:deep(.v-theme--dark) .experience-card {
  background: rgba(30, 30, 30, 0.9);
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