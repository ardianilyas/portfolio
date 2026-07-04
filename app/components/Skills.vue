<template>
  <section id="skills" aria-labelledby="skills-heading" class="bg-[var(--color-surface)] relative" ref="skillsSection">
    
    <div class="sticky top-0 h-screen flex flex-col justify-center px-6 md:px-0">
      
      <div class="max-w-[1100px] mx-auto w-full">
        <!-- Scroll reveal text block -->
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
#skills {
  /* Reduced on mobile, full on desktop */
  height: 250vh; 
}

@media (min-width: 768px) {
  #skills {
    height: 400vh;
  }
}

/* ── Scroll Reveal Prose ───────────────────────────────────────── */
.scroll-reveal-prose {
  font-family: var(--font-sans);
  font-size: clamp(28px, 6vw, 76px); /* Smaller minimum for mobile */
  font-weight: 600;
  line-height: 1.1; /* Tighter line-height */
  letter-spacing: -0.04em; /* Tighter tracking */
  cursor: default;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  gap: 0 0.25em; /* Reduced vertical gap for tighter layout */
  max-width: 1100px;
}

/* ── Individual Words ───────────────────────────────────────── */
.prose-word {
  color: #D4D4D8; /* Lighter gray by default (zinc-300) */
  transition: color 0.1s ease, text-shadow 0.1s ease;
  will-change: color;
}

.prose-word.is-active {
  color: var(--color-text); /* Solid dark when scrolled over */
}

/* ── Skill Words ───────────────────────────────────────── */
.prose-word.is-skill {
  font-weight: 600; 
  color: #D4D4D8; /* Stay lighter gray initially so it's a surprise */
}

.prose-word.is-skill.is-active {
  /* Use the green accent color from the "Get in touch" link */
  color: var(--color-accent); 
  text-shadow: none; /* Keep it perfectly clean, no bold or glow */
}
</style>
