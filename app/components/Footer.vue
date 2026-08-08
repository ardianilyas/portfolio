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
          <div class="footer-pre-wrap">
            <span class="footer-pulse-dot" aria-hidden="true"></span>
            <p class="footer-pre">{{ $t('footer.pre') }}</p>
          </div>
          
          <h2 class="footer-headline">
            <span>{{ $t('footer.headline_prefix') }}</span>
            <button
              class="footer-role-trigger"
              @click="cycleRole"
              title="Click to cycle engineer role focus"
              aria-label="Cycle engineer role focus"
            >
              <span class="role-text">{{ currentRole }}</span>
              <span class="role-icon" aria-hidden="true">↺</span>
            </button>
            <br class="hidden sm:inline" />
            <span>{{ $t('footer.headline_suffix') }}</span>
          </h2>

          <div class="footer-action-row">
            <a
              href="mailto:ardianilyas@gmail.com"
              class="footer-email-link"
              aria-label="Send email to ardianilyas@gmail.com"
            >
              <span>ardianilyas@gmail.com</span>
              <svg class="footer-email-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>

            <button
              class="footer-copy-btn"
              @click="copyEmail"
              :class="{ 'is-copied': isCopied }"
              aria-label="Copy email address to clipboard"
            >
              <svg v-if="!isCopied" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>{{ isCopied ? $t('footer.copied') : $t('footer.copy_email') }}</span>
            </button>
          </div>
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
            <svg class="footer-bar-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
          <a
            href="mailto:ardianilyas@gmail.com"
            class="footer-bar-link"
          >
            Email
            <svg class="footer-bar-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
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
import { ref } from 'vue'

const year = new Date().getFullYear()

const roles = [
  'Full-Stack Engineer',
  'Backend Developer',
  'Laravel & Nuxt Specialist',
  'Software Engineer'
]

const roleIndex = ref(0)
const currentRole = ref(roles[0])

function cycleRole() {
  roleIndex.value = (roleIndex.value + 1) % roles.length
  currentRole.value = roles[roleIndex.value]
}

const isCopied = ref(false)

async function copyEmail() {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText('ardianilyas@gmail.com')
      isCopied.value = true
      setTimeout(() => {
        isCopied.value = false
      }, 2500)
    }
  } catch (err) {
    console.error('Failed to copy email', err)
  }
}
</script>

<style scoped>
/* ── Shell ───────────────────────────────────────────── */
.footer {
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 100%;
  background-color: #0F3F2F;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
}

/* ── Background text ─────────────────────────────────── */
.footer-bg-text {
  position: absolute;
  bottom: -1.5vw;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  text-align: center;
  font-family: var(--font-sans);
  font-size: clamp(54px, 20.2vw, 24.5vw);
  font-weight: 900;
  letter-spacing: -0.06em;
  line-height: 0.8;
  color: rgba(242, 232, 207, 0.06);
  white-space: nowrap;
  pointer-events: none;
  z-index: 0;
  user-select: none;
  overflow: hidden;
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
  box-sizing: border-box;
}

@media (min-width: 768px) {
  .footer-inner {
    padding: 0 40px;
  }
}

.footer-cta-block {
  padding: 32px 0 24px;
}

/* ── Pre-label ────────────────────────────────────────── */
.footer-pre-wrap {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.footer-pulse-dot {
  width: 6px;
  height: 6px;
  background: #10B981;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
}

.footer-pre {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(242, 232, 207, 0.75);
  margin: 0;
}

/* ── Headline & Role Cycler ───────────────────────────── */
.footer-headline {
  font-family: var(--font-sans);
  font-size: clamp(30px, 5.2vw, 64px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.15;
  color: #f2e8cf;
  margin: 0 0 28px;
  max-width: 950px;
}

.footer-role-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(242, 232, 207, 0.1);
  color: #10B981;
  padding: 2px 14px;
  border-radius: 9999px;
  border: 1px dashed rgba(16, 185, 129, 0.4);
  cursor: pointer;
  margin: 0 4px;
  transition: all 0.25s ease;
  user-select: none;
  font-size: 0.95em;
  vertical-align: middle;
}

.footer-role-trigger:hover {
  background: rgba(16, 185, 129, 0.18);
  border-color: #10B981;
  transform: translateY(-2px);
  color: #34D399;
}

.role-icon {
  font-family: var(--font-mono);
  font-size: 0.7em;
  opacity: 0.7;
  transition: transform 0.4s ease;
}

.footer-role-trigger:hover .role-icon {
  transform: rotate(180deg);
  opacity: 1;
}

/* ── Action Row & Copy Button ─────────────────────────── */
.footer-action-row {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.footer-email-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-sans);
  font-size: clamp(17px, 1.9vw, 21px);
  font-weight: 500;
  color: #f2e8cf;
  letter-spacing: -0.01em;
  border-bottom: 1.5px solid rgba(242, 232, 207, 0.4);
  padding: 4px 6px 4px 0;
  word-break: break-all;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-email-link:hover {
  color: #ffffff;
  border-bottom-color: #ffffff;
  transform: translateY(-1px);
}

.footer-email-arrow {
  flex-shrink: 0;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}

.footer-email-link:hover .footer-email-arrow {
  transform: translate(3px, -3px);
}

.footer-copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-family: var(--font-sans);
  font-size: 13.5px;
  font-weight: 500;
  color: rgba(242, 232, 207, 0.9);
  background: rgba(242, 232, 207, 0.06);
  border: 1px solid rgba(242, 232, 207, 0.15);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.footer-copy-btn:hover {
  background: rgba(242, 232, 207, 0.12);
  border-color: rgba(242, 232, 207, 0.3);
  color: #ffffff;
}

.footer-copy-btn.is-copied {
  background: rgba(16, 185, 129, 0.2);
  border-color: #10B981;
  color: #34D399;
}

/* ── Bottom bar ───────────────────────────────────────── */
.footer-bar {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
}

.footer-bar-inner {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 16px 24px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  box-sizing: border-box;
}

@media (min-width: 768px) {
  .footer-bar-inner {
    padding: 20px 40px 36px;
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
  font-size: 15.5px;
  font-weight: 450;
  color: rgba(242, 232, 207, 0.85);
  border-bottom: 1px solid rgba(242, 232, 207, 0.3);
  padding-bottom: 2px;
  transition: color 0.2s ease, border-color 0.2s ease;
  text-decoration: none;
}

.footer-bar-link:hover {
  color: #f2e8cf;
  border-bottom-color: rgba(242, 232, 207, 0.8);
}

.footer-bar-arrow {
  flex-shrink: 0;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}

.footer-bar-link:hover .footer-bar-arrow {
  transform: translate(2px, -2px);
}

/* ── Copyright ────────────────────────────────────────── */
.footer-copy {
  font-family: var(--font-mono);
  font-size: 13.5px;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: rgba(242, 232, 207, 0.65);
  margin: 0;
}
</style>
