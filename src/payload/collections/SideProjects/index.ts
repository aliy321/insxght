import type { CollectionConfig } from 'payload'

export const SideProjects: CollectionConfig = {
  slug: 'sideProjects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'website', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Project Title',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      label: 'Logo/Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'richText',
      required: true,
    },
    {
      name: 'website',
      label: 'Website Link',
      type: 'text',
    },
    {
      name: 'github',
      label: 'GitHub Link',
      type: 'text',
    },
    {
      name: 'technologies',
      label: 'Technologies Used',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
