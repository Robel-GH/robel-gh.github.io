// One shared, rAF-throttled scroll/resize listener for every component that needs it.
import { reactive } from 'vue'

const state = reactive({ y: 0, height: 0, docHeight: 0 })
let listening = false

function measure () {
  state.y = window.scrollY
  state.height = window.innerHeight
  state.docHeight = document.documentElement.scrollHeight
}

function start () {
  if (listening || typeof window === 'undefined') return
  listening = true
  let pending = false
  const schedule = () => {
    if (pending) return
    pending = true
    requestAnimationFrame(() => {
      pending = false
      measure()
    })
  }
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
  measure()
}

export function useWindowScroll () {
  start()
  return state
}
