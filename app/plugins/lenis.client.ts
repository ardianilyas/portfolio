import Lenis from 'lenis'

export default defineNuxtPlugin((nuxtApp) => {
  if (typeof window === 'undefined') return

  const hasFinePointer = window.matchMedia('(pointer: fine)').matches
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Initialize Lenis only for fine pointer devices that do not prefer reduced motion
  if (hasFinePointer && !prefersReduced) {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo ease out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    let rafId: number | null = null

    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    nuxtApp.hook('app:suspense:resolve', () => {
      lenis.resize()
    })

    // Cleanup on unmount (if necessary, mostly for HMR)
    nuxtApp.hook('app:error', () => {
      if (rafId) cancelAnimationFrame(rafId)
      lenis.destroy()
    })

    return {
      provide: {
        lenis
      }
    }
  }
})
