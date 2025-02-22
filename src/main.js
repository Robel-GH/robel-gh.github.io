/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins/index'

// Components
import App from './App.vue'
import vuetify from './plugins/vuetify' 
// Composables
import { createApp } from 'vue'
import { useThemeStore } from '@/plugins/theme/themeStore'
const app = createApp(App)

registerPlugins(app)


const themeStore = useThemeStore()
watch(
  () => themeStore.theme,
  (newTheme) => {
    vuetify.theme.global.name.value = newTheme
  }
)
app.mount('#app')
