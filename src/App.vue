<template>
  <v-app class="portfolio-app">
    <a
      class="skip"
      href="#main"
    >Skip to main content</a>
    <ScrollProgress />
    <AppHeader />

    <v-main
      id="main"
      tag="main"
    >
      <HeroSection />
      <MarqueeBand />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
    </v-main>

    <ProjectDialog />
    <AppToast />
    <BackToTop />
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue'
import { useColorTheme, readStoredTheme } from '@/composables/useColorTheme'
import { installSectionRouting } from '@/composables/useSectionRoute'

import AppHeader from '@/components/layout/AppHeader.vue'
import ScrollProgress from '@/components/layout/ScrollProgress.vue'
import AppToast from '@/components/layout/AppToast.vue'
import BackToTop from '@/components/layout/BackToTop.vue'
import HeroSection from '@/components/hero/HeroSection.vue'
import MarqueeBand from '@/components/sections/MarqueeBand.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ProjectsSection from '@/components/projects/ProjectsSection.vue'
import ProjectDialog from '@/components/projects/ProjectDialog.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import EducationSection from '@/components/sections/EducationSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'

const { setMode } = useColorTheme()
onMounted(() => {
  setMode(readStoredTheme())
  installSectionRouting()
})
</script>
