import { revalidateTag } from 'next/cache'
import type { GlobalAfterChangeHook, GlobalConfig } from 'payload'

const revalidateSideProjectsSection: GlobalAfterChangeHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidateTag('global_sideProjectsSection')
  }
  return doc
}

export const SideProjectsSection: GlobalConfig = {
  slug: 'sideProjectsSection',
  label: 'Side Projects Section',
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
      defaultValue: 'Side Projects',
      admin: {
        description: 'Main title for the side projects section',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      defaultValue: 'Personal projects and experiments',
      admin: {
        description: 'Subtitle displayed below the main title',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Section Description',
      defaultValue:
        "Here are some personal projects and experiments I've worked on in my spare time.",
      admin: {
        description: 'Description text for the side projects section',
      },
    },
    {
      name: 'badgeText',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'Side Projects',
      admin: {
        description: 'Text displayed in the small badge above the title',
      },
    },
    {
      name: 'featuredSideProjects',
      type: 'relationship',
      label: 'Featured Side Projects',
      relationTo: 'sideProjects',
      hasMany: true,
      admin: {
        description: 'Select side projects to feature on the homepage',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateSideProjectsSection],
  },
}
