<template>
  <section
    id="education"
    class="education section-pad"
  >
    <div class="container">
      <div class="label-line">
        Education
      </div>
      <h2
        v-reveal
        class="section-title reveal"
      >
        Education.
      </h2>
      <div class="edu-list">
        <article
          v-for="(entry, i) in education"
          :key="entry.degree"
          v-reveal
          class="edu-row reveal"
        >
          <span class="edu-period">{{ entry.period }}</span>
          <div>
            <h3>{{ entry.degree }}</h3>
            <p>{{ entry.school }}. {{ entry.note }}.</p>
          </div>
          <span class="edu-index">0{{ i + 1 }}</span>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { education } from '@/data/education'
</script>
