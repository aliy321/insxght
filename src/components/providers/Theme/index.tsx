'use client'

import React, { createContext, useCallback, use, useEffect, useState } from 'react'

import type { Theme, ThemeContextType } from './types'

import canUseDOM from '@/utilities/canUseDOM'
import { defaultTheme, themeLocalStorageKey } from './shared'
// import { getImplicitPreference } from './shared' // Commented out auto mode
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
      // Commented out auto mode - default to light
      // window.localStorage.removeItem(themeLocalStorageKey)
      // const implicitPreference = getImplicitPreference()
      // document.documentElement.setAttribute('data-theme', implicitPreference || '')
      // if (implicitPreference) setThemeState(implicitPreference)

      // Default to light when null is passed
      setThemeState('light')
      window.localStorage.setItem(themeLocalStorageKey, 'light')
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
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
    }
    // Commented out auto mode - always default to light
    // else {
    //   const implicitPreference = getImplicitPreference()
    //   if (implicitPreference) {
    //     themeToSet = implicitPreference
    //   }
    // }

    document.documentElement.setAttribute('data-theme', themeToSet)
    setThemeState(themeToSet)
  }, [])

  return <ThemeContext value={{ setTheme, theme }}>{children}</ThemeContext>
}

export const useTheme = (): ThemeContextType => use(ThemeContext)
