import { revalidateTag } from 'next/cache'
import type { GlobalAfterChangeHook, GlobalConfig } from 'payload'

export const revalidateHeroSection: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating hero section`)

    revalidateTag('global_heroSection')
  }

  return doc
}

export const HeroSection: GlobalConfig = {
  slug: 'heroSection',
  label: 'Hero Section',
  admin: {
    group: 'Homepage Sections',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      required: true,
      admin: {
        description: 'Your full name displayed in the hero section',
      },
    },
    {
      name: 'initials',
      type: 'text',
      label: 'Initials',
      required: true,
      maxLength: 3,
      admin: {
        description: 'Initials used as fallback for avatar (e.g., JD for John Doe)',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      label: 'Profile Avatar',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Your profile picture displayed in the hero section',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Professional Description',
      required: true,
      admin: {
        description: 'Brief description of yourself and your expertise',
      },
    },
    {
      name: 'greeting',
      type: 'text',
      label: 'Greeting Text',
      defaultValue: "Hi, I'm",
      admin: {
        description: 'Greeting text before your name (e.g., "Hi, I\'m" or "Hello, I\'m")',
      },
    },
    {
      name: 'emoji',
      type: 'text',
      label: 'Greeting Emoji',
      defaultValue: '👋',
      maxLength: 2,
      admin: {
        description: 'Emoji displayed after your name',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeroSection],
  },
}
