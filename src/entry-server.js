/**
 * entry-server.js
 *
 * Renders the page to HTML at build time (see scripts/prerender.mjs), so the content is in
 * index.html before any JavaScript runs. In the browser, main.js then mounts the app as usual.
 */
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createVuetify } from 'vuetify'
import App from './App.vue'
import { vuetifyOptions } from './plugins/vuetify'
import reveal from './directives/reveal'

export async function render () {
  const app = createSSRApp(App)
  app.use(createVuetify({ ...vuetifyOptions, ssr: true }))
  app.directive('reveal', reveal)
  return renderToString(app)
}
