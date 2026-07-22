<template>
  <div class="error-page" :class="{ 'is-visible': isLoaded }">
    <CustomCursor />
    
    <div class="error-container">
      <div class="error-visual fade-up">
        <div class="orb"></div>
        <div class="orb orb-2"></div>
      </div>
      
      <div class="error-content">
        <h1 class="error-code fade-up fade-up-1">{{ error?.statusCode || 404 }}</h1>
        <p class="error-message fade-up fade-up-2">
          {{ error?.statusCode === 404 ? "This page got lost in the void." : "Something went wrong." }}
        </p>
        
        <div class="fade-up fade-up-3 mt-10">
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
}

.error-content {
  position: relative;
  z-index: 2;
}

.error-code {
  font-family: var(--font-sans);
  font-size: clamp(120px, 20vw, 240px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--color-text);
  margin-bottom: 24px;
  /* Adds a premium optical blend over the orbs */
  mix-blend-mode: overlay;
  opacity: 0.9;
}

.error-message {
  font-family: var(--font-sans);
  font-size: 20px;
  color: var(--color-text-2);
  max-width: 400px;
  margin: 0 auto;
}

/* Minimalist floating visual (orbs) */
.error-visual {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.orb {
  position: absolute;
  width: 40vw;
  height: 40vw;
  max-width: 400px;
  max-height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle at center, rgba(15, 63, 47, 0.08), transparent 70%);
  filter: blur(40px);
  animation: float 12s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  will-change: transform;
}

.orb-2 {
  background: radial-gradient(circle at center, rgba(15, 63, 47, 0.04), transparent 70%);
  width: 30vw;
  height: 30vw;
  animation: float-reverse 15s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  animation-delay: -5s;
  will-change: transform;
}

@keyframes float {
  0%, 100% { transform: translate(-10%, -10%) scale(1); }
  50% { transform: translate(10%, 10%) scale(1.05); }
}

@keyframes float-reverse {
  0%, 100% { transform: translate(10%, 10%) scale(1.05); }
  50% { transform: translate(-10%, -10%) scale(1); }
}

/* Base button styling since it's an isolated page */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-sans);
  font-size: 15px;
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
