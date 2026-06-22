<template>
  <section id="skills" aria-labelledby="skills-heading" class="bg-[var(--color-surface)] relative" ref="skillsSection">
    
    <div class="sticky top-0 h-screen flex flex-col justify-center px-6 md:px-0">
      
      <div class="max-w-[1100px] mx-auto w-full">
        <!-- Increased bottom margin to add top padding to the text -->
        <h2 class="skills-title mb-16 md:mb-24">
          From Idea to Launch
        </h2>

        <p class="scroll-reveal-prose">
          <span
            v-for="(word, index) in words"
            :key="index"
            class="prose-word"
            :class="{
              'is-skill': word.isSkill,
              'is-active': scrollProgress > (index / words.length)
            }"
          >
            {{ word.text }}
          </span>
        </p>
      </div>

    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const skillsSection = ref<HTMLElement | null>(null)
const scrollProgress = ref(0)

const handleScroll = () => {
  if (!skillsSection.value) return
  
  const rect = skillsSection.value.getBoundingClientRect()
  const windowHeight = window.innerHeight
  
  if (rect.top > 0) {
    scrollProgress.value = 0
  } else {
    const scrolledDistance = -rect.top
    const totalScrollableDistance = rect.height - windowHeight
    const progress = scrolledDistance / totalScrollableDistance
    scrollProgress.value = Math.max(0, Math.min(1, progress))
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll() 
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Shortened, punchy 50-word copy
const proseRaw = "I engineer scalable systems and polished interfaces. My foundation relies on strict typing with TypeScript and the raw performance of Go. I architect robust backends using Laravel, Node.js, and PostgreSQL, while ensuring data integrity with Prisma and Drizzle. On the frontend, I craft fluid experiences using Vue.js, NuxtJS, and TailwindCSS."

const skillKeywords = new Set([
  'TypeScript', 'Go', 'Laravel', 'Nodejs', 'PostgreSQL', 
  'Prisma', 'Drizzle', 'Vuejs', 'NuxtJS', 'TailwindCSS'
])

const words = proseRaw.split(' ').map(w => {
  const cleanWord = w.replace(/[.,]/g, '')
  return {
    text: w,
    isSkill: skillKeywords.has(cleanWord)
  }
})
</script>

<style scoped>
#skills {
  /* Reduced from 250vh to 150vh so the animation plays much faster with less scrolling */
  height: 150vh; 
}

.skills-title {
  font-family: var(--font-sans);
  font-size: clamp(28px, 3.5vw, 42px);
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--color-text);
  margin: 0 0 40px 0;
  line-height: 1.1;
}

@media (min-width: 768px) {
  .skills-title {
    margin-bottom: 80px;
  }
}

/* ── Scroll Reveal Prose ───────────────────────────────────────── */
.scroll-reveal-prose {
  font-family: var(--font-sans);
  font-size: clamp(16px, 2vw, 24px);
  /* Lighter weight requested */
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: -0.01em;
  cursor: default;
  display: flex;
  flex-wrap: wrap;
  gap: 0.15em 0.3em;
  max-width: 900px;
}

/* ── Individual Words ───────────────────────────────────────── */
.prose-word {
  color: var(--color-text-3); /* Muted gray by default */
  transition: color 0.1s ease, text-shadow 0.1s ease;
  will-change: color;
}

.prose-word.is-active {
  color: var(--color-text); /* Solid dark when scrolled over */
}

/* ── Skill Words ───────────────────────────────────────── */
.prose-word.is-skill {
  /* No bold */
  font-weight: 400; 
  color: var(--color-text-3); /* Stay gray initially so it's a surprise */
}

.prose-word.is-skill.is-active {
  /* Use the green accent color from the "Get in touch" link */
  color: var(--color-accent); 
  text-shadow: none; /* Keep it perfectly clean, no bold or glow */
}
</style>
