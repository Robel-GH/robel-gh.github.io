<template>
  <header
    id="header"
    class="header"
    :class="{ scrolled: scroll.y > 65 }"
  >
    <nav
      id="mainNav"
      class="nav"
      :class="{ open: menuOpen }"
      aria-label="Primary"
    >
      <a
        v-for="item in navItems"
        :key="item.id"
        :href="sectionPath(item.id)"
        :class="{ active: activeSection === item.id }"
        :aria-current="activeSection === item.id ? 'true' : undefined"
        @click="menuOpen = false"
      >{{ item.label }}</a>
    </nav>

    <div class="header-actions">
      <ThemeToggle />
      <a
        class="nav-cta"
        :href="owner.resume"
        target="_blank"
        rel="noopener"
      ><AppIcon
        name="file"
        size="16"
      /> Résumé</a>
    </div>

    <button
      class="menu-trigger"
      type="button"
      aria-controls="mainNav"
      :aria-expanded="menuOpen"
      :aria-label="menuOpen ? 'Close navigation' : 'Open navigation'"
      @click="menuOpen = !menuOpen"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        aria-hidden="true"
      ><path d="M3 7h18M3 12h18M3 17h18" /></svg>
      <span>Menu</span>
    </button>
  </header>
</template>

<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { navItems, owner } from '@/data/site'
import { useWindowScroll } from '@/composables/useWindowScroll'
import { useSectionRoute } from '@/composables/useSectionRoute'
import ThemeToggle from './ThemeToggle.vue'

const scroll = useWindowScroll()
const menuOpen = ref(false)

// The highlighted menu item follows the section in view (see useSectionRoute).
const { activeSection, sectionPath } = useSectionRoute()

const onKeydown = (event) => {
  if (event.key === 'Escape') menuOpen.value = false
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
/* Only where the site already shows this button (it is hidden below 980px). */
@media (min-width: 981px) {
  .nav-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
}
</style>
