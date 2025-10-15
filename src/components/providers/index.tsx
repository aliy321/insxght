import React from 'react'

import { HeaderThemeProvider } from '@/components/providers/HeaderTheme'
import { ThemeProvider } from '@/components/providers/Theme'
import { ViewTransitions } from 'next-view-transitions'
import ScreenSize from '@/components/Responsive'
import { GoogleAnalytics } from '@next/third-parties/google'
import LenisProvider from './Lenis'
import { TooltipProvider } from '@/components/ui/tooltip'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <ViewTransitions>
        <ScreenSize />
        <HeaderThemeProvider>
          <LenisProvider>
            <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
          </LenisProvider>
        </HeaderThemeProvider>
        {process.env.NODE_ENV === 'production' && (
          <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID!} />
        )}
      </ViewTransitions>
    </ThemeProvider>
  )
}
