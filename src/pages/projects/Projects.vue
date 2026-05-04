<template>
  <v-container fluid class="projects-container py-8">
    <!-- Section Header — h1 corrected to h2 for consistent heading hierarchy -->
    <div class="section-header text-center mb-8">
      <div class="header-decoration">
        <v-icon icon="mdi-folder-outline" size="x-large" class="header-icon"></v-icon>
      </div>
      <h2 class="section-title text-h5 ml-2 font-weight-bold mb-2 animate__animated animate__fadeIn">
        Projects
      </h2>
      <div class="title-underline"></div>
    </div>

    <!-- Marquee Container -->
    <div class="marquee-container" @mouseenter="pauseMarquee" @mouseleave="resumeMarquee">
      <div class="marquee-track" :class="{ 'paused': isPaused }" ref="marqueeTrack">
        <!-- First set -->
        <div
          v-for="(project) in Projects"
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
              <v-card-title class="text-h5 pa-6 d-flex align-center project-card-title" variant="text">
                <v-icon :color="project.iconColor || 'primary'" size="32" class="me-3">
                  {{ project.icon || 'mdi-rocket-launch' }}
                </v-icon>
                <strong>{{ project.title }}</strong>
              </v-card-title>

              <v-card-text class="pa-6">
                <v-row>
                  <v-col cols="12" md="5" class="video-container">
                    <v-card class="video-card" elevation="4" :class="{ 'video-card-hover': isHovering }">
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

                  <v-col cols="12" md="7">
                    <v-card
                      variant="text"
                      class="pa-4 description-card h-100"
                      :class="{ 'description-card-hover': isHovering }"
                    >
                      <v-card-title class="text-h5 mb-3 description-title">Project Overview</v-card-title>
                      <v-divider class="mb-4"></v-divider>
                      <v-card-text class="text-body-1">{{ project.description }}</v-card-text>

                      <div class="mt-4">
                        <div class="text-subtitle-1 mb-2 tech-label">Technologies Used:</div>
                        <v-chip-group>
                          <v-chip
                            v-for="tech in project.technologies"
                            :key="tech"
                            color="primary"
                            variant="outlined"
                            size="small"
                            class="ma-1"
                          >{{ tech }}</v-chip>
                        </v-chip-group>
                      </div>

                      <v-card-actions class="mt-4">
                        <v-btn rounded color="primary" variant="tonal" class="text-none px-6 role-btn">
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
          v-for="(project) in Projects"
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
              <v-card-title class="text-h5 pa-6 d-flex align-center project-card-title" variant="text">
                <v-icon :color="project.iconColor || 'primary'" size="32" class="me-3">
                  {{ project.icon || 'mdi-rocket-launch' }}
                </v-icon>
                <strong>{{ project.title }}</strong>
              </v-card-title>

              <v-card-text class="pa-6">
                <v-row>
                  <v-col cols="12" md="5" class="video-container">
                    <v-card class="video-card" elevation="4" :class="{ 'video-card-hover': isHovering }">
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

                  <v-col cols="12" md="7">
                    <v-card
                      variant="text"
                      class="pa-4 description-card h-100"
                      :class="{ 'description-card-hover': isHovering }"
                    >
                      <v-card-title class="text-h5 mb-3 description-title">Project Overview</v-card-title>
                      <v-divider class="mb-4"></v-divider>
                      <v-card-text class="text-body-1">{{ project.description }}</v-card-text>

                      <div class="mt-4">
                        <div class="text-subtitle-1 mb-2 tech-label">Technologies Used:</div>
                        <v-chip-group>
                          <v-chip
                            v-for="tech in project.technologies"
                            :key="tech"
                            color="primary"
                            variant="outlined"
                            size="small"
                            class="ma-1"
                          >{{ tech }}</v-chip>
                        </v-chip-group>
                      </div>

                      <v-card-actions class="mt-4">
                        <v-btn rounded color="primary" variant="tonal" class="text-none px-6 role-btn">
                          <v-icon start>mdi-account-tie</v-icon>
                          {{ project.role }}
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn :href="project.githubLink" target="_blank" icon color="grey-darken-3" variant="text" class="github-btn">
                          <v-icon size="32">mdi-github</v-icon>
                        </v-btn>
                        <v-btn v-if="project.liveDemo" :href="project.liveDemo" target="_blank" icon color="primary" variant="text" class="demo-btn">
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
import { ref, onMounted, nextTick, onBeforeUnmount } from "vue";
import 'animate.css';

