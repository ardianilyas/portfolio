<template>
  <header
    class="navbar"
    :class="{ 'navbar--scrolled': scrolled || isOpen }"
    role="banner"
  >
    <div class="navbar-inner">

      <!-- Left: Logo -->
      <div class="navbar-left">
        <a href="#" class="navbar-logo" aria-label="Ardian Ilyas — Home">
          ardianilyas
        </a>
      </div>

      <!-- Center: Desktop nav links -->
      <div class="navbar-center">
        <nav class="navbar-links" aria-label="Primary navigation">
          <a
            v-for="link in navLinks"
            :key="link.id"
            :href="'#' + link.id"
            class="navbar-link"
            :class="{ 'navbar-link--active': activeSection === link.id }"
            @click.prevent="scrollTo(link.id)"
          >
            {{ link.label }}
          </a>
        </nav>
      </div>

      <!-- Right: CTA & Mobile Hamburger -->
      <div class="navbar-right">
        <a
          href="mailto:ardianilyas@gmail.com"
          class="navbar-cta hidden md:inline-flex"
          aria-label="Get in touch via email"
        >
          Get in touch
        </a>
        
        <button
          class="hamburger md:hidden"
          @click="isOpen = !isOpen"
          :aria-expanded="isOpen"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          <span class="hamburger-line" :class="{ 'open-top': isOpen }"></span>
          <span class="hamburger-line" :class="{ 'open-mid': isOpen }"></span>
          <span class="hamburger-line" :class="{ 'open-bot': isOpen }"></span>
        </button>
      </div>

    </div>

    <!-- Mobile menu -->
    <Transition name="slide-down">
      <div
        v-if="isOpen"
        id="mobile-menu"
        class="mobile-menu"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="'#' + link.id"
          class="mobile-link"
          :class="{ 'mobile-link--active': activeSection === link.id }"
          @click.prevent="scrollTo(link.id)"
        >
          {{ link.label }}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
        <a
          href="mailto:ardianilyas@gmail.com"
          class="mobile-link mobile-link--accent"
          @click="isOpen = false"
        >
          Get in touch
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)
const scrolled = ref(false)
const activeSection = ref('')

const navLinks = [
  { id: 'skills',    label: 'Skills' },
  { id: 'tools',     label: 'Tools' },
  { id: 'portfolio', label: 'Projects' },
]

let observer: IntersectionObserver | null = null

function scrollTo(id: string) {
  isOpen.value = false
  setTimeout(() => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, 100)
}

function onScroll() {
  scrolled.value = window.scrollY > 12
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  
  // Setup scroll spy
  const options = {
    root: null,
    rootMargin: '-30% 0px -40% 0px',
    threshold: 0
  }
  
  const visibleSections = new Set()

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visibleSections.add(entry.target.id)
      } else {
        visibleSections.delete(entry.target.id)
      }
    })
    
    // Pick the last section in our list that is currently visible
    const sectionsArr = ['hero', ...navLinks.map(l => l.id)]
    for (let i = sectionsArr.length - 1; i >= 0; i--) {
      if (visibleSections.has(sectionsArr[i])) {
        activeSection.value = sectionsArr[i]
        break
      }
    }
  }, options)

  // Observe all sections including hero
  const sections = ['hero', ...navLinks.map(l => l.id)]
  sections.forEach(id => {
    const el = document.getElementById(id)
    if (el) observer?.observe(el)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  if (observer) observer.disconnect()
})
</script>

<style scoped>
/* ── Shell ───────────────────────────────────────────── */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 64px;
  background: var(--color-bg);
  transition: background 0.3s ease, border-color 0.3s ease;
  border-bottom: 1px solid transparent;
}

.navbar--scrolled {
  background: rgba(250, 250, 248, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom-color: var(--color-border);
}

/* ── Inner layout ─────────────────────────────────────── */
.navbar-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

@media (min-width: 768px) {
  .navbar-inner { padding: 0 40px; }
}

.navbar-left {
  display: flex;
  justify-content: flex-start;
}

.navbar-center {
  display: flex;
  justify-content: center;
}

.navbar-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

/* ── Logo ─────────────────────────────────────────────── */
.navbar-logo {
  font-family: var(--font-sans);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--color-text);
  transition: opacity 0.2s;
}

.navbar-logo:hover { opacity: 0.6; }

/* ── Desktop links ─────────────────────────────────────── */
.navbar-links {
  display: none;
  align-items: center;
  gap: 4px;
  background: var(--color-surface);
  border: 1px solid transparent;
  padding: 4px;
  border-radius: 9999px;
  transition: background 0.3s ease, border-color 0.3s ease;
}

@media (min-width: 768px) {
  .navbar-links { display: flex; }
}

.navbar-link {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--color-text-2);
  padding: 8px 16px;
  border-radius: 9999px;
  transition: color 0.3s ease, background 0.3s ease;
}

.navbar-link:hover {
  color: var(--color-text);
}

.navbar-link--active {
  background: #ffffff;
  color: var(--color-text);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* ── CTA ─────────────────────────────────────────────── */
.navbar-cta {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-inv);
  background: var(--color-text);
  padding: 10px 20px;
  transition: opacity 0.2s, transform 0.2s ease;
}

.navbar-cta:hover { 
  opacity: 0.85; 
  transform: translateY(-1px);
}
.navbar-cta:active {
  transform: translateY(1px);
}

/* ── Hamburger ─────────────────────────────────────────── */
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

@media (min-width: 768px) {
  .hamburger { display: none; }
}

.hamburger-line {
  display: block;
  width: 22px;
  height: 1.5px;
  background: var(--color-text);
  border-radius: 1px;
  transition: transform 0.25s ease, opacity 0.25s ease;
  transform-origin: center;
}

.hamburger-line.open-top  { transform: translateY(6.5px) rotate(45deg); }
.hamburger-line.open-mid  { opacity: 0; }
.hamburger-line.open-bot  { transform: translateY(-6.5px) rotate(-45deg); }

/* ── Mobile menu ───────────────────────────────────────── */
.mobile-menu {
  position: absolute;
  top: 64px;
  left: 0;
  right: 0;
  background: rgba(250, 250, 248, 0.97);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-border);
  padding: 8px 0 16px;
}

.mobile-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--font-sans);
  font-size: 17px;
  font-weight: 400;
  color: var(--color-text-2);
  padding: 14px 24px;
  border-top: 1px solid var(--color-border);
  transition: color 0.2s, background 0.2s;
}

.mobile-link:hover {
  color: var(--color-text);
  background: var(--color-surface);
}

.mobile-link--active {
  color: var(--color-text);
  font-weight: 500;
}

.mobile-link--accent {
  color: var(--color-accent);
}

/* ── Transitions ───────────────────────────────────────── */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
