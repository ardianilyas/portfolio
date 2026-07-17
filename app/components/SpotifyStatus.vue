<template>
  <section class="spotify-section">
    <!-- Loading -->
    <div v-if="loading" class="spotify-card is-offline">
      <div class="spotify-icon-wrap">
        <svg viewBox="0 0 24 24" class="spotify-icon offline" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.021zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      </div>
      <div class="spotify-info">
        <p class="spotify-label">Spotify</p>
        <p class="spotify-track">Loading…</p>
      </div>
    </div>

    <!-- Now Playing -->
    <a
      v-else-if="track?.isPlaying"
      :href="track.songUrl"
      target="_blank"
      rel="noopener noreferrer"
      ref="cardRef"
      class="spotify-card is-playing liquid-glass"
      :style="cardStyle"
    >
      <div class="spotify-art-wrap">
        <img :src="track.albumImageUrl" alt="Album Art" class="spotify-art" />
        <div class="spotify-eq">
          <span class="eq-bar"></span>
          <span class="eq-bar"></span>
          <span class="eq-bar"></span>
        </div>
      </div>
      <div class="spotify-info">
        <div class="spotify-header">
          <svg viewBox="0 0 24 24" class="spotify-icon" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.021zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          <span class="spotify-label">Now Playing</span>
        </div>
        <p class="spotify-track">{{ track.title }}</p>
        <p class="spotify-artist">{{ track.artist }}</p>
        
        <!-- Timer UI -->
        <div class="spotify-progress-wrap">
          <div class="spotify-progress-bar">
            <div class="spotify-progress-fill" :style="{ width: progressPercent + '%' }"></div>
          </div>
          <div class="spotify-time">
            <span>{{ formatTime(currentProgressMs) }}</span>
            <span>{{ formatTime(track.durationMs || 0) }}</span>
          </div>
        </div>
      </div>
    </a>

    <!-- Offline -->
    <div v-else class="spotify-card is-offline liquid-glass">
      <div class="spotify-icon-wrap">
        <svg viewBox="0 0 24 24" class="spotify-icon offline" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.021zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      </div>
      <div class="spotify-info">
        <p class="spotify-label">Spotify</p>
        <p class="spotify-track">Not currently playing</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useMouseInElement } from '@vueuse/core'

interface SpotifyTrack {
  isPlaying: boolean
  title?: string
  artist?: string
  albumImageUrl?: string
  songUrl?: string
  progressMs?: number
  durationMs?: number
}

const track = ref<SpotifyTrack | null>(null)
const loading = ref(true)

// Timer state
const currentProgressMs = ref(0)
let fetchInterval: ReturnType<typeof setInterval> | null = null
let tickInterval: ReturnType<typeof setInterval> | null = null

// Magnetic Physics
const cardRef = ref<HTMLElement | null>(null)
const { elementX, elementY, isOutside, elementHeight, elementWidth } = useMouseInElement(cardRef)

const cardStyle = computed(() => {
  if (isOutside.value || !cardRef.value) {
    return {
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
    }
  }

  // Calculate rotation angles based on mouse position relative to center
  const centerX = elementWidth.value / 2
  const centerY = elementHeight.value / 2
  
  const rotateX = ((elementY.value - centerY) / centerY) * -8 // Max rotation 8deg
  const rotateY = ((elementX.value - centerX) / centerX) * 8

  return {
    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
    transition: 'transform 0.1s ease-out'
  }
})


async function fetchTrack() {
  try {
    const data = await $fetch<SpotifyTrack>('/api/spotify')
    track.value = data
    if (data.isPlaying && data.progressMs) {
      currentProgressMs.value = data.progressMs
    }
  } catch (e) {
    track.value = { isPlaying: false }
  } finally {
    loading.value = false
  }
}

function startTimerTick() {
  tickInterval = setInterval(() => {
    if (track.value?.isPlaying && track.value?.durationMs) {
      if (currentProgressMs.value < track.value.durationMs) {
        currentProgressMs.value += 1000 // Tick 1 second
      }
    }
  }, 1000)
}

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const progressPercent = computed(() => {
  if (!track.value?.durationMs) return 0
  const percent = (currentProgressMs.value / track.value.durationMs) * 100
  return Math.min(Math.max(percent, 0), 100)
})

onMounted(() => {
  fetchTrack()
  fetchInterval = setInterval(fetchTrack, 10000) // Re-sync every 10s
  startTimerTick()
})

onUnmounted(() => {
  if (fetchInterval) clearInterval(fetchInterval)
  if (tickInterval) clearInterval(tickInterval)
})
</script>

<style scoped>
.spotify-section {
  display: flex;
  justify-content: center;
  padding: 40px 20px 100px;
  background-color: transparent;
  perspective: 1000px;
}

.spotify-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px;
  width: 100%;
  max-width: 380px;
  text-decoration: none;
  transform-style: preserve-3d;
  will-change: transform;
}

/* Liquid Glass Implementation */
.liquid-glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 24px -4px rgba(0, 0, 0, 0.2);
}

.spotify-card.is-playing {
  cursor: pointer;
}

.spotify-card.is-playing::before {
  content: '';
  position: absolute;
  inset: -1px;
  border: 1px solid #0F3F2F;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 10;
}

.spotify-card.is-playing:hover::before {
  opacity: 0.5;
}

.spotify-art-wrap {
  position: relative;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1); 
  transform: translateZ(10px); /* Pops out during 3D tilt */
}

.spotify-art {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.spotify-card:hover .spotify-art {
  transform: scale(1.05);
}

.spotify-eq {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.spotify-card:hover .spotify-eq {
  opacity: 1;
}

.eq-bar {
  width: 3px;
  height: 14px;
  background-color: #0F3F2F;
  animation: eq-bounce 0.8s ease-in-out infinite alternate;
}

.eq-bar:nth-child(2) { animation-delay: -0.3s; }
.eq-bar:nth-child(3) { animation-delay: -0.6s; }

@keyframes eq-bounce {
  0% { transform: scaleY(0.3); }
  100% { transform: scaleY(1); }
}

.spotify-icon-wrap {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.spotify-info {
  flex-grow: 1;
  overflow: hidden;
  transform: translateZ(5px);
}

.spotify-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 2px;
}

.spotify-icon {
  width: 12px;
  height: 12px;
  color: #0F3F2F;
}

.spotify-icon.offline {
  width: 20px;
  height: 20px;
  color: var(--color-border-2);
}

.spotify-label {
  font-family: var(--font-sans);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-2);
  font-weight: 600;
  margin: 0;
}

.spotify-track {
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.spotify-artist {
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--color-text-2);
  margin: 0 0 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Timer UI */
.spotify-progress-wrap {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.spotify-progress-bar {
  width: 100%;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.spotify-progress-fill {
  height: 100%;
  background-color: #0F3F2F;
  transition: width 1s linear;
}

.spotify-time {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--color-text-2);
  letter-spacing: 0.02em;
}
</style>
