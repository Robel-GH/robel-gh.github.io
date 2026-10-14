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
        <a
          class="back-top"
          href="/"
          aria-label="Back to top"
          title="Back to top"
        ><AppIcon
          name="arrow-up"
          size="26"
        /></a>
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
/* Icon-only back-to-top button: a bold arrow in a round outline. */
.back-top {
  display: inline-grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border: 1.5px solid currentColor;
  border-radius: 50%;
  transition: transform .25s, background .25s, color .25s;
}
.back-top :deep(svg) {
  stroke-width: 2.75;
}
.back-top:hover {
  transform: translateY(-4px);
}
@media (prefers-reduced-motion: reduce) {
  .back-top:hover { transform: none; }
}

.contact-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 11px;
}
.contact-actions button.pill {
  cursor: pointer;
  background: transparent;
}
.contact-link-label {
  display: inline-flex;
  align-items: center;
  gap: 14px;
}
.footer-place,
.footer-icons {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.footer-icons {
  gap: 16px;
}
.footer-icons a {
  color: inherit;
}
.footer-icons a:hover {
  color: var(--highlight, var(--lime));
}
.contact-intro {
  max-width: 520px;
  line-height: 1.65;
}
</style>
