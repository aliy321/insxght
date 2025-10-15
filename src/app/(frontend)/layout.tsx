import type { Metadata } from 'next'
import React from 'react'

import { cn } from '@/utilities/ui'

import { Work_Sans } from 'next/font/google'
import { Bowlby_One } from 'next/font/google'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/payload/globals/Footer/Component'
import { Header } from '@/payload/globals/Header/Component'
import { Providers } from '@/components/providers'
import { InitTheme } from '@/components/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { whitelabel } from '@/config/whitelabel'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import Menu from '@/components/Menu/Menu'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Header as HeaderType } from '@/payload-types'
import {
  generateOrganizationData,
  generateWebsiteData,
  createStructuredDataGraph,
} from '@/utilities/structuredData'
import Script from 'next/script'
import Navbar from '@/components/navbar'
import LightRays from '@/components/LightRays'

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-work-sans',
})

const bowlbyOne = Bowlby_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bowlby-one',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const headerData: HeaderType = await getCachedGlobal('header', 1)()

  return (
    <html className={cn(workSans.variable, bowlbyOne.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href={whitelabel.logoIconPath} rel="icon" sizes="32x32" />
        <link href={whitelabel.logoIconPath} rel="icon" type="image/svg+xml" />
      </head>
      <body
        className={cn('min-h-screen font-sans antialiased relative', workSans.variable)}
        suppressHydrationWarning
      >
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          {/* <Menu data={headerData} />
            <ClientProvider>{children}</ClientProvider>
            <Footer /> */}

          {/* <Header /> */}
          <div className="fixed inset-0 top-0 left-0 right-0 h-[2000px]">
            <LightRays
              raysOrigin="top-center"
              raysColor="#00ffff"
              raysSpeed={1.5}
              lightSpread={0.8}
              rayLength={1.2}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0.1}
              distortion={0.05}
              className="custom-rays"
            />
          </div>

          <main className="max-w-2xl mx-auto py-12 sm:py-24 px-6 relative flex flex-col min-h-svh space-y-10 container isolate">
            {children}
            <Navbar />
          </main>

          {/* <Footer /> */}

          {/* Global structured data using graph */}
          <Script
            id="structured-data-graph"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                createStructuredDataGraph([generateOrganizationData(), generateWebsiteData()]),
              ),
            }}
          />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: {
    template: `%s | ${whitelabel.brandName}`,
    default: whitelabel.brandName,
  },
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: whitelabel.twitterHandle,
  },
}
