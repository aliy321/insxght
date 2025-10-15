import { revalidateTag } from 'next/cache'
import type { GlobalAfterChangeHook, GlobalConfig } from 'payload'

const revalidateAboutSection: GlobalAfterChangeHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidateTag('global_aboutSection')
  }
  return doc
}

export const AboutSection: GlobalConfig = {
  slug: 'aboutSection',
  label: 'About Section',
  admin: {
    group: 'Homepage Sections',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'About',
      admin: {
        description: 'Title for the about section',
      },
    },
    {
      name: 'summary',
      type: 'richText',
      label: 'About Summary',
      required: true,
      admin: {
        description: 'Detailed description about yourself, your background, and interests',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateAboutSection],
  },
}
