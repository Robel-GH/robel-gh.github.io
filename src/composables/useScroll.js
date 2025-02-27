export function useScroll() {
    const scrollToSection = (sectionId) => {
      const element = document.querySelector(sectionId)
      if (element) {
        const offset = 64 // height of your app bar
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset
  
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
  
    return {
      scrollToSection
    }
  }