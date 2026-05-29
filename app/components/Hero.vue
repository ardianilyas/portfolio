<template>
  <section class="relative w-full overflow-hidden bg-white py-24 md:py-32" id="about">
    <!-- Subtle gradient glow orb (Mintlify aesthetic) -->
    <div class="absolute -top-40 -left-40 w-96 h-96 bg-zinc-100 rounded-full blur-[100px] opacity-60"></div>
    <div class="absolute top-1/2 right-0 w-80 h-80 bg-zinc-50 rounded-full blur-[120px] opacity-40"></div>

    <div class="w-full max-w-5xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-start text-left">
      <!-- Tag Badge -->
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-xs font-semibold text-zinc-800 mb-8 select-none">
        <span class="text-xs">✨</span>
        Junior Web Developer
      </div>

      <!-- Main Headline -->
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.05] max-w-3xl mb-8">
        Focusing on Scalable <br class="hidden sm:inline" />
        Backend Architecture.
      </h1>

      <!-- Subtitle Description -->
      <p class="text-lg md:text-xl font-normal text-zinc-500 leading-relaxed max-w-2xl mb-10">
        I build robust, high-performance API structures and backend services using JavaScript, TypeScript, PHP, and Golang, with extensive experience in ExpressJS and Laravel.
      </p>

      <!-- Action Buttons (Mintlify style) -->
      <div class="flex flex-wrap items-center gap-4">
        <a href="#projects" class="px-5 py-3 rounded-lg bg-zinc-900 text-zinc-50 text-sm font-semibold hover:bg-zinc-800 shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition-all cursor-pointer">
          Explore Projects
        </a>
        <a href="mailto:ardianilyas@example.com" class="px-5 py-3 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-zinc-600 text-sm font-semibold transition-all cursor-pointer">
          Contact Me
        </a>
      </div>
    </div>
  </section>
</template>



<script setup lang="ts">
// Hero logic not needed for this minimalist layout
</script>
