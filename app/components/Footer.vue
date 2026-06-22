<template>
  <footer
    class="footer"
    role="contentinfo"
    aria-label="Site footer"
  >
    <!-- Background huge text -->
    <div class="footer-bg-text" aria-hidden="true">ardianilyas</div>

    <!-- Main CTA block -->
    <div class="footer-main">
      <div class="footer-inner">

        <div class="footer-cta-block">
          <p class="footer-pre">Let's work together</p>
          <h2 class="footer-headline">
            Ready to build<br>something great?
          </h2>
          <a
            href="mailto:ardianilyas@gmail.com"
            class="footer-email-link"
            aria-label="Send email to ardianilyas@gmail.com"
          >
            ardianilyas@gmail.com
            <svg class="footer-email-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>

      </div>
    </div>

    <!-- Bottom bar -->
    <div class="footer-bar">
      <div class="footer-bar-inner">
        <!-- Left: social links -->
        <nav class="footer-nav" aria-label="Social links">
          <a
            href="https://github.com/ardianilyas"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-bar-link"
          >
            GitHub
            <svg class="footer-bar-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
          <a
            href="mailto:ardianilyas@gmail.com"
            class="footer-bar-link"
          >
            Email
            <svg class="footer-bar-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </nav>

        <!-- Right: copyright -->
        <p class="footer-copy">
          &copy; {{ year }} ardianilyas
        </p>
      </div>
    </div>

  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
/* ── Shell ───────────────────────────────────────────── */
.footer {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: var(--color-bg);
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--color-border);
  overflow: hidden;
}

/* ── Background text ─────────────────────────────────── */
.footer-bg-text {
  position: absolute;
  bottom: -4vw;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-sans);
  font-size: 18vw;
  font-weight: 800;
  letter-spacing: -0.05em;
  color: var(--color-surface);
  white-space: nowrap;
  pointer-events: none;
  z-index: 0;
  user-select: none;
}

/* ── Main CTA ─────────────────────────────────────────── */
.footer-main {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  align-items: center;
}

.footer-inner {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (min-width: 768px) {
  .footer-inner {
    padding: 0 40px;
  }
}

.footer-cta-block {
  padding: 48px 0 40px;
}

/* ── Pre-label ────────────────────────────────────────── */
.footer-pre {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-3);
  margin: 0 0 20px;
}

/* ── Headline ─────────────────────────────────────────── */
.footer-headline {
  font-family: var(--font-sans);
  font-size: clamp(36px, 5.5vw, 72px);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: var(--color-text);
  margin: 0 0 40px;
}

/* ── Email link ───────────────────────────────────────── */
.footer-email-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-sans);
  font-size: clamp(16px, 1.8vw, 20px);
  font-weight: 400;
  color: var(--color-text-2);
  letter-spacing: -0.01em;
  border-bottom: 1px solid var(--color-border-2);
  padding-bottom: 4px;
  transition: color 0.2s, border-color 0.2s;
}

.footer-email-link:hover {
  color: var(--color-text);
  border-bottom-color: var(--color-text-3);
}

.footer-email-arrow {
  flex-shrink: 0;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-email-link:hover .footer-email-arrow {
  transform: translate(3px, -3px);
}

/* ── Bottom bar ───────────────────────────────────────── */
.footer-bar {
  position: relative;
  z-index: 1;
  border-top: 1px solid var(--color-border);
  flex-shrink: 0;
}

.footer-bar-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media (min-width: 768px) {
  .footer-bar-inner {
    padding: 24px 40px;
  }
}

/* ── Nav links ────────────────────────────────────────── */
.footer-nav {
  display: flex;
  align-items: center;
  gap: 24px;
}

.footer-bar-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 400;
  color: var(--color-text-2);
  border-bottom: 1px solid var(--color-border-2);
  padding-bottom: 2px;
  transition: color 0.2s, border-color 0.2s;
  text-decoration: none;
}

.footer-bar-link:hover {
  color: var(--color-text);
  border-bottom-color: var(--color-text-3);
}

.footer-bar-arrow {
  flex-shrink: 0;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-bar-link:hover .footer-bar-arrow {
  transform: translate(2px, -2px);
}

/* ── Copyright ────────────────────────────────────────── */
.footer-copy {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: var(--color-text-3);
  margin: 0;
}
</style>
