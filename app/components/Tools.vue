<template>
  <section class="w-full bg-white" id="tools">
    <!-- Centered content wrapper -->
    <div class="w-full max-w-5xl mx-auto px-6 md:px-12 py-16">
      <div class="mb-12">
        <div class="inline-flex items-center gap-1.5 mb-2 text-xs font-semibold tracking-wider text-zinc-400 uppercase">
          <span>Workspace</span>
        </div>
        <h2 class="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900">
          Tools & Utilities
        </h2>
      </div>

      <!-- Grid Layout of Tools inside a bordered container -->
      <div class="grid grid-cols-2 sm:grid-cols-5 divide-x divide-y sm:divide-y-0 divide-zinc-200/80 border border-zinc-200/80 rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div v-for="tool in tools" :key="tool.name" class="flex flex-col items-center justify-center p-8 hover:bg-zinc-50/30 bg-white transition-colors group">
          <img :src="tool.logo" :alt="tool.name" class="w-8 h-8 object-contain mb-3 group-hover:scale-110 transition-transform duration-200" />
          <span class="text-xs font-semibold text-zinc-800 tracking-tight text-center">{{ tool.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const tools = [
  { name: 'VS Code', logo: '/icons/vscode.svg' },
  { name: 'Git', logo: '/icons/git.svg' },
  { name: 'GitHub', logo: '/icons/github.svg' },
  { name: 'Postman', logo: '/icons/postman.svg' },
  { name: 'Resend', logo: '/icons/resend.svg' }
];
</script>


