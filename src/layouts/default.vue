<template>
  <AppHeader/>
  <v-main>
    
    <router-view />
  </v-main>
  <About/>
  <Projects/>
  <AppFooter />
</template>

<script setup>
import AppHeader from '@/components/app-header/AppHeader.vue'
import AppFooter from '@/components/app-footer/AppFooter.vue'
import About from '@/pages/about/About.vue'
import Projects from '@/pages/projects/Projects.vue'
</script>
