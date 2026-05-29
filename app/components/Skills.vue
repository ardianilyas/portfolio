<template>
  <section class="w-full bg-white" id="skills">
    <!-- Centered content wrapper -->
    <div class="w-full max-w-5xl mx-auto px-6 md:px-12 py-16">
      <div class="mb-12">
        <div class="inline-flex items-center gap-1.5 mb-2 text-xs font-semibold tracking-wider text-zinc-400 uppercase">
          <span>Proficiencies</span>
        </div>
        <h2 class="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900">
          Skills
        </h2>
      </div>

      <!-- Attio-style 2-Column Grid Table of Skills -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200/80 border border-zinc-200/80 rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        
        <!-- Category 1: Languages -->
        <div class="flex flex-col bg-white divide-y divide-zinc-100">
          <div class="px-6 py-4 bg-zinc-50/50 text-[11px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100">
            Programming Languages
          </div>
          <div v-for="skill in languages" :key="skill.name" class="flex items-center justify-between px-6 py-4 hover:bg-zinc-50/30 transition-colors group">
            <div class="flex items-center gap-3">
              <img :src="skill.logo" :alt="skill.name" class="w-5 h-5 object-contain group-hover:scale-105 transition-transform" />
              <span class="text-sm font-semibold text-zinc-800">{{ skill.name }}</span>
            </div>
            <span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200/60 text-zinc-500">
              {{ skill.level }}
            </span>
          </div>
        </div>

        <!-- Category 2: Frontend -->
        <div class="flex flex-col bg-white divide-y divide-zinc-100">
          <div class="px-6 py-4 bg-zinc-50/50 text-[11px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100">
            Frontend Stack
          </div>
          <div v-for="skill in frontend" :key="skill.name" class="flex items-center justify-between px-6 py-4 hover:bg-zinc-50/30 transition-colors group">
            <div class="flex items-center gap-3">
              <img :src="skill.logo" :alt="skill.name" class="w-5 h-5 object-contain group-hover:scale-105 transition-transform" />
              <span class="text-sm font-semibold text-zinc-800">{{ skill.name }}</span>
            </div>
            <span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200/60 text-zinc-500">
              {{ skill.level }}
            </span>
          </div>
        </div>

        <!-- Category 3: Backend -->
        <div class="flex flex-col bg-white divide-y divide-zinc-100">
          <div class="px-6 py-4 bg-zinc-50/50 text-[11px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100">
            Backend & Infrastructure
          </div>
          <div v-for="skill in backend" :key="skill.name" class="flex items-center justify-between px-6 py-4 hover:bg-zinc-50/30 transition-colors group">
            <div class="flex items-center gap-3">
              <img :src="skill.logo" :alt="skill.name" class="w-5 h-5 object-contain group-hover:scale-105 transition-transform" />
              <span class="text-sm font-semibold text-zinc-800">{{ skill.name }}</span>
            </div>
            <span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200/60 text-zinc-500">
              {{ skill.level }}
            </span>
          </div>
        </div>

        <!-- Category 4: ORM & Testing -->
        <div class="flex flex-col bg-white divide-y divide-zinc-100">
          <div class="px-6 py-4 bg-zinc-50/50 text-[11px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100">
            ORM & Testing
          </div>
          <div v-for="skill in testing" :key="skill.name" class="flex items-center justify-between px-6 py-4 hover:bg-zinc-50/30 transition-colors group">
            <div class="flex items-center gap-3">
              <img :src="skill.logo" :alt="skill.name" class="w-5 h-5 object-contain group-hover:scale-105 transition-transform" />
              <span class="text-sm font-semibold text-zinc-800">{{ skill.name }}</span>
            </div>
            <span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200/60 text-zinc-500">
              {{ skill.level }}
            </span>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
const languages = [
  { name: 'JavaScript', logo: '/icons/javascript.svg', level: 'Advanced' },
  { name: 'TypeScript', logo: '/icons/typescript.svg', level: 'Advanced' },
  { name: 'PHP', logo: '/icons/php.svg', level: 'Advanced' },
  { name: 'Golang', logo: '/icons/golang.svg', level: 'Intermediate' }
];

const frontend = [
  { name: 'Next.js', logo: '/icons/nextjs.svg', level: 'Advanced' },
  { name: 'Vue.js', logo: '/icons/vue.svg', level: 'Advanced' },
  { name: 'NuxtJS', logo: '/icons/nuxt.svg', level: 'Advanced' },
  { name: 'Tailwind CSS', logo: '/icons/tailwindcss.svg', level: 'Advanced' }
];

const backend = [
  { name: 'ExpressJS', logo: '/icons/expressjs.svg', level: 'Advanced' },
  { name: 'Laravel', logo: '/icons/laravel.svg', level: 'Advanced' },
  { name: 'Redis', logo: '/icons/redis.svg', level: 'Intermediate' }
];

const testing = [
  { name: 'Drizzle', logo: '/icons/drizzle.svg', level: 'Advanced' },
  { name: 'Prisma', logo: '/icons/prisma.svg', level: 'Advanced' },
  { name: 'Vitest', logo: '/icons/vitest.svg', level: 'Advanced' }
];
</script>



