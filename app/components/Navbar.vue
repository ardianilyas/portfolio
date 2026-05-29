<template>
  <nav ref="navRef" class="sticky top-0 left-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200/80 w-full">
    <!-- Main navbar bar inside a centered wrapper -->
    <div class="w-full max-w-5xl mx-auto px-6 md:px-12 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo + Status Badge -->
        <div class="flex items-center gap-4">
          <h3 class="text-lg font-bold text-zinc-900 tracking-tight font-sans">ardianilyas.</h3>
          
          <!-- Attio-like status indicator badge -->
          <div class="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-800">
            <span class="relative flex h-1.5 w-1.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            Available for work
          </div>
        </div>

        <!-- Desktop nav links -->
        <div class="hidden md:flex items-center gap-6">
          <ul class="flex gap-6 [&>li>a]:text-xs [&>li>a]:font-semibold [&>li>a]:tracking-wide [&>li>a]:text-zinc-500 [&>li>a]:hover:text-zinc-900 [&>li>a]:transition-colors">
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#tools">Tools</a></li>
            <li><a href="#projects">Projects</a></li>
          </ul>
        </div>

        <!-- Mobile hamburger -->
        <div class="flex items-center gap-3 md:hidden">
          <button
            @click="isOpen = !isOpen"
            class="p-2 -mr-2 text-zinc-900 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg v-if="!isOpen" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile dropdown menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isOpen" class="md:hidden bg-white border-b border-zinc-200/80 w-full">
        <div class="max-w-5xl mx-auto">
          <ul class="flex flex-col px-6 py-4 space-y-4">
            <li>
              <a href="#about" @click.prevent="scrollTo('about')" class="block text-sm font-semibold text-zinc-600 hover:text-zinc-900">About</a>
            </li>
            <li>
              <a href="#skills" @click.prevent="scrollTo('skills')" class="block text-sm font-semibold text-zinc-600 hover:text-zinc-900">Skills</a>
            </li>
            <li>
              <a href="#tools" @click.prevent="scrollTo('tools')" class="block text-sm font-semibold text-zinc-600 hover:text-zinc-900">Tools</a>
            </li>
            <li>
              <a href="#projects" @click.prevent="scrollTo('projects')" class="block text-sm font-semibold text-zinc-600 hover:text-zinc-900">Projects</a>
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
const navRef = ref<HTMLElement | null>(null)

function scrollTo(id: string) {
  isOpen.value = false
  setTimeout(() => {
    const el = document.getElementById(id)
    if (el) {
      const navHeight = navRef.value?.offsetHeight ?? 80
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, 250)
}
</script>
