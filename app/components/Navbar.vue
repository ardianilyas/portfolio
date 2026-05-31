<template>
  <nav ref="navRef" class="sticky top-0 left-0 w-full glass-nav z-50">
    <!-- Vertical lines background inside navbar -->
    <div class="absolute inset-0 pointer-events-none z-0 hidden md:block">
      <div class="relative max-w-[1100px] mx-auto h-full px-6 md:px-10">
        <div class="absolute top-0 bottom-0 left-0 w-px" style="background-color: var(--color-rule);"></div>
        <div class="absolute top-0 bottom-0 right-0 w-px" style="background-color: var(--color-rule);"></div>
      </div>
    </div>

    <!-- Main content -->
    <div class="relative z-10 max-w-[1100px] mx-auto px-6 md:px-10">
      <div class="flex items-center justify-between h-14 md:h-16">

        <!-- Logo -->
        <a href="#" class="nav-logo group">
          ardianilyas<span class="text-[var(--color-hint)] group-hover:text-[var(--color-primary)] transition-colors">_</span>
        </a>

        <!-- Desktop nav links -->
        <div class="hidden md:flex items-center gap-1 relative" @mouseleave="hoveredLink = null">
          <!-- Wavy Liquid Pill Background -->
          <div
            class="absolute pointer-events-none transition-all duration-[500ms] ease-[cubic-bezier(0.25,1,0.3,1)] pill-wavy-wrapper"
            :style="{
              left: `${pillLeft}px`,
              width: `${pillWidth}px`,
              height: `${pillHeight}px`,
              opacity: hoveredLink !== null ? 1 : 0,
              transform: hoveredLink !== null ? 'scale(1)' : 'scale(0.8)'
            }"
          >
            <div class="pill-swirl"></div>
          </div>

          <a v-for="link in navLinks" :key="link.id" :href="'#' + link.id"
             class="nav-link relative z-10 px-4 py-2" style="font-family: var(--font-sans);"
             @mouseenter="updatePill($event, link.id)">
            {{ link.label }}
          </a>
        </div>

        <!-- Mobile hamburger -->
        <div class="flex items-center md:hidden">
          <button @click="isOpen = !isOpen" class="hamburger-btn" aria-label="Toggle menu">
            <svg v-if="!isOpen" class="w-4 h-4" style="color: var(--color-muted);" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-4 h-4" style="color: var(--color-muted);" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile dropdown menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-x-8"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition-opacity duration-[600ms] closing-menu"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="md:hidden glass-nav-mobile pb-2 absolute top-full left-0 w-full">
        <div class="max-w-[1100px] mx-auto flex flex-col">
          <a v-for="(link, index) in navLinks" :key="link.id"
             :href="'#' + link.id"
             @click.prevent="scrollTo(link.id)"
             class="mobile-nav-link text-left" 
             :style="{ 
               fontFamily: 'var(--font-sans)', 
               '--open-delay': `${index * 80 + 100}ms`,
               '--close-delay': `${(navLinks.length - 1 - index) * 60}ms`
             }">
            {{ link.label }}
          </a>
        </div>
      </div>
    </Transition>

    <!-- Bottom border -->
    <GridDivider className="absolute bottom-0 left-0" />
  </nav>
</template>

<script setup lang="ts">
const isOpen = ref(false)
const navRef = ref<HTMLElement | null>(null)

const hoveredLink = ref<string | null>(null)
const pillLeft = ref(0)
const pillWidth = ref(0)
const pillHeight = ref(0)

function updatePill(event: MouseEvent, id: string) {
  const target = event.currentTarget as HTMLElement
  hoveredLink.value = id
  pillLeft.value = target.offsetLeft
  pillWidth.value = target.offsetWidth
  pillHeight.value = target.offsetHeight
}

const navLinks = [
  { id: 'hero', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'tools', label: 'Tools' },
  { id: 'portfolio', label: 'Projects' },
]

function scrollTo(id: string) {
  isOpen.value = false
  setTimeout(() => {
    const el = document.getElementById(id)
    if (el) {
      const navHeight = navRef.value?.offsetHeight ?? 64
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, 250)
}
</script>

<style scoped>
.nav-link {
  position: relative;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--color-muted);
  transition: color 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-link:hover {
  color: var(--color-primary);
}

/* Wavy / Swirl Pill Animation */
.pill-wavy-wrapper {
  /* wrapper handles position and opacity */
}

.pill-swirl {
  width: 100%;
  height: 100%;
  background-color: var(--color-surface);
  animation: swirl 4s infinite linear;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.03);
}

@keyframes swirl {
  0% { border-radius: 40% 60% 60% 40% / 70% 30% 70% 30%; }
  25% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  50% { border-radius: 30% 70% 70% 30% / 30% 70% 30% 70%; }
  75% { border-radius: 70% 30% 40% 60% / 30% 70% 40% 60%; }
  100% { border-radius: 40% 60% 60% 40% / 70% 30% 70% 30%; }
}
.nav-logo {
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 600;
  color: var(--color-primary);
  letter-spacing: -0.02em;
  text-decoration: none;
}
.glass-nav {
  background-color: rgba(250, 250, 248, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
.glass-nav-mobile {
  background-color: rgba(250, 250, 248, 0.95);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
.hamburger-btn {
  padding: 8px;
  border-radius: 6px;
  border: none;
  background: transparent;
  transition: background-color 0.2s;
  cursor: pointer;
}
.hamburger-btn:hover {
  background-color: var(--color-surface);
}
.mobile-nav-link {
  display: block;
  padding: 14px 24px;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--color-muted);
  transition: background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), padding-left 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  text-align: left;
  opacity: 0;
  animation: slideInLink 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: var(--open-delay);
}

.closing-menu .mobile-nav-link {
  opacity: 1;
  animation: slideOutLink 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: var(--close-delay);
}

@keyframes slideInLink {
  from { opacity: 0; transform: translateX(-12px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideOutLink {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(-12px); }
}

.mobile-nav-link:hover, .mobile-nav-link:active {
  color: var(--color-primary);
  background-color: var(--color-surface);
  padding-left: 32px; /* slide effect on hover */
}
</style>
