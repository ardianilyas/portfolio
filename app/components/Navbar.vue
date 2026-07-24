<template>
  <header
    class="navbar"
    :class="{ 'navbar--scrolled': scrolled || isOpen, 'is-loaded': isLoaded }"
    role="banner"
  >
    <div class="navbar-inner">

      <!-- Left: Logo -->
      <div class="navbar-left">
        <NuxtLink to="/" class="navbar-logo" aria-label="Ardian Ilyas — Home">
          ardianilyas
        </NuxtLink>
      </div>

      <!-- Center: Desktop nav links -->
      <div class="navbar-center">
        <nav class="navbar-links" aria-label="Primary navigation" ref="navLinksContainer">
          <span class="active-pill-indicator" :style="pillStyle"></span>
          <NuxtLink
            v-for="link in navLinks"
            :key="link.id"
            :ref="el => setLinkRef(link.id, el)"
            :to="link.isPage ? link.path : '/#' + link.id"
            class="navbar-link"
            :class="{ 'navbar-link--active': activeSection === link.id }"
            @click="handleNavClick(link, $event)"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
      </div>

      <!-- Right: CTA & Mobile Hamburger -->
      <div class="navbar-right">
        <LanguageSwitcher class="hidden md:inline-flex" />
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
        <NuxtLink
          v-for="link in navLinks"
          :key="link.id"
          :to="link.isPage ? link.path : '/#' + link.id"
          class="mobile-link"
          :class="{ 'mobile-link--active': activeSection === link.id }"
          @click="handleNavClick(link, $event)"
        >
          {{ link.label }}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </NuxtLink>
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
        <div class="mobile-actions">
          <LanguageSwitcher />
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, reactive, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from '#imports'

const route = useRoute()
const router = useRouter()

const isOpen = ref(false)
const scrolled = ref(false)
const isLoaded = ref(false)
const activeSection = ref('')
const linkRefs = reactive<Record<string, HTMLElement | null>>({})

interface NavItem {
  id: string
  label: string
  isPage?: boolean
  path?: string
}

const navLinks: NavItem[] = [
  { id: 'skills',    label: 'Skills' },
  { id: 'tools',     label: 'Tools' },
  { id: 'portfolio', label: 'Projects' },
  { id: 'blog',      label: 'Blog', isPage: true, path: '/blog' },
]

const setLinkRef = (id: string, el: any) => {
  if (el) {
    const rawEl = el.$el ? el.$el : el
    if (rawEl && typeof rawEl === 'object' && 'offsetLeft' in rawEl) {
      linkRefs[id] = rawEl as HTMLElement
    }
  }
}

const pillStyle = reactive({
  transform: 'translateX(0px)',
  width: '0px',
  opacity: 0
})

const updatePill = () => {
  if (typeof window === 'undefined') return
  nextTick(() => {
    const el = linkRefs[activeSection.value]
    if (el && activeSection.value && activeSection.value !== 'hero') {
      pillStyle.transform = `translateX(${el.offsetLeft}px)`
      pillStyle.width = `${el.offsetWidth}px`
      pillStyle.opacity = 1
    } else {
      pillStyle.opacity = 0
    }
  })
}

watch(activeSection, () => {
  updatePill()
})

watch(() => route.path, (newPath) => {
  if (typeof window === 'undefined') return
  if (newPath.startsWith('/blog')) {
    activeSection.value = 'blog'
    updatePill()
  } else if (newPath.startsWith('/projects')) {
    activeSection.value = 'portfolio'
    updatePill()
  } else if (newPath === '/') {
    onScroll()
  } else {
    activeSection.value = ''
    updatePill()
  }
}, { immediate: true })

function handleNavClick(link: NavItem, event: MouseEvent) {
  isOpen.value = false
  if (link.isPage) {
    activeSection.value = link.id
    updatePill()
    return
  }

  event.preventDefault()
  scrollTo(link.id)
}

