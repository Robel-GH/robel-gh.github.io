<template>
  <div>
    <!-- Overlay Mobile Menu -->
    <transition name="fade">
      <div v-if="drawer" class="mobile-menu-overlay">
        <!-- Header with close button -->
        <div class="mobile-menu-header">
          <v-row align="center" no-gutters class="px-4 py-2">
            <v-col>
              <div class="text-h6">Menu</div>
            </v-col>
            <v-col cols="auto">
              <v-btn
                icon="mdi-close"
                variant="text"
                @click="drawer = false"
                size="large"
              />
            </v-col>
          </v-row>
        </div>

        <v-divider/>

        <!-- Navigation Content -->
        <div class="mobile-menu-content">
          <!-- Regular Buttons -->
          <v-btn
            v-for="item in headerItems.filter(item => !item.isMenu)"
            :key="item.title"
            :prepend-icon="item.icon"
            :to="item.link.path"
            block
            class="mb-2 text-left justify-start"
            variant="text"
            size="large"
            @click="(event) => handleNavigation(item.link, event)"
          >
            {{ item.title }}
          </v-btn>
        </div>

        <!-- Footer with Theme Toggle -->
        <div class="mobile-menu-footer pa-4">
          <v-divider class="mb-2"/>
          <v-switch
            v-model="model"
            :label="themeStore.theme === 'dark' ? 'Dark Theme' : 'Light Theme'"
            @click="toggleTheme"
            hide-details
            inset
            color="primary"
          />
        </div>
      </div>
    </transition>

    <!-- App Bar -->
    <v-app-bar app elevation="0" border bottom elevate-on-scroll scroll-threshold="0" class="px-2">
      <!-- Mobile menu button -->
      <v-app-bar-nav-icon
        class="d-md-none"
        @click="drawer = !drawer"
      />
     
      <v-spacer />

      <!-- Desktop Navigation -->
      <div class="d-none d-md-flex">
        <v-btn-toggle
          rounded="xl"
          size="large"
          color="primary"
          variant="outlined"
        >
          <v-btn
            v-for="item in headerItems"
            :key="item.title"
            size="large"
            class="ma-1"
           
            color="primary"
            exact
            :to="item.link.path"
            @click="(event) => handleNavigation(item.link, event)"
          >
            {{ item.title }}
          </v-btn>
        </v-btn-toggle>

        <!-- Desktop Theme Toggle -->
        
      </div>
      <v-tooltip :text="themeStore.theme === 'dark' ? 'Light Theme' : 'Dark Theme'">
          <template v-slot:activator="{ props }">
            <v-switch
              v-model="model"
              class="ml-2 d-lg-block d-none"
              @click="toggleTheme"
              hide-details
              inset
              color="primary"
              v-bind="props"
            />
          </template>
        </v-tooltip>
    </v-app-bar>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useThemeStore } from '@/plugins/theme/themeStore'
import { useRouter } from 'vue-router'

// Initialize the store
const themeStore = useThemeStore()

// Local state
const drawer = ref(false)
const model = ref(false)

// Current user and datetime
const currentUser = 'Robel-GH'
const currentDateTime = '2025-04-23 14:08:57'

// Navigation items
const headerItems = [
  { 
    title: 'About', 
    icon: 'mdi-information', 
    link: { path: '/about', section: 'about' }, 
    isMenu: false 
  },
  { 
    title: 'Skills', 
    icon: 'mdi-tools', 
    link: { path: '/skills', section: 'skills' }, 
    isMenu: false 
  },
  {
    title: 'Projects',
    icon: 'mdi-folder-outline',
    link: { path: '/projects', section: 'projects' },
    isMenu: false,
  },
  {
    title: 'Education',
    icon: 'mdi-school',
    link: { path: '/education', section: 'education' },
    isMenu: false,
  },
  {
    title: 'Experience',
    icon: 'mdi-briefcase',
    link: { path: '/experience', section: 'experience' },
    isMenu: false,
  },
  {
    title: 'Contact',
    icon: 'mdi-email',
    link: { path: '/contact', section: 'contact' },
    isMenu: false,
  }
]

const router = useRouter()

// Methods
const toggleTheme = () => {
  console.log('toggle theme')
  themeStore.toggleTheme()
}

const handleNavigation = async (link, event) => {
  // Prevent default navigation from v-btn's 'to' prop
  if (event) {
    event.preventDefault()
  }
  
  // Close mobile drawer if it's open
  drawer.value = false

  try {
    // Check if we're already on the page
    const isSamePath = router.currentRoute.value.path === link.path
    
    if (!isSamePath) {
      // If we're navigating to a new page
      await router.push(link.path)
      // Wait for route change to complete
      await nextTick()
    }
    
    // Scroll to section after ensuring the page is loaded
    if (link.section) {
      setTimeout(() => {
        const element = document.getElementById(link.section)
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 100) // Small delay to ensure DOM is ready
    }
  } catch (error) {
    console.error('Navigation error:', error)
  }
}
</script>

<style scoped>
/* Styles remain unchanged */
</style>

<style scoped>
/* Mobile Menu Overlay */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgb(var(--v-theme-surface));
  z-index: 9999;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

/* Mobile Menu Header */
.mobile-menu-header {
  position: sticky;
  top: 0;
  background-color: rgb(var(--v-theme-surface));
  z-index: 1;
  border-bottom: 1px solid rgba(var(--v-border-color), 0.12);
}

/* Mobile Menu Content */
.mobile-menu-content {
  flex-grow: 1;
  overflow-y: auto;
  background-color: rgb(var(--v-theme-surface));
}

/* Mobile Menu Footer */
.mobile-menu-footer {
  position: sticky;
  bottom: 0;
  background-color: rgb(var(--v-theme-surface));
  z-index: 1;
}

/* Button Styles */
.v-btn {
  text-transform: none;
  letter-spacing: normal;
}

/* Expansion Panel Styles */
.v-expansion-panel {
  background-color: rgb(var(--v-theme-surface));
}

.v-expansion-panel-title {
  min-height: 48px;
}

/* Transition Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive Adjustments */
@media (max-width: 960px) {
  .mobile-menu-content {
    padding: 1rem;
  }
  
  .mobile-menu-content .v-btn {
    margin-bottom: 0.5rem;
    padding: 1rem;
    font-size: 1rem;
  }
}

@media (max-width: 600px) {
  .v-toolbar-title {
    font-size: 16px;
  }
  
  .mobile-menu-header {
    padding: 0.5rem 1rem;
  }
  
  .mobile-menu-content {
    padding: 0.5rem;
  }
  
  .mobile-menu-content .v-btn {
    margin-bottom: 0.25rem;
    padding: 0.75rem;
    font-size: 0.9rem;
  }
  
  .mobile-menu-footer {
    padding: 1rem;
  }
}

@media (max-width: 400px) {
  .mobile-menu-content .v-btn {
    padding: 0.5rem;
    font-size: 0.85rem;
  }
  
  .mobile-menu-footer {
    padding: 0.75rem;
  }
}
</style>