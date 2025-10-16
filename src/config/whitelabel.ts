import { Icons } from '@/components/icons'
import { HomeIcon } from 'lucide-react'

export const whitelabel = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://insxght.vercel.app',
  brandName: 'INSXGHT',
  brandDescription:
    'Creative Front-End Engineer & Technologist crafting expressive, performant web experiences using React, Next.js, and TailwindCSS.',
  brandEmail: 'aliyakhbar@gmail.com',
  twitter: {
    card: 'summary_large_image',
    title: 'Aliy — Front-End Engineer & Creative Technologist',
    description:
      'Building clear, responsive, and maintainable digital experiences with React, Next.js, and TailwindCSS. Explore my latest works.',
    creator: '@cmd_fuck',
  },
  twitterHandle: '@cmd_fuck',
  openGraph: {
    type: 'website',
    title: 'Aliy — Front-End Engineer & Creative Technologist',
    description:
      'Creative Front-End Developer & Entrepreneur focused on building expressive, high-performance web experiences with React, Next.js, and TailwindCSS.',
    images: '/whitelabel/og-default.webp',
  },
  defaultOgImage: '/whitelabel/og-default.webp',
  logoIconPath: '/whitelabel/favicon.svg',
  logoPath: '/whitelabel/logo.svg',
  adminGraphics: {
    icon: '/payload/graphics/Icon/index.tsx#Icon',
    logo: '/payload/graphics/Logo/index.tsx#Logo',
  },
  structuredData: {
    addressCountry: 'SG',
    contactType: ['customer service', 'sales'],
    socialMedia: {
      twitter: 'https://x.com/cmd_fuck',
      linkedin: 'https://www.linkedin.com/in/aliy-akhbar-4a1a60187/',
      github: 'https://github.com/aliy321',
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
  navbar: [{ href: '/', icon: HomeIcon, label: 'Home' }],
} as const
