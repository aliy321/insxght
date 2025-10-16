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
      name: 'skillGroups',
      type: 'array',
      label: 'Skill Groups',
      admin: {
        description: 'Organize skills into categories with headers',
        initCollapsed: false,
      },
      fields: [
        {
          name: 'header',
          type: 'text',
          label: 'Group Header',
          required: true,
          admin: {
            description: 'e.g., "Frontend & UI", "Backend & APIs"',
          },
        },
        {
          name: 'technologies',
          type: 'relationship',
          label: 'Technologies',
          relationTo: 'technologies',
          hasMany: true,
          required: true,
          admin: {
            description: 'Select technologies for this group',
            sortOptions: 'name',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSkills],
  },
}
