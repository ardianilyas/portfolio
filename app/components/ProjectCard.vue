<template>
  <a
    :href="github"
    target="_blank"
    rel="noopener noreferrer"
    class="project-card group flex flex-col overflow-hidden"
  >
    <!-- Mac-style Window containing the Image Placeholder -->
    <div class="relative w-full overflow-hidden bg-[#f4f4f5] border-b border-[var(--color-rule)] flex items-end justify-center pt-6 px-4 sm:px-8">
      
      <!-- Mac Window Frame -->
      <div class="relative w-full h-[160px] sm:h-[200px] bg-white rounded-t-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-200 border-b-0 overflow-hidden transition-transform duration-700 ease-out group-hover:-translate-y-3 translate-y-4 flex flex-col">
        
        <!-- Mac Window Header -->
        <div class="h-7 bg-[#F9FAFB] border-b border-gray-200 flex items-center px-3 gap-1.5 shrink-0 z-20 relative">
          <div class="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
          <div class="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
          <div class="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
        </div>
        
        <!-- Mac Window Content (Vibrant Mesh Gradient Image Placeholder) -->
        <div class="flex-1 relative overflow-hidden">
          <div class="absolute inset-0 w-full h-full opacity-90 transition-transform duration-1000 ease-out group-hover:scale-110" :class="getGradientClass(name)"></div>
        </div>
        
        <!-- Glassmorphism overlay on hover to reveal view button -->
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 backdrop-blur-[0px] group-hover:backdrop-blur-[2px] transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100 z-30">
           <span class="text-sm font-semibold tracking-wide text-gray-900 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2 border border-black/5">
             View Source
             <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
           </span>
        </div>
      </div>
    </div>

    <!-- Card Content -->
    <div class="p-6 md:p-8 flex flex-col flex-1 relative bg-white z-20">
      <!-- Project Name & Arrow -->
      <div class="flex justify-between items-start mb-3">
        <h3 class="project-name">{{ name }}</h3>
        <div class="project-arrow">
          <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>
      </div>

      <!-- Description -->
      <p class="project-desc">{{ description }}</p>

      <!-- Tech Tags -->
      <div class="flex flex-wrap gap-2 mt-6">
        <span v-for="tag in tags" :key="tag" class="project-tag glass-pill">
          {{ tag }}
        </span>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  description: string
  tags: string[]
  github: string
}>()

// Generate a vibrant mesh gradient based on the project name
function getGradientClass(name: string) {
  const hash = name.length % 4
  const gradients = [
    'bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-500 via-pink-500 to-cyan-400',
    'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-fuchsia-500 via-purple-600 to-sky-400',
    'bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-pink-500 via-indigo-500 to-cyan-300',
    'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-600 via-fuchsia-500 to-cyan-400'
  ]
  return gradients[hash]
}
</script>

<style scoped>
.project-card {
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 24px;
  background: #FFFFFF;
  text-decoration: none;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.project-card:hover {
  border-color: rgba(0, 0, 0, 0.12);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.03);
  transform: translateY(-6px);
}

.project-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0;
  letter-spacing: -0.02em;
}

.project-arrow {
  color: var(--color-hint);
  transition: all 0.3s ease;
  padding: 8px;
  border-radius: 50%;
  background: var(--color-surface);
  border: 1px solid transparent;
}

.project-card:hover .project-arrow {
  color: var(--color-bg);
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.project-desc {
  font-size: 15px;
  color: var(--color-muted);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-tag.glass-pill {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.01em;
  padding: 6px 14px;
  border-radius: 9999px;
  
  /* Glassmorphism Effect */
  background: rgba(250, 250, 248, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 0, 0, 0.06);
  color: var(--color-muted);
  
  transition: all 0.4s ease;
}

.project-card:hover .project-tag.glass-pill {
  border-color: rgba(0,0,0,0.12);
  background: rgba(255, 255, 255, 0.9);
  color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.03);
}

.project-art {
  /* Subtle CSS noise texture base */
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");
}
</style>
