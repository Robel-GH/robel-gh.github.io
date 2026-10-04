// Light / dark theme (light by default): keeps Vuetify's theme, <html data-theme> and localStorage in step.
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const STORAGE_KEY = 'robel-portfolio-theme'
export const VUETIFY_THEME = { dark: 'espresso', light: 'oat' }

export function readStoredTheme () {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function useColorTheme () {
  const theme = useTheme()
  const mode = computed(() => (theme.global.current.value.dark ? 'dark' : 'light'))

  function setMode (next) {
    const value = next === 'light' ? 'light' : 'dark'
    theme.global.name.value = VUETIFY_THEME[value]
    document.documentElement.dataset.theme = value
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      // Storage can be unavailable (private mode); the switch still works for this visit.
    }
  }

  const toggle = () => setMode(mode.value === 'dark' ? 'light' : 'dark')

  return { mode, setMode, toggle }
}
