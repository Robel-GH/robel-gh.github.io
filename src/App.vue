<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup>
  //
</script>

<style>
/* Global mobile optimizations */
html {
  overflow-x: hidden;
}

body {
  overflow-x: hidden;
}

/* Prevent horizontal scroll on mobile */
* {
  box-sizing: border-box;
}

/* Touch-friendly button sizes */
@media (max-width: 600px) {
  .v-btn {
    min-height: 44px !important;
    min-width: 44px !important;
  }
  
  .v-icon {
    touch-action: manipulation;
  }
}

/* Improve text readability on mobile */
@media (max-width: 600px) {
  body {
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }
  
  /* Ensure proper font scaling */
  .v-application {
    font-size: 14px !important;
    line-height: 1.5 !important;
  }
}

/* Optimize scrolling performance */
.v-main {
  -webkit-overflow-scrolling: touch;
}

/* Prevent zoom on input focus (iOS) */
@media (max-width: 600px) {
  input, textarea, select {
    font-size: 16px !important;
  }
}
</style>
