'use client'

import Link from 'next/link'
import { useTransitionRouter } from 'next-view-transitions'
import { useState, useEffect } from 'react'
import { cn } from '@/utilities/ui'
import { slideInOut } from '@/utilities/animation'

interface TransitionLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  [key: string]: any
}

const TransitionLink = ({
  href,
  children,
  className,
  onClick,
  disabled = false,
  ...props
}: TransitionLinkProps) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const router = useTransitionRouter()

  // Handle scroll to top after navigation
  useEffect(() => {
    const handleRouteChange = () => {
      // Small delay to ensure the page is fully rendered
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }, 100)
    }

    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange)

    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled || isAnimating) {
      e.preventDefault()
      return
    }

    // Call the original onClick if provided
    onClick?.()

    setIsAnimating(true)

    // Start transition
    router.push(href, {
      onTransitionReady: () => {
        // Start the slide animation
        slideInOut()

        // Reset animating state after animation completes
        setTimeout(() => {
          setIsAnimating(false)
        }, 1200)
      },
    })

    // Fallback timeout in case onTransitionReady doesn't fire
    setTimeout(() => {
      setIsAnimating(false)
    }, 2000)
  }

  return (
    <Link
      href={href}
      className={cn(
        'transition-opacity duration-200',
        disabled && 'pointer-events-none',
        isAnimating && 'pointer-events-none',
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  )
}

export default TransitionLink
