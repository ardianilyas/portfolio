<template>
  <section id="skills" aria-labelledby="skills-heading" class="bg-[var(--color-surface)] py-8 md:py-16">

    <SectionHeader label="SKILLS" title="Capabilities" />

    <div class="skills-wrap">
      <div class="max-w-[1100px] mx-auto">

        <div
          v-for="(cat, index) in categories"
          :key="cat.id"
          class="skill-row"
          :class="{ 'skill-row--first': index === 0 }"
        >
          <!-- Left: capability label -->
          <div class="skill-left">
            <h3 class="skill-title" :id="`skill-${cat.id}`">{{ cat.title }}</h3>
            <p class="skill-desc">{{ cat.desc }}</p>
          </div>

          <!-- Right: technology list -->
          <div class="skill-right" :aria-labelledby="`skill-${cat.id}`">
            <p class="skill-tech-list">
              <span
                v-for="(skill, i) in cat.skills"
                :key="skill.name"
                class="skill-tech-item"
              >{{ skill.name }}<span v-if="i < cat.skills.length - 1" class="skill-dot" aria-hidden="true"> · </span></span>
            </p>
          </div>
        </div>

      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
const languages = [
  { name: 'JavaScript' },
  { name: 'TypeScript' },
  { name: 'PHP' },
  { name: 'Golang' },
]

const frontend = [
  { name: 'HTML' },
  { name: 'CSS' },
  { name: 'Vue.js' },
  { name: 'NuxtJS' },
  { name: 'React' },
  { name: 'Next.js' },
  { name: 'Shadcn UI' },
  { name: 'TailwindCSS' },
]

const backend = [
  { name: 'ExpressJS' },
  { name: 'Laravel' },
  { name: 'Node.js' },
  { name: 'Supabase' },
  { name: 'PostgreSQL' },
  { name: 'Redis' },
  { name: 'MySQL' },
  { name: 'Prisma' },
  { name: 'Drizzle ORM' },
  { name: 'Zod' },
  { name: 'JWT' },
  { name: 'Better Auth' },
]

const categories = [
  {
    id: 'frontend',
    title: 'Frontend & UI',
    desc: 'Crafting precise, responsive interfaces that balance visual quality with performance.',
    skills: frontend,
  },
  {
    id: 'backend',
    title: 'Backend & Data',
    desc: 'Architecting scalable APIs, reliable data layers, and real-time infrastructure.',
    skills: backend,
  },
  {
    id: 'languages',
    title: 'Core Languages',
    desc: 'The foundational tools I use to write type-safe, maintainable logic.',
    skills: languages,
  },
]
</script>

<style scoped>
.skills-wrap {
  padding: 0 24px;
}

@media (min-width: 768px) {
  .skills-wrap {
    padding: 0 40px;
  }
}

/* ── Row ─────────────────────────────────────────────── */
.skill-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  padding: 48px 0;
  border-top: 1px solid var(--color-border);
}

.skill-row--first {
  border-top: none;
}

@media (min-width: 768px) {
  .skill-row {
    grid-template-columns: 2fr 3fr;
    gap: 48px;
    align-items: start;
    padding: 56px 0;
  }
}

/* ── Left ─────────────────────────────────────────────── */
.skill-title {
  font-family: var(--font-sans);
  font-size: clamp(22px, 2.5vw, 30px);
  font-weight: 600;
  letter-spacing: -0.025em;
  color: var(--color-text);
  margin: 0 0 12px;
  line-height: 1.2;
}

.skill-desc {
  font-size: 14px;
  font-weight: 400;
  color: var(--color-text-3);
  line-height: 1.6;
  margin: 0;
  max-width: 38ch;
}

/* ── Right ─────────────────────────────────────────────── */
.skill-right {
  padding-top: 2px;
}

.skill-tech-list {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 400;
  color: var(--color-text-2);
  line-height: 1.9;
  margin: 0;
  letter-spacing: 0;
}

.skill-tech-item {
  display: inline;
}

.skill-dot {
  color: var(--color-text-3);
  user-select: none;
}
</style>
