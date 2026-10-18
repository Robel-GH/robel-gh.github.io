/**
 * plugins/vuetify.js
 *
 * Two themes that mirror the site's palettes. Vuetify uses them for its own
 * components (dialog, form fields, snackbar); the page itself is styled by
 * src/styles, keyed on <html data-theme="dark|light">.
 */
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { readStoredTheme, VUETIFY_THEME } from '@/composables/useColorTheme'

export const vuetifyOptions = {
  theme: {
    defaultTheme: VUETIFY_THEME[readStoredTheme()],
    themes: {
      // Espresso: dark roast background, sage accent
      espresso: {
        dark: true,
        colors: {
          background: '#211713',
          surface: '#2A1D18',
          primary: '#8FA28A',
          'on-primary': '#211713',
          secondary: '#C6B5A8',
          error: '#FF9B85',
          success: '#8FA28A',
        },
      },
      // Oat: warm cream background, espresso accent
      oat: {
        dark: false,
        colors: {
          background: '#FAF6F0',
          surface: '#FFFFFF',
          primary: '#6B4435',
          'on-primary': '#FFFFFF',
          secondary: '#78665B',
          error: '#A33A2A',
          success: '#6B4435',
        },
      },
    },
  },
  defaults: {
    VTextField: { variant: 'outlined', density: 'comfortable', color: 'primary', hideDetails: 'auto' },
    VTextarea: { variant: 'outlined', density: 'comfortable', color: 'primary', hideDetails: 'auto' },
  },
}

export default createVuetify(vuetifyOptions)
