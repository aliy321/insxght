import { revalidateTag } from 'next/cache'
import type { GlobalAfterChangeHook, GlobalConfig } from 'payload'

const revalidateWorkExperience: GlobalAfterChangeHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidateTag('global_workExperience')
  }
  return doc
}

export const WorkExperience: GlobalConfig = {
  slug: 'workExperience',
  label: 'Work Experience',
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
      defaultValue: 'Work Experience',
      admin: {
        description: 'Title for the work experience section',
      },
    },
    {
      name: 'workEntries',
      type: 'array',
      label: 'Work Entries',
      fields: [
        {
          name: 'company',
          type: 'text',
          label: 'Company Name',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Job Title',
          required: true,
        },
        {
          name: 'start',
          type: 'text',
          label: 'Start Date',
          required: true,
          admin: {
            description: 'Start date (e.g., "2022" or "Jan 2022")',
          },
        },
        {
          name: 'end',
          type: 'text',
          label: 'End Date',
          admin: {
            description: 'End date (e.g., "Present", "2024", or "Dec 2024")',
          },
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Job Description',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          label: 'Company Logo',
          relationTo: 'media',
          admin: {
            description: 'Company logo image',
          },
        },
        {
          name: 'website',
          type: 'text',
          label: 'Company Website',
          admin: {
            description: 'Company website URL',
          },
        },
        {
          name: 'technologies',
          type: 'relationship',
          label: 'Technologies/Skills',
          relationTo: 'technologies',
          hasMany: true,
          admin: {
            description: 'Select technologies and skills used in this role',
            sortOptions: 'name',
          },
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
  hooks: {
    afterChange: [revalidateWorkExperience],
  },
}
