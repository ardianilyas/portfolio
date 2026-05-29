<template>
  <footer class="w-full border-t border-zinc-200/80 bg-zinc-50/20 py-8">
    <div class="w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
      <p class="text-xs font-semibold text-zinc-400">
        &copy; {{ new Date().getFullYear() }} Ardian Ilyas. All rights reserved.
      </p>
      
      <div class="flex items-center gap-6">
        <a href="https://github.com/ardianilyas" target="_blank" class="text-xs font-semibold text-zinc-400 hover:text-zinc-900 transition-colors">
          GitHub
        </a>
        <a href="#" target="_blank" class="text-xs font-semibold text-zinc-400 hover:text-zinc-900 transition-colors">
          LinkedIn
        </a>
        <a href="mailto:ardianilyas@example.com" class="text-xs font-semibold text-zinc-400 hover:text-zinc-900 transition-colors">
          Email
        </a>
      </div>
    </div>
  </footer>
</template>


