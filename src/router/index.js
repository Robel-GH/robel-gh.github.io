/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'

const routes = [
  {
    path: '/',
    component: () => import('../layouts/default.vue'),
    children: [
      // {
      //   path: '',  // Empty path for root
      //   name: 'home',
      //   redirect: '/about'
      // },
      {
        path: '/about',
        name: 'about',
        component: () => import('../pages/about/About.vue')
      },
      {
        path: '/projects',
        name: 'projects',
        component: () => import('../pages/projects/Projects.vue')
      },
      {
        path: '/skills',
        name: 'skills',
        component: () => import('../pages/skills/Skills.vue')
      },
      {
        path: '/education',
        name: 'education',
        component: () => import('../pages/education/Education.vue')
      },
      {
        path: '/experience',
        name: 'experience',
        component: () => import('../pages/experience/Experience.vue')
      },
      {
        path: '/contact',
        name: 'contact',
        component: () => import('../pages/contact/Contact.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 64 // offset for the app bar height
      }
    }

    // If the route has a section attribute, scroll to that section
    if (to.meta.section) {
      return {
        el: `#${to.meta.section}`,
        behavior: 'smooth',
        top: 64
      }
    }

    // Default scroll to top
    return { 
      top: 0,
      behavior: 'smooth'
    }
  }
})

// Error handling for dynamic imports
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router