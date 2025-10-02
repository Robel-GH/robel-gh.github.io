<template>
  <v-container fluid class="projects-container py-8">
    <div class="section-header text-center mb-8">
      <div class="header-decoration">
        <v-icon icon="mdi-folder-outline" size="x-large" class="header-icon"></v-icon>
      </div>
      <h1 class="section-title text-h5 ml-2 font-weight-bold mb-2 animate__animated animate__fadeIn">
        Projects
      </h1>
      
      <div class="title-underline"></div>
    </div>
    
    <!-- Marquee Container -->
    <div class="marquee-container" @mouseenter="pauseMarquee" @mouseleave="resumeMarquee">
      <div class="marquee-track" :class="{ 'paused': isPaused }">
        <!-- First set of projects -->
        <div 
          v-for="(project, index) in Projects" 
          :key="`first-${project.title}`"
          class="marquee-item"
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-card 
              v-bind="props"
              :elevation="isHovering ? 20 : 8"
              :class="{ 'on-hover': isHovering }"
              class="project-card"
              rounded="xl"
              variant="text"
            >
              <v-card-title class="text-h5 pa-6 d-flex align-center" variant="text">
                <v-icon 
                  :color="project.iconColor || 'primary'"
                  size="32"
                  class="me-3"
                >
                  {{ project.icon || 'mdi-rocket-launch' }}
                </v-icon>
                <strong>{{ project.title }}</strong>
              </v-card-title>

              <v-card-text class="pa-6">
                <v-row>
                  <!-- Video Section -->
                  <v-col cols="12" md="5" class="video-container">
                    <v-card
                      class="video-card"
                      elevation="4"
                      :class="{ 'video-card-hover': isHovering }"
                    >
                      <iframe
                        class="video-frame"
                        width="100%"
                        height="315"
                        :src="project.videoUrl"
                        title="Project Demo"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </v-card>
                  </v-col>

                  <!-- Description Section -->
                  <v-col cols="12" md="7">
                    <v-card 
                      variant="text" 
                      class="pa-4 description-card h-100"
                      :class="{ 'description-card-hover': isHovering }"
                    >
                      <v-card-title class="text-h5 mb-3">
                        Project Overview
                      </v-card-title>
                      <v-divider class="mb-4"></v-divider>
                      
                      <v-card-text class="text-body-1">
                        {{ project.description }}
                      </v-card-text>

                      <!-- Technologies Used -->
                      <div class="mt-4">
                        <div class="text-subtitle-1 mb-2">Technologies Used:</div>
                        <v-chip-group>
                          <v-chip
                            v-for="tech in project.technologies"
                            :key="tech"
                            color="primary"
                            variant="outlined"
                            size="small"
                            class="ma-1"
                          >
                            {{ tech }}
                          </v-chip>
                        </v-chip-group>
                      </div>

                      <v-card-actions class="mt-4">
                        <v-btn
                          rounded
                          color="primary"
                          variant="tonal"
                          class="text-none px-6"
                        >
                          <v-icon start>mdi-account-tie</v-icon>
                          {{ project.role }}
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                          :href="project.githubLink"
                          target="_blank"
                          icon
                          color="grey-darken-3"
                          variant="text"
                          class="github-btn"
                        >
                          <v-icon size="32">mdi-github</v-icon>
                        </v-btn>
                        <v-btn
                          v-if="project.liveDemo"
                          :href="project.liveDemo"
                          target="_blank"
                          icon
                          color="primary"
                          variant="text"
                          class="demo-btn"
                        >
                          <v-icon size="32">mdi-web</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-hover>
        </div>

        <!-- Duplicate set for seamless loop -->
        <div 
          v-for="(project, index) in Projects" 
          :key="`second-${project.title}`"
          class="marquee-item"
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-card 
              v-bind="props"
              :elevation="isHovering ? 20 : 8"
              :class="{ 'on-hover': isHovering }"
              class="project-card"
              rounded="xl"
              variant="text"
            >
              <v-card-title class="text-h5 pa-6 d-flex align-center" variant="text">
                <v-icon 
                  :color="project.iconColor || 'primary'"
                  size="32"
                  class="me-3"
                >
                  {{ project.icon || 'mdi-rocket-launch' }}
                </v-icon>
                <strong>{{ project.title }}</strong>
              </v-card-title>

              <v-card-text class="pa-6">
                <v-row>
                  <!-- Video Section -->
                  <v-col cols="12" md="5" class="video-container">
                    <v-card
                      class="video-card"
                      elevation="4"
                      :class="{ 'video-card-hover': isHovering }"
                    >
                      <iframe
                        class="video-frame"
                        width="100%"
                        height="315"
                        :src="project.videoUrl"
                        title="Project Demo"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </v-card>
                  </v-col>

                  <!-- Description Section -->
                  <v-col cols="12" md="7">
                    <v-card 
                      variant="text" 
                      class="pa-4 description-card h-100"
                      :class="{ 'description-card-hover': isHovering }"
                    >
                      <v-card-title class="text-h5 mb-3">
                        Project Overview
                      </v-card-title>
                      <v-divider class="mb-4"></v-divider>
                      
                      <v-card-text class="text-body-1">
                        {{ project.description }}
                      </v-card-text>

                      <!-- Technologies Used -->
                      <div class="mt-4">
                        <div class="text-subtitle-1 mb-2">Technologies Used:</div>
                        <v-chip-group>
                          <v-chip
                            v-for="tech in project.technologies"
                            :key="tech"
                            color="primary"
                            variant="outlined"
                            size="small"
                            class="ma-1"
                          >
                            {{ tech }}
                          </v-chip>
                        </v-chip-group>
                      </div>

                      <v-card-actions class="mt-4">
                        <v-btn
                          rounded
                          color="primary"
                          variant="tonal"
                          class="text-none px-6"
                        >
                          <v-icon start>mdi-account-tie</v-icon>
                          {{ project.role }}
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                          :href="project.githubLink"
                          target="_blank"
                          icon
                          color="grey-darken-3"
                          variant="text"
                          class="github-btn"
                        >
                          <v-icon size="32">mdi-github</v-icon>
                        </v-btn>
                        <v-btn
                          v-if="project.liveDemo"
                          :href="project.liveDemo"
                          target="_blank"
                          icon
                          color="primary"
                          variant="text"
                          class="demo-btn"
                        >
                          <v-icon size="32">mdi-web</v-icon>
                        </v-btn>
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
import { ref } from "vue";
import 'animate.css';

