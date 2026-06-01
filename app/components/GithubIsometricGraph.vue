<template>
  <section class="github-graph-section relative">
    <GridDivider />

    <!-- Background accents -->
    <div class="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-[0.03]">
      <div class="w-[800px] h-[800px] bg-[var(--color-primary)] rounded-full blur-[120px]"></div>
    </div>

    <div class="max-w-[1100px] mx-auto px-6 md:px-10 relative z-10 pt-24 pb-32">
      <div class="text-center mb-16 fade-up">
        <h2 class="text-3xl md:text-5xl font-bold mb-4" style="font-family: var(--font-sans); letter-spacing: -0.03em; color: var(--color-primary);">
          Open Source Activity
        </h2>
        <p class="text-lg text-[var(--color-muted)]">
          My GitHub contributions over the last year.
        </p>
      </div>

      <div class="graph-container fade-up fade-up-delay-1 relative w-full pt-10 pb-16 flex flex-col items-center perspective-container">
        
        <div v-if="loading" class="relative flex items-center justify-center z-20 h-[150px]">
          <div class="animate-spin w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full"></div>
        </div>

        <div v-else-if="error" class="relative flex items-center justify-center z-20 h-[150px] text-[var(--color-hint)]">
          Failed to load contributions.
        </div>

        <div v-else class="github-card p-4 sm:p-10 rounded-[32px] border border-white/60 shadow-2xl relative w-full max-w-[1050px] mx-auto overflow-hidden"
             style="background: rgba(255, 255, 255, 0.4); backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px); box-shadow: 0 40px 80px rgba(0,0,0,0.1), inset 0 0 30px rgba(255,255,255,0.4);">
          
          <!-- Card Header -->
          <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-2 sm:px-4 pt-2 pb-8 mb-2 z-20 relative" style="font-family: var(--font-sans);">
            <a href="https://github.com/ardianilyas" target="_blank" class="hover:text-[#CCFF00] transition-colors duration-200 flex items-center gap-2 font-bold text-lg sm:text-xl text-[var(--color-primary)]">
              <svg viewBox="0 0 24 24" class="w-5 h-5 sm:w-6 sm:h-6 fill-current"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              @ardianilyas
            </a>
            <span class="text-[var(--color-hint)] hidden sm:inline">•</span>
            <span class="text-base sm:text-lg text-[var(--color-muted)] font-medium">{{ totalContributions }} contributions in the last year</span>
          </div>

          <!-- Month Labels & Grid Container -->
          <div ref="scrollContainer" class="graph-scroll-container w-full overflow-x-auto relative z-10 custom-scrollbar">
            <div class="w-fit mx-auto flex items-center justify-center pt-8 pb-12">
              
              <div class="flex">
                <!-- Days of Week -->
                <div class="days-column flex flex-col gap-[4px] mt-[26px] mr-2 text-[10px] text-gray-500 font-medium text-right" style="font-family: var(--font-sans);">
                  <div class="h-[14px] leading-[14px] invisible">Sun</div>
                  <div class="h-[14px] leading-[14px]">Mon</div>
                  <div class="h-[14px] leading-[14px] invisible">Tue</div>
                  <div class="h-[14px] leading-[14px]">Wed</div>
                  <div class="h-[14px] leading-[14px] invisible">Thu</div>
                  <div class="h-[14px] leading-[14px]">Fri</div>
                  <div class="h-[14px] leading-[14px] invisible">Sat</div>
                </div>

                <!-- Grid & Month Labels -->
                <div class="relative">
                  <!-- Months Row -->
                  <div class="months-row relative h-6 w-full text-[10px] text-gray-500 font-medium" style="font-family: var(--font-sans);">
                    <span v-for="m in monthLabels" :key="m.weekIndex" 
                          class="absolute top-0" 
                          :style="{ left: (m.weekIndex * 18) + 'px' }">
                      {{ m.label }}
                    </span>
                  </div>

                  <!-- The Grid -->
                  <div class="flat-grid">
                    <!-- Each week column -->
                    <div v-for="(week, wIndex) in weeks" :key="'w'+wIndex" class="grid-column">
                      <!-- Each day in the week -->
                      <div v-for="(day, dIndex) in week" :key="'d'+wIndex+'-'+dIndex" 
                           class="grid-block-wrapper"
                           @mouseenter="hoveredDay = day"
                           @mouseleave="hoveredDay = null">
                        <div v-if="day" class="grid-block" :class="'score-' + day.score"></div>
                        <div v-else class="grid-block empty"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
          <!-- Tooltip overlay -->
          <ClientOnly>
            <Teleport to="body">
              <Transition
                enter-active-class="transition-opacity duration-200"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-200"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <div v-if="hoveredDay" class="graph-tooltip fixed z-[9999] pointer-events-none"
                     :style="{ top: tooltipY + 'px', left: tooltipX + 'px' }">
                  <div class="font-bold text-[#0c2cdb] mb-1 text-base">
                    {{ hoveredDay.score === 0 ? 'No' : hoveredDay.score * 3 + '+' }} contributions
                  </div>
                  <div class="text-gray-500 text-sm font-medium">
                    {{ formatDate(hoveredDay.date) }}
                  </div>
                </div>
              </Transition>
            </Teleport>
          </ClientOnly>
          
          <!-- Legend -->
          <div class="absolute bottom-6 right-6 z-20 flex justify-end items-center text-xs text-gray-500 font-bold px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/50 shadow-sm" style="font-family: var(--font-sans);">
            <div class="flex items-center gap-3">
              <span>Less</span>
              <div class="flex gap-[6px]">
                <div class="w-[14px] h-[14px] rounded-full bg-[#E2E8F0] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]"></div>
                <div class="w-[14px] h-[14px] rounded-full bg-[#93C5FD] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]"></div>
                <div class="w-[14px] h-[14px] rounded-full bg-[#3B82F6] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]"></div>
                <div class="w-[14px] h-[14px] rounded-full bg-[#1D4ED8] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]"></div>
                <div class="w-[14px] h-[14px] rounded-full bg-[#CCFF00] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]"></div>
              </div>
              <span>More</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface DayData {
  date: string
  score: number
}

