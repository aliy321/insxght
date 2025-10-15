import type { GlobalConfig } from 'payload'

export const ProjectsGlobal: GlobalConfig = {
  slug: 'projects-global',
  label: 'Projects Global',
  admin: {
    group: 'Projects',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroImage',
      type: 'upload',
      label: 'Hero Background Image',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      required: true,
    },
  ],
}