const isPaused = ref(false);

const pauseMarquee = () => {
  isPaused.value = true;
};

const resumeMarquee = () => {
  isPaused.value = false;
};

const Projects = ref([
  {
    title: "Unical Phonebook and Messaging App",
    description: "A centralized platform for managing university contacts, featuring real-time messaging to enhance communication among faculty, staff, and students. It includes role-based access, searchable profiles, and privacy controls within a user-friendly, mobile-responsive interface.",
    videoUrl: "https://www.youtube.com/embed/JBIdZ6LuLWM",
    githubLink: "https://github.com/your-repo-link",
    role: "Frontend Developer",
    icon: "mdi-phone-message",
    iconColor: "indigo",
    technologies: ["Vue.js", "Vuetify", "Pinia", "Stomp", "Spring Boot"],
    liveDemo: "https://demo-link.com"
  },
  {
    title: "Sales Management System",
    description: "A robust application to optimize sales tracking, streamline client management, and enhance inventory control, resulting in improved operational efficiency.",
    videoUrl: "https://youtube.com/embed/ccpMfbHWkHI",
    githubLink: "https://github.com/your-repo-link",
    role: "Full Stack Developer",
    icon: "mdi-cart",
    iconColor: "success",
    technologies: ["Node.js", "Express", "MongoDB", "Vue 2", "Vuetify","Vuex"],
    liveDemo: "https://demo-link.com"
  }
]);
</script>

<style scoped>


/* Marquee Container */
.marquee-container {
  overflow: hidden;
  width: 100%;
  position: relative;
  padding: 1rem 0;
}