const loading = ref(true)
const error = ref(false)
const weeks = ref<(DayData | null)[][]>([])
const monthLabels = ref<{ label: string, weekIndex: number }[]>([])
const totalContributions = ref('0')
const scrollContainer = ref<HTMLElement | null>(null)

const hoveredDay = ref<DayData | null>(null)
const tooltipX = ref(0)
const tooltipY = ref(0)

function handleMouseMove(e: MouseEvent) {
  if (hoveredDay.value) {
    tooltipX.value = e.clientX
    tooltipY.value = e.clientY - 12
  }
}

onMounted(async () => {
  window.addEventListener('mousemove', handleMouseMove)
  
  try {
    const res = await fetch('/api/github-chart')
    if (!res.ok) throw new Error('Failed to fetch SVG')
    
    const data = await res.json()
    totalContributions.value = data.total
    const svgText = data.svg
    
    const parser = new DOMParser()
    const doc = parser.parseFromString(svgText, 'image/svg+xml')
    const rects = Array.from(doc.querySelectorAll('rect[data-score]'))
    
    const weeksMap = new Map<number, DayData[]>()
    
    rects.forEach(rect => {
      const x = parseInt(rect.getAttribute('x') || '0', 10)
      const score = parseInt(rect.getAttribute('data-score') || '0', 10)
      const date = rect.getAttribute('data-date') || ''
      
      if (!weeksMap.has(x)) {
        weeksMap.set(x, [])
      }
      weeksMap.get(x)!.push({ date, score })
    })
    
    const sortedX = Array.from(weeksMap.keys()).sort((a, b) => a - b)
    
    const parsedWeeks = sortedX.map(x => {
      const weekDays = weeksMap.get(x)!
      const paddedWeek: (DayData | null)[] = Array(7).fill(null)
      
      weekDays.forEach(day => {
        if (!day.date) return
        // Parse date string carefully to avoid timezone shift (e.g. "2025-12-27")
        // Appending 'T00:00:00' ensures it parses as local time correctly, or just split it
        const [year, month, d] = day.date.split('-').map(Number)
        const dateObj = new Date(year, month - 1, d)
        const dayOfWeek = dateObj.getDay() // 0 = Sunday
        paddedWeek[dayOfWeek] = day
      })
      
      return paddedWeek
    })
    
    // We can take the full 52 weeks since it's a 2D flat grid and can scroll natively
    weeks.value = parsedWeeks.slice(-52)

    // Calculate month labels
    const mLabels: { label: string, weekIndex: number }[] = []
    let lastMonth = ''
    weeks.value.forEach((week, i) => {
      const firstDay = week.find(d => d !== null)
      if (firstDay) {
        // Appending T00:00:00 forces local time parsing to avoid timezone day shifts
        const [y, m, d] = firstDay.date.split('-').map(Number)
        const dateObj = new Date(y, m - 1, d)
        const monthStr = dateObj.toLocaleString('en-US', { month: 'short' })
        if (monthStr !== lastMonth) {
          // Prevent overlap by ensuring labels are spaced by at least 2 columns
          if (mLabels.length === 0 || i - mLabels[mLabels.length - 1].weekIndex > 2) {
            mLabels.push({ label: monthStr, weekIndex: i })
            lastMonth = monthStr
          }
        }
      }
    })
    monthLabels.value = mLabels
    
    loading.value = false

    // Auto-scroll to the right on mobile so the latest activity is visible
    setTimeout(() => {
      if (scrollContainer.value) {
        scrollContainer.value.scrollLeft = scrollContainer.value.scrollWidth
      }
    }, 100)
  } catch (e) {
    console.error(e)
    error.value = true
    loading.value = false
  }
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<style scoped>
.github-graph-section {
  /* Transparent so global vertical lines show through */
}

.graph-scroll-container {
  /* Hide scrollbar on mobile for cleaner look, but keep native scrolling */
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.graph-scroll-container::-webkit-scrollbar {
  display: none;
}

.flat-grid {
  display: flex;
  gap: 4px;
  width: fit-content;
}

.grid-column {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.grid-block-wrapper {
  width: 14px;
  height: 14px;
  position: relative;
  cursor: pointer;
}

.grid-block {
  width: 100%; 
  height: 100%;
  border-radius: 50%;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  background-color: var(--top);
  box-shadow: 0 0 0 1px rgba(0,0,0,0.03) inset;
}

.grid-block.empty {
  display: none;
}

/* Color palettes based on score - Electric Blue to Neon Lime! */
.score-0 { --top: #E2E8F0; background-color: #E2E8F0; }
.score-1 { --top: #93C5FD; background-color: #93C5FD; }
.score-2 { --top: #3B82F6; background-color: #3B82F6; }
.score-3 { --top: #1D4ED8; background-color: #1D4ED8; }
.score-4 { --top: #CCFF00; background-color: #CCFF00; }

/* Hover effects */
.grid-block-wrapper:hover .grid-block {
  transform: scale(1.4) translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  filter: brightness(1.1);
  z-index: 10;
  position: relative;
}

.graph-tooltip {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(0,0,0,0.05);
  padding: 10px 14px;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  font-family: var(--font-sans);
  transform: translate(-50%, -100%);
  white-space: nowrap;
}
</style>
