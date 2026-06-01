<template>
  <!-- Blue background wrapper to connect with Hero section -->
  <div class="w-full bg-[#0c2cdb]">
    <!-- The white section with massive rounded top corners -->
    <section id="skills" class="bg-[var(--color-bg)] rounded-t-[40px] md:rounded-t-[80px] w-full overflow-hidden relative pt-8">
      
      <!-- Re-add vertical container lines because the solid background covers the global ones -->
      <div class="skills-container-lines" aria-hidden="true">
        <div class="skills-container-lines-inner">
          <div class="skills-line skills-line-left"></div>
          <div class="skills-line skills-line-right"></div>
        </div>
      </div>
      
      <SectionHeader label="SKILLS" title="Expertise" />
      
      <div class="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-24">
        
        <div 
          v-for="(cat, index) in categories" 
          :key="cat.id"
          class="flex flex-col md:flex-row relative border-t border-[#0c2cdb]/10 pt-16 pb-32 -mx-6 md:-mx-10 px-6 md:px-10"
          :class="{ 'border-t-0 pt-0': index === 0 }"
        >
          <!-- Sticky Left Side -->
          <div class="md:w-5/12 relative mb-12 md:mb-0 pr-8 z-10">
            <div class="md:sticky md:top-32">
              <h3 class="text-4xl md:text-[56px] leading-[1.1] font-bold tracking-tight text-[#0c2cdb] mb-6">{{ cat.title }}</h3>
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
                <img :src="skill.icon" :alt="skill.name" class="w-6 h-6 object-contain transition-all duration-500" :class="{'scale-[0.85]': skill.name === 'Shadcn UI'}" loading="lazy" />
              </div>
              <span class="text-[15px] font-semibold transition-colors duration-300">{{ skill.name }}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
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
  background-color: #ffffff; /* Pure white background */
  border-radius: 999px;
  border: 1px solid rgba(12, 44, 219, 0.15); /* Faint blue border */
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
}

.apple-pill span {
  color: #333333; /* Standard dark text */
}

.apple-pill:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 24px rgba(12, 44, 219, 0.1);
  border-color: rgba(12, 44, 219, 0.3);
}

.apple-pill:hover span {
  color: #0c2cdb; /* Electric blue on hover */
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background-color: #F8F9FA; /* Very light gray/beige circle */
  border-radius: 50%;
  transition: all 0.4s ease;
}

.apple-pill:hover .icon-wrapper {
  background-color: #EFF6FF; /* Faint blue circle on hover */
}

/* Local grid lines to overlay the solid background */
.skills-container-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.skills-container-lines-inner {
  position: relative;
  max-width: 1100px;
  height: 100%;
  margin: 0 auto;
  padding: 0 24px;
}

@media (min-width: 768px) {
  .skills-container-lines-inner {
    padding: 0 40px;
  }
}

.skills-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: var(--color-rule);
  display: none;
}

@media (min-width: 768px) {
  .skills-line {
    display: block;
  }
}

.skills-line-left {
  left: 0;
}

.skills-line-right {
  right: 0;
}
</style>
