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
          class="pill pill-copy"
          type="button"
          :aria-label="`Copy email address ${owner.email}`"
          :title="`Copy ${owner.email}`"
          @click="copyEmail"
        >
          <AppIcon name="copy" /> <span class="pill-label">{{ owner.email }}</span>
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
          Are you hiring a software, mobile or AI engineer in Canada or remote? I can start immediately, and I’d
          be glad to talk through any of my projects and how I’d approach your team’s work.
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
.contact-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
/* Phones: the three buttons share one row (the copy button shows only its icon),
   with less space before the intro. */
@media (max-width: 760px) {
  .contact-actions {
    flex-wrap: nowrap;
    gap: 6px;
  }
  .contact-actions .pill {
    min-height: 40px;
    padding: 0 13px;
    gap: 7px;
    font-size: 12px;
  }
  .contact-actions .pill-copy {
    width: 40px;
    padding: 0;
  }
  .pill-label {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  .contact-grid {
    margin-top: 36px;
  }
}
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
