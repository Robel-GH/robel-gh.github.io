<template>
  <!-- <v-container class="work-experience py-8"> -->
    <v-row justify="center" class="mt-16" no-gutters fluid>
      <v-col cols="12" md="10">
        <h2 class="text-h4 text-center mb-8 font-weight-bold primary--text">
          Work Experience
        </h2>

        <div v-for="(job, index) in workExperience" :key="job.id">
          <v-row 
           :class="['experience-row mb-8', index % 2 === 0 ? '' : 'flex-row-reverse']"
            align="center"
          >
           <!-- : -->
            <!-- Image Side -->
            
             
            <v-col>
                  <v-hover v-slot="{ isHovering, props }">
                <v-card
                  v-bind="props"
                  :elevation="isHovering ? 12 : 2"
                  :class="{ 'on-hover': isHovering }"
                  class="mx-auto transition-swing"
                  rounded="xl"
                  variant="text"
                  color="primary"
                >
                  <v-img
                    :src="job.image"
                    :alt="job.title"
                    height="400"
                    cover
                    class="align-end"
                  >
                    <!-- <v-card-title 
                      class="text-white bg-black bg-opacity-50"
                    >
                      {{ job.title }}
                    </v-card-title> -->
                  </v-img>
                </v-card>
              </v-hover>
            </v-col>

            <!-- Description Side -->
            <v-col cols="12" md="6">
              <v-card
                class="description-card h-100"
                elevation="0"
                rounded="xl"
                variant="text"
              >
                <v-card-item>
                  <v-card-title class="text-h5 mb-2">{{ job.title }}</v-card-title>
                  <v-card-subtitle>
                    <v-icon icon="mdi-office-building" class="me-2"></v-icon>
                    {{ job.company }}
                    <br>
                    <v-icon icon="mdi-calendar" class="me-2"></v-icon>
                    {{ job.period }}
                  </v-card-subtitle>

                  <v-card-text>
                    <p class="text-body-1 mb-4">{{ job.description }}</p>
                    
                    <div class="mb-3">
                      <div class="font-weight-medium mb-2">Key Responsibilities:</div>
                      <ul class="responsibilities-list">
                        <li v-for="(resp, rIndex) in job.responsibilities" 
                            :key="rIndex">{{ resp }}</li>
                      </ul>
                    </div>

                    <div>
                      <div class="font-weight-medium mb-2">Skills Used:</div>
                      <v-chip-group>
                        <v-chip
                          v-for="skill in job.skills"
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
                   
                  </v-card-text>
                </v-card-item>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  <!-- </v-container> -->
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
  background-color: #f5f5f5;
}

.experience-row {
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
}

.description-card {
  height: 100%;
  transition: transform 0.3s ease;
}

.description-card:hover {
  transform: translateY(-5px);
}

.responsibilities-list {
  list-style-type: none;
  padding-left: 0;
}

.responsibilities-list li {
  position: relative;
  padding-left: 1.5em;
  margin-bottom: 0.75em;
  line-height: 1.4;
}

.responsibilities-list li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--v-primary-base);
}

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

.experience-row:nth-child(1) { animation-delay: 0.2s; }
.experience-row:nth-child(2) { animation-delay: 0.4s; }
.experience-row:nth-child(3) { animation-delay: 0.6s; }
.experience-row:nth-child(4) { animation-delay: 0.8s; }

.on-hover {
  transition: all 0.3s ease;
}

@media (max-width: 960px) {
  .experience-row {
    margin-bottom: 2rem;
  }
  
  .description-card {
    margin-top: 1rem;
  }
}
</style>