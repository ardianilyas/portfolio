<template>
  <section class="w-full bg-white" id="projects">
    <!-- Centered content wrapper -->
    <div class="w-full max-w-5xl mx-auto px-6 md:px-12 py-16">
      <div class="mb-12">
        <div class="inline-flex items-center gap-1.5 mb-2 text-xs font-semibold tracking-wider text-zinc-400 uppercase">
          <span>Portfolio</span>
        </div>
        <h2 class="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900">
          Projects
        </h2>
      </div>

      <!-- Attio-style Table/Records Grid inside a bordered container -->
      <div class="flex flex-col border border-zinc-200/80 rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] bg-white divide-y divide-zinc-200/80">
        
        <!-- Table Columns Header -->
        <div class="hidden md:grid grid-cols-12 bg-zinc-50/50 px-8 py-3 text-[11px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100">
          <div class="col-span-3">Project Name</div>
          <div class="col-span-6">Description & Architecture</div>
          <div class="col-span-3 text-right">Repository</div>
        </div>

        <!-- Record Rows -->
        <div v-for="project in projects" :key="project.name" class="grid grid-cols-1 md:grid-cols-12 items-center px-8 py-6 hover:bg-zinc-50/30 transition-colors group">
          <!-- Name -->
          <div class="col-span-1 md:col-span-3 mb-2 md:mb-0">
            <h3 class="text-sm font-bold text-zinc-900 tracking-tight flex items-center gap-2">
              {{ project.name }}
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </h3>
          </div>
          <!-- Description & Tech -->
          <div class="col-span-1 md:col-span-6 mb-4 md:mb-0 pr-4">
            <p class="text-sm text-zinc-500 leading-relaxed mb-2">
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="tech in project.tags" :key="tech" class="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-zinc-100 border border-zinc-200/50 text-zinc-500">
                {{ tech }}
              </span>
            </div>
          </div>
          <!-- Link -->
          <div class="col-span-1 md:col-span-3 md:text-right">
            <a :href="project.github" target="_blank" class="inline-flex items-center text-xs font-semibold text-zinc-500 hover:text-zinc-900 transition-colors group">
              View on GitHub
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>


<script setup>
const projects = [
  {
    name: 'SpaceTip',
    description: 'Backend infrastructure for a creator and live-streamer tipping platform.',
    tags: ['Next.js', 'ExpressJS', 'Redis', 'Drizzle'],
    github: '#'
  },
  {
    name: 'Automated Email Service',
    description: 'A robust transactional email delivery UI system built utilizing React Email and Resend.',
    tags: ['React', 'Next.js', 'Resend', 'Vitest'],
    github: '#'
  }
];
</script>

