<template>
  <section
    id="about"
    class="about section-pad"
  >
    <div class="container">
      <div class="label-line">
        About
      </div>
      <div class="about-grid">
        <h2
          v-reveal
          class="reveal"
        >
          Software that<br>works for <em>real<br>users.</em>
        </h2>
        <div
          v-reveal
          class="about-copy reveal"
        >
          <ul
            class="about-chips"
            aria-label="Current projects"
          >
            <li
              v-for="chip in aboutChips"
              :key="chip.label"
            >
              <StatusChip
                :label="chip.label"
                :tone="chip.tone"
                :href="chip.href"
              />
            </li>
          </ul>
          <p>
            I build software that people can rely on. My work includes healthcare systems and tools for communities
            that larger technology companies often overlook. Every project starts with understanding the problem. I
            define what the software needs to do and test whether it works before releasing it.
          </p>
          <p>
            My Clinical RAG Assistant answers medical questions using WHO guidelines. It cites the sources behind its
            answers and makes clear when it cannot find enough evidence. My research at York University uses
            diffusion models to change one medical finding in a chest X-ray while keeping the rest of the image
            unchanged. This helps determine whether AI models recognize actual medical findings or rely on misleading
            patterns. I am completing an MSc in AI and Computer Science at the University of Calabria.
          </p>
          <p id="meal-checker">
            Meal Checker replaces paper meal records with a mobile and web application. Staff scan automatically
            refreshing QR codes to record meals and prevent duplicate collection. Administrators can track meals in
            real time and export reports. I built it with Flutter, Supabase and PostgreSQL. I am willing to make it
            available free of charge to organizations that serve meals to their communities.
          </p>
          <p>
            Tigrigna Keyboard is a native Android and iOS keyboard that supports Tigrigna and English typing. It also
            uses Google’s ML Kit to recognize handwritten Tigrigna characters. Eleven people are currently testing
            it. I built it to make typing in Tigrigna easier and more accessible.
          </p>
          <p>
            I want my work to solve real problems for people who depend on it.
          </p>
          <div class="about-signature">
            <strong>Open to work</strong>
            <span>SOFTWARE, AI / ML, MOBILE</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import StatusChip from '@/components/ui/StatusChip.vue'
import { aboutChips } from '@/data/site'
</script>

<style scoped>
.about-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0 0 26px;
  padding: 0;
  list-style: none;
}
#meal-checker {
  scroll-margin-top: 110px;
}
</style>
