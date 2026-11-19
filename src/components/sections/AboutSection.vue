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
            I build software that people can rely on, from healthcare systems to tools for communities that larger
            technology companies often overlook. I start by understanding the problem, defining the requirements, and
            choosing an architecture that balances simplicity, reliability, and maintainability. I favour modular
            designs, clear service boundaries, and well-defined APIs, introducing distributed components only when
            the requirements justify the added complexity. I follow Agile practices, using MVPs to validate
            assumptions, delivering working software incrementally, and refining priorities through feedback and
            continuous testing. Retrospectives help improve how the work gets done.
          </p>
          <p>
            I apply the same engineering approach to AI systems, particularly in healthcare. I design workflows that
            combine model-based reasoning with deterministic rules where predictable behaviour matters. I preprocess
            data, train and evaluate models, optimize GPU performance, and build inference pipelines. I also
            investigate why models make certain predictions, identify failure cases, and improve reliability beyond
            accuracy alone.
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
</style>