.marquee-track {
  display: flex;
  animation: scroll 30s linear infinite;
  width: calc(200% + 2rem);
}

.marquee-track.paused {
  animation-play-state: paused;
}

.marquee-item {
  flex: 0 0 auto;
  width: 900px;
  margin-right: 2rem;
}

/* Marquee Animation */
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.project-card {
  transition: all 0.3s ease;
  overflow: hidden;
  height: 100%;
  /* background: rgba(255, 255, 255, 0.9); */
}

.project-card.on-hover {
  transform: translateY(-5px);
}

.video-container {
  position: relative;
}

.video-card {
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
}

.video-card-hover {
  transform: scale(1.02);
  box-shadow: 0 8px 30px rgba(var(--v-theme-primary), 0.15);
}

.video-frame {
  display: block;
  aspect-ratio: 16/9;
}

.description-card {
  transition: all 0.3s ease;
  border-radius: 12px;
  /* background: rgba(255, 255, 255, 0.5); */
}



/* Tech chips styling handled by v-chip-group */

.github-btn, .demo-btn {
  transition: transform 0.3s ease;
}

.github-btn:hover, .demo-btn:hover {
  transform: translateY(-3px);
}

/* Animate.css customization */
.animate__animated {
  animation-duration: 1s;
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .marquee-item {
    width: 750px;
  }
}

@media (max-width: 960px) {
  .marquee-item {
    width: 600px;
  }
  
  .marquee-track {
    animation-duration: 25s;
  }
}

@media (max-width: 600px) {
  .marquee-item {
    width: 350px;
  }
  
  .marquee-track {
    animation-duration: 20s;
  }
  
  .video-frame {
    height: 180px;
  }
  
  .description-card {
    padding: 0.75rem !important;
  }
  
  .description-card .v-card-title {
    font-size: 1.1rem !important;
  }
  
  .description-card .v-card-text {
    font-size: 0.9rem !important;
  }
  
  .v-chip {
    font-size: 0.75rem !important;
    height: 24px !important;
  }
  
  .github-btn, .demo-btn {
    font-size: 0.85rem !important;
    padding: 0.5rem 1rem !important;
  }
}

@media (max-width: 400px) {
  .marquee-item {
    width: 300px;
  }
  
  .video-frame {
    height: 160px;
  }
  
  .description-card {
    padding: 0.5rem !important;
  }
  
  .description-card .v-card-title {
    font-size: 1rem !important;
  }
  
  .description-card .v-card-text {
    font-size: 0.85rem !important;
  }
  
  .v-chip {
    font-size: 0.7rem !important;
    height: 22px !important;
    margin: 0.125rem !important;
  }
  
  .github-btn, .demo-btn {
    font-size: 0.8rem !important;
    padding: 0.4rem 0.8rem !important;
    width: 100%;
    margin-bottom: 0.5rem;
  }
}

/* Section Header Styles - Consistent with Awards */
.section-header {
  position: relative;
  margin-bottom: 4rem;
}

.header-decoration {
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
}

.header-icon {
  color: rgb(var(--v-theme-primary));
  filter: drop-shadow(0 0 20px rgba(var(--v-theme-primary), 0.5));
  animation: float 3s ease-in-out infinite;
}

.section-title {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 50%, rgb(var(--v-theme-info)) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  display: inline-block;
}

.section-subtitle {
  color: rgba(var(--v-theme-on-surface), 0.7);
  font-style: italic;
}

.title-underline {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-secondary)));
  margin: 1rem auto;
  border-radius: 2px;
  animation: expandWidth 1s ease-out 0.5s both;
}

@keyframes expandWidth {
  from { width: 0; }
  to { width: 80px; }
}

/* Custom animations */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.v-btn {
  text-transform: none;
  letter-spacing: 0.5px;
}

.v-chip {
  transition: all 0.3s ease;
}

.v-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(var(--v-theme-primary), 0.2);
}

/* Smooth scrolling for better performance */
.marquee-track {
  will-change: transform;
}

/* Accessibility - Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}
</style>