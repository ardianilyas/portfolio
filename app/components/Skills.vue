<template>
  <section id="skills">
    <!-- Top rule above SectionHeader -->
    <GridDivider />

    <SectionHeader label="SKILLS" title="What I work with" />

    <div class="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-24 flex flex-col gap-12 md:gap-16">

      <!-- Programming Languages -->
      <div class="skill-category group">
        <h3 class="category-title">Programming Languages</h3>
        <div class="category-pills">
          <div 
            v-for="s in languages" 
            :key="s.name" 
            class="skill-pill"
          >
            <img :src="s.icon" :alt="s.name" class="pill-icon" :class="{'scale-[0.85]': s.name === 'Shadcn UI'}" loading="lazy" />
            <span class="pill-text">{{ s.name }}</span>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="h-[1px] w-full bg-[var(--color-rule)] opacity-50 md:hidden"></div>

      <!-- Frontend -->
      <div class="skill-category group">
        <h3 class="category-title">Frontend & UI</h3>
        <div class="category-pills">
          <div 
            v-for="s in frontend" 
            :key="s.name" 
            class="skill-pill"
          >
            <img :src="s.icon" :alt="s.name" class="pill-icon" :class="{'scale-[0.85]': s.name === 'Shadcn UI'}" loading="lazy" />
            <span class="pill-text">{{ s.name }}</span>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="h-[1px] w-full bg-[var(--color-rule)] opacity-50 md:hidden"></div>

      <!-- Backend -->
      <div class="skill-category group">
        <h3 class="category-title">Backend & Databases</h3>
        <div class="category-pills">
          <div 
            v-for="s in backend" 
            :key="s.name" 
            class="skill-pill"
          >
            <img :src="s.icon" :alt="s.name" class="pill-icon" :class="{'scale-[0.85]': s.name === 'Shadcn UI'}" loading="lazy" />
            <span class="pill-text">{{ s.name }}</span>
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
</script>

<style scoped>
.skill-category {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (min-width: 768px) {
  .skill-category {
    display: grid;
    grid-template-columns: 200px 1fr;
    align-items: start;
    gap: 32px;
  }
}

.category-title {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-hint);
  margin-top: 10px; /* Alignment tweak with pills */
}

.category-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.skill-pill {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-rule);
  border-radius: 999px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  cursor: pointer;
}

.skill-pill:hover {
  background-color: #FFFFFF;
  border-color: rgba(0, 0, 0, 0.1);
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
}

.pill-icon, .pill-icon-svg {
  width: 22px;
  height: 22px;
  object-fit: contain;
  filter: grayscale(1) opacity(0.6);
  transition: all 0.3s ease;
  color: var(--color-hint);
}

.skill-pill:hover .pill-icon {
  filter: grayscale(0) opacity(1);
}

.skill-pill:hover .pill-icon-svg {
  color: var(--color-primary);
  opacity: 1;
}

.pill-text {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-hint);
  transition: color 0.3s ease;
}

.skill-pill:hover .pill-text {
  color: var(--color-primary);
}
</style>
