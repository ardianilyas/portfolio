<template>
  <section
    id="hero"
    class="hero"
    aria-label="Introduction"
  >
    <div class="hero-inner">
      <div class="hero-content">

        <!-- Status badge -->
        <div class="hero-status fade-up fade-up-1" aria-label="Availability status">
          <span class="hero-status-text"><strong>Available:</strong> Full-stack developer roles</span>
        </div>

        <!-- Headline -->
        <h1 class="hero-headline fade-up fade-up-2">
          Hi, I'm Ardian Ilyas. <br class="hidden md:block"> A Full-Stack Developer.
        </h1>

        <!-- Sub -->
        <p class="hero-sub fade-up fade-up-3">
          I build reliable systems and polished interfaces. Specializing in TypeScript and Go, I transform complex requirements into seamless, high-performing digital products.
        </p>

        <!-- CTAs -->
        <div class="hero-actions fade-up fade-up-4">
          <a href="#portfolio" class="btn-primary" @click.prevent="scrollTo('portfolio')">
            View my work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
          <a href="mailto:ardianilyas@gmail.com" class="btn-ghost">
            Get in touch
          </a>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* ── Shell ───────────────────────────────────────────── */
.hero {
  position: relative;
  width: 100%;
  background-color: var(--color-bg);
  padding-top: 64px; /* navbar height */
  overflow: hidden;
}

.hero-inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 120px 24px 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100dvh - 64px);
  text-align: center;
}

@media (min-width: 768px) {
  .hero-inner {
    padding: 160px 40px 200px;
  }
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* ── Status badge ─────────────────────────────────────── */
.hero-status {
  display: inline-flex;
  align-items: center;
  margin-bottom: 24px;
  background: #f0fdfa; /* light teal matching the reference */
  padding: 6px 16px;
  border-radius: 9999px;
  border: 1px solid #ccfbf1;
}

.hero-status-text {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 500;
  color: #0f766e;
}
.hero-status-text strong {
  font-weight: 600;
}

/* ── Headline ─────────────────────────────────────────── */
.hero-headline {
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  font-size: clamp(48px, 7vw, 88px);
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: var(--color-text);
  margin: 0 0 24px;
  max-width: 15ch;
}

@media (min-width: 768px) {
  .hero-headline {
    max-width: 22ch;
  }
}

/* ── Sub ──────────────────────────────────────────────── */
.hero-sub {
  font-family: var(--font-sans);
  font-size: 18px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--color-text-2);
  max-width: 600px;
  margin: 0 0 40px;
  letter-spacing: -0.01em;
}

/* ── CTAs ─────────────────────────────────────────────── */
.hero-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
  background: #000000;
  padding: 12px 28px;
  border-radius: 9999px;
  transition: opacity 0.2s ease, transform 0.2s ease;
  white-space: nowrap;
}

.btn-icon {
  transition: transform 0.2s ease;
}

.btn-primary:hover .btn-icon {
  transform: translateX(4px);
}

.btn-primary:hover { 
  opacity: 0.85; 
}
.btn-primary:active { 
  transform: translateY(1px); 
}

.btn-ghost {
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text);
  background: #ffffff;
  padding: 12px 28px;
  border-radius: 9999px;
  border: 1px solid var(--color-border);
  transition: border-color 0.2s, background 0.2s;
  white-space: nowrap;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.btn-ghost:hover {
  background: var(--color-surface);
}
</style>
