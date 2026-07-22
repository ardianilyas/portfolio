<template>
  <section id="skills" aria-labelledby="skills-heading" class="bg-[var(--color-surface)] relative" ref="skillsSection">
    
    <!-- Unified Sticky Scroll Reveal (Mobile & Desktop) -->
    <div class="sticky top-0 h-screen flex flex-col justify-center px-6 md:px-0">
      <div class="max-w-[1100px] mx-auto w-full">
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

const proseRaw = "I build scalable backends with TypeScript, Laravel, Express, and Drizzle ORM. I craft fluid interfaces using React, Next.js, Vue.js, and TailwindCSS."

const skillKeywords = new Set([
  'TypeScript', 'Laravel', 'Express', 'Drizzle', 'ORM', 'React', 'Nextjs', 'Vuejs', 'TailwindCSS'
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
/* Mobile scroll height: 220vh for snappy, natural scroll pacing */
#skills {
  height: 220vh;
}

/* Desktop scroll height: 350vh for smooth scroll pacing */
@media (min-width: 768px) {
  #skills {
    height: 350vh;
  }
}

/* ── Scroll Reveal Prose ───────────────────────────────────────── */
.scroll-reveal-prose {
  font-family: var(--font-sans);
  font-size: clamp(32px, 8.5vw, 76px);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.04em;
  cursor: default;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  gap: 0 0.25em;
  max-width: 1100px;
}

/* ── Individual Words ───────────────────────────────────────── */
.prose-word {
  color: var(--color-border-2);
  transition: color 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
              text-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: color, transform;
}

.prose-word.is-active {
  color: var(--color-text);
}

/* ── Skill Words Highlight ─────────────────────────────────────── */
.prose-word.is-skill {
  font-weight: 600; 
  color: var(--color-border-2);
}

.prose-word.is-skill.is-active {
  color: #0F3F2F;
  text-shadow: 0 4px 16px rgba(15, 63, 47, 0.18);
}
</style>
