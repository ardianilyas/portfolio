<template>
  <section id="hero" class="relative flex items-center" style="background-color: var(--color-bg);">

    <div class="max-w-[1100px] mx-auto px-6 md:px-10 w-full py-14 md:py-20">
      <div class="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10 md:gap-16 items-center">

        <!-- LEFT: Text Column (60%) -->
        <div class="flex flex-col gap-5">

          <!-- Role badge -->
          <span class="section-label fade-up">
            // Junior Web Developer
          </span>

          <!-- Headline -->
          <h1 class="text-[36px] sm:text-[44px] md:text-[52px] font-bold leading-[1.08] tracking-tight fade-up fade-up-delay-1" style="color: var(--color-primary);">
            Ardian Ilyas<span class="blinking-cursor">_</span>
          </h1>

          <!-- Bio -->
          <p class="text-[14px] md:text-base leading-[1.7] max-w-lg fade-up fade-up-delay-2" style="color: var(--color-muted);">
            Backend-focused web developer building scalable server-side applications.
            Primarily working with <strong style="color: var(--color-primary); font-weight: 500;">JavaScript</strong>,
            <strong style="color: var(--color-primary); font-weight: 500;">TypeScript</strong>,
            <strong style="color: var(--color-primary); font-weight: 500;">PHP</strong>, and
            <strong style="color: var(--color-primary); font-weight: 500;">Golang</strong> —
            using frameworks like ExpressJS and Laravel.
          </p>

          <!-- CTA Buttons -->
          <div class="flex items-center gap-4 fade-up fade-up-delay-3">
            <a href="#portfolio" class="cta-primary">
              View Work
            </a>
            <a href="https://github.com/ardianilyas" target="_blank" rel="noopener noreferrer" class="cta-ghost">
              GitHub
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
        </div>

        <!-- RIGHT: Floating Tech Icons (40%) -->
        <div class="hidden md:flex items-center justify-center">
          <div class="relative w-72 h-72">
            <div v-for="(icon, i) in floatingIcons" :key="icon.name"
                 class="floating-icon"
                 :style="{
                   top: icon.top,
                   left: icon.left,
                   animationDelay: `${i * 0.5}s`,
                   animationDuration: `${3 + i * 0.4}s`
                 }">
              <img :src="icon.src" :alt="icon.name" class="w-9 h-9 object-contain icon-grayscale" />
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 scroll-indicator">
      <svg class="w-5 h-5" style="color: var(--color-hint);" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7" />
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
const floatingIcons = [
  { name: 'JavaScript', src: 'https://svgl.app/library/javascript.svg', top: '8%', left: '12%' },
  { name: 'TypeScript', src: 'https://svgl.app/library/typescript.svg', top: '2%', left: '58%' },
  { name: 'PHP', src: 'https://svgl.app/library/php.svg', top: '38%', left: '78%' },
  { name: 'Go', src: 'https://svgl.app/library/golang.svg', top: '60%', left: '8%' },
  { name: 'Node.js', src: 'https://svgl.app/library/nodejs.svg', top: '68%', left: '58%' },
  { name: 'Laravel', src: 'https://svgl.app/library/laravel.svg', top: '28%', left: '38%' },
]
</script>

<style scoped>
.blinking-cursor {
  animation: blink 1s step-end infinite;
  color: var(--color-hint);
}

@keyframes blink {
  50% { opacity: 0; }
}

.cta-primary {
  display: inline-flex;
  align-items: center;
  padding: 10px 24px;
  font-size: 13px;
  font-weight: 500;
  font-family: var(--font-mono);
  letter-spacing: 0.02em;
  border: 1px solid var(--color-primary);
  color: var(--color-bg);
  background-color: var(--color-primary);
  border-radius: 6px;
  transition: all 0.2s ease;
  text-decoration: none;
}
.cta-primary:hover {
  opacity: 0.85;
}

.cta-ghost {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 500;
  font-family: var(--font-mono);
  letter-spacing: 0.02em;
  color: var(--color-muted);
  transition: color 0.2s ease;
  text-decoration: none;
}
.cta-ghost:hover {
  color: var(--color-primary);
}

.floating-icon {
  position: absolute;
  padding: 14px;
  border-radius: 14px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-rule);
  transition: border-color 0.2s ease;
}

.floating-icon:hover {
  border-color: var(--color-primary);
}

@media (prefers-reduced-motion: no-preference) {
  .floating-icon {
    animation: float 3s ease-in-out infinite;
  }
}

.icon-grayscale {
  filter: grayscale(1);
  opacity: 0.55;
  transition: all 0.3s ease;
}

.floating-icon:hover .icon-grayscale {
  filter: grayscale(0);
  opacity: 1;
}

.scroll-indicator {
  animation: bounce-down 2s ease-in-out infinite;
}

@keyframes bounce-down {
  0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.4; }
  50% { transform: translateX(-50%) translateY(6px); opacity: 0.8; }
}
</style>
