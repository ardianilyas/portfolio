import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('magnetic', {
    getSSRProps() {
      return {} // Return empty props for SSR
    },
    mounted(el, binding) {
      if (typeof window === 'undefined') return
      const isMobile = window.matchMedia('(pointer: coarse)').matches
      if (isMobile) return

      const strength = binding.value || 0.25
      let isHovering = false

      el.style.willChange = 'transform'

      const onMouseMove = (e: MouseEvent) => {
        isHovering = true
        el.style.transition = 'transform 0.1s ease-out'

        const rect = el.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        const distanceX = e.clientX - centerX
        const distanceY = e.clientY - centerY

        el.style.transform = `translate3d(${distanceX * strength}px, ${distanceY * strength}px, 0)`
      }

      const onMouseLeave = () => {
        isHovering = false
        el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        el.style.transform = 'translate3d(0, 0, 0)'
      }

      el.addEventListener('mousemove', onMouseMove)
      el.addEventListener('mouseleave', onMouseLeave)

      // Store cleanup
      el._magneticCleanup = () => {
        el.removeEventListener('mousemove', onMouseMove)
        el.removeEventListener('mouseleave', onMouseLeave)
      }
    },
    unmounted(el) {
      if (el._magneticCleanup) el._magneticCleanup()
    }
  })
})
