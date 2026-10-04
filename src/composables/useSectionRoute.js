/**
 * Clean section URLs without "#": /about, /projects, … and "/" for the top of the page.
 *
 * - While the visitor scrolls, the address bar follows the section in view (replaceState, so
 *   scrolling never fills the Back history).
 * - Clicking a link to a section scrolls there smoothly and adds one history entry (pushState),
 *   so Back / Forward step between the sections the visitor chose.
 * - Opening /skills directly scrolls to Skills. On GitHub Pages that path has no file, so
 *   public/404.html sends the visitor to /?p=/skills and index.html restores the path first.
 * - Old links such as /#skills still work and are tidied to /skills.
 */
import { computed, ref, watch } from 'vue'
import { navItems } from '@/data/site'
import { focusQuery } from '@/data/focus'
import { useWindowScroll } from './useWindowScroll'
import { prefersReducedMotion } from './useReducedMotion'

const SECTION_IDS = navItems.map((item) => item.id)
let installed = false
export const sectionPath = (id) => (SECTION_IDS.includes(id) ? `/${id}` : '/')

const idFromPath = (pathname) => {
  const first = pathname.split('/').filter(Boolean)[0]
  return SECTION_IDS.includes(first) ? first : null
}

const scroll = useWindowScroll()

// The last section whose top has passed 40% of the viewport ('' while on the hero).
const activeSection = computed(() => {
  if (scroll.y < 0) return '' // reads scroll.y so this recomputes on every scroll
  let current = ''
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id)
    if (el && el.getBoundingClientRect().top < scroll.height * 0.4) current = id
  }
  return current
})

// While a click-triggered smooth scroll is running, hold the URL on its destination
// instead of flickering through every section it passes.
const navigating = ref(false)
let settleTimer = null
function holdUntilScrollSettles () {
  navigating.value = true
  clearTimeout(settleTimer)
  settleTimer = setTimeout(() => { navigating.value = false }, 180)
}
watch(() => scroll.y, () => { if (navigating.value) holdUntilScrollSettles() })

function setUrl (id, push = false) {
  // Keep ?focus=… so a role-specific link stays role-specific while the visitor scrolls.
  const path = sectionPath(id) + focusQuery
  if (location.pathname + location.search === path && !location.hash) return
  history[push ? 'pushState' : 'replaceState']({ section: id || 'home' }, '', path)
}

watch([activeSection, navigating], ([id, busy]) => {
  // Leave the URL alone until installSectionRouting() has read the path the visitor arrived on.
  if (installed && !busy) setUrl(id)
})

function scrollToSection (id, { smooth = true } = {}) {
  const el = SECTION_IDS.includes(id) ? document.getElementById(id) : null
  const behavior = smooth && !prefersReducedMotion() ? 'smooth' : 'instant'
  holdUntilScrollSettles()
  if (el) el.scrollIntoView({ behavior, block: 'start' })
  else window.scrollTo({ top: 0, behavior })
}

/** Scroll to a section ('' or 'home' for the top) and record it as a history step. */
export function goToSection (id) {
  scrollToSection(id)
  setUrl(SECTION_IDS.includes(id) ? id : '', true)
}

/** Call once from App.vue after mount. */
export function installSectionRouting () {
  if (installed) return
  installed = true
  history.scrollRestoration = 'manual'

  // Arrive on the section named by the path (or by an old #hash link), then tidy the URL.
  const fromHash = location.hash && SECTION_IDS.includes(location.hash.slice(1)) ? location.hash.slice(1) : null
  const initial = fromHash || idFromPath(location.pathname)
  history.replaceState({ section: initial || 'home' }, '', sectionPath(initial) + focusQuery)
  if (initial) requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(initial, { smooth: false })))

  // Back / Forward between sections.
  window.addEventListener('popstate', () => scrollToSection(idFromPath(location.pathname) || ''))

  // Any same-site link to a section path ("/projects") or hash ("#projects", "#home").
  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const link = event.target.closest('a[href]')
    if (!link || link.target === '_blank') return
    const href = link.getAttribute('href')
    let id
    if (href.startsWith('#')) {
      id = href.slice(1)
      if (id === 'main') { // skip link: move focus without touching the URL
        event.preventDefault()
        const main = document.getElementById('main')
        main.setAttribute('tabindex', '-1')
        main.focus({ preventScroll: true })
        scrollToSection('about')
        return
      }
      if (id !== 'home' && !SECTION_IDS.includes(id)) return
    } else {
      const url = new URL(link.href)
      if (url.origin !== location.origin) return
      id = url.pathname === '/' ? 'home' : idFromPath(url.pathname)
      if (!id) return
    }
    event.preventDefault()
    goToSection(id === 'home' ? '' : id)
  })
}

export function useSectionRoute () {
  return { activeSection, sectionPath, goToSection }
}
