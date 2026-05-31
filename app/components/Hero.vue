<template>
  <section id="hero" class="relative w-full pt-4 md:pt-16 pb-12 bg-[#f4f4f5]">
    
    <!-- The Inner Floating Container -->
    <div class="relative w-[calc(100%-1rem)] md:w-[calc(100%-2rem)] max-w-[1400px] mx-auto bg-hero-blue rounded-[24px] md:rounded-[48px] shadow-[0_20px_60px_rgba(12,44,219,0.2)] overflow-hidden flex flex-col items-center justify-center text-white border-2 border-white/20">
      
      <!-- Blueprint Grid Overlay -->
      <div class="absolute inset-0 blueprint-grid opacity-[0.2] pointer-events-none z-0"></div>

      <!-- Massive Brutalist Typography Block -->
      <div class="relative z-10 w-full px-4 py-8 md:py-16 flex flex-col items-center justify-center select-none">
        
        <!-- Absolute Decorations Container -->
        <div class="absolute inset-0 pointer-events-none z-20">
          <!-- Floating Neon Badge (Top Left) -->
          <div class="absolute left-[5%] md:left-[5%] lg:left-[5%] top-[10px] md:top-[5%] scale-75 md:scale-100 origin-top-left pointer-events-auto">
            <div class="relative w-28 h-28 md:w-32 md:h-32 bg-[#CCFF00] rounded-full flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-lg border-2 border-hero-blue">
              <svg viewBox="0 0 100 100" class="absolute inset-0 w-full h-full text-hero-blue spinning-badge-text">
                <path id="circlePath" fill="transparent" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                <text font-family="var(--font-sans)" font-size="12" font-weight="900" fill="currentColor" letter-spacing="1">
                  <textPath href="#circlePath" startOffset="0%">
                    AVAILABLE FOR WORK •
                  </textPath>
                </text>
              </svg>
              <!-- Inner arrow icon -->
              <svg class="w-8 h-8 md:w-10 md:h-10 text-hero-blue transform -rotate-45" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>

          <!-- Wavy Neon Arrow (Top Right) -->
          <svg class="absolute right-[0%] md:right-[5%] top-[-5%] md:top-[10%] w-32 h-32 md:w-56 md:h-56 text-[#CCFF00] z-20 fade-in delay-200 pointer-events-auto" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
            <path d="M80,10 Q60,40 70,60 T30,80 M40,70 L30,80 L40,90" />
          </svg>
        </div>

        <!-- Typography Flow Container (4 lines) -->
        <div class="relative z-30 flex flex-col items-center justify-center w-full">
          <h1 class="brutalist-block text-backend fade-in-up delay-100"><span class="text-[#CCFF00]">#</span>BACKEND</h1>
          <h1 class="brutalist-block text-developer fade-in-up delay-200">DEVELOPER</h1>
          <h1 class="brutalist-block text-ardian fade-in-up delay-300">ARDIAN</h1>
          <h1 class="brutalist-block text-ilyas fade-in-up delay-500">ILYAS</h1>
        </div>

        <!-- Floating Glass Cards Container -->
        <div class="absolute inset-0 pointer-events-none z-30">
          <!-- Floating Glass Card 1 (TypeScript) -->
          <div class="absolute left-[-2%] md:left-[5%] top-[30%] md:top-[40%] glass-card tilt-left float-anim z-20 flex scale-[0.5] md:scale-[0.8] lg:scale-100 origin-center pointer-events-auto">
            <div class="glass-avatar">
              <img src="https://svgl.app/library/typescript.svg" alt="TypeScript" class="w-12 h-12" />
            </div>
            <div class="glass-info">
              <p class="glass-username">ts.ardian.dev</p>
              <p class="glass-points">14,204 commits</p>
            </div>
          </div>

          <!-- Floating Glass Card 2 (Go) -->
          <div class="absolute right-[-2%] md:right-[5%] top-[70%] md:top-[75%] glass-card tilt-right float-anim-delayed z-20 flex scale-[0.5] md:scale-[0.8] lg:scale-100 origin-center pointer-events-auto">
            <div class="glass-avatar">
              <img src="https://svgl.app/library/golang.svg" alt="Go" class="w-12 h-12" />
            </div>
            <div class="glass-info">
              <p class="glass-username">go.ardian.dev</p>
              <p class="glass-points">1.0ms latency</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
// Script intentionally empty
</script>

<style scoped>
/* =========================================
   NEO-BRUTALIST AESTHETIC VARIABLES
   ========================================= */
.bg-hero-blue {
  background-color: #0c2cdb; 
}

.text-hero-blue {
  color: #0c2cdb;
}

.blueprint-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.25) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.25) 1px, transparent 1px);
}

/* =========================================
   TYPOGRAPHY
   ========================================= */
.brutalist-block {
  font-family: var(--font-sans);
  font-weight: 900;
  text-transform: uppercase;
  margin: 0;
  padding: 0;
  color: #ffffff;
  text-shadow: 0 10px 40px rgba(0,0,0,0.15);
  white-space: nowrap;
  letter-spacing: -0.02em;
  line-height: 0.85; /* Extremely tight vertical stacking */
}

/* Dynamically tuned to span exactly edge-to-edge up to 1400px width */
.text-backend { font-size: clamp(40px, 13.5vw, 189px); }
.text-developer { font-size: clamp(38px, 12.5vw, 175px); }
.text-ardian { font-size: clamp(56px, 18vw, 252px); }
.text-ilyas { font-size: clamp(66px, 22.5vw, 315px); }

/* =========================================
   NEO-BRUTALIST ACCENTS
   ========================================= */
.spinning-badge-text {
  animation: spin 12s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* =========================================
   FLOATING GLASSMORPHISM CARDS
   ========================================= */
.glass-card {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 32px;
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border: 2px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 40px 80px rgba(0,0,0,0.25), inset 0 0 30px rgba(255,255,255,0.2);
}

@media (min-width: 1024px) {
  .glass-card {
    padding: 32px 48px;
    border-radius: 40px;
  }
}

.tilt-left {
  transform: rotate(-12deg);
}

.tilt-right {
  transform: rotate(15deg);
}

.float-anim {
  animation: float-left 7s ease-in-out infinite;
}

.float-anim-delayed {
  animation: float-right 8s ease-in-out infinite 2s;
}

@keyframes float-left {
  0% { transform: translateY(0px) rotate(-12deg); }
  50% { transform: translateY(-30px) rotate(-6deg); }
  100% { transform: translateY(0px) rotate(-12deg); }
}

@keyframes float-right {
  0% { transform: translateY(0px) rotate(15deg); }
  50% { transform: translateY(-25px) rotate(8deg); }
  100% { transform: translateY(0px) rotate(15deg); }
}

.glass-avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  border: 4px solid rgba(255,255,255,0.9);
}

.glass-username {
  font-family: var(--font-sans);
  font-weight: 800;
  font-size: 24px;
  color: #ffffff;
  margin-bottom: 4px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.glass-points {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 16px;
  color: rgba(255,255,255,0.8);
}

/* =========================================
   ANIMATIONS
   ========================================= */
.fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(40px);
}

.fade-in {
  animation: fadeIn 1s ease forwards;
  opacity: 0;
}

.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-500 { animation-delay: 500ms; }

@keyframes fadeInUp {
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  to { opacity: 1; }
}

.scroll-indicator {
  animation: bounce-down 2.5s ease-in-out infinite;
}

@keyframes bounce-down {
  0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.3; }
  50% { transform: translateX(-50%) translateY(8px); opacity: 0.8; }
}
</style>
