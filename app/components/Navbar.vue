<template>
  <nav ref="navRef" class="sticky top-0 left-0 z-50" style="background-color: var(--color-bg);">
    <div class="max-w-[1100px] mx-auto px-6 md:px-10">
      <div class="flex items-center justify-between h-14 md:h-16">

        <!-- Logo -->
        <a href="#" class="font-semibold text-base" style="font-family: var(--font-sans); color: var(--color-primary);">
          ardianilyas_
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
      <div v-if="isOpen" class="md:hidden border-t" style="border-color: var(--color-rule); background-color: var(--color-bg);">
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
    <div class="absolute bottom-0 left-0 w-full h-px" style="background-color: var(--color-rule);"></div>
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
  font-size: 12px;
  letter-spacing: 0.05em;
  color: var(--color-muted);
  transition: color 0.2s ease;
}
.nav-link:hover {
  color: var(--color-primary);
}
.hamburger-btn {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid var(--color-rule);
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
