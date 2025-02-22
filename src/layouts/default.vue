<template>
  <AppHeader/>
  <v-main>
    
    <router-view />
  </v-main>

  <AppFooter />
</template>

<script setup>
import AppHeader from '@/components/app-header/AppHeader.vue'
import AppFooter from '@/components/app-footer/AppFooter.vue'
</script>
