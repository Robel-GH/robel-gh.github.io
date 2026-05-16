/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com
 */
// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
// Composables
import { createVuetify } from 'vuetify'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      // "Kodachrome Afternoon" — 70s film stock, warm and saturated
      light: {
        dark: false,
        colors: {
          background: '#F5EFE0', // kodachrome cream — never pure white
          surface:    '#FBF6E9', // lifted paper
          primary:    '#C04C2F', // rust red — the hero, confident and warm
          secondary:  '#2B4C7E', // deep film-stock blue — anchors the warmth
          info:       '#4A7BA8', // washed denim
          success:    '#5C8A3A', // chlorophyll, not Material green
          warning:    '#E8A317', // saturated mustard
          error:      '#9F2B2B', // cinema red, oxidized
        },
      },
      // "Sodium Vapor" — neo-noir, night under street lamps
      dark: {
        dark: true,
        colors: {
          background: '#0D0D11', // true cinema dark with a violet undertone
          surface:    '#16161F', // raised, slightly cooler
          primary:    '#FF8C42', // sodium-lamp amber glow
          secondary:  '#C77DFF', // synthwave violet — the cool counterweight
          info:       '#5DADE2', // monitor blue
          success:    '#58D68D', // CRT phosphor green
          warning:    '#F4D03F', // incandescent bulb
          error:      '#FF5E62', // neon-sign red
        },
      },
    },
  },
})

export default vuetify