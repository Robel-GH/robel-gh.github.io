<template>
  <section
    id="about"
    class="about section-pad"
  >
    <div class="container">
      <div class="label-line">
        About
      </div>
      <div class="about-grid">
        <h2
          v-reveal
          class="reveal"
        >
          Software that<br>works for <em>real<br>users.</em>
        </h2>
        <div
          v-reveal
          class="about-copy reveal"
        >
          <ul
            class="about-chips"
            aria-label="Current projects"
          >
            <li
              v-for="chip in aboutChips"
              :key="chip.label"
            >
              <StatusChip
                :label="chip.label"
                :tone="chip.tone"
                :href="chip.href"
              />
            </li>
          </ul>
          <p>
            I build software for people who can’t afford for it to fail. Most of my work is in healthcare or for
            communities that bigger products tend to skip, so I work the same way every time: agree on what it
            should do, prove that it does it, then ship.
          </p>
          <p>
            I hold my AI work to the same standard. My Clinical RAG Assistant answers medical questions only from
            sources it can cite. At York University my research uses diffusion models to change one finding in a
            chest X-ray and leave the rest of the image untouched, so you can see exactly what changed. I’m
            finishing an MSc in AI and Computer Science at the University of Calabria.
          </p>
          <p id="meal-checker">
            I also offer Meal Checker, free of charge, to any organization that serves meals to its community.
            It’s a secure mobile and web app that replaces paper meal lists. Every resident and family member gets
            their own daily meals. At mealtime they show a QR code that refreshes automatically, staff scan it, and
            the meal is recorded instantly. No meal can be served twice, even when someone collects it for another
            person. Administrators get a live dashboard and reports in PDF, CSV and Excel. I built it with Flutter
            for Android, iOS and the web, on Supabase and PostgreSQL, hosted on Cloudflare Pages. If your
            organization could use it, <a
              class="about-link"
              href="#contact"
            >let’s talk</a>.
          </p>
          <p>
            The project closest to me is the Tigrigna Keyboard, a native keyboard for Android and iOS. Besides
            typing, people can write Tigrigna by hand, and Google’s ML Kit recognizes each character they draw.
            Eleven people are testing it now.
          </p>
          <div class="about-signature">
            <strong>Open to work</strong>
            <span>SOFTWARE, AI / ML, MOBILE</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import StatusChip from '@/components/ui/StatusChip.vue'
import { aboutChips } from '@/data/site'
</script>

<style scoped>
.about-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0 0 26px;
  padding: 0;
  list-style: none;
}
.about-link {
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
  font-weight: 600;
}
#meal-checker {
  scroll-margin-top: 110px;
}
</style>
