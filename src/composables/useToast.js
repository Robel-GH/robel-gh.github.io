// A small shared toast message, shown by AppToast.vue.
import { reactive } from 'vue'

const state = reactive({ visible: false, message: '' })

export function useToast () {
  function show (message) {
    state.message = message
    state.visible = false
    // re-trigger when the same message is shown twice in a row
    requestAnimationFrame(() => { state.visible = true })
  }
  return { state, show }
}
