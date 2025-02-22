<template>
  <v-app-bar app dark  extended class=" pt-4">
  
    <v-spacer />
      
     <v-btn-toggle
     rounded="xl"
    size="large" 
    color="primary"
    >
    <v-btn size="large"     class="ma-1"    :append-icon="item.isMenu ? 'mdi-chevron-down' : ''"  v-for="item in headerItems" :key="item.title" exact>
        <!-- //:to="item.link"  -->
      {{ item.title }}
      
      <v-menu activator="parent" v-if="item.isMenu" open-on-hover>
        <v-list>
          <v-list-item v-for="i in 5" :key="i" link>
            <v-list-item-title>Item {{ i }}</v-list-item-title>
            <template v-slot:append>
              <v-icon icon="mdi-menu-right" size="x-small"></v-icon>
            </template>

            <v-menu :open-on-focus="false" activator="parent" open-on-hover submenu>
              <v-list>
                <v-list-item v-for="j in 5" :key="j" link>
                  <v-list-item-title>Item {{ i }} - {{ j }}</v-list-item-title>
                  <template v-slot:append>
                    <v-icon icon="mdi-menu-right" size="x-small"></v-icon>
                  </template>

                  <v-menu :open-on-focus="false" activator="parent" open-on-hover submenu>
                    <v-list>
                      <v-list-item v-for="k in 5" :key="k" link>
                        <v-list-item-title>Item {{ i }} - {{ j }} - {{ k }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item>
        </v-list>
      </v-menu>
      
    </v-btn>
  
     </v-btn-toggle>
     
     <v-tooltip :text="themeStore.theme === 'dark' ? 'Light Theme' : 'Dark Theme'">
      <template v-slot:activator="{ props }">
       
         <v-switch
          class="mr-2"
          v-model="model"
          @click="toggleTheme"
          hide-details
          inset
          color="primary"
          v-bind="props"
      ></v-switch>
      </template>
    </v-tooltip>
    
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue'
import { useThemeStore } from '@/plugins/theme/themeStore'

// Initialize the store
const themeStore = useThemeStore()

// Local state
const drawer = ref(false)
const model = ref(true)
const headerItems = [
  { title: 'About', icon: 'mdi-information', link: '/about', isMenu: false },
  { title: 'Projects', icon: 'mdi-briefcase', link: '/projects', isMenu: true },
  { title: 'Education', icon: 'mdi-school', link: '/education', isMenu: true },
  { title: 'Experience', icon: 'mdi-briefcase', link: '/experience', isMenu: true },
  { title: 'Contact', icon: 'mdi-email', link: '/contact', isMenu: false }
]

// Methods
const toggleTheme = () => {
  console.log('toggle theme')
  themeStore.toggleTheme()
}
</script>

<style scoped>
/* Responsive toolbar adjustments */
@media (max-width: 600px) {
  .v-toolbar-title {
    font-size: 16px;
  }
}
.responsive-image { width: 100%; height: auto; }
</style>
