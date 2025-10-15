'use client'

import { cn } from '@/utilities/ui'
import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useTheme } from '@/components/providers/Theme'

type DitherDot = {
  x: number
  y: number
  size: number
  baseSize: number
  intensity: number
  targetSize: number
  animationOffset: number
  rotationSpeed: number
  pulseSpeed: number
  driftX: number
  driftY: number
  baseX: number
  baseY: number
}

interface InteractiveDitherCanvasProps {
  image: string
  parentClassName?: string
  canvasClassName?: string
}

export default function InteractiveDitherCanvas({
  image,
  parentClassName,
  canvasClassName,
}: InteractiveDitherCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [currentImage, setCurrentImage] = useState<HTMLImageElement | null>(null)
  const [dotsGenerated, setDotsGenerated] = useState(false)
  const ditherDotsRef = useRef<DitherDot[]>([])
  const mousePosRef = useRef({ x: -1000, y: -1000 })
  const MAX_CANVAS_WIDTH = 1920
  const MAX_CANVAS_HEIGHT = 1080
  const [canvasSize, setCanvasSize] = useState({
    width: typeof window !== 'undefined' ? Math.min(window.innerWidth, MAX_CANVAS_WIDTH) : 1900,
    height: typeof window !== 'undefined' ? Math.min(window.innerHeight, MAX_CANVAS_HEIGHT) : 700,
  })
  const animationTime = useRef(0)
  const [mounted, setMounted] = useState(false)
  const lastFrameTime = useRef(0)
  const targetFrameRate = typeof window !== 'undefined' && window.innerWidth > 600 ? 24 : 30 // Lower frame rate on desktop
  const frameInterval = 1000 / targetFrameRate
  const [cssColors, setCssColors] = useState({ bg: '', primary: '' })
  const isVisibleRef = useRef(true)
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { theme } = useTheme() // Get current theme directly

  // Default settings
  const baseDotSize = 6
  const baseHoverRadius = 150
  const referenceWidth = 1920
  const referenceHeight = 700
  const scale = Math.min(canvasSize.width / referenceWidth, canvasSize.height / referenceHeight)

  // Helper to detect mobile
  function isMobile() {
    if (typeof window === 'undefined') return false
    return window.innerWidth <= 600
  }

  const mobile = isMobile()
  // Responsive dot size and spacing - more aggressive optimization for desktop
  const dotSize = mobile
    ? Math.max(2, Math.round(baseDotSize * scale * 0.7)) // smaller on mobile
    : Math.max(2, Math.round(baseDotSize * scale * 0.8)) // Moderate dot size for desktop

  // Use much tighter spacing on desktop to reduce dot count
  const spacing = mobile ? Math.max(dotSize, 3) : Math.max(dotSize, 4) // Increased spacing to reduce dot count
  const hoverRadius = Math.max(10, Math.round(baseHoverRadius * scale))
  const hoverEffect = mobile ? 2 : 1.8 // Slightly reduced on desktop
  const animationSpeed = mobile ? 0.8 : 0.6 // Slower on desktop
  const enablePulse = true // Re-enabled animations
  const enableDrift = false // Re-enabled animations
  const enableRotation = false // Re-enabled animations

  // Helper to fit image to canvas (preserve aspect ratio)
  function getFitSize(imgW: number, imgH: number, maxW: number, maxH: number) {
    const ratio = Math.min(maxW / imgW, maxH / imgH)
    return {
      width: Math.round(imgW * ratio),
      height: Math.round(imgH * ratio),
    }
  }

  // Responsive canvas size: fill 16:9 aspect ratio container, allow scrolling
  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth
      const height = width / (16 / 9)
      setCanvasSize({ width, height })
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    window.addEventListener('orientationchange', updateSize)
    return () => {
      window.removeEventListener('resize', updateSize)
      window.removeEventListener('orientationchange', updateSize)
    }
  }, [])

  // Load image from props
  useEffect(() => {
    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      setCurrentImage(img)
      setImageLoaded(true)
    }
    img.onerror = (error) => {
      console.warn('Failed to load dither image:', error)
      setImageLoaded(true) // Still set loaded to prevent infinite loading
    }
    img.src = image
  }, [image])

  // Generate dither dots based on scaled image
  const generateDitherDots = useCallback(() => {
    if (!currentImage || !canvasSize.width || !canvasSize.height) return
    const fit = getFitSize(
      currentImage.width,
      currentImage.height,
      canvasSize.width,
      canvasSize.height,
    )
    const offsetX = (canvasSize.width - fit.width) / 2
    const offsetY = (canvasSize.height - fit.height) / 2
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    canvas.width = fit.width
    canvas.height = fit.height
    ctx.drawImage(currentImage, 0, 0, fit.width, fit.height)
    const imageData = ctx.getImageData(0, 0, fit.width, fit.height)
    const data = imageData.data
    const dots: DitherDot[] = []

    // Optimized loop - process only every Nth pixel based on spacing
    for (let y = 0; y < fit.height; y += spacing) {
      for (let x = 0; x < fit.width; x += spacing) {
        const i = (y * fit.width + x) * 4
        if (i < data.length) {
          const gray = ((data[i] ?? 0) + (data[i + 1] ?? 0) + (data[i + 2] ?? 0)) / 3
          const intensity = 1 - gray / 255
          const size = intensity * spacing * 0.8
          if (size > 0.5) {
            dots.push({
              x: x + offsetX,
              y: y + offsetY,
              size,
              baseSize: size,
              intensity,
              targetSize: size,
              animationOffset: Math.random() * Math.PI * 2,
              rotationSpeed: (Math.random() - 0.5) * 0.02,
              pulseSpeed: 0.5 + Math.random() * 1.5,
              driftX: (Math.random() - 0.5) * 0.1,
              driftY: (Math.random() - 0.5) * 0.1,
              baseX: x + offsetX,
              baseY: y + offsetY,
            })
          }
        }
      }
    }

    ditherDotsRef.current = dots
    setDotsGenerated(true)
  }, [currentImage, canvasSize, spacing])

  // Debounce dither dot generation after resize
  useEffect(() => {
    if (!imageLoaded || !currentImage) return
    const timeout = setTimeout(() => {
      generateDitherDots()
    }, 300) // Increased from 100ms to 300ms
    return () => clearTimeout(timeout)
  }, [canvasSize, imageLoaded, currentImage, generateDitherDots])

  useEffect(() => {
    if (imageLoaded && currentImage) {
      // Simple deferred loading that works everywhere
      if ('requestIdleCallback' in window) {
        requestIdleCallback(
          () => {
            generateDitherDots()
          },
          { timeout: 500 },
        )
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(() => {
          generateDitherDots()
        }, 100)
      }
    }
  }, [imageLoaded, currentImage, generateDitherDots])

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    mousePosRef.current = {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    }
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx || ditherDotsRef.current.length === 0) return

    // NEW: Skip animation if not visible or if scrolling
    if (!isVisibleRef.current || isScrollingRef.current) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }

    const currentTime = performance.now()
    const elapsedTime = currentTime - lastFrameTime.current

    // Frame rate limiting: skip frame if not enough time has passed
    if (elapsedTime < frameInterval) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }

    lastFrameTime.current = currentTime
    animationTime.current += 0.016 * animationSpeed

    // Use cached CSS colors instead of reading every frame
    ctx.fillStyle = `hsl(${cssColors.bg})`
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Batch drawing operations - set fillStyle once for all dots
    ctx.fillStyle = `hsl(${cssColors.primary})`

    // Use primary color for dither dots
    ditherDotsRef.current.forEach((dot) => {
      // Calculate animated position and size
      let currentX = dot.x
      let currentY = dot.y
      let currentSize = dot.size

      // Drift animation
      if (enableDrift) {
        currentX =
          dot.baseX + Math.sin(animationTime.current * 0.5 + dot.animationOffset) * dot.driftX * 20
        currentY =
          dot.baseY + Math.cos(animationTime.current * 0.3 + dot.animationOffset) * dot.driftY * 20
      }

      // Pulse animation
      if (enablePulse) {
        const pulse =
          Math.sin(animationTime.current * dot.pulseSpeed + dot.animationOffset) * 0.1 + 1
        currentSize = dot.baseSize * pulse
      }

      // Mouse hover effect
      const dx = currentX - mousePosRef.current.x
      const dy = currentY - mousePosRef.current.y
      const distanceSquared = dx * dx + dy * dy
      const hoverRadiusSquared = hoverRadius * hoverRadius

      if (distanceSquared < hoverRadiusSquared) {
        const distance = Math.sqrt(distanceSquared)
        const effect = 1 - distance / hoverRadius
        currentSize = currentSize * (1 + effect * (hoverEffect - 1))
      }

      // Draw the dot
      ctx.beginPath()
      ctx.arc(currentX, currentY, currentSize / 2, 0, Math.PI * 2)
      ctx.fill()
    })
    animationRef.current = requestAnimationFrame(animate)
  }, [cssColors, animationSpeed, frameInterval])

  useEffect(() => {
    if (ditherDotsRef.current.length > 0 && dotsGenerated) {
      animate()
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate, dotsGenerated])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Improved theme change detection - update colors immediately when theme changes
  useEffect(() => {
    const updateColors = () => {
      const bgHSL = getComputedStyle(document.documentElement)
        .getPropertyValue('--background')
        .trim()
      const primaryHSL = getComputedStyle(document.documentElement)
        .getPropertyValue('--primary')
        .trim()
      setCssColors({ bg: bgHSL, primary: primaryHSL })
    }

    // Update colors immediately
    updateColors()

    // Update multiple times to ensure we catch the change
    const immediateUpdate = () => {
      updateColors()
      requestAnimationFrame(updateColors)
      setTimeout(updateColors, 10)
      setTimeout(updateColors, 50)
      setTimeout(updateColors, 100)
    }

    immediateUpdate()
  }, [theme]) // Re-run when theme changes

  // Direct CSS custom property monitoring for instant theme changes
  useEffect(() => {
    if (!mounted) return

    let lastBgColor = ''
    let lastPrimaryColor = ''

    const checkForColorChanges = () => {
      const bgHSL = getComputedStyle(document.documentElement)
        .getPropertyValue('--background')
        .trim()
      const primaryHSL = getComputedStyle(document.documentElement)
        .getPropertyValue('--primary')
        .trim()

      // Check if colors actually changed
      if (bgHSL !== lastBgColor || primaryHSL !== lastPrimaryColor) {
        lastBgColor = bgHSL
        lastPrimaryColor = primaryHSL
        setCssColors({ bg: bgHSL, primary: primaryHSL })
      }
    }

    // Check more frequently for immediate response
    const interval = setInterval(checkForColorChanges, 16) // ~60fps checking

    return () => clearInterval(interval)
  }, [mounted])

  // Also listen for data-theme attribute changes directly
  useEffect(() => {
    if (!mounted) return

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          // Immediate color update when data-theme changes
          const bgHSL = getComputedStyle(document.documentElement)
            .getPropertyValue('--background')
            .trim()
          const primaryHSL = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary')
            .trim()
          setCssColors({ bg: bgHSL, primary: primaryHSL })
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => observer.disconnect()
  }, [mounted])

  // NEW: Visibility detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  // NEW: Intersection observer for viewport detection
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting && !document.hidden
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(canvas)
    return () => observer.unobserve(canvas)
  }, [])

  // NEW: Scroll detection to pause animation during scroll
  useEffect(() => {
    const handleScrollStart = () => {
      isScrollingRef.current = true

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }

    const handleScrollEnd = () => {
      // Resume animation after scroll stops
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false
      }, 150) // Resume 150ms after scroll stops
    }

    window.addEventListener('scroll', handleScrollStart, { passive: true })
    window.addEventListener('scroll', handleScrollEnd, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScrollStart)
      window.removeEventListener('scroll', handleScrollEnd)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  if (!mounted) return null

  // return null;

  return (
    <div
      className={cn(parentClassName, 'bg-background')}
      style={{
        width: '100vw',
        aspectRatio: '16 / 7',
        maxWidth: '100%',
        position: 'relative',
        margin: 0,
        padding: 0,
        zIndex: 0,
      }}
    >
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          border: 'none',
          objectFit: 'cover',
        }}
        className={cn(canvasClassName, 'bg-background')}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => (mousePosRef.current = { x: -1000, y: -1000 })}
      />
    </div>
  )
}
