<template>
  <!-- Illustration behind each project's video thumbnail (also shown if the thumbnail fails to load). -->
  <div
    v-if="art === 'medical'"
    class="art art-medical"
  >
    <div class="medical-frame" />
    <span class="medical-badge">MODEL / CXR ANALYSIS</span>
    <div class="medical-readout">
      IMAGE → TEXT<br>MEDICAL AI
    </div>
  </div>

  <div
    v-else-if="art === 'planning'"
    class="art art-planning"
  >
    <svg
      viewBox="0 0 640 380"
      aria-hidden="true"
    >
      <defs>
        <linearGradient :id="gradientId"><stop stop-color="#B7FFCA" /><stop
          offset="1"
          stop-color="#A3B29A"
        /></linearGradient>
      </defs>
      <g
        fill="none"
        stroke="#A8B79B99"
        stroke-width="3"
        stroke-dasharray="8 8"
      >
        <path d="M105 190 Q175 90 245 95 Q350 80 383 195" />
        <path d="M245 95 Q310 315 455 270" />
        <path d="M383 195 Q465 115 546 190" />
      </g>
      <g
        fill="#3B2E27"
        :stroke="`url(#${gradientId})`"
        stroke-width="3"
      >
        <rect
          x="45"
          y="138"
          width="128"
          height="90"
          rx="18"
        />
        <rect
          x="184"
          y="50"
          width="125"
          height="90"
          rx="18"
        />
        <rect
          x="321"
          y="150"
          width="127"
          height="90"
          rx="18"
        />
        <rect
          x="454"
          y="222"
          width="140"
          height="88"
          rx="18"
        />
      </g>
      <g
        font-size="18"
        fill="#F1E8DD"
        font-family="monospace"
        text-anchor="middle"
      >
        <text
          x="109"
          y="192"
        >INIT</text>
        <text
          x="247"
          y="103"
        >ACTION</text>
        <text
          x="385"
          y="202"
        >STATE</text>
        <text
          x="523"
          y="273"
        >GOAL</text>
      </g>
      <circle
        cx="247"
        cy="95"
        r="6"
        fill="#7E8E74"
      />
      <circle
        cx="387"
        cy="195"
        r="6"
        fill="#7E8E74"
      />
    </svg>
  </div>

  <div
    v-else-if="art === 'keke'"
    class="art art-keke"
  >
    <div class="keke-grid">
      <b
        v-for="(tile, i) in kekeTiles"
        :key="i"
      >{{ tile }}</b>
    </div>
  </div>

  <div
    v-else-if="art === 'data'"
    class="art art-data"
  >
    <div class="data-globe" />
    <span class="data-ping" /><span class="data-ping two" /><span class="data-ping three" />
  </div>

  <div
    v-else-if="art === 'messaging'"
    class="art art-messaging"
  >
    <div class="mock-phone">
      <div class="mock-top">
        University messaging
      </div>
      <div class="bubble" /><div class="bubble out" /><div class="bubble short" /><div class="bubble out short" /><div class="bubble" />
    </div>
  </div>

  <div
    v-else-if="art === 'sales'"
    class="art art-sales"
  >
    <div class="sales-dash">
      <div class="sales-head">
        Overview / sales
      </div>
      <div class="sales-bars">
        <span
          v-for="(h, i) in salesBars"
          :key="i"
          :style="{ height: `${h}%` }"
        />
      </div>
    </div>
  </div>

  <ProjectCover
    v-else-if="covers.includes(art)"
    :art="art"
    :label="label"
  />

  <!-- Projects without their own illustration: a labelled grid card. -->
  <div
    v-else
    class="art art-generic"
  >
    <span class="generic-label">{{ label }}</span>
  </div>
</template>

<script setup>
import ProjectCover from './ProjectCover.vue'

const props = defineProps({
  art: { type: String, required: true },
  label: { type: String, default: '' },
})

const covers = ['hospital', 'keyboard', 'meal', 'roads', 'booking', 'rag']
const gradientId = `planning-gradient-${props.art}`
const kekeTiles = ['K', 'E', 'K', 'E', '★', '↗', '▣', 'IS', 'YOU', '◯', '▧', 'MOVE', '●', '▥', '↗', '△', '◻', 'WIN', '→', '◆']
const salesBars = [41, 64, 52, 80, 58, 92, 71, 85]
</script>

<style scoped>
.art-generic {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 24px;
  background:
    linear-gradient(rgba(255, 255, 255, .06) 1px, transparent 1px) 0 0 / 28px 28px,
    linear-gradient(90deg, rgba(255, 255, 255, .06) 1px, transparent 1px) 0 0 / 28px 28px,
    radial-gradient(ellipse at 70% 30%, rgba(182, 247, 207, .16), transparent 60%),
    linear-gradient(145deg, #3E2A21, #211713);
}
.generic-label {
  font: 600 clamp(22px, 2.6vw, 38px)/1.1 var(--display);
  letter-spacing: -.04em;
  text-align: center;
  color: #FCF4EA;
}
</style>
