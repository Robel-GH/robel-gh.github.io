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
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#FFFFFF',
          surface: '#FAFAFA',
          primary: '#1976D2',
          secondary: '#26A69A',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          error: '#FF5252',
        },
      },
      dark: {
        dark: true,
        colors: {
          // Align background/surface to match header/footer appearance
          background: '#3A3D3F',
          surface: '#3A3D3F',
          primary: '#90CAF9',
          secondary: '#80CBC4',
          info: '#64B5F6',
          success: '#81C784',
          warning: '#FFD54F',
          error: '#EF9A9A',
        },
      },
    },
  },
})



export default  vuetify