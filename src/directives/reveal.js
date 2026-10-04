/**
 * v-reveal: adds `is-visible` when an element scrolls into view and removes it once the element is
 * fully off screen, so each entrance replays when the reader comes back in either direction.
 * Elements still need the `reveal` class, which holds the hidden starting state.
 */
import { prefersReducedMotion } from '@/composables/useReducedMotion'

let observer = null

function getObserver () {
  if (observer) return observer
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.08) {
        entry.target.classList.add('is-visible')
      } else if (!entry.isIntersecting) {
        entry.target.classList.remove('is-visible')
      }
    }
  }, { threshold: [0, 0.08], rootMargin: '0px 0px -30px 0px' })
  return observer
}

export default {
  mounted (el) {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }
    getObserver().observe(el)
  },
  unmounted (el) {
    observer?.unobserve(el)
  },
}
