'use client'

import React from 'react'
import { useTheme } from '@/components/providers/Theme'

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  return (
    <span
      onClick={toggleTheme}
      className="cursor-pointer hover:opacity-70 transition-opacity duration-200 select-none"
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
      {theme === 'dark' ? '☀️' : '🌙'}
    </span>
  )
}
