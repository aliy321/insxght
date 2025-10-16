'use client'

import React, { createContext, useCallback, use, useEffect, useState } from 'react'

import type { Theme, ThemeContextType } from './types'

import canUseDOM from '@/utilities/canUseDOM'
import { defaultTheme, themeLocalStorageKey, getImplicitPreference } from './shared'
import { themeIsValid } from './types'

const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: undefined,
}

const ThemeContext = createContext(initialContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme | undefined>(
    canUseDOM ? (document.documentElement.getAttribute('data-theme') as Theme) : undefined,
  )

  const setTheme = useCallback((themeToSet: Theme | null) => {
    if (themeToSet === null) {
      // Reset to system preference
      window.localStorage.removeItem(themeLocalStorageKey)
      const implicitPreference = getImplicitPreference()
      document.documentElement.setAttribute('data-theme', implicitPreference || 'light')
      if (implicitPreference) setThemeState(implicitPreference)
    } else if (themeToSet === 'system') {
      // Set to system preference
      setThemeState('system')
      window.localStorage.setItem(themeLocalStorageKey, 'system')
      const implicitPreference = getImplicitPreference()
      document.documentElement.setAttribute('data-theme', implicitPreference || 'light')
    } else {
      // Set specific theme
      setThemeState(themeToSet)
      window.localStorage.setItem(themeLocalStorageKey, themeToSet)
      document.documentElement.setAttribute('data-theme', themeToSet)
    }
  }, [])

  useEffect(() => {
    let themeToSet: Theme = defaultTheme
    const preference = window.localStorage.getItem(themeLocalStorageKey)

    if (themeIsValid(preference)) {
      themeToSet = preference
    } else {
      const implicitPreference = getImplicitPreference()
      if (implicitPreference) {
        themeToSet = implicitPreference
      }
    }

    // If theme is 'system', apply the system preference
    if (themeToSet === 'system') {
      const implicitPreference = getImplicitPreference()
      const finalTheme = implicitPreference || 'light'
      document.documentElement.setAttribute('data-theme', finalTheme)
    } else {
      document.documentElement.setAttribute('data-theme', themeToSet)
    }

    setThemeState(themeToSet)

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = () => {
      const currentPreference = window.localStorage.getItem(themeLocalStorageKey)
      if (currentPreference === 'system' || !currentPreference) {
        const implicitPreference = getImplicitPreference()
        const finalTheme = implicitPreference || 'light'
        document.documentElement.setAttribute('data-theme', finalTheme)
        if (currentPreference === 'system') {
          setThemeState('system')
        } else {
          setThemeState(finalTheme)
        }
      }
    }

    // Add listener for system theme changes
    mediaQuery.addEventListener('change', handleSystemThemeChange)

    // Cleanup listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [])

  return <ThemeContext value={{ setTheme, theme }}>{children}</ThemeContext>
}

export const useTheme = (): ThemeContextType => use(ThemeContext)
