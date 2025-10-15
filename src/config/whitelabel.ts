import { Icons } from '@/components/icons'
import { HomeIcon, NotebookIcon } from 'lucide-react'

export const whitelabel = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  brandName: 'INSXGHT',
  brandDescription: 'Your brand description goes here.',
  brandEmail: 'contact@yourbrand.com',
  twitter: {
    card: 'summary_large_image',
    title: 'INSXGHT',
    description: 'Your brand description for Twitter cards.',
    creator: '@yourbrand',
  },
  twitterHandle: '@yourbrand',
  openGraph: {
    type: 'website',
    title: 'INSXGHT',
    description: 'Your brand description for Open Graph.',
    images: '/whitelabel/og-default.webp',
  },
  defaultOgImage: '/whitelabel/og-default.webp',
  logoIconPath: '/whitelabel/favicon.svg',
  logoPath: '/whitelabel/logo.svg',
  adminGraphics: {
    icon: '/payload/graphics/Icon/index.tsx#Icon',
    logo: '/payload/graphics/Logo/index.tsx#Logo',
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
  socialMedia: {
    X: {
      url: 'https://x.com/cmd_fuck',
      name: 'X',
      icon: Icons.x,
      navbar: true,
    },
    GitHub: {
      url: 'https://github.com/aliy321',
      name: 'GitHub',
      icon: Icons.github,
      navbar: true,
    },
    LinkedIn: {
      url: 'https://www.linkedin.com/in/aliy-akhbar-4a1a60187/',
      name: 'LinkedIn',
      icon: Icons.linkedin,
      navbar: true,
    },
    email: {
      url: 'mailto:aliyakhbar@gmail.com',
      name: 'Send Email',
      icon: Icons.email,
      navbar: false,
    },
  },
  navbar: [
    { href: '/', icon: HomeIcon, label: 'Home' },
    // { href: '/blog', icon: NotebookIcon, label: 'Blog' },
  ],
} as const

export type WhitelabelConfig = typeof whitelabel
