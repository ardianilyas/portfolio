<template>
  <div class="fixed top-4 left-0 right-0 w-[calc(100%-2rem)] max-w-[1400px] mx-auto z-[100] transition-transform duration-500 ease-in-out">
    <nav ref="navRef" class="w-full transition-all duration-300 rounded-[24px] md:rounded-[32px] overflow-hidden"
           style="background: rgba(255, 255, 255, 0.4); backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px); border: 2px solid rgba(255, 255, 255, 0.6); box-shadow: 0 20px 40px rgba(0,0,0,0.1), inset 0 0 30px rgba(255,255,255,0.4);">
      <!-- Main content -->
      <div class="relative z-10 w-full px-4 md:px-8">
        <div class="flex items-center justify-between h-14 md:h-20">

          <!-- Logo -->
          <a href="#" class="nav-logo group">
            ardianilyas
          </a>

          <!-- Desktop nav links -->
          <div class="hidden md:flex items-center gap-2 relative">
            <a v-for="link in navLinks" :key="link.id" :href="'#' + link.id"
               class="brutalist-nav-link relative z-10">
              <span class="link-text">{{ link.label }}</span>
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
    </nav>

    <!-- Mobile dropdown menu -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="isOpen" class="md:hidden absolute top-[calc(100%+8px)] left-0 w-full bg-[rgba(255,255,255,0.85)] backdrop-blur-2xl border border-white rounded-[20px] shadow-2xl overflow-hidden z-40">
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
  </div>
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
  position: relative;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: #0c2cdb;
  padding: 10px 18px;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brutalist-nav-link::before,
.brutalist-nav-link::after {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #0c2cdb;
  font-size: 16px;
  font-weight: 900;
  opacity: 0;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.brutalist-nav-link::before {
  content: '[';
  left: 0px;
}

.brutalist-nav-link::after {
  content: ']';
  right: 0px;
}

.brutalist-nav-link:hover {
  color: #0c2cdb;
  background-color: #CCFF00;
}

.brutalist-nav-link:hover::before {
  opacity: 1;
  left: 6px;
}

.brutalist-nav-link:hover::after {
  opacity: 1;
  right: 6px;
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
