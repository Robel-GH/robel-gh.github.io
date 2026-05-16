<template>
  <v-container fluid class="projects-container py-8">
    <div class="section-header text-center mb-8">
      <div class="header-decoration">
        <v-icon icon="mdi-folder-outline" size="x-large" class="header-icon"></v-icon>
      </div>
      <h2 class="section-pro-title text-h5 ml-2 font-weight-bold mb-2">
        Projects
      </h2>
      <div class="title-underline"></div>
    </div>

    <div class="projects-grid" role="list">
      <v-hover
        v-for="(project, index) in projects"
        :key="project.title"
        v-slot="{ isHovering, props }"
      >
        <article
          v-bind="props"
          class="project-card"
          :class="{ 'project-card--hover': isHovering }"
          :style="{ '--enter-delay': `${index * 80}ms` }"
          role="listitem"
        >
          <div class="project-media">
            <iframe
              v-if="activeVideoTitle === project.title"
              class="video-frame"
              :src="youtubeEmbedUrl(project.videoUrl)"
              :title="`${project.title} demo video`"
              loading="lazy"
              frameborder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowfullscreen
            ></iframe>

            <button
              v-else
              type="button"
              class="video-trigger"
              :aria-label="`Play ${project.title} demo video`"
              @click="playProject(project.title)"
            >
              <img
                class="video-thumbnail"
                :src="youtubeThumbnailUrl(project.videoUrl)"
                :alt="`${project.title} video preview`"
                loading="lazy"
              >
              <span class="video-scrim"></span>
              <span class="play-control">
                <v-icon icon="mdi-play-circle" size="34"></v-icon>
                <span>Play demo</span>
              </span>
            </button>
          </div>

          <div class="project-body">
            <div class="project-heading">
              <v-icon :color="project.iconColor || 'primary'" size="30">
                {{ project.icon || 'mdi-rocket-launch' }}
              </v-icon>
              <h3>{{ project.title }}</h3>
            </div>

            <p class="project-description">
              {{ project.description }}
            </p>

            <div class="project-tech" aria-label="Technologies used">
              <v-chip
                v-for="tech in project.technologies"
                :key="tech"
                color="primary"
                variant="outlined"
                size="small"
              >
                {{ tech }}
              </v-chip>
            </div>

            <div class="project-actions">
              <v-btn
                color="primary"
                variant="tonal"
                rounded
                class="role-btn"
                prepend-icon="mdi-account-tie"
              >
                {{ project.role }}
              </v-btn>

              <div class="link-actions">
                <v-btn
                  v-if="project.githubLink"
                  :href="project.githubLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  icon
                  color="grey-darken-3"
                  variant="text"
                  :aria-label="`${project.title} GitHub repository`"
                >
                  <v-icon size="30">mdi-github</v-icon>
                </v-btn>
                <v-btn
                  v-if="project.liveDemo"
                  :href="project.liveDemo"
                  target="_blank"
                  rel="noopener noreferrer"
                  icon
                  color="primary"
                  variant="text"
                  :aria-label="`${project.title} live demo`"
                >
                  <v-icon size="30">mdi-web</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </article>
      </v-hover>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const activeVideoTitle = ref(null);