const isPaused = ref(false);
const marqueeTrack = ref(null);

const pauseMarquee  = () => { isPaused.value = true; };
const resumeMarquee = () => { isPaused.value = false; };

let rafId = null;
const updateMarqueeVars = () => {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    rafId = null;
    const el = marqueeTrack.value;
    if (!el) return;
    const fullWidth = el.scrollWidth || 0;
    const half = Math.round(fullWidth / 2) || 0;
    el.style.setProperty('--marquee-distance', `-${half}px`);
    const speedPxPerSec = 120;
    const secs = Math.max(8, Math.round(half / speedPxPerSec));
    el.style.setProperty('--marquee-duration', `${secs}s`);
  });
};

let resizeObserver = null;

onMounted(async () => {
  await nextTick();
  updateMarqueeVars();
  const afterLoadTimeout = setTimeout(updateMarqueeVars, 600);
  window.addEventListener('resize', updateMarqueeVars);
  if (window.ResizeObserver && marqueeTrack.value) {
    resizeObserver = new ResizeObserver(() => updateMarqueeVars());
    resizeObserver.observe(marqueeTrack.value);
  }
  onBeforeUnmount(() => { clearTimeout(afterLoadTimeout); });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateMarqueeVars);
  if (resizeObserver) { resizeObserver.disconnect(); resizeObserver = null; }
  if (rafId) cancelAnimationFrame(rafId);
});

const Projects = ref([
  {
    title: "Dynamic PDDL Visualizer",
    description: "Dynamic PDDL Visualizer is an interactive web-based tool that brings AI planning to life through real-time visualization of Planning Domain Definition Language (PDDL) domains and problems. This powerful application transforms abstract AI planning concepts into intuitive, dynamic visual representations, making it easier to understand, debug, and demonstrate automated planning systems.",
    videoUrl: "https://youtube.com/embed/liRcm6X0jfA",
    githubLink: "https://github.com/Robel-GH/Dynamic-PDDL-Visualizer",
    role: "Vibe Coder",
    icon: "mdi-rotate-3d",
    iconColor: "indigo",
    technologies: ["React", "Three.js", "TypeScript","Tailwind CSS","Zustand","Replit"],
    liveDemo: "https://demo-link.com"
  },
  {
    title: "Keke AI Competition- Baba Is You Puzzle",
    description: " A lightweight framework for developing and testing AI agents on rule-based puzzle games. Inspired by Baba Is You, it provides Dynamic rule mechanics and level parsing (ASCII/JSON),  Pluggable agents (BFS, DFS, A* with IDA*) with evaluation system, Flask-based visualization for live execution and solution replay. Ideal for prototyping search algorithms, comparing heuristics, and demonstrating real-time symbolic rule changes in gameplay.",
    videoUrl: "https://youtube.com/embed/ZgNq7sK0s1o",
    githubLink: "https://github.com/Robel-GH/Keke",
    role: "Agent Developer",
    icon: "mdi-robot",
    iconColor: "indigo",
    technologies: ["Python","Flask"],
    liveDemo: "https://demo-link.com"
  },
  {
    title: "Eartquake Data warehousing & Visualization",
    description: "This comprehensive data warehousing project processes earthquake data from the USGS (United States Geological Survey) API, transforming raw seismic data into a structured data warehouse optimized for analysis and visualization. The pipeline covers the complete ETL (Extract, Transform, Load) process with additional AI-powered analysis capabilities.",
    videoUrl: "https://youtube.com/embed/0jHXsxmyLCg",
    githubLink: "https://github.com/Robel-GH/Earthquake-Data-Warehouse-Project",
    role: "Data Engineer",
    icon: "mdi-earth",
    iconColor: "indigo",
    technologies: ["Python", "Pandas", "PostgreSQL","Tableau"],
    liveDemo: "https://demo-link.com"
  },
  {
    title: "Automatic Medical Report Generator",
    description: "A multi-modal approach combining computer vision for image analysis and natural language processing for report generation,which could significantly assist radiologists in clinical workflows by reducing manual reporting time and improving efficiency.",
    videoUrl: "https://youtube.com/embed/xAKx-E_sgjw",
    githubLink: "https://github.com/Robel-GH/",
    role: "Deep Learning Engineer",
    icon: "mdi-medical-bag",
    iconColor: "indigo",
    technologies: ["PyTorch", "Pandas","Scikit-learn","Transformers","TorchVision","Python"],
    liveDemo: "https://demo-link.com"
  },
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
/* ─── Section Header — gradient here, font/size from global default.vue ──── */
.section-title {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 50%, rgb(var(--v-theme-info)) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  display: inline-block;
}

/* ─── Marquee ────────────────────────────────────────────────────────────────── */
.marquee-container {
  overflow: hidden;
  width: 100%;
  position: relative;
  padding: 1rem 0;
}
.marquee-track {
  display: flex;
  animation: marquee-scroll var(--marquee-duration, 30s) linear infinite;
  width: auto;
  will-change: transform;
}
.marquee-track.paused { animation-play-state: paused; }

.marquee-item {
  flex: 0 0 auto;
  width: 900px;
  margin-right: 2rem;
}

@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(var(--marquee-distance, -50%)); }
}

