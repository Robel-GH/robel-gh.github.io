<template>
  <v-app>
    <AppHeader />
    <v-main>
      <section id="about">
        <About />
      </section>
      
      <section id="skills">
        <Skills />
      </section>
      
      <section id="projects">
        <Projects />
      </section>
      
      <section id="education">
        <Education />
      </section>
      
      <section id="experience">
        <Experience />
      </section>
      
      <section id="contact">
        <Contact />
      </section>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup>
import AppHeader from '@/components/app-header/AppHeader.vue'
import AppFooter from '@/components/app-footer/AppFooter.vue'
import Education from '@/pages/education/Education.vue'
import Experience from '@/pages/experience/Experience.vue'
import About from '@/pages/about/About.vue'
import Skills from '@/pages/skills/Skills.vue'
import Contact from '@/pages/contact/Contact.vue'
import Projects from '@/pages/projects/Projects.vue'
</script>

<style>
section {
  /* min-height: 100vh; */
  /* padding: 64px 0; Add padding to account for the app bar */
  /* scroll-margin-top: 64px; This helps with the scroll positioning */
}
</style>