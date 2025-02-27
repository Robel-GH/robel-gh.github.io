import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export function useScrollSpy() {
  const router = useRouter()
  const currentSection = ref('')
  const currentDateTime = '2025-02-27 23:24:12'
  const currentUser = 'Robel-GH'

  // Debounce function to limit scroll event handling
  const debounce = (fn, delay) => {
    let timeoutId
    return (...args) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => fn(...args), delay)
    }
  }

  // Determine which section is currently in view
  const determineSectionInView = () => {
    const sections = document.querySelectorAll('section[id]')
    const scrollPosition = window.scrollY + 96 // Adding offset for header

    for (const section of sections) {
      const { top, bottom } = section.getBoundingClientRect()
      const sectionTop = top + window.scrollY
      const sectionBottom = bottom + window.scrollY

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        const newSection = section.id
        if (currentSection.value !== newSection) {
          currentSection.value = newSection
          // Update URL without triggering a new navigation
          router.replace({ 
            path: `/${newSection}`,
            hash: `#${newSection}`
          }, { replace: true })

          // Log section change with user and timestamp
          console.log(`Section changed to ${newSection} by ${currentUser} at ${currentDateTime}`)
        }
        break
      }
    }
  }

  // Create intersection observer for better performance
  const createIntersectionObserver = () => {
    const options = {
      rootMargin: '-80px 0px 0px 0px', // Adjusts for header height
      threshold: [0.2, 0.8] // Trigger when section is 20% or 80% visible
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
          const newSection = entry.target.id
          if (currentSection.value !== newSection) {
            currentSection.value = newSection
            router.replace({ 
              path: `/${newSection}`,
              hash: `#${newSection}`
            }, { replace: true })
          }
        }
      })
    }, options)

    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section)
    })

    return observer
  }

  // Debounced scroll handler as backup
  const handleScroll = debounce(determineSectionInView, 100)

  onMounted(() => {
    // Initialize intersection observer
    const observer = createIntersectionObserver()
    
    // Fallback scroll listener
    window.addEventListener('scroll', handleScroll)
    
    // Initial check
    determineSectionInView()

    // Cleanup function
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    })
  })

  // Public methods for manual control
  const scrollToSection = (sectionId) => {
    const element = document.querySelector(`#${sectionId}`)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return {
    currentSection,
    scrollToSection,
    currentUser,
    currentDateTime
  }
}