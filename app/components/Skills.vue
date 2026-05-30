<template>
  <section id="skills">
    <!-- Top rule above SectionHeader -->
    <GridDivider />

    <SectionHeader label="SKILLS" title="What I work with" />

    <!-- We remove the max-w from the wrapper so borders can go full width -->
    <div class="w-full py-10 md:py-14 overflow-visible flex flex-col">

      <!-- Programming Languages -->
      <div class="w-full">
        <div class="max-w-[1100px] mx-auto px-6 md:px-10 skill-row">
          <div class="skill-row-label">Programming Languages</div>
          <div class="skill-row-icons">
            <div 
              v-for="(s, index) in languages" 
              :key="s.name" 
              class="icon-cell group" 
              :title="s.name"
              :style="{
                '--card-rotate': `${(index - (languages.length - 1)/2) * 5}deg`,
                '--card-y': `${Math.abs(index - (languages.length - 1)/2) * Math.abs(index - (languages.length - 1)/2) * 3}px`,
                '--card-z': 10 - Math.round(Math.abs(index - (languages.length - 1)/2))
              }"
            >
              <img :src="s.icon" :alt="s.name" class="skill-logo" />
            </div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <GridDivider className="my-8" />

      <!-- Frontend -->
      <div class="w-full">
        <div class="max-w-[1100px] mx-auto px-6 md:px-10 skill-row">
          <div class="skill-row-label">Frontend</div>
          <div class="skill-row-icons">
            <div 
              v-for="(s, index) in frontend" 
              :key="s.name" 
              class="icon-cell group" 
              :title="s.name"
              :style="{
                '--card-rotate': `${(index - (frontend.length - 1)/2) * 5}deg`,
                '--card-y': `${Math.abs(index - (frontend.length - 1)/2) * Math.abs(index - (frontend.length - 1)/2) * 3}px`,
                '--card-z': 10 - Math.round(Math.abs(index - (frontend.length - 1)/2))
              }"
            >
              <img :src="s.icon" :alt="s.name" class="skill-logo" />
            </div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <GridDivider className="my-8" />

      <!-- Backend -->
      <div class="w-full">
        <div class="max-w-[1100px] mx-auto px-6 md:px-10 skill-row">
          <div class="skill-row-label">Backend</div>
          <div class="skill-row-icons">
            <div 
              v-for="(s, index) in backend" 
              :key="s.name" 
              class="icon-cell group" 
              :title="s.name"
              :style="{
                '--card-rotate': `${(index - (backend.length - 1)/2) * 5}deg`,
                '--card-y': `${Math.abs(index - (backend.length - 1)/2) * Math.abs(index - (backend.length - 1)/2) * 3}px`,
                '--card-z': 10 - Math.round(Math.abs(index - (backend.length - 1)/2))
              }"
            >
              <!-- REST API server inline SVG for visual cohesion -->
              <svg v-if="s.name === 'REST API'" class="skill-logo-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="8" rx="2" />
                <rect x="2" y="13" width="20" height="8" rx="2" />
                <line x1="6" y1="7" x2="6.01" y2="7" stroke-width="3" />
                <line x1="6" y1="17" x2="6.01" y2="17" stroke-width="3" />
              </svg>
              <img v-else :src="s.icon" :alt="s.name" class="skill-logo" />
            </div>
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
  gap: 16px;
  overflow: visible;
}

@media (min-width: 768px) {
  .skill-row {
    grid-template-columns: 180px 1fr;
    gap: 32px;
    align-items: center;
  }
}

.skill-row-label {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-hint);
}

.skill-row-icons {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 8px;
  overflow: visible;
}

/* Tailwind space-x negative equivalent */
.skill-row-icons > * + * {
  margin-left: -14px;
}

.icon-cell {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  border: none;
  background-color: #FFFFFF;
  cursor: pointer;
  transform: translateY(var(--card-y)) rotate(var(--card-rotate));
  z-index: var(--card-z);
  transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.02);
  flex-shrink: 0;
}

/* Hover effects */
.icon-cell:hover {
  transform: translateY(calc(var(--card-y) - 10px)) rotate(var(--card-rotate)) scale(1.15);
  z-index: 50 !important;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08), 0 4px 10px rgba(0, 0, 0, 0.03);
}

.skill-logo {
  width: 30px;
  height: 30px;
  object-fit: contain;
  filter: grayscale(1) opacity(0.6);
  transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
}

.icon-cell:hover .skill-logo {
  filter: grayscale(0) opacity(1);
  transform: scale(1.05);
}

.skill-logo-svg {
  width: 30px;
  height: 30px;
  color: var(--color-hint);
  opacity: 0.6;
  transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
}

.icon-cell:hover .skill-logo-svg {
  color: var(--color-primary);
  opacity: 1;
  transform: scale(1.05);
}
</style>
