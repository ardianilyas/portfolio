<template>
  <footer class="w-full h-full bg-[#111111] text-[#F9FAFB] flex flex-col justify-between overflow-hidden relative" style="font-family: var(--font-sans);">
    
    <!-- Giant Background Text -->
    <div class="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-full pointer-events-none select-none overflow-hidden flex justify-center opacity-[0.02]">
      <span class="text-[18vw] font-black leading-none whitespace-nowrap">
        ardianilyas
      </span>
    </div>

    <!-- Main CTA Area -->
    <div class="flex-1 flex flex-col items-center justify-center px-6 md:px-10 z-10 text-center relative">
      <h2 class="text-5xl md:text-7xl lg:text-[100px] font-bold leading-[1.1] tracking-tight mb-12 max-w-[1100px] text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 pb-2">
        Let's build something <span class="italic font-light">together.</span>
      </h2>
      
      <!-- Magnetic Button -->
      <a 
        href="mailto:ardianilyas@gmail.com" 
        class="magnetic-btn group relative inline-flex items-center justify-center px-10 py-5 rounded-full bg-[#FAFAFA] text-[#111] font-bold text-lg hover:bg-white transition-colors overflow-hidden"
        @mousemove="handleMagnetic"
        @mouseleave="resetMagnetic"
        ref="btnRef"
      >
        <span class="relative z-10 flex items-center gap-2">
          Get in touch
          <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </a>
    </div>

    <!-- Bottom Bar -->
    <div class="relative z-10 w-full max-w-[1100px] mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10">
      
      <div class="flex flex-col text-center md:text-left">
        <span class="text-sm font-semibold tracking-wide text-gray-300">ardianilyas_</span>
        <span class="text-xs text-gray-500 mt-1">&copy; {{ new Date().getFullYear() }} All rights reserved.</span>
      </div>

      <div class="flex items-center gap-6 text-sm font-medium">
        <a href="https://github.com/ardianilyas" target="_blank" class="text-gray-400 hover:text-white transition-colors duration-300">
          GitHub
        </a>
        <a href="mailto:ardianilyas@gmail.com" class="text-gray-400 hover:text-white transition-colors duration-300">
          Email
        </a>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const btnRef = ref<HTMLElement | null>(null)

function handleMagnetic(e: MouseEvent) {
  if (!btnRef.value) return
  
  const btn = btnRef.value
  const rect = btn.getBoundingClientRect()
  
  // Calculate mouse position relative to button center
  const x = e.clientX - (rect.left + rect.width / 2)
  const y = e.clientY - (rect.top + rect.height / 2)
  
  // Apply a subtle translation to the button (pulls it slightly toward cursor)
  // Divide by 4 to make it subtle
  btn.style.transform = `translate(${x / 4}px, ${y / 4}px)`
}

function resetMagnetic() {
  if (!btnRef.value) return
  // Smoothly snap back to origin
  btnRef.value.style.transform = 'translate(0px, 0px)'
}
</script>

<style scoped>
.magnetic-btn {
  /* Use a spring-like transition for snapping back, but keep movement responsive */
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.2s ease;
  will-change: transform;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

/* While actively hovering (moving), we reduce transition duration so it feels responsive to the mouse */
.magnetic-btn:hover {
  transition: transform 0.1s linear, background-color 0.2s ease;
}
</style>
