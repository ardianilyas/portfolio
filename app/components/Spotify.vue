<template>
  <section class="spotify-section fade-up">
    <a 
      v-if="data?.isPlaying" 
      :href="data.songUrl" 
      target="_blank" 
      rel="noopener noreferrer"
      class="spotify-card is-playing"
    >
      <div class="spotify-art-wrap">
        <img :src="data.albumImageUrl" alt="Album Art" class="spotify-art" />
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
        <p class="spotify-track">{{ data.title }}</p>
        <p class="spotify-artist">{{ data.artist }}</p>
      </div>
    </a>
    
    <div v-else class="spotify-card is-offline">
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
import { ref, onMounted, onUnmounted } from 'vue'

const { data, refresh } = await useFetch('/api/spotify')

let interval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  // Poll every 10 seconds for real-time updates
  interval = setInterval(() => {
    refresh()
  }, 10000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<style scoped>
.spotify-section {
  display: flex;
  justify-content: center;
  padding: 40px 20px 100px;
  background-color: var(--color-bg);
}

.spotify-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  width: 100%;
  max-width: 320px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
  text-decoration: none;
}

.spotify-card.is-playing:hover {
  transform: translateY(-2px);
  border-color: #1DB954;
}

.spotify-art-wrap {
  position: relative;
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  overflow: hidden;
  border: 1px solid var(--color-border); /* Sharp container */
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
  background-color: #1DB954;
  animation: eq-bounce 0.8s ease-in-out infinite alternate;
}

.eq-bar:nth-child(2) { animation-delay: -0.3s; }
.eq-bar:nth-child(3) { animation-delay: -0.6s; }

@keyframes eq-bounce {
  0% { transform: scaleY(0.3); }
  100% { transform: scaleY(1); }
}

.spotify-icon-wrap {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
}

.spotify-info {
  flex-grow: 1;
  overflow: hidden;
}

.spotify-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}

.spotify-icon {
  width: 12px;
  height: 12px;
  color: #1DB954;
}

.spotify-icon.offline {
  width: 20px;
  height: 20px;
  color: var(--color-border-2);
}

.spotify-label {
  font-family: var(--font-sans);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-2);
  font-weight: 600;
}

.spotify-track {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.spotify-artist {
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--color-text-2);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