function scrollTo(id: string) {
  if (typeof window === 'undefined') return
  if (route.path !== '/') {
    router.push('/#' + id)
    return
  }

  activeSection.value = id
  updatePill()

  const el = document.getElementById(id)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

function onScroll() {
  if (typeof window === 'undefined') return
  scrolled.value = window.scrollY > 12

  if (route.path !== '/') return

  const sections = ['hero', 'skills', 'tools', 'portfolio']
  const scrollPosition = window.scrollY + window.innerHeight * 0.35

  let current = ''
  for (let i = sections.length - 1; i >= 0; i--) {
    const el = document.getElementById(sections[i])
    if (el) {
      const top = el.offsetTop
      if (scrollPosition >= top) {
        current = sections[i]
        break
      }
    }
  }

  if (current !== activeSection.value) {
    activeSection.value = current
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  
  setTimeout(() => {
    isLoaded.value = true
  }, 50)

  onScroll()
  updatePill()
  window.addEventListener('resize', updatePill, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', updatePill)
})
</script>

<style scoped>
/* ── Shell ───────────────────────────────────────────── */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  height: 64px;
  background: transparent;
  border-bottom: 1px solid transparent;
  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.navbar--scrolled {
  background: rgba(250, 250, 248, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom-color: var(--color-border);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

/* ── Inner layout ─────────────────────────────────────── */
.navbar-inner {
  max-width: 1180px;
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
  gap: 16px;
}

/* ── Logo ─────────────────────────────────────────────── */
.navbar-logo {
  font-family: var(--font-sans);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--color-text);
  transition: opacity 0.2s;
  text-decoration: none;
}

.navbar-logo:hover { opacity: 0.6; }

/* ── Desktop links ─────────────────────────────────────── */
.navbar-links {
  position: relative;
  display: none;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: 1px solid transparent;
  padding: 4px;
  border-radius: 0;
  transition: background 0.3s ease, border-color 0.3s ease;
}

@media (min-width: 768px) {
  .navbar-links { display: flex; }
}

.active-pill-indicator {
  position: absolute;
  top: 4px;
  left: 0;
  height: calc(100% - 8px);
  background: var(--color-accent);
  border-radius: 0;
  box-shadow: 0 2px 8px rgba(15, 63, 47, 0.15);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), width 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
  pointer-events: none;
  z-index: 0;
}

.navbar-link {
  position: relative;
  z-index: 1;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--color-text-2);
  padding: 8px 16px;
  border-radius: 0;
  transition: color 0.3s ease;
  text-decoration: none;
}

.navbar-link:not(.navbar-link--active):hover {
  color: var(--color-accent);
}

.navbar-link--active {
  color: #f2e8cf;
  font-weight: 600;
}

/* ── CTA ─────────────────────────────────────────────── */
.navbar-cta {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  color: #f2e8cf;
  background: var(--color-accent);
  padding: 10px 20px;
  border-radius: 0;
  transition: opacity 0.2s, transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
}

.navbar-cta:active {
  transform: scale(0.96) translateY(1px);
  transition: transform 0.1s cubic-bezier(0.2, 0, 0, 1);
}

.navbar-cta:hover { 
  opacity: 0.95; 
  transform: translateY(-1px);
  box-shadow: 0 10px 20px -10px rgba(15, 63, 47, 0.4);
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
  border-radius: 0;
  transition: transform 0.25s ease, opacity 0.25s ease;
  transform-origin: center;
}

.hamburger-line.open-top  { transform: translateY(6.5px) rotate(45deg); }
.hamburger-line.open-mid  { opacity: 0; }
.hamburger-line.open-bot  { transform: translateY(-6.5px) rotate(-45deg); }

/* ── Mobile menu ───────────────────────────────────────── */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(250, 250, 248, 0.95);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  border-radius: 0;
  padding: 8px 0;
  overflow: hidden;
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
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  transition: color 0.2s, background 0.2s;
  text-decoration: none;
}

.mobile-link:hover {
  color: var(--color-accent);
  background: rgba(242, 232, 207, 0.35);
}

.mobile-link--active {
  color: var(--color-accent);
  font-weight: 600;
}

.mobile-link--accent {
  color: var(--color-accent);
}

.mobile-actions {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  padding: 14px 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
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
