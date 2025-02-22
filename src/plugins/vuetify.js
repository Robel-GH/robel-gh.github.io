/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// import {useThemeStore} from '@/plugins/theme/themeStore'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
 
const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
    // themes: {
    //   dark: {
    //     dark: true,
    //     colors: {
    //       background: '#121212',
    //       surface: '#1E1E1E',
    //       primary: '#BB86FC',
    //       secondary: '#03DAC6',
    //     },
    //   },
    //   light: {
    //     dark: false,
    //     colors: {
    //       background: '#FFFFFF',
    //       surface: '#F5F5F5',
    //       primary: '#6200EE',
    //       secondary: '#03DAC6',
    //     },
    //   },
    // },
  },
})



export default  vuetify