<template>
  <div
    ref="diagram"
    class="identity-diagram"
    :style="timing"
    aria-hidden="true"
  >
    <span class="diagram-ring diagram-ring-one" />
    <span class="diagram-ring diagram-ring-two" />

    <!-- Lucide "lightbulb", "code-xml" and "check", each with its step name -->
    <span
      ref="pointA"
      class="diagram-point point-a"
      title="Design"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>
      <span class="point-label label-first">Design</span>
    </span>
    <span
      ref="pointB"
      class="diagram-point point-b"
      title="Build"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ><path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" /></svg>
      <span class="point-label label-top">Build</span>
    </span>
    <span
      ref="pointC"
      class="diagram-point point-c"
      title="Ship"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      ><path d="M20 6 9 17l-5-5" /></svg>
      <span class="point-label label-bottom">Ship</span>
    </span>

    <svg
      class="diagram-wires"
      :viewBox="viewBox"
      focusable="false"
    >
      <path
        class="wire-track"
        :d="wire"
        pathLength="100"
      />
      <path
        class="wire-draw"
        :d="wire"
        pathLength="100"
      />
      <path
        class="wire-comet"
        :d="wire"
        pathLength="100"
      />
    </svg>
  </div>
</template>

<script setup>

import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'

const diagram = ref(null)
const pointA = ref(null)
const pointB = ref(null)
const pointC = ref(null)

const viewBox = ref('0 0 100 100')
const wire = ref('')
const timing = reactive({})

let observer = null

function layout () {
  const el = diagram.value
  if (!el || !el.offsetWidth || !el.offsetHeight) return

  const [a, b, c] = [pointA, pointB, pointC].map(({ value }) => [value.offsetLeft, value.offsetTop])
  viewBox.value = `0 0 ${el.offsetWidth} ${el.offsetHeight}`
  wire.value = `M${a[0]} ${a[1]} L${b[0]} ${b[1]} L${c[0]} ${c[1]}`

  const css = getComputedStyle(el)
  const seconds = (name) => parseFloat(css.getPropertyValue(name)) || 0
  const intro = seconds('--intro')
  const draw = seconds('--draw')
  const loop = seconds('--loop')
  const loopStart = seconds('--loop-start')

  const ab = Math.hypot(b[0] - a[0], b[1] - a[1])
  const bc = Math.hypot(c[0] - b[0], c[1] - b[1])
  const share = ab / (ab + bc)

  // Entrance: each node lands as the drawing line arrives.
  timing['--in-a'] = `${(intro - 0.15).toFixed(2)}s`
  timing['--in-b'] = `${(intro + draw * share - 0.2).toFixed(2)}s`
  timing['--in-c'] = `${(intro + draw - 0.25).toFixed(2)}s`

  // Loop: the pulse head travels 0 → 107 path units; ring each node as it passes.
  const at = (position) => `${(loopStart + loop * (position / 107)).toFixed(2)}s`
  timing['--ping-a'] = at(0)
  timing['--ping-b'] = at(100 * share)
  timing['--ping-c'] = at(100)
}

onMounted(() => {
  layout()
  if ('ResizeObserver' in window) {
    observer = new ResizeObserver(layout)
    observer.observe(diagram.value)
  } else {
    window.addEventListener('resize', layout)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('resize', layout)
})
</script>

<style scoped>
/* Full strength, so the step names read clearly over the card. */
.identity-diagram { opacity: 1; }

.point-label {
  position: absolute;
  z-index: 3;
  white-space: nowrap;
  padding: 4px 9px;
  border-radius: 999px;
  font: 600 11px/1 var(--mono);
  letter-spacing: .12em;
  text-transform: uppercase;
  color: #F8EBDD;
  background: rgba(33, 23, 19, .86);
  border: 1px solid rgba(230, 188, 140, .45);
  box-shadow: 0 6px 16px -8px rgba(0, 0, 0, .6);
}
.label-first { bottom: calc(100% + 12px); left: 50%; transform: translateX(-62%); }
.label-top { bottom: calc(100% + 12px); left: 50%; transform: translateX(-50%); }
.label-bottom { top: calc(100% + 12px); left: 50%; transform: translateX(-50%); }

:global(html[data-theme="light"]) .point-label {
  color: #4A3226;
  background: rgba(255, 251, 245, .94);
  border-color: rgba(107, 68, 53, .35);
  box-shadow: 0 6px 16px -10px rgba(107, 68, 53, .45);
}

@media (max-width: 760px) {
  .point-label { padding: 3px 7px; font-size: 9.5px; letter-spacing: .1em; }
  /* On a phone the testing note sits elsewhere, so the first label can go underneath. */
  .label-first { bottom: auto; left: 50%; top: calc(100% + 8px); transform: translateX(-50%); }
  .label-top { bottom: calc(100% + 8px); }
  .label-bottom { top: calc(100% + 8px); }
}
</style>