const projects = [
    {
    title: 'Automatic Medical Report Generator',
    description: 'A multi-modal approach combining computer vision for image analysis and natural language processing for report generation, designed to assist radiologists by reducing manual reporting time and improving clinical workflow efficiency.',
    videoUrl: 'https://youtube.com/embed/xAKx-E_sgjw',
    githubLink: 'https://github.com/Robel-GH/',
    role: 'Deep Learning Engineer',
    icon: 'mdi-medical-bag',
    iconColor: 'indigo',
    technologies: ['PyTorch', 'Pandas', 'Scikit-learn', 'Transformers', 'TorchVision', 'Python'],
    liveDemo: null,
  },
  {
    title: 'Keke AI Competition - Baba Is You Puzzle',
    description: 'A lightweight framework for developing and testing AI agents on rule-based puzzle games. Inspired by Baba Is You, it provides dynamic rule mechanics and level parsing, pluggable agents, a Flask visualization layer, and solution replay for comparing search strategies in real time.',
    videoUrl: 'https://youtube.com/embed/ZgNq7sK0s1o',
    githubLink: 'https://github.com/Robel-GH/Keke',
    role: 'Agent Developer',
    icon: 'mdi-robot',
    iconColor: 'indigo',
    technologies: ['Python', 'Flask'],
    liveDemo: null,
  },
  {
    title: 'Dynamic PDDL Visualizer',
    description: 'Dynamic PDDL Visualizer is an interactive web-based tool that brings AI planning to life through real-time visualization of Planning Domain Definition Language (PDDL) domains and problems. This powerful application transforms abstract AI planning concepts into intuitive, dynamic visual representations, making it easier to understand, debug, and demonstrate automated planning systems.',
    videoUrl: 'https://youtube.com/embed/liRcm6X0jfA',
    githubLink: 'https://github.com/Robel-GH/Dynamic-PDDL-Visualizer',
    role: 'AI Planner and Frontend Developer',
    icon: 'mdi-rotate-3d',
    iconColor: 'indigo',
    technologies: ['React', 'Three.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Replit'],
    liveDemo: null,
  },

  {
    title: 'Earthquake Data Warehousing & Visualization',
    description: 'This comprehensive data warehousing project processes earthquake data from the USGS API, transforming raw seismic data into a structured warehouse optimized for analysis and visualization. The pipeline covers ETL with additional AI-powered analysis capabilities.',
    videoUrl: 'https://youtube.com/embed/0jHXsxmyLCg',
    githubLink: 'https://github.com/Robel-GH/Earthquake-Data-Warehouse-Project',
    role: 'Data Engineer',
    icon: 'mdi-earth',
    iconColor: 'indigo',
    technologies: ['Python', 'Pandas', 'PostgreSQL', 'Tableau'],
    liveDemo: null,
  },

  {
    title: 'Unical Phonebook and Messaging App',
    description: 'A centralized platform for managing university contacts, featuring real-time messaging to enhance communication among faculty, staff, and students. It includes role-based access, searchable profiles, and privacy controls within a mobile-responsive interface.',
    videoUrl: 'https://www.youtube.com/embed/JBIdZ6LuLWM',
    githubLink: null,
    role: 'Frontend Developer',
    icon: 'mdi-phone-message',
    iconColor: 'indigo',
    technologies: ['Vue.js', 'Vuetify', 'Pinia', 'Stomp', 'Spring Boot'],
    liveDemo: null,
  },
  {
    title: 'Sales Management System',
    description: 'A robust application to optimize sales tracking, streamline client management, and enhance inventory control, resulting in improved operational efficiency.',
    videoUrl: 'https://youtube.com/embed/ccpMfbHWkHI',
    githubLink: null,
    role: 'Full Stack Developer',
    icon: 'mdi-cart',
    iconColor: 'success',
    technologies: ['Node.js', 'Express', 'MongoDB', 'Vue 2', 'Vuetify', 'Vuex'],
    liveDemo: null,
  },
];

const playProject = (title) => {
  activeVideoTitle.value = title;
};

const youtubeIdFromUrl = (url) => {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes('youtu.be')) {
      return parsedUrl.pathname.split('/').filter(Boolean)[0] || '';
    }

    if (parsedUrl.pathname.includes('/embed/')) {
      return parsedUrl.pathname.split('/embed/')[1]?.split('/')[0] || '';
    }

    return parsedUrl.searchParams.get('v') || '';
  } catch {
    return '';
  }
};

const youtubeThumbnailUrl = (url) => {
  const videoId = youtubeIdFromUrl(url);
  return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : '';
};

const youtubeEmbedUrl = (url) => {
  const videoId = youtubeIdFromUrl(url);
  return videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
    : url;
};
</script>

<style scoped>
.projects-container {
  overflow: hidden;
  position: relative;
}

.section-pro-title {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 52%, rgb(var(--v-theme-info)) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
  font-family: 'Jost', sans-serif;
  font-size: 2rem !important;
  font-weight: 600 !important;
  letter-spacing: 0;
  position: relative;
}

.section-header {
  animation: section-reveal 700ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

.projects-grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr));
  margin: 0 auto;
  max-width: 1280px;
  width: 100%;
}

