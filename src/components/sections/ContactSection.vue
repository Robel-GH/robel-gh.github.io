<template>
  <section
    id="contact"
    class="contact"
  >
    <div class="container">
      <div class="label-line">
        Contact
      </div>
      <h2
        v-reveal
        class="reveal"
      >
        Get in<br><em>touch.</em>
      </h2>
      <div class="contact-actions">
        <a
          class="pill primary"
          :href="`mailto:${owner.email}?subject=${encodeURIComponent('Opportunity for Robel')}`"
        ><AppIcon name="mail" /> Email me</a>
        <button
          class="pill"
          type="button"
          @click="copyEmail"
        >
          <AppIcon name="copy" /> {{ owner.email }}
        </button>
        <a
          class="pill"
          :href="owner.resume"
          target="_blank"
          rel="noopener"
        ><AppIcon name="file" /> Résumé</a>
      </div>

      <div class="contact-grid">
        <p class="contact-intro">
          Hiring for a software, mobile or junior ML role in Canada or remote? I can start immediately and I’m
          happy to walk through any project, including the private client work.
        </p>
        <div class="contact-links">
          <a
            v-for="link in socialLinks"
            :key="link.label"
            :href="link.href"
            :target="link.href.startsWith('mailto:') ? undefined : '_blank'"
            rel="noopener"
          ><span class="contact-link-label"><AppIcon
            :name="link.icon"
            size="22"
          /> {{ link.label }}</span> <AppIcon
            name="arrow-up-right"
            size="20"
          /></a>
        </div>
      </div>

      <footer class="footer">
        <div>© {{ year }} {{ owner.name }}</div>
        <div class="footer-place">
          <AppIcon name="map-pin" /> {{ owner.location.toUpperCase() }}
        </div>
        <div class="footer-icons">
          <a
            v-for="link in socialLinks"
            :key="link.label"
            :href="link.href"
            :target="link.href.startsWith('mailto:') ? undefined : '_blank'"
            rel="noopener"
            :aria-label="link.label"
            :title="link.label"
          ><AppIcon
            :name="link.icon"
            size="18"
          /></a>
        </div>
      </footer>
    </div>
  </section>
</template>

<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'
import { owner, socialLinks } from '@/data/site'
import { useToast } from '@/composables/useToast'

const year = new Date().getFullYear()
const toast = useToast()

async function copyEmail () {
  try {
    await navigator.clipboard.writeText(owner.email)
    toast.show('Email address copied')
  } catch {
    location.href = `mailto:${owner.email}`
  }
}
</script>

<style scoped>
.footer {
  align-items: center;
}
.footer-place {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
/* Social icons: evenly spaced round buttons, all the same size. */
.footer-icons {
  display: flex;
  align-items: center;
  gap: 10px;
}
.footer-icons a {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid color-mix(in srgb, currentColor 35%, transparent);
  border-radius: 50%;
  transition: border-color .2s, background .2s, transform .2s;
}
.footer-icons a:hover {
  border-color: currentColor;
  background: color-mix(in srgb, currentColor 8%, transparent);
  transform: translateY(-2px);
}
@media (prefers-reduced-motion: reduce) {
  .footer-icons a:hover { transform: none; }
}
</style>
