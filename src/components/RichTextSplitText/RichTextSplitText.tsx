'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GSAPSplitText from 'gsap/SplitText'
import SplitText from '@/components/SplitText/SplitText'
import RichText from '@/components/RichText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import useScreenSize from '@/hooks/useScreenSize'

gsap.registerPlugin(GSAPSplitText, ScrollTrigger)

interface RichTextSplitTextProps {
  data: string | DefaultTypedEditorState | null | undefined
  className?: string
  enableGutter?: boolean
  enableProse?: boolean
  delay?: number
  duration?: number
  ease?: string | ((t: number) => number)
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars'
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  threshold?: number
  rootMargin?: string
  parentClassName?: string
}

const RichTextSplitText: React.FC<RichTextSplitTextProps> = ({
  data,
  className = '',
  enableGutter = false,
  enableProse = false,
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  parentClassName = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const screenSize = useScreenSize()

  useEffect(() => {
    // Don't run animation logic on mobile
    if (screenSize.lessThan('md')) return

    const runSplitText = () => {
      const container = containerRef.current
      if (!container || !data) return

      container.style.opacity = '1'

      // Find all block-level text elements
      const textElements = container.querySelectorAll('p, h1, h2, h3, h4, h5, h6')
      const allTargets: Element[] = []

      textElements.forEach((el) => {
        el.classList.add('split-parent')
        const splitter = new GSAPSplitText(el, {
          type: splitType,
          linesClass: 'split-line',
        })
        let targets: Element[] = []
        if (splitType === 'lines') targets = splitter.lines
        else if (splitType === 'words') targets = splitter.words
        else if (splitType === 'words, chars') targets = [...splitter.words, ...splitter.chars]
        else targets = splitter.chars

        gsap.set(el, { opacity: 1 })
        gsap.set(targets, { ...from, immediateRender: false, force3D: true })
        allTargets.push(...targets)
      })

      // Calculate ScrollTrigger start value
      const startPct = (1 - threshold) * 100
      const m = /^(-?\d+)px$/.exec(rootMargin || '')
      const raw = m ? parseInt(m[1]!, 10) : 0
      const sign = raw < 0 ? `-=${Math.abs(raw)}px` : `+=${raw}px`
      const start = `top ${startPct}%${sign}`

      // Animate all targets in a single timeline with ScrollTrigger
      gsap.to(allTargets, {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        force3D: true,
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: 'play none none none',
          once: true,
        },
      })
    }

    // Wait for fonts to be loaded before running SplitText
    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(runSplitText)
    } else {
      // Fallback for browsers without FontFaceSet API
      runSplitText()
    }
  }, [data, delay, duration, ease, splitType, from, to, threshold, rootMargin, screenSize])

  if (typeof data === 'string') {
    return (
      <SplitText
        text={data}
        className={className}
        delay={delay}
        duration={duration}
        ease={ease}
        splitType={splitType}
        from={from}
        to={to}
      />
    )
  }

  if (!data) return null

  return (
    <div
      ref={containerRef}
      className={`rich-text-split-container ${parentClassName}${screenSize.lessThan('md') ? ' rich-text-split-container--no-anim' : ''}`}
      style={{ opacity: screenSize.lessThan('md') ? 1 : 0 }}
    >
      <RichText
        data={data}
        enableGutter={enableGutter}
        enableProse={enableProse}
        className={className}
      />
    </div>
  )
}

export default RichTextSplitText
