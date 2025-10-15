import Script from 'next/script'
import React from 'react'

import {
  defaultTheme,
  themeLocalStorageKey,
} from '@/components/providers/Theme/ThemeSelector/types'

export const InitTheme: React.FC = () => {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      dangerouslySetInnerHTML={{
        __html: `
  (function () {
    // Commented out auto mode functionality
    // function getImplicitPreference() {
    //   var mediaQuery = '(prefers-color-scheme: dark)'
    //   var mql = window.matchMedia(mediaQuery)
    //   var hasImplicitPreference = typeof mql.matches === 'boolean'

    //   if (hasImplicitPreference) {
    //     return mql.matches ? 'dark' : 'light'
    //   }

    //   return null
    // }

    function themeIsValid(theme) {
      return theme === 'light' || theme === 'dark'
    }

    var themeToSet = '${defaultTheme}'
    var preference = window.localStorage.getItem('${themeLocalStorageKey}')

    if (themeIsValid(preference)) {
      themeToSet = preference
    }
    // Commented out auto mode - always default to light
    // else {
    //   var implicitPreference = getImplicitPreference()
    //   if (implicitPreference) {
    //     themeToSet = implicitPreference
    //   }
    // }

    document.documentElement.setAttribute('data-theme', themeToSet)
  })();
  `,
      }}
      id="theme-script"
      strategy="beforeInteractive"
    />
  )
}