/* ─── Project Cards ─────────────────────────────────────────────────────────── */
.project-card {
  transition: transform 0.35s cubic-bezier(0.34, 1.3, 0.64, 1),
              box-shadow 0.35s ease;
  overflow: hidden;
  height: 100%;
}
.project-card.on-hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 48px rgba(var(--v-theme-primary), 0.18) !important;
}

/* Cinematic font for project card title */
.project-card-title {
  font-family: 'Cormorant Garant', Georgia, serif !important;
  font-size: clamp(1.3rem, 2vw, 1.6rem) !important;
  letter-spacing: 0.03em !important;
  font-weight: 600 !important;
}

.description-title {
  font-family: 'Cormorant Garant', Georgia, serif !important;
  font-weight: 600 !important;
  letter-spacing: 0.02em;
}

.tech-label, .role-btn {
  font-family: 'Jost', sans-serif !important;
}

/* ─── Video ─────────────────────────────────────────────────────────────────── */
.video-container { position: relative; }
.video-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 14px;
  overflow: hidden;
}
.video-card-hover {
  transform: scale(1.02);
  box-shadow: 0 10px 32px rgba(var(--v-theme-primary), 0.18);
}
.video-frame { display: block; aspect-ratio: 16/9; }

/* ─── Description Card ──────────────────────────────────────────────────────── */
.description-card {
  transition: all 0.3s ease;
  border-radius: 14px;
}

/* ─── Buttons ───────────────────────────────────────────────────────────────── */
.github-btn, .demo-btn {
  transition: transform 0.3s ease;
}
.github-btn:hover, .demo-btn:hover {
  transform: translateY(-4px);
}
.v-btn { text-transform: none; letter-spacing: 0.5px; }

/* ─── Chips ─────────────────────────────────────────────────────────────────── */
.v-chip {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  font-family: 'Jost', sans-serif !important;
}
.v-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(var(--v-theme-primary), 0.2);
}

/* ─── Animate.css ───────────────────────────────────────────────────────────── */
.animate__animated { animation-duration: 1s; }

/* ─── Responsive ────────────────────────────────────────────────────────────── */
@media (max-width: 1200px) { .marquee-item { width: 750px; } }
@media (max-width: 960px)  {
  .marquee-item { width: 600px; }
  .marquee-track { animation-duration: var(--marquee-duration, 25s); }
}
@media (max-width: 600px) {
  .marquee-item { width: 350px; }
  .marquee-track { animation-duration: var(--marquee-duration, 20s); }
  .video-frame { height: 180px; }
  .description-card { padding: 0.75rem !important; }
  .description-card .v-card-title { font-size: 1.1rem !important; }
  .description-card .v-card-text  { font-size: 0.9rem !important; }
  .v-chip { font-size: 0.75rem !important; height: 24px !important; }
}
@media (max-width: 400px) {
  .marquee-item { width: 300px; }
  .video-frame { height: 160px; }
  .description-card { padding: 0.5rem !important; }
  .description-card .v-card-title { font-size: 1rem !important; }
  .description-card .v-card-text  { font-size: 0.85rem !important; }
  .v-chip { font-size: 0.7rem !important; height: 22px !important; margin: 0.125rem !important; }
}

/* ─── Accessibility ─────────────────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; }
}
</style>