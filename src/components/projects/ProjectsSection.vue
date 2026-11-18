<template>
  <section
    id="projects"
    class="projects section-pad"
  >
    <div class="container">
      <div class="label-line">
        Projects
      </div>
      <div class="section-heading">
        <h2
          v-reveal
          class="reveal"
        >
          Projects<span class="point">.</span>
        </h2>
        <p
          v-reveal
          class="reveal"
        >
          Software, mobile and machine learning. Client and unreleased work is shown as case studies.
        </p>
      </div>

      <div
        class="filter-bar"
        role="group"
        aria-label="Filter projects"
      >
        <button
          v-for="option in projectFilters"
          :key="option.value"
          type="button"
          class="filter"
          :class="{ active: filter === option.value }"
          :aria-pressed="filter === option.value"
          @click="filter = option.value"
        >
          <span :class="{ 'filter-full': option.shortLabel }">{{ option.label }}</span>
          <span
            v-if="option.shortLabel"
            class="filter-short"
          >{{ option.shortLabel }}</span>
        </button>
      </div>

      <div
        class="project-grid"
        aria-live="polite"
      >
        <ProjectCard
          v-for="project in visibleProjects"
          :key="project.id"
          :project="project"
          :featured="wideCards.has(project.id)"
          @play="openProject(project.id, true)"
          @details="openProject(project.id)"
        />
      </div>

      <div class="other-work">
        <h3>Other work</h3>
        <ul>
          <li
            v-for="item in otherWork"
            :key="item.title"
          >
            <a
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong><AppIcon name="github" /> {{ item.title }}</strong>
              <span>{{ item.detail }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'
import { computed, ref } from 'vue'
import { otherWork, projectFilters, projects } from '@/data/projects'
import { profile } from '@/data/focus'
import { useProjectDialog } from '@/composables/useProjectDialog'
import ProjectCard from './ProjectCard.vue'

// A role-specific link (?focus=mobile) opens the matching filter.
const filter = ref(profile.filter)
const visibleProjects = computed(() =>
  filter.value === 'all' ? projects : projects.filter((p) => p.categories.includes(filter.value)),
)

// Cards that span both columns: featured projects (in the "All" view), plus any card that would
// otherwise sit alone in its row, so the two-column grid never leaves an empty cell.
const wideCards = computed(() => {
  const list = visibleProjects.value
  const wide = new Set()
  let column = 0
  list.forEach((project, i) => {
    if (project.featured && filter.value === 'all') {
      if (column === 1) wide.add(list[i - 1].id)
      wide.add(project.id)
      column = 0
    } else {
      column = 1 - column
    }
  })
  if (column === 1 && list.length) wide.add(list[list.length - 1].id)
  return wide
})

const { openProject } = useProjectDialog()
</script>

<style scoped>
/* Phones: the four filters share one row ("All projects" becomes "All"). */
.filter-short {
  display: none;
}
@media (max-width: 760px) {
  .filter-bar {
    flex-wrap: nowrap;
    gap: 6px;
  }
  .filter {
    padding: 8px 13px;
    white-space: nowrap;
  }
  .filter-full {
    display: none;
  }
  .filter-short {
    display: inline;
  }
}
.other-work {
  margin-top: 70px;
  border-top: 1px solid rgba(160, 170, 160, .3);
  padding-top: 28px;
}
.other-work h3 {
  margin: 0 0 14px;
  font: 11px var(--mono);
  letter-spacing: .16em;
  text-transform: uppercase;
  opacity: .75;
}
.other-work ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 0 32px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.other-work a {
  display: grid;
  gap: 4px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(160, 170, 160, .22);
  color: inherit;
  text-decoration: none;
}
.other-work strong {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font: 600 18px/1.25 var(--display);
  letter-spacing: -.02em;
}
.other-work span {
  font-size: 14px;
  line-height: 1.5;
  opacity: .72;
}
.other-work a:hover strong {
  color: var(--highlight, var(--lime));
}
</style>
