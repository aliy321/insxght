'use client'

import React, { useState, useEffect } from 'react'
import { useTheme } from '@/components/providers/Theme'
import { whitelabel } from '@/config/whitelabel'

export const ThemeToggleDiv: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only render after hydration to prevent mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="relative overflow-y-clip">
        <p className="w-full text-primary text-center text-[21vw] lg:text-[20vw] -ml-2 md:-ml-3 leading-none font-pixel transform translate-y-5 md:translate-y-12">
          {whitelabel.brandName.toUpperCase()}
        </p>
      </div>
    )
  }

  return (
    <div
      className="relative overflow-y-clip cursor-pointer hover:opacity-80 transition-opacity duration-300"
      onClick={toggleTheme}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggleTheme()
        }
      }}
    >
      <p className="w-full text-primary text-center text-[21vw] lg:text-[20vw] -ml-2 md:-ml-3 leading-none font-pixel transform translate-y-5 md:translate-y-16">
        {whitelabel.brandName.toUpperCase()}
      </p>
    </div>
  )
}
