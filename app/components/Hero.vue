<template>
  <section id="hero" class="relative flex items-center justify-center min-h-[85vh] md:min-h-[90vh] overflow-hidden">
    
    <!-- Space / Globe Orbit Background -->
    <div class="absolute inset-0 pointer-events-none flex items-center justify-center z-0 overflow-hidden">
      
      <!-- Central Glow -->
      <div class="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[var(--color-primary)] opacity-[0.03] md:opacity-[0.05] rounded-full blur-[80px] md:blur-[120px]"></div>
      
      <!-- Outer Orbit Ring -->
      <div class="orbit-ring orbit-slow w-[340px] h-[340px] md:w-[850px] md:h-[850px]">
        <!-- TypeScript (Top) -->
        <div class="orbit-icon-wrapper" style="top: 0%; left: 50%;">
          <img src="https://svgl.app/library/typescript.svg" alt="TypeScript" class="orbit-icon counter-spin-slow" />
        </div>
        <!-- Laravel (Bottom Right) -->
        <div class="orbit-icon-wrapper" style="top: 75%; left: 93.3%;">
          <img src="https://svgl.app/library/laravel.svg" alt="Laravel" class="orbit-icon counter-spin-slow" />
        </div>
        <!-- PHP (Bottom Left) -->
        <div class="orbit-icon-wrapper" style="top: 75%; left: 6.7%;">
          <img src="https://svgl.app/library/php.svg" alt="PHP" class="orbit-icon counter-spin-slow" />
        </div>
      </div>

      <!-- Inner Orbit Ring -->
      <div class="orbit-ring orbit-fast w-[200px] h-[200px] md:w-[550px] md:h-[550px]">
        <!-- JavaScript (Bottom) -->
        <div class="orbit-icon-wrapper" style="top: 100%; left: 50%;">
          <img src="https://svgl.app/library/javascript.svg" alt="JavaScript" class="orbit-icon counter-spin-fast" />
        </div>
        <!-- ExpressJS (Top Right) -->
        <div class="orbit-icon-wrapper" style="top: 25%; left: 93.3%;">
          <img src="https://svgl.app/library/expressjs.svg" alt="ExpressJS" class="orbit-icon counter-spin-fast" />
        </div>
        <!-- Go (Top Left) -->
        <div class="orbit-icon-wrapper" style="top: 25%; left: 6.7%;">
          <img src="https://svgl.app/library/golang.svg" alt="Go" class="orbit-icon counter-spin-fast" />
        </div>
      </div>

    </div>

    <!-- Foreground Content -->
    <div class="max-w-[900px] mx-auto px-3 md:px-10 w-full relative z-10 flex flex-col items-center text-center">

      <!-- Role badge -->
      <span class="section-label fade-up mb-6 md:mb-8 bg-[var(--color-bg)]/80 backdrop-blur-md">
        // Junior Web Developer
      </span>

      <!-- Headline -->
      <h1 class="hero-headline fade-up fade-up-delay-1">
        Ardian Ilyas<span class="blinking-cursor">_</span>
      </h1>

      <!-- Bio -->
      <p class="hero-bio fade-up fade-up-delay-2">
        Backend-focused web developer building scalable server-side applications.
        Primarily working with <strong class="hero-highlight">JavaScript</strong>,
        <strong class="hero-highlight">TypeScript</strong>,
        <strong class="hero-highlight">PHP</strong>, and
        <strong class="hero-highlight">Golang</strong> —
        using frameworks like ExpressJS and Laravel.
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-row items-center justify-center gap-4 mt-10 md:mt-12 fade-up fade-up-delay-3">
        <a href="#portfolio" class="cta-primary">
          View Work
        </a>
        <a href="https://github.com/ardianilyas" target="_blank" rel="noopener noreferrer" class="cta-ghost group bg-[var(--color-bg)]/50 backdrop-blur-sm rounded-full">
          GitHub
          <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator z-10">
      <svg class="w-5 h-5 text-[var(--color-hint)]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7" />
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
// Script intentionally empty
</script>

<style scoped>
/* =========================================
   FOREGROUND TYPOGRAPHY & BUTTONS
   ========================================= */
.hero-headline {
  font-family: var(--font-sans);
  font-size: clamp(48px, 10vw, 96px);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.04em;
  color: var(--color-primary);
  margin-bottom: 24px;
  /* Added a subtle text shadow to lift it off the spinning background */
  text-shadow: 0 4px 24px var(--color-bg);
}

.hero-bio {
  font-family: var(--font-sans);
  font-size: clamp(15px, 2.5vw, 18px);
  line-height: 1.6;
  color: var(--color-muted);
  max-w: 600px;
  margin: 0 auto;
  text-shadow: 0 2px 10px var(--color-bg);
}

.hero-highlight {
  color: var(--color-primary);
  font-weight: 600;
}

.blinking-cursor {
  animation: blink 1s step-end infinite;
  color: var(--color-hint);
  font-weight: 400;
  opacity: 0.5;
}

@keyframes blink {
  50% { opacity: 0; }
}

.cta-primary {
  display: inline-flex;
  align-items: center;
  padding: 12px 28px;
  font-size: 14px;
  font-weight: 600;
  font-family: var(--font-sans);
  letter-spacing: -0.01em;
  color: var(--color-bg);
  background-color: var(--color-primary);
  border-radius: 999px;
  transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
  box-shadow: 0 4px 14px rgba(0,0,0,0.06);
}

.cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.12);
  opacity: 0.95;
}

.cta-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  font-family: var(--font-sans);
  letter-spacing: -0.01em;
  color: var(--color-muted);
  transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
}

.cta-ghost:hover {
  color: var(--color-primary);
}

.scroll-indicator {
  animation: bounce-down 2.5s ease-in-out infinite;
}

@keyframes bounce-down {
  0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.3; }
  50% { transform: translateX(-50%) translateY(8px); opacity: 0.7; }
}


/* =========================================
   BACKGROUND ORBITS (SPACE / GLOBE)
   ========================================= */
.orbit-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px dashed var(--color-rule);
  border-radius: 50%;
  opacity: 0.8;
}

.orbit-icon-wrapper {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 36px;
  height: 36px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-rule);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

@media (min-width: 768px) {
  .orbit-icon-wrapper {
    width: 56px;
    height: 56px;
  }
}

.orbit-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  filter: grayscale(1) opacity(0.5);
  transition: all 0.3s ease;
}

@media (min-width: 768px) {
  .orbit-icon {
    width: 28px;
    height: 28px;
  }
}

/* Animations for spinning the rings and counter-spinning the icons */
@keyframes spin-ring {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes spin-ring-reverse {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(-360deg); }
}

@keyframes counter-spin-icon {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
}

@keyframes spin-icon {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Slow outer orbit */
.orbit-slow { 
  animation: spin-ring 60s linear infinite; 
}
.counter-spin-slow { 
  animation: counter-spin-icon 60s linear infinite; 
}

/* Faster inner orbit */
.orbit-fast { 
  animation: spin-ring-reverse 45s linear infinite; 
}
.counter-spin-fast { 
  animation: spin-icon 45s linear infinite; 
}
</style>
