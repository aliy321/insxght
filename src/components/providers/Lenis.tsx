'use client'
import { useEffect, useState, type ReactNode } from 'react'

import Menu from '@/components/Menu/Menu'

import { ReactLenis } from 'lenis/react'

export default function LenisProvider({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      const isMobileWidth = width <= 768 // More standard mobile breakpoint
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

      setIsMobile(isMobileWidth)
      setIsTouchDevice(isTouch)
    }

    checkDevice()

    window.addEventListener('resize', checkDevice)

    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  // Use touch device detection for better mobile experience
  const shouldUseNativeScrolling = isMobile || isTouchDevice

  const scrollSettings = shouldUseNativeScrolling
    ? {
        duration: 1,
        easing: (t: any) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: false, // Disable smooth scrolling on mobile/touch for native feel
        smoothTouch: false, // Disable smooth touch for native feel
        touchMultiplier: 1, // Use native touch sensitivity
        infinite: false,
        lerp: 0.1,
        wheelMultiplier: 1,
        smoothWheel: false, // Disable smooth wheel on mobile
        syncTouch: false, // Let native touch handle scrolling
        autoRaf: false, // Disable auto RAF for better performance
        normalizeWheel: false, // Use native wheel behavior
      }
    : {
        duration: 1.2,
        easing: (t: any) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 1.2, // Reduced from 2 for better control
        infinite: false,
        lerp: 0.08, // Slightly reduced for more responsive feel
        wheelMultiplier: 1,
        smoothWheel: true,
        syncTouch: true,
        autoRaf: true, // Enable auto RAF for smooth desktop experience
        normalizeWheel: true, // Normalize wheel for consistent experience
      }

  return (
    <ReactLenis root options={scrollSettings}>
      {children}
    </ReactLenis>
  )
}
