<template>
  <article
    v-reveal
    class="project-card interactive reveal"
    :class="{ featured }"
  >
    <div class="project-media">
      <ProjectArt
        :art="project.art"
        :label="project.artLabel || project.title"
      />
      <img
        v-if="project.video && !thumbFailed"
        class="video-thumb"
        :src="thumbnailUrl(project.video)"
        alt=""
        loading="lazy"
        @error="thumbFailed = true"
      >
      <div class="media-top">
        <span class="counter">{{ project.period }}</span>
        <button
          v-if="project.video"
          class="video-play"
          type="button"
          :aria-label="`Play demo of ${project.title}`"
          @click="$emit('play')"
        >
          <AppIcon name="play" /> Play demo
        </button>
        <button
          v-else
          class="video-play"
          type="button"
          :aria-label="`Read the case study for ${project.title}`"
          @click="$emit('details')"
        >
          Case study
        </button>
      </div>
    </div>

    <div class="project-body">
      <div class="project-kicker">
        {{ project.categoryLabel }}
      </div>
      <h3>{{ project.title }}</h3>
      <div class="project-role">
        {{ project.role }}
      </div>
      <p>{{ project.summary }}</p>
      <div class="project-tech">
        <span
          v-for="tech in project.tech"
          :key="tech"
        >{{ tech }}</span>
      </div>
      <div class="project-foot">
        <button
          class="project-detail-btn"
          type="button"
          @click="$emit('details')"
        >
          Project details
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            aria-hidden="true"
          ><path d="M4 20 20 4M7 4h13v13" /></svg>
        </button>
        <span class="project-note">
          <AppIcon
            v-if="project.visibility === 'private'"
            name="lock"
          />
          {{ project.status }}
          <a
            v-if="project.github"
            class="card-github"
            :href="project.github"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`${project.title} on GitHub`"
            title="View the code on GitHub"
          ><AppIcon
            name="github"
            size="18"
          /></a>
        </span>
      </div>
    </div>
  </article>
</template>

<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'
import { ref } from 'vue'
import { thumbnailUrl } from '@/data/projects'
import ProjectArt from './ProjectArt.vue'

defineProps({
  project: { type: Object, required: true },
  featured: { type: Boolean, default: false },
})
defineEmits(['play', 'details'])

const thumbFailed = ref(false)
</script>

<style scoped>
.project-note {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  text-align: right;
}
.project-role {
  margin-top: -8px;
  font-size: 13px;
  font-weight: 600;
  opacity: .8;
}
.card-github {
  display: inline-grid;
  place-items: center;
  color: inherit;
  margin-left: 4px;
}
.card-github:hover {
  color: var(--highlight, var(--lime));
}
</style>
