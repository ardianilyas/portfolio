<template>
  <div class="error-page" :class="{ 'is-visible': isLoaded }">
    <CustomCursor />
    
    <div class="error-container">
      <!-- Broken Circuit Visual -->
      <div class="circuit-visual-wrapper fade-up">
        <svg class="circuit-svg" viewBox="0 0 600 260" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="12" cy="12" r="0.75" fill="rgba(22, 33, 30, 0.08)" />
            </pattern>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <!-- Grid Background -->
          <rect width="600" height="260" fill="url(#circuit-grid)" />

          <!-- Circuit Traces (Left Side - Active) -->
          <path d="M 40 130 L 140 130 L 200 60 L 290 60" stroke="rgba(15, 63, 47, 0.2)" stroke-width="1.5" stroke-dasharray="4 4" />
          <path d="M 40 200 L 170 200 L 230 130 L 265 130" stroke="rgba(15, 63, 47, 0.3)" stroke-width="1.5" />
          <path d="M 140 130 L 170 200" stroke="rgba(15, 63, 47, 0.15)" stroke-width="1" />

          <!-- Circuit Traces (Right Side - Unreachable) -->
          <path d="M 560 130 L 460 130 L 400 200 L 335 200" stroke="rgba(22, 33, 30, 0.1)" stroke-width="1.5" stroke-dasharray="3 3" />
          <path d="M 560 60 L 430 60 L 370 130 L 335 130" stroke="rgba(22, 33, 30, 0.1)" stroke-width="1.5" stroke-dasharray="3 3" />

          <!-- Severed Gap Lines -->
          <path d="M 265 130 L 282 130" stroke="#0F3F2F" stroke-width="2" stroke-linecap="round" />
          <path d="M 318 130 L 335 130" stroke="rgba(22, 33, 30, 0.2)" stroke-width="1.5" stroke-dasharray="2 2" stroke-linecap="round" />

          <!-- Animated Signal Pulses -->
          <circle cx="0" cy="0" r="3" fill="#0F3F2F" class="signal-dot">
            <animateMotion path="M 40 130 L 140 130 L 200 60 L 290 60" dur="4.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="3" fill="#0F3F2F" class="signal-dot">
            <animateMotion path="M 40 200 L 170 200 L 230 130 L 265 130" dur="3.2s" repeatCount="indefinite" />
          </circle>

          <!-- Nodes (Left Connected) -->
          <circle cx="140" cy="130" r="3.5" fill="var(--color-bg)" stroke="#0F3F2F" stroke-width="1.5" />
          <circle cx="200" cy="60" r="3.5" fill="var(--color-bg)" stroke="#0F3F2F" stroke-width="1.5" />
          <circle cx="170" cy="200" r="3.5" fill="var(--color-bg)" stroke="#0F3F2F" stroke-width="1.5" />

          <!-- Nodes (Right Inactive) -->
          <circle cx="460" cy="130" r="3.5" fill="var(--color-bg)" stroke="rgba(22, 33, 30, 0.2)" stroke-width="1.5" />
          <circle cx="400" cy="200" r="3.5" fill="var(--color-bg)" stroke="rgba(22, 33, 30, 0.2)" stroke-width="1.5" />

          <!-- Central Disconnected Node (Focus Element) -->
          <g transform="translate(300, 130)" class="central-node-group">
            <!-- Pulsing Ring -->
            <circle r="22" fill="none" stroke="#0F3F2F" stroke-width="1" class="pulse-ring" />
            <circle r="14" fill="rgba(15, 63, 47, 0.06)" />
            <circle r="8" fill="var(--color-bg)" stroke="#0F3F2F" stroke-width="2" />
            <!-- Severed X Icon -->
            <path d="M -2.5 -2.5 L 2.5 2.5 M 2.5 -2.5 L -2.5 2.5" stroke="#0F3F2F" stroke-width="1.5" stroke-linecap="round" />
          </g>

          <!-- Technical Badge -->
          <g transform="translate(300, 178)">
            <rect x="-70" y="-12" width="140" height="24" rx="12" fill="var(--color-surface)" stroke="var(--color-border)" />
            <circle cx="-52" cy="0" r="3" fill="#0F3F2F" class="status-blink" />
            <text x="-40" y="3.5" font-family="var(--font-mono)" font-size="10" font-weight="500" fill="var(--color-text-2)" letter-spacing="0.06em">
              SIGNAL_LOST :: 404
            </text>
          </g>
        </svg>
      </div>

      <!-- Text Content -->
      <div class="error-content">
        <h1 class="error-code fade-up fade-up-1">{{ error?.statusCode || 404 }}</h1>
        <p class="error-message fade-up fade-up-2">
          {{ error?.statusCode === 404 ? "This node is unreachable or got lost in the void." : "Something went wrong." }}
        </p>
        
        <div class="fade-up fade-up-3 mt-8">
          <button @click="handleError" class="btn-primary" v-magnetic="0.15">
            Return to home
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { clearError } from '#app'

const props = defineProps({
  error: Object
})

const isLoaded = ref(false)
onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 50)
})

const handleError = () => clearError({ redirect: '/' })
</script>

<style scoped>
.error-page {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg);
  position: relative;
  overflow: hidden;
  padding: 24px;
}

.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 10;
  position: relative;
  width: 100%;
  max-width: 640px;
}

/* ── Circuit Visual ───────────────────────────────────── */
.circuit-visual-wrapper {
  width: 100%;
  max-width: 520px;
  margin-bottom: 8px;
}

.circuit-svg {
  width: 100%;
  height: auto;
  overflow: visible;
}

.pulse-ring {
  animation: ring-expand 2.5s cubic-bezier(0.16, 1, 0.3, 1) infinite;
  transform-origin: center;
}

@keyframes ring-expand {
  0% {
    r: 10px;
    opacity: 0.8;
  }
  100% {
    r: 28px;
    opacity: 0;
  }
}

.status-blink {
  animation: blink 1.6s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
}

.signal-dot {
  filter: drop-shadow(0 0 4px rgba(15, 63, 47, 0.4));
}

/* ── Content Typography ────────────────────────────────── */
.error-content {
  position: relative;
  z-index: 2;
}

.error-code {
  font-family: var(--font-sans);
  font-size: clamp(80px, 14vw, 140px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--color-text);
  margin-bottom: 12px;
}

.error-message {
  font-family: var(--font-sans);
  font-size: 17px;
  color: var(--color-text-2);
  max-width: 380px;
  margin: 0 auto;
  line-height: 1.5;
}

/* ── Primary Button ────────────────────────────────────── */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  color: #f2e8cf;
  background: var(--color-accent);
  padding: 12px 24px;
  border-radius: 9999px;
  transition: opacity 0.2s, transform 0.2s ease, box-shadow 0.2s ease;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.95; 
  transform: translateY(-1px);
  box-shadow: 0 10px 20px -10px rgba(15, 63, 47, 0.4);
}

.btn-primary:active {
  transform: scale(0.96) translateY(1px);
}
</style>
