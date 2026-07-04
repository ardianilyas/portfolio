<template>
  <section id="skills" aria-labelledby="skills-heading" class="bg-[var(--color-surface)] relative" ref="skillsSection">
    
    <!-- Desktop: sticky scroll reveal -->
    <div v-if="!isMobile" class="sticky top-0 h-screen flex flex-col justify-center px-6 md:px-0">
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

    <!-- Mobile: static, fully visible text -->
    <div v-else class="flex flex-col justify-center items-center min-h-screen px-6">
      <div class="max-w-[1100px] mx-auto w-full">
        <p class="scroll-reveal-prose">
          <span
            v-for="(word, index) in words"
            :key="index"
            class="prose-word is-active"
            :class="{ 'is-skill': word.isSkill }"
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
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

const handleScroll = () => {
  if (!skillsSection.value || isMobile.value) return
  
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
  checkMobile()
  window.addEventListener('resize', checkMobile, { passive: true })
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll() 
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
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
/* Desktop: tall enough to scroll through */
#skills {
  height: 100vh; /* mobile: just viewport height */
}

@media (min-width: 768px) {
  #skills {
    height: 400vh;
  }
}

/* ── Scroll Reveal Prose ───────────────────────────────────────── */
.scroll-reveal-prose {
  font-family: var(--font-sans);
  font-size: clamp(28px, 6vw, 76px);
  font-weight: 600;
  line-height: 1.1;
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
  color: #D4D4D8;
  transition: color 0.1s ease, text-shadow 0.1s ease;
  will-change: color;
}

.prose-word.is-active {
  color: var(--color-text);
}

/* ── Skill Words ───────────────────────────────────────── */
.prose-word.is-skill {
  font-weight: 600; 
  color: #D4D4D8;
}

.prose-word.is-skill.is-active {
  color: var(--color-accent); 
  text-shadow: none;
}
</style>
