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
        <div class="mobile-menu-content ">
          <!-- Regular Buttons -->
          <v-btn
            v-for="item in headerItems.filter(item => !item.isMenu)"
            :key="item.title"
            :prepend-icon="item.icon"
            :to="item.link"
            block
            class="mb-2 text-left justify-start"
           
            variant="text"
            size="large"
            @click="drawer = false"
          >
            {{ item.title }}
          </v-btn>

          <!-- Expandable Buttons -->
          <v-expansion-panels class="mt-2">
            <v-expansion-panel
              v-for="item in headerItems.filter(item => item.isMenu)"
              :key="item.title"
              class="mb-2"
              elevation="0"
            >
              <v-expansion-panel-title>
                <v-row no-gutters align="center">
                  <v-col cols="auto" class="mr-4">
                    <v-icon :icon="item.icon" />
                  </v-col>
                  <v-col>{{ item.title }}</v-col>
                </v-row>
              </v-expansion-panel-title>

              <v-expansion-panel-text>
                <!-- First Level Items -->
                <div 
                  v-for="subMenu in item.subMenu" 
                  :key="subMenu.title"
                >
                  <!-- Regular Submenu Button -->
                  <v-btn
                    v-if="!subMenu.isSubMenu"
                    block
                    class="mb-2 text-left justify-start"
                    variant="text"
                    @click="drawer = false"
                  >
                    {{ subMenu.title }}
                  </v-btn>

                  <!-- Expandable Submenu -->
                  <v-expansion-panels
                    v-else
                    class="mt-2 mb-4"
                    elevation="0"
                  >
                    <v-expansion-panel>
                      <v-expansion-panel-title>
                        {{ subMenu.title }}
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <v-btn
                          v-for="subSubMenu in subMenu.subSubMenu"
                          :key="subSubMenu.title"
                          block
                          class="mb-2 text-left justify-start"
                          variant="text"
                          density="comfortable"
                          @click="drawer = false"
                        >
                          {{ subSubMenu.title }}
                        </v-btn>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>

        <!-- Footer with Theme Toggle -->
        <div class="mobile-menu-footer pa-4">
          <v-divider class="mb-4"/>
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
    <v-app-bar app dark extended class="pt-4">
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
        >
          <v-btn
            v-for="item in headerItems"
            :key="item.title"
            size="large"
            class="ma-1"
            :append-icon="item.isMenu ? 'mdi-chevron-down' : ''"
            exact
          >
            {{ item.title }}

            <!-- Desktop Dropdown Menu -->
            <v-menu
              v-if="item.isMenu"
              activator="parent"
              open-on-hover
            >
              <v-list>
                <v-list-item
                  v-for="subMenu in item.subMenu"
                  :key="subMenu.title"
                  link
                >
                  <v-list-item-title>{{ subMenu.title }}</v-list-item-title>
                  
                  <template v-slot:append>
                    <v-icon
                      v-if="subMenu.isSubMenu"
                      icon="mdi-menu-right"
                      size="x-small"
                    />
                  </template>

                  <!-- Nested Dropdown Menu -->
                  <v-menu
                    v-if="subMenu.isSubMenu"
                    activator="parent"
                    open-on-hover
                    location="end"
                  >
                    <v-list>
                      <v-list-item
                        v-for="subSubMenu in subMenu.subSubMenu"
                        :key="subSubMenu.title"
                        link
                      >
                        <v-list-item-title>{{ subSubMenu.title }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-btn>
        </v-btn-toggle>

        <!-- Desktop Theme Toggle -->
        <v-tooltip :text="themeStore.theme === 'dark' ? 'Light Theme' : 'Dark Theme'">
          <template v-slot:activator="{ props }">
            <v-switch
              v-model="model"
              class="mr-2 "
              @click="toggleTheme"
              hide-details
              inset
              color="primary"
              v-bind="props"
            />
          </template>
        </v-tooltip>
      </div>
    </v-app-bar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useThemeStore } from '@/plugins/theme/themeStore'

// Initialize the store
const themeStore = useThemeStore()

// Local state
const drawer = ref(false)
const model = ref(true)

// Current user and datetime
const currentUser = 'Robel-GH'
const currentDateTime = '2025-02-22 17:29:02'

// Navigation items (same as before)
const headerItems = [
  { title: 'About', icon: 'mdi-information', link: '/about', isMenu: false },
   { title: 'Skills', icon: 'mdi-information', link: '/skills', isMenu: false },
  {
    title: 'Projects',
    icon: 'mdi-folder-outline ',
    link: '/projects',
    isMenu: true,
    subMenu: [
      {
        title: 'Software Development',
        isSubMenu: true,
        subSubMenu: [
          { title: 'Web Development', isSubMenu: false },
          { title: 'Mobile Development', isSubMenu: false },
          { title: 'Desktop Development', isSubMenu: false },
          { title: 'Game Development', isSubMenu: false },
        ]
      },
      {
        title: 'Artificial Intelligence',
        isSubMenu: true,
        subSubMenu: [
          { title: 'Machine Learning', isSubMenu: false },
          { title: 'Deep Learning', isSubMenu: false },
          { title: 'Computer Vision', isSubMenu: false },
          { title: 'Natural Language Processing', isSubMenu: false },
          { title: 'Reinforcement Learning', isSubMenu: false },
        ]
      },
      { title: 'Data Science', isSubMenu: false },
    ]
  },
  {
    title: 'Education',
    icon: 'mdi-school',
    link: '/education',
    isMenu: true,
    subMenu: [
      { title: 'Master Degree' },
      { title: 'Bachelor Degree' },
      { title: 'Preparatory School' },
      { title: 'High School' },
    ]
  },
  {
    title: 'Experience',
    icon: 'mdi-briefcase',
    link: '/experience',
    isMenu: true,
    subMenu: [
      { title: 'Academic' },
      { title: 'Industry' },
      { title: 'Internship' }
    ]
  },
  { title: 'Contact', icon: 'mdi-email', link: '/contact', isMenu: false }
]

// Methods
const toggleTheme = () => {
  console.log('toggle theme')
  themeStore.toggleTheme()
}
</script>

<style scoped>
/* Mobile Menu Overlay */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgb(var(--v-theme-surface)); 
  /* background-color: var(--v-background); */
  z-index: 9999; /* Ensures menu is above all other components */
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

/* Mobile Menu Header */
.mobile-menu-header {
  position: sticky;
  top: 0;
  background-color: rgb(var(--v-theme-surface)); 
  /* background-color: var(--v-background); */
  z-index: 1;
  border-bottom: 1px solid rgba(var(--v-border-color), 0.12);
}

/* User Profile Section */


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
  /* background-color: var(--v-background); */
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
  /* background: transparent !important; */
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
@media (max-width: 600px) {
  .v-toolbar-title {
    font-size: 16px;
  }
}
</style>