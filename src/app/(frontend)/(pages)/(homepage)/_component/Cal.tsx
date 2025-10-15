import { getCalApi } from '@calcom/embed-react'
import { useEffect, useState } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

export default function Cal() {
  const [isCalLoaded, setIsCalLoaded] = useState(false)

  useEffect(() => {
    ;(async function () {
      try {
        const cal = await getCalApi({ namespace: '15min' })
        cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
        setIsCalLoaded(true)
      } catch (error) {
        console.error('Failed to load Cal.com:', error)
      }
    })()
  }, [])

  const handleCalClick = () => {
    if (isCalLoaded) {
      // Cal.com will handle the modal opening
      return
    }
  }

  return (
    <div className="flex flex-col items-center space-y-6 text-center">
      <div className="space-y-4">
        <h3 className="mt-12 text-primary font-pixel text-4xl lg:text-6xl uppercase">
          Let&apos;s build something amazing together
        </h3>
        <p className="text-base text-muted-foreground lg:text-lg max-w-2xl mx-auto">
          Ready to turn your ideas into reality? Book a quick 15-minute call to explore how we can
          bring your vision to life.
        </p>
      </div>

      <button
        data-cal-namespace="15min"
        data-cal-link="hyperfuse-studio/15min"
        data-cal-config='{"layout":"month_view"}'
        onClick={handleCalClick}
        className={cn(
          buttonVariants({
            size: 'lg',
            variant: 'default',
          }),
          'relative group overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl px-8 py-4 text-lg font-semibold',
        )}
        disabled={!isCalLoaded}
      >
        <span className="relative z-10 flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Start Your Project
        </span>

        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>

      <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Free consultation
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          15 minutes
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          No commitment
        </span>
      </div>
    </div>
  )
}