.project-card {
  animation: card-reveal 760ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
  animation-delay: var(--enter-delay);
  background: rgba(var(--v-theme-surface), 0.94);
  border: 1px solid rgba(var(--v-theme-primary), 0.12);
  border-radius: 8px;
  box-shadow: 0 18px 42px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  min-height: 100%;
  overflow: hidden;
  transform-origin: center;
  transition:
    border-color 260ms ease,
    box-shadow 260ms ease,
    transform 260ms ease;
}

.project-card--hover {
  border-color: rgba(var(--v-theme-primary), 0.28);
  box-shadow: 0 24px 56px rgba(var(--v-theme-primary), 0.14);
  transform: translateY(-6px);
}

.project-media {
  background:
  linear-gradient(140deg, rgba(var(--v-theme-seconday), 0.18), rgba(var(--v-theme-info), 0.08)),
  rgba(var(--v-theme-surface-variant), 0.4);
  aspect-ratio: 16 / 9;
  min-height: 0;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.video-frame,
.video-trigger {
  aspect-ratio: 16 / 9;
  border: 0;
  display: block;
  height: 100%;
  min-height: 0;
  width: 100%;
}

.video-trigger {
  background: transparent;
  cursor: pointer;
  padding: 0;
  position: relative;
  text-align: left;
}

.video-thumbnail {
  display: block;
  height: 100%;
  object-fit: cover;
  transform: scale(1.01);
  transition: transform 420ms ease, filter 420ms ease;
  width: 100%;
}

.project-card--hover .video-thumbnail,
.video-trigger:focus-visible .video-thumbnail {
  filter: saturate(1.08) contrast(1.04);
  transform: scale(1.06);
}

.video-scrim {
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.54)),
    linear-gradient(90deg, rgba(var(--v-theme-primary), 0.28), transparent 65%);
  inset: 0;
  position: absolute;
}

.play-control {
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.48);
  border-radius: 999px;
  bottom: 1rem;
  color: rgb(var(--v-theme-primary));
  display: inline-flex;
  font-family: 'Jost', sans-serif;
  font-weight: 600;
  gap: 0.45rem;
  left: 1rem;
  letter-spacing: 0;
  padding: 0.55rem 0.9rem;
  position: absolute;
  transform: translateY(0);
  transition: transform 260ms ease, background 260ms ease;
}

.video-trigger:hover .play-control,
.video-trigger:focus-visible .play-control {
  background: #ffffff;
  transform: translateY(-3px);
}

.video-trigger:focus-visible {
  outline: 3px solid rgba(var(--v-theme-primary), 0.42);
  outline-offset: -3px;
}

.project-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem;
}

.project-heading {
  align-items: flex-start;
  display: flex;
  gap: 0.75rem;
}

.project-heading h3 {
  color: rgb(var(--v-theme-on-surface));
  font-family: 'Jost', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1.25;
  margin: 0;
}

.project-description {
  color: rgba(var(--v-theme-on-surface), 0.76);
  font-size: 0.95rem;
  line-height: 1.65;
  margin: 0;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.project-tech :deep(.v-chip) {
  font-family: 'Jost', sans-serif !important;
  letter-spacing: 0;
}

.project-actions {
  align-items: center;
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
  margin-top: auto;
}

.role-btn {
  font-family: 'Jost', sans-serif !important;
  letter-spacing: 0;
  min-width: 0;
  text-transform: none;
}

.link-actions {
  align-items: center;
  display: inline-flex;
  flex-shrink: 0;
  gap: 0.2rem;
}

@keyframes section-reveal {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes card-reveal {
  from {
    filter: blur(8px);
    opacity: 0;
    transform: translateY(28px) scale(0.98);
  }
  to {
    filter: blur(0);
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 600px) {
  .section-pro-title {
    font-size: 1.55rem !important;
  }

  .projects-grid {
    gap: 1rem;
  }

  .project-body {
    padding: 1rem;
  }

  .project-actions {
    align-items: flex-start;
    flex-direction: column;
  }

  .link-actions {
    align-self: flex-end;
  }
}

@media (prefers-reduced-motion: reduce) {
  .section-header,
  .project-card,
  .video-thumbnail,
  .play-control {
    animation: none;
    transition: none;
  }
}
</style>
