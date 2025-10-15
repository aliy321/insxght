import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText as GSAPSplitText } from 'gsap/SplitText'
import useScreenSize from '@/hooks/useScreenSize'

gsap.registerPlugin(ScrollTrigger, GSAPSplitText)

export interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  ease?: string | ((t: number) => number)
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars'
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  threshold?: number
  rootMargin?: string
  textAlign?: React.CSSProperties['textAlign']
  onLetterAnimationComplete?: () => void
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete,
}) => {
  const screenSize = useScreenSize()
  const ref = useRef<HTMLParagraphElement>(null)
  const animationCompletedRef = useRef(false)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    // Don't run animation logic on mobile
    if (screenSize.lessThan('md')) return
    const el = ref.current
    if (!el || animationCompletedRef.current) return

    const runSplitText = () => {
      if (!el) {
        console.warn('No element for SplitText', { text })
        return
      }

      const absoluteLines = splitType === 'lines'
      if (absoluteLines) el.style.position = 'relative'

      const splitter = new GSAPSplitText(el, {
        type: splitType,
        absolute: absoluteLines,
        linesClass: 'split-line',
      })

      let targets: Element[]
      switch (splitType) {
        case 'lines':
          targets = splitter.lines
          break
        case 'words':
          targets = splitter.words
          break
        case 'words, chars':
          targets = [...splitter.words, ...splitter.chars]
          break
        default:
          targets = splitter.chars
      }

      if (targets.length === 0) {
        console.warn('No targets for SplitText animation', { text, splitType })
        return
      }

      targets.forEach((t) => {
        ;(t as HTMLElement).style.willChange = 'transform, opacity'
      })

      const startPct = (1 - threshold) * 100
      const m = /^(-?\d+)px$/.exec(rootMargin)
      const raw = m ? parseInt(m[1]!, 10) : 0
      const sign = raw < 0 ? `-=${Math.abs(raw)}px` : `+=${raw}px`
      const start = `top ${startPct}%${sign}`

      try {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none none',
            once: true,
          },
          smoothChildTiming: true,
          onComplete: () => {
            animationCompletedRef.current = true
            gsap.set(targets, {
              ...to,
              clearProps: 'willChange',
              immediateRender: true,
            })
            onLetterAnimationComplete?.()
          },
        })

        // Store references to the timeline and ScrollTrigger for cleanup
        timelineRef.current = tl
        scrollTriggerRef.current = tl.scrollTrigger || null

        tl.set(el, { opacity: 1 })
        tl.set(targets, { ...from, immediateRender: false, force3D: true })
        tl.to(targets, {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          force3D: true,
        })

        // Refresh ScrollTrigger after setup to ensure it recognizes all elements
        ScrollTrigger.refresh()

        return () => {
          if (tl.scrollTrigger) {
            tl.scrollTrigger.kill()
          }
          tl.kill()
          gsap.killTweensOf(targets)
          splitter.revert()
        }
      } catch (e) {
        console.error('GSAP/ScrollTrigger error in SplitText:', e, { text, targets, el })
      }
    }

    // Wait for fonts to be loaded before running SplitText
    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(runSplitText)
    } else {
      // Fallback for browsers without FontFaceSet API
      runSplitText()
    }

    // Cleanup function to kill only the ScrollTrigger created by this component
    return () => {
      // Kill only the specific ScrollTrigger created by this component
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
        scrollTriggerRef.current = null
      }

      // Kill only the specific timeline created by this component
      if (timelineRef.current) {
        timelineRef.current.kill()
        timelineRef.current = null
      }

      // Clear any GSAP tweens for this element's targets
      if (el) {
        const targets = el.querySelectorAll('.split-line, .split-word, .split-char')
        gsap.killTweensOf(targets)
      }
    }
  }, [
    text,
    delay,
    duration,
    ease,
    splitType,
    from,
    to,
    threshold,
    rootMargin,
    onLetterAnimationComplete,
    screenSize,
  ])

  return (
    <p
      ref={ref}
      className={`split-parent overflow-clip inline-block whitespace-normal ${className}${screenSize.lessThan('md') ? ' split-parent--no-anim' : ''}`}
      style={{
        textAlign: textAlign as React.CSSProperties['textAlign'],
        wordWrap: 'break-word',
        opacity: screenSize.lessThan('md') ? 1 : 0,
      }}
    >
      {text}
    </p>
  )
}

export default SplitText
