<template>
  <component
    :is="href ? 'a' : 'span'"
    class="status-chip"
    :class="`tone-${tone}`"
    :href="href || undefined"
  >
    <span
      class="status-dot"
      aria-hidden="true"
    />
    <slot>
      <span :class="{ 'chip-full': shortLabel }">{{ label }}</span>
      <span
        v-if="shortLabel"
        class="chip-short"
        aria-hidden="true"
      >{{ shortLabel }}</span>
    </slot>
  </component>
</template>

<script setup>
defineProps({
  label: { type: String, default: '' },
  // Shorter wording for phones, where the full label would not fit on one row.
  shortLabel: { type: String, default: '' },
  href: { type: String, default: '' },
  // live: available now (green), offer: something on offer (amber), progress: in testing or in progress (blue)
  tone: { type: String, default: 'live' },
})
</script>

<style scoped>
.status-chip {
  --dot: #3fbf6f;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  min-height: 32px;
  padding: 0 14px 0 12px;
  border: 1px solid color-mix(in srgb, currentColor 26%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, currentColor 6%, transparent);
  font: 500 11px/1 var(--mono);
  letter-spacing: .08em;
  text-transform: uppercase;
  white-space: nowrap;
  color: inherit;
  transition: background .2s, border-color .2s;
}
a.status-chip:hover {
  border-color: color-mix(in srgb, currentColor 55%, transparent);
  background: color-mix(in srgb, currentColor 11%, transparent);
}
.tone-offer { --dot: #e0a43a; }
.tone-progress { --dot: #5b9bd5; }

.status-dot {
  position: relative;
  flex: none;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--dot);
}
/* A soft ring pulses out of the dot; the chip itself stays still. */
.status-dot::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--dot);
  animation: chip-pulse 2s ease-out infinite;
}
@keyframes chip-pulse {
  0% { transform: scale(1); opacity: .65; }
  80%, 100% { transform: scale(2.8); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .status-dot::after { animation: none; opacity: 0; }
}
.chip-short { display: none; }
@media (max-width: 760px) {
  .status-chip {
    min-height: 30px;
    gap: 8px;
    padding: 0 12px 0 10px;
    font-size: 10px;
    letter-spacing: .06em;
  }
  .chip-full { display: none; }
  .chip-short { display: inline; }
}
@media (max-width: 374px) {
  .status-chip {
    gap: 7px;
    padding: 0 9px 0 8px;
    letter-spacing: .03em;
  }
}
</style>
