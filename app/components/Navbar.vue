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
        <div class="hidden md:flex items-center gap-6">
          <a v-for="link in navLinks" :key="link.id" :href="'#' + link.id"
             class="nav-link" style="font-family: var(--font-sans);">
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

    <!-- Mobile dropdown -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isOpen" class="md:hidden border-t glass-nav-mobile" style="border-color: var(--color-rule);">
        <div class="max-w-[1100px] mx-auto">
          <a v-for="link in navLinks" :key="link.id"
             :href="'#' + link.id"
             @click.prevent="scrollTo(link.id)"
             class="mobile-nav-link" style="font-family: var(--font-sans);">
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
  padding: 4px 0; /* Minimal vertical padding for click target */
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 1px;
  background-color: var(--color-primary);
  transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-link:hover {
  color: var(--color-primary);
}

.nav-link:hover::after {
  width: 100%;
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
  padding: 12px 24px;
  font-size: 13px;
  color: var(--color-muted);
  transition: all 0.2s;
  border-bottom: 1px solid var(--color-rule);
}
.mobile-nav-link:hover {
  color: var(--color-primary);
  background-color: var(--color-surface);
}
</style>
