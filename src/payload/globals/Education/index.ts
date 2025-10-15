import { revalidateTag } from 'next/cache'
import type { GlobalAfterChangeHook, GlobalConfig } from 'payload'

const revalidateEducation: GlobalAfterChangeHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidateTag('global_education')
  }
  return doc
}

export const Education: GlobalConfig = {
  slug: 'education',
  label: 'Education',
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
      defaultValue: 'Education',
      admin: {
        description: 'Title for the education section',
      },
    },
    {
      name: 'educationEntries',
      type: 'array',
      label: 'Education Entries',
      fields: [
        {
          name: 'school',
          type: 'text',
          label: 'School/University Name',
          required: true,
        },
        {
          name: 'degree',
          type: 'text',
          label: 'Degree/Program',
          required: true,
          admin: {
            description: 'e.g., "Bachelor of Science in Computer Science"',
          },
        },
        {
          name: 'start',
          type: 'text',
          label: 'Start Date',
          required: true,
          admin: {
            description: 'Start date (e.g., "2018" or "Sep 2018")',
          },
        },
        {
          name: 'end',
          type: 'text',
          label: 'End Date',
          required: true,
          admin: {
            description: 'End date (e.g., "2022" or "May 2022")',
          },
        },
        {
          name: 'logo',
          type: 'upload',
          label: 'School Logo',
          relationTo: 'media',
          admin: {
            description: 'School or university logo',
          },
        },
        {
          name: 'website',
          type: 'text',
          label: 'School Website',
          admin: {
            description: 'School or university website URL',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Additional Details',
          admin: {
            description: 'Additional information about your education (optional)',
          },
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
  hooks: {
    afterChange: [revalidateEducation],
  },
}
