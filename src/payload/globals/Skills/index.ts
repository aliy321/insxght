import { revalidateTag } from 'next/cache'
import type { GlobalAfterChangeHook, GlobalConfig } from 'payload'

const revalidateSkills: GlobalAfterChangeHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidateTag('global_skills')
  }
  return doc
}

export const Skills: GlobalConfig = {
  slug: 'skills',
  label: 'Skills',
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
      defaultValue: 'Skills',
      admin: {
        description: 'Title for the skills section',
      },
    },
    {
      name: 'featuredTechnologies',
      type: 'relationship',
      label: 'Featured Technologies',
      relationTo: 'technologies',
      hasMany: true,
      admin: {
        description: 'Select technologies to display on the homepage',
        sortOptions: 'name',
      },
    },
    {
      name: 'displayAsBadges',
      type: 'checkbox',
      label: 'Display as Badges',
      defaultValue: true,
      admin: {
        description: 'Display skills as individual badges instead of categorized groups',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateSkills],
  },
}
