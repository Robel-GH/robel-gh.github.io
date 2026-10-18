/**
 * main.js
 *
 * Mounts the one-page portfolio with Vuetify and the v-reveal directive.
 */
import { createApp } from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import reveal from '@/directives/reveal'
import '@/styles/index.css'

createApp(App)
  .use(vuetify)
  .directive('reveal', reveal)
  .mount('#app')
