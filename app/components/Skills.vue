<template>
  <section id="skills" style="background-color: var(--color-bg);">

    <SectionHeader label="SKILLS" title="What I work with" />

    <div class="max-w-[1100px] mx-auto px-6 md:px-10 py-10 md:py-14">

      <!-- Category rows stacked vertically -->
      <div class="flex flex-col gap-6">

        <!-- Programming Languages -->
        <div class="skill-row">
          <div class="skill-row-label">Programming Languages</div>
          <div class="skill-row-icons">
            <div v-for="s in languages" :key="s.name" class="icon-cell" :title="s.name">
              <img :src="s.icon" :alt="s.name" class="skill-logo" />
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="w-full h-px" style="background-color: var(--color-rule);"></div>

        <!-- Frontend -->
        <div class="skill-row">
          <div class="skill-row-label">Frontend</div>
          <div class="skill-row-icons">
            <div v-for="s in frontend" :key="s.name" class="icon-cell" :title="s.name">
              <img :src="s.icon" :alt="s.name" class="skill-logo" />
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="w-full h-px" style="background-color: var(--color-rule);"></div>

        <!-- Backend -->
        <div class="skill-row">
          <div class="skill-row-label">Backend</div>
          <div class="skill-row-icons">
            <div v-for="s in backend" :key="s.name" class="icon-cell" :title="s.name">
              <img v-if="s.icon" :src="s.icon" :alt="s.name" class="skill-logo" />
              <span v-else class="icon-text-fallback">{{ s.name }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Bottom rule -->
    <div class="w-full h-px" style="background-color: var(--color-rule);"></div>
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
  { name: 'HTML/CSS', icon: 'https://svgl.app/library/html5.svg' },
  { name: 'Vue.js', icon: 'https://svgl.app/library/vue.svg' },
  { name: 'NuxtJS', icon: 'https://svgl.app/library/nuxt.svg' },
  { name: 'TailwindCSS', icon: 'https://svgl.app/library/tailwindcss.svg' },
]

const backend = [
  { name: 'ExpressJS', icon: 'https://svgl.app/library/expressjs.svg' },
  { name: 'Laravel', icon: 'https://svgl.app/library/laravel.svg' },
  { name: 'REST API', icon: null },
  { name: 'Node.js', icon: 'https://svgl.app/library/nodejs.svg' },
]
</script>

<style scoped>
.skill-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

@media (min-width: 768px) {
  .skill-row {
    grid-template-columns: 180px 1fr;
    gap: 32px;
    align-items: center;
  }
}

.skill-row-label {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-hint);
}

.skill-row-icons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.icon-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  border: 1px solid var(--color-rule);
  background-color: var(--color-surface);
  transition: border-color 0.2s ease;
  cursor: default;
}

.icon-cell:hover {
  border-color: var(--color-primary);
}

.skill-logo {
  width: 22px;
  height: 22px;
  object-fit: contain;
  filter: grayscale(1) opacity(0.5);
  transition: filter 0.2s ease;
}

.icon-cell:hover .skill-logo {
  filter: grayscale(0) opacity(1);
}

.icon-text-fallback {
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 500;
  color: var(--color-hint);
  text-align: center;
  line-height: 1.1;
}
</style>
