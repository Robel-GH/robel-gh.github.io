<template>
  <AppHeader />
  <v-main>
    <v-container class="py-12 px-2 px-md-4">
      <section id="about" class="section-block">
        <About />
      </section>
      
      <section id="skills" class="section-block">
        <Skills />
      </section>
      
      <section id="projects" class="section-block">
        <Projects />
      </section>
      
      <section id="education" class="section-block">
        <Education />
      </section>
      
      <section id="experience" class="section-block">
        <Experience />
      </section>
      
      <section id="contact" class="section-block">
        <Contact />
      </section>
    </v-container>
  </v-main>
  <AppFooter />
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
.section-block {
  scroll-margin-top: 64px;
  margin-bottom: 64px;
}

/* Mobile layout adjustments */
@media (max-width: 960px) {
  .section-block {
    margin-bottom: 48px;
  }
}

@media (max-width: 600px) {
  .section-block {
    margin-bottom: 32px;
  }
}
</style>