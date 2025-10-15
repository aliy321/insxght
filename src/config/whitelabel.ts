export const whitelabel = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  brandName: 'Your Brand Name',
  brandDescription: 'Your brand description goes here.',
  brandEmail: 'contact@yourbrand.com',
  twitter: {
    card: 'summary_large_image',
    title: 'Your Brand Name',
    description: 'Your brand description for Twitter cards.',
    creator: '@yourbrand',
  },
  twitterHandle: '@yourbrand',
  openGraph: {
    type: 'website',
    title: 'Your Brand Name',
    description: 'Your brand description for Open Graph.',
    images: '/whitelabel/og-default.webp',
  },
  defaultOgImage: '/whitelabel/og-default.webp',
  logoIconPath: '/whitelabel/favicon.svg',
  logoPath: '/whitelabel/logo.svg',
  adminGraphics: {
    icon: '/@/payload/graphics/Icon/index.tsx#Icon',
    logo: '/@/payload/graphics/Logo/index.tsx#Logo',
  },
  // Structured Data Configuration
  structuredData: {
    addressCountry: 'US',
    contactType: ['customer service', 'sales'], // Array of contact types: 'customer service', 'technical support', 'sales', 'billing', 'general'
    socialMedia: {
      twitter: 'https://twitter.com/yourbrand',
      // Add other social media URLs as needed
      // linkedin: 'https://linkedin.com/company/your-brand',
      // facebook: 'https://facebook.com/your-brand',
      // instagram: 'https://instagram.com/your-brand',
    },
  },
} as const

export type WhitelabelConfig = typeof whitelabel
