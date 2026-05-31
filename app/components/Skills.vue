<template>
  <section id="skills">
    <!-- Top rule above SectionHeader -->
    <GridDivider />

    <SectionHeader label="SKILLS" title="Expertise" />

    <div class="max-w-[1200px] mx-auto px-8 md:px-16 lg:px-24 py-24">
      
      <div 
        v-for="(cat, index) in categories" 
        :key="cat.id"
        class="flex flex-col md:flex-row relative border-t border-gray-100 pt-16 pb-32"
        :class="{ 'border-t-0 pt-0': index === 0 }"
      >
        <!-- Sticky Left Side -->
        <div class="md:w-5/12 relative mb-12 md:mb-0 pr-8 z-10">
          <div class="md:sticky md:top-32">
            <h3 class="text-4xl md:text-[56px] leading-[1.1] font-bold tracking-tight text-gray-900 mb-6">{{ cat.title }}</h3>
            <p class="text-lg md:text-xl text-gray-500 font-light leading-relaxed max-w-[380px]">{{ cat.desc }}</p>
          </div>
        </div>
        
        <!-- Scrolling Right Side -->
        <div class="md:w-7/12 flex flex-wrap gap-4 md:gap-5 content-start">
          <div 
            v-for="skill in cat.skills" 
            :key="skill.name"
            class="apple-pill group"
          >
            <div class="icon-wrapper">
              <img :src="skill.icon" :alt="skill.name" class="w-6 h-6 object-contain filter grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500" :class="{'scale-[0.85]': skill.name === 'Shadcn UI'}" loading="lazy" />
            </div>
            <span class="text-[15px] font-semibold text-gray-500 group-hover:text-gray-900 transition-colors duration-300">{{ skill.name }}</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Bottom rule -->
    <GridDivider />
  </section>
</template>

<script setup lang="ts">
const languages = [
  { name: 'JavaScript', icon: 'https://svgl.app/library/javascript.svg' },
  { name: 'TypeScript', icon: 'https://svgl.app/library/typescript.svg' },
  { name: 'PHP', icon: 'https://svgl.app/library/php.svg' },
  { name: 'Golang', icon: 'https://svgl.app/library/golang.svg' },
]

const frontend = [
  { name: 'HTML', icon: 'https://svgl.app/library/html5.svg' },
  { name: 'CSS', icon: 'https://svgl.app/library/css.svg' },
  { name: 'Vue.js', icon: 'https://svgl.app/library/vue.svg' },
  { name: 'NuxtJS', icon: 'https://svgl.app/library/nuxt.svg' },
  { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Next.js', icon: 'https://svgl.app/library/nextjs_icon_dark.svg' },
  { name: 'Shadcn UI', icon: 'https://cdn.simpleicons.org/shadcnui/000000' },
  { name: 'TailwindCSS', icon: 'https://svgl.app/library/tailwindcss.svg' },
]

const backend = [
  { name: 'ExpressJS', icon: 'https://svgl.app/library/expressjs.svg' },
  { name: 'Laravel', icon: 'https://svgl.app/library/laravel.svg' },
  { name: 'Node.js', icon: 'https://svgl.app/library/nodejs.svg' },
  { name: 'Supabase', icon: 'https://svgl.app/library/supabase.svg' },
  { name: 'PostgreSQL', icon: 'https://svgl.app/library/postgresql.svg' },
  { name: 'Redis', icon: 'https://svgl.app/library/redis.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
  { name: 'Prisma', icon: 'https://svgl.app/library/prisma.svg' },
  { name: 'Drizzle ORM', icon: 'https://cdn.simpleicons.org/drizzle/8DA61C' },
  { name: 'Zod', icon: 'https://svgl.app/library/zod.svg' },
  { name: 'JWT', icon: 'https://svgl.app/library/jwt.svg' },
  { name: 'Better Auth', icon: 'https://cdn.simpleicons.org/betterauth/000000' },
]

const categories = [
  {
    id: 'frontend',
    title: 'Frontend & UI',
    desc: 'Crafting pixel-perfect, highly responsive user interfaces.',
    skills: frontend
  },
  {
    id: 'backend',
    title: 'Backend & Databases',
    desc: 'Architecting scalable APIs and managing reliable data flow.',
    skills: backend
  },
  {
    id: 'languages',
    title: 'Core Languages',
    desc: 'The foundational tools I use to write elegant, type-safe logic.',
    skills: languages
  }
]
</script>

<style scoped>
.apple-pill {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 20px 8px 8px;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 24px -6px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.03) inset;
}

.apple-pill:hover {
  background-color: rgba(255, 255, 255, 1);
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.05) inset;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background-color: #f4f4f5;
  border-radius: 50%;
  transition: all 0.4s ease;
}

.apple-pill:hover .icon-wrapper {
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}
</style>
