<template>
  <section
    id="skills"
    class="light-section section-pad"
  >
    <div class="container">
      <div class="label-line">
        Skills
      </div>
      <h2
        v-reveal
        class="subhead reveal"
      >
        Skills.
      </h2>

      <div>
        <div
          v-for="group in skillGroups"
          :key="group.label"
          v-reveal
          class="skill-group reveal"
        >
          <h3>{{ group.label }}</h3>
          <div class="skill-list">
            <span
              v-for="item in group.items"
              :key="item"
            >{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { skillGroups } from '@/data/skills'
</script>
