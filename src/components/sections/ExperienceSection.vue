<template>
  <section
    id="experience"
    class="experience"
  >
    <div class="exp-grain" />
    <div class="container">
      <div class="exp-heading">
        <div class="label-line">
          Experience
        </div>
        <div class="section-heading">
          <h2>Experience.</h2>
          <p>Professional roles, most recent first.</p>
        </div>
      </div>

      <div class="exp-layout">
        <aside
          class="exp-aside"
          aria-hidden="true"
        >
          <div class="exp-number">
            {{ pad(active + 1) }}
          </div>
          <div
            class="exp-progress-line"
            :style="{ '--progress': `${((active + 1) / experiences.length * 100).toFixed(1)}%` }"
          />
          <div class="exp-count">
            <span>ROLE <span>{{ pad(active + 1) }}</span></span>
            <span>OF {{ pad(experiences.length) }}</span>
          </div>
        </aside>

        <div class="exp-list">
          <article
            v-for="(job, i) in experiences"
            :key="job.role + job.company"
            ref="entries"
            class="experience-entry"
            :class="{ active: i === active }"
          >
            <div class="exp-card">
              <div class="exp-meta">
                <span>{{ pad(i + 1) }}</span><span>{{ job.period }}</span>
              </div>
              <h3>{{ job.role }}</h3>
              <div class="exp-company">
                {{ job.company }}
              </div>
              <ul class="exp-bullets">
                <li
                  v-for="point in job.bullets"
                  :key="point"
                >
                  {{ point }}
                </li>
              </ul>
              <div
                v-if="job.tech.length"
                class="exp-tags"
              >
                <span
                  v-for="tech in job.tech"
                  :key="tech"
                >{{ tech }}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { experiences } from '@/data/experience'
import { useWindowScroll } from '@/composables/useWindowScroll'

const pad = (n) => String(n).padStart(2, '0')

const entries = ref([])
const active = ref(0)
const scroll = useWindowScroll()

// The active chapter is the entry whose centre is closest to 56% of the viewport height.
watch(() => [scroll.y, scroll.height], () => {
  const middle = scroll.height * 0.56
  let nearest = 0
  let distance = Infinity
  entries.value.forEach((el, i) => {
    const rect = el.getBoundingClientRect()
    const d = Math.abs(rect.top + rect.height / 2 - middle)
    if (d < distance) {
      distance = d
      nearest = i
    }
  })
  active.value = nearest
})
</script>

<style scoped>
.exp-bullets {
  display: grid;
  gap: 8px;
  margin: 14px 0 18px;
  padding-left: 18px;
  line-height: 1.55;
}
/* Phones: a wider text column and slightly smaller text, so justified lines don't open wide gaps. */
@media (max-width: 760px) {
  .exp-card {
    padding: 24px 20px;
  }
  .exp-bullets {
    padding-left: 16px;
    font-size: 15px;
    line-height: 1.6;
  }
}
</style>
