// src/stores/themeStore.js
import { defineStore } from 'pinia'
// import { useVuetify } from 'vuetify'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: 'light',
  }),
  actions: {
    toggleTheme() {
    
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
    //   console.log(this.theme)
    //   const vm = getCurrentInstance()
    //   const vuetify = vm?.appContext.config.globalProperties.$vuetify
    //   vuetify.theme.global.name.value = this.theme
    //   const vuetify = useVuetify()
    //   vuetify.theme.global.name.value = this.theme
    },
  },
})
