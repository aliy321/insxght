'use client'

import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { motion, useInView, UseInViewOptions, Variants } from 'motion/react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import useScreenSize from '@/hooks/useScreenSize'
import TransitionLink from '@/components/Link/TransitionLink'

type MediaBetweenTextProps = {
  firstText: string
  secondText: string
  // Media props
  mediaUrl: string
  mediaType: 'image' | 'video'
  mediaContainerClassName?: string
  fallbackUrl?: string
  // Video props
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  playsInline?: boolean
  // Image props
  alt?: string
  // Link props
  link?: string
  // Animation props
  triggerType?: 'hover' | 'ref' | 'inView'
  containerRef?: React.RefObject<HTMLDivElement>
  useInViewOptionsProp?: UseInViewOptions
  animationVariants?: {
    initial: Variants['initial']
    animate: Variants['animate']
  }
  className?: string
  // Text styling
  leftTextClassName?: string
  rightTextClassName?: string
  linkClassName?: string
}

export type MediaBetweenTextRef = {
  animate: () => void
  reset: () => void
}

export const MediaBetweenText = forwardRef<MediaBetweenTextRef, MediaBetweenTextProps>(
  (
    {
      firstText,
      secondText,
      mediaUrl,
      mediaType,
      mediaContainerClassName,
      fallbackUrl,
      autoPlay = true,
      loop = true,
      muted = true,
      playsInline = true,
      alt,
      link,
      triggerType = 'hover',
      containerRef,
      useInViewOptionsProp = {
        once: true,
        amount: 0.5,
        root: containerRef,
      },
      animationVariants = {
        initial: { width: 0, opacity: 1 },
        animate: {
          width: 'auto',
          opacity: 1,
          transition: { duration: 0.4, type: 'spring', bounce: 0 },
        },
      },
      className,
      leftTextClassName,
      rightTextClassName,
      linkClassName,
    },
    ref,
  ) => {
    const componentRef = useRef<HTMLDivElement>(null)
    const [isAnimating, setIsAnimating] = useState(false)
    const screenSize = useScreenSize()

    // Disable hover animations on mobile devices (xs and sm)
    const effectiveTriggerType =
      triggerType === 'hover' && screenSize.lessThan('md') ? 'ref' : triggerType

    // Always call useInView at the top level
    const inView = useInView(componentRef || containerRef, useInViewOptionsProp)
    const isInView = effectiveTriggerType === 'inView' ? inView : false
    const [isHovered, setIsHovered] = useState(false)

    useImperativeHandle(ref, () => ({
      animate: () => setIsAnimating(true),
      reset: () => setIsAnimating(false),
    }))

    const shouldAnimate =
      effectiveTriggerType === 'hover'
        ? isHovered
        : effectiveTriggerType === 'inView'
          ? isInView
          : effectiveTriggerType === 'ref'
            ? isAnimating
            : false

    const content = (
      <div
        className={cn('inline-flex', link && 'cursor-pointer', className)}
        ref={componentRef}
        onMouseEnter={() => effectiveTriggerType === 'hover' && setIsHovered(true)}
        onMouseLeave={() => effectiveTriggerType === 'hover' && setIsHovered(false)}
      >
        <motion.p layout className={leftTextClassName}>
          {firstText}
        </motion.p>
        <motion.div
          className={mediaContainerClassName}
          variants={animationVariants}
          initial="initial"
          animate={shouldAnimate ? 'animate' : 'initial'}
        >
          {mediaType === 'video' ? (
            <video
              className="w-full h-full object-cover"
              autoPlay={autoPlay}
              loop={loop}
              muted={muted}
              playsInline={playsInline}
              poster={fallbackUrl}
            >
              <source src={mediaUrl} type="video/mp4" />
            </video>
          ) : (
            <img
              src={mediaUrl}
              alt={alt || `${firstText} ${secondText}`}
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>
        <motion.p layout className={rightTextClassName}>
          {secondText}
        </motion.p>
      </div>
    )

    if (link) {
      return (
        <TransitionLink
          href={link}
          className={cn(
            'inline-flex w-fit cursor-pointer hover:underline underline-offset-4',
            linkClassName,
          )}
        >
          {content}
        </TransitionLink>
      )
    }

    return content
  },
)

MediaBetweenText.displayName = 'MediaBetweenText'

export default MediaBetweenText
