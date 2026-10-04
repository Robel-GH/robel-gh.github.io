<template>
  <!-- Brand marks are filled; interface icons are stroked (Lucide shapes). -->
  <svg
    v-if="icon.fill"
    class="app-icon"
    :viewBox="icon.viewBox"
    :width="size"
    :height="size"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path :d="icon.fill" />
  </svg>
  <svg
    v-else
    class="app-icon"
    viewBox="0 0 24 24"
    :width="size"
    :height="size"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <component
      :is="part.tag"
      v-for="(part, i) in icon.parts"
      :key="i"
      v-bind="part.attrs"
    />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // github | linkedin | youtube | mail | file | copy | lock | arrow-right | arrow-up | arrow-up-right | map-pin | play
  name: { type: String, required: true },
  size: { type: [String, Number], default: '1em' },
})

const p = (d) => ({ tag: 'path', attrs: { d } })

const ICONS = {
  github: {
    viewBox: '0 0 16 16',
    fill: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z',
  },
  linkedin: {
    viewBox: '0 0 24 24',
    fill: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  youtube: {
    viewBox: '0 0 24 24',
    fill: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
  mail: { parts: [{ tag: 'rect', attrs: { width: 20, height: 16, x: 2, y: 4, rx: 2 } }, p('m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7')] },
  file: { parts: [p('M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z'), p('M14 2v4a2 2 0 0 0 2 2h4'), p('M16 13H8'), p('M16 17H8'), p('M10 9H8')] },
  copy: { parts: [{ tag: 'rect', attrs: { width: 14, height: 14, x: 8, y: 8, rx: 2, ry: 2 } }, p('M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2')] },
  lock: { parts: [{ tag: 'rect', attrs: { width: 18, height: 11, x: 3, y: 11, rx: 2, ry: 2 } }, p('M7 11V7a5 5 0 0 1 10 0v4')] },
  'arrow-right': { parts: [p('M5 12h14'), p('m12 5 7 7-7 7')] },
  'arrow-up': { parts: [p('M12 19V5'), p('m5 12 7-7 7 7')] },
  'arrow-up-right': { parts: [p('M7 7h10v10'), p('M7 17 17 7')] },
  'map-pin': { parts: [p('M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0'), { tag: 'circle', attrs: { cx: 12, cy: 10, r: 3 } }] },
  play: { parts: [p('M6 3.5v17a1 1 0 0 0 1.5.86l14-8.5a1 1 0 0 0 0-1.72l-14-8.5A1 1 0 0 0 6 3.5Z')] },
}

const icon = computed(() => ICONS[props.name] || ICONS['arrow-up-right'])
</script>

<style scoped>
.app-icon {
  flex: none;
  display: inline-block;
  vertical-align: -0.125em;
}
</style>
