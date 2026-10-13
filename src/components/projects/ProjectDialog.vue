<template>
  <v-dialog
    v-model="dialog.state.open"
    class="project-dialog"
    max-width="1030"
    width="100%"
    @after-leave="playing = false"
  >
    <section
      v-if="project"
      class="modal-panel"
      aria-labelledby="modalTitle"
    >
      <div class="modal-bar">
        <span>{{ project.visibility === 'private' ? 'CASE STUDY' : 'PROJECT' }}, {{ project.period }}</span>
        <button
          class="close"
          type="button"
          aria-label="Close project details"
          @click="dialog.close()"
        >
          ×
        </button>
      </div>

      <div class="modal-body">
        <span class="project-kicker">{{ project.categoryLabel }} / {{ project.role }}</span>
        <h2 id="modalTitle">
          {{ project.title }}
        </h2>
        <p class="modal-status">
          {{ project.status }}
        </p>
        <p class="modal-description">
          {{ project.description }}
        </p>

        <ul
          v-if="project.highlights?.length"
          class="modal-highlights"
        >
          <li
            v-for="item in project.highlights"
            :key="item"
          >
            {{ item }}
          </li>
        </ul>

        <div
          v-if="project.video"
          class="modal-media"
        >
          <iframe
            v-if="playing"
            :title="`Demo: ${project.title}`"
            :src="embedUrl(project.video)"
            allow="autoplay; encrypted-media; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          />
          <button
            v-else
            type="button"
            class="modal-start"
            @click="playing = true"
          >
            <span class="big-play">▶</span><span>Watch the project demo</span>
          </button>
        </div>

        <div class="project-tech">
          <span
            v-for="tech in project.tech"
            :key="tech"
          >{{ tech }}</span>
        </div>
        <div class="modal-links">
          <a
            v-if="project.github"
            :href="project.github"
            target="_blank"
            rel="noopener noreferrer"
          ><AppIcon name="github" /> GitHub repository</a>
          <a
            v-if="project.video"
            :href="watchUrl(project.video)"
            target="_blank"
            rel="noopener noreferrer"
          ><AppIcon name="youtube" /> Watch on YouTube</a>
          <a
            v-if="project.visibility === 'private'"
            :href="`mailto:${owner.email}?subject=${encodeURIComponent('Walkthrough: ' + project.title)}`"
          ><AppIcon name="mail" /> Request a code walkthrough</a>
        </div>
      </div>
    </section>
  </v-dialog>
</template>

<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'
import { computed, ref, watch } from 'vue'
import { embedUrl, watchUrl } from '@/data/projects'
import { owner } from '@/data/site'
import { useProjectDialog } from '@/composables/useProjectDialog'

const dialog = useProjectDialog()
const project = computed(() => dialog.state.project)

// The YouTube player is only loaded once the visitor asks for it.
const playing = ref(false)
watch(() => dialog.state.open, (open) => {
  if (open) playing.value = dialog.state.autoplay
})
</script>

<style scoped>
.modal-status {
  margin: -6px 0 18px;
  font: 11px var(--mono);
  letter-spacing: .1em;
  text-transform: uppercase;
  opacity: .75;
}
.modal-links a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.modal-highlights {
  display: grid;
  gap: 8px;
  margin: 0 0 26px;
  padding: 0;
  list-style: none;
}
.modal-highlights li {
  position: relative;
  padding-left: 20px;
  line-height: 1.5;
  opacity: .9;
}
.modal-highlights li::before {
  content: '◆';
  position: absolute;
  left: 0;
  top: 2px;
  font-size: 10px;
  color: var(--highlight, var(--lime));
}
</style>
