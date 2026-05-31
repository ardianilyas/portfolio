<template>
  <nav ref="navRef" class="sticky top-0 left-0 w-full z-50 bg-[#f4f4f5] border-b-2 border-[#0c2cdb]/10">
    <!-- Main content -->
    <div class="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8">
      <div class="flex items-center justify-between h-16 md:h-24">

        <!-- Logo -->
        <a href="#" class="nav-logo group">
          ardianilyas
        </a>

        <!-- Desktop nav links -->
        <div class="hidden md:flex items-center gap-2">
          <a v-for="link in navLinks" :key="link.id" :href="'#' + link.id"
             class="brutalist-nav-link">
            {{ link.label }}
          </a>
        </div>

        <!-- Mobile hamburger -->
        <div class="flex items-center md:hidden">
          <button @click="isOpen = !isOpen" class="hamburger-btn" aria-label="Toggle menu">
            <svg v-if="!isOpen" class="w-6 h-6 text-[#0c2cdb]" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6 text-[#0c2cdb]" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile dropdown menu -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="isOpen" class="md:hidden absolute top-full left-0 w-full bg-[#f4f4f5] border-b-4 border-[#0c2cdb] shadow-2xl">
        <div class="flex flex-col">
          <a v-for="link in navLinks" :key="link.id"
             :href="'#' + link.id"
             @click.prevent="scrollTo(link.id)"
             class="mobile-brutalist-link">
            {{ link.label }}
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
const navRef = ref<HTMLElement | null>(null)

const navLinks = [
  { id: 'hero', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'tools', label: 'TOOLS' },
  { id: 'portfolio', label: 'PROJECTS' },
]

function scrollTo(id: string) {
  isOpen.value = false
  setTimeout(() => {
    const el = document.getElementById(id)
    if (el) {
      const navHeight = navRef.value?.offsetHeight ?? 96
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, 100)
}
</script>

<style scoped>
.nav-logo {
  font-family: var(--font-sans);
  font-size: 24px;
  font-weight: 900;
  color: #0c2cdb;
  letter-spacing: -0.02em;
  text-decoration: none;
}

@media (min-width: 768px) {
  .nav-logo {
    font-size: 32px;
  }
}

.brutalist-nav-link {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: #0c2cdb;
  padding: 10px 20px;
  border-radius: 8px;
  transition: all 0.1s; /* Brutalist: very fast, structural transition */
  border: 2px solid transparent;
}

.brutalist-nav-link:hover {
  background-color: #CCFF00;
  color: #0c2cdb;
  border: 2px solid #0c2cdb;
  box-shadow: 4px 4px 0px rgba(12, 44, 219, 0.2);
  transform: translate(-2px, -2px);
}

.hamburger-btn {
  padding: 8px;
  border: 2px solid transparent;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  transition: all 0.1s;
}

.hamburger-btn:hover {
  background-color: #CCFF00;
  border: 2px solid #0c2cdb;
  box-shadow: 2px 2px 0px rgba(12, 44, 219, 0.2);
  transform: translate(-1px, -1px);
}

.mobile-brutalist-link {
  display: block;
  font-family: var(--font-sans);
  padding: 20px 24px;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 0.02em;
  color: #0c2cdb;
  border-top: 1px solid rgba(12, 44, 219, 0.1);
  text-align: left;
  transition: all 0.1s;
}

.mobile-brutalist-link:hover, .mobile-brutalist-link:active {
  background-color: #CCFF00;
  color: #0c2cdb;
  padding-left: 32px;
}
</style>
