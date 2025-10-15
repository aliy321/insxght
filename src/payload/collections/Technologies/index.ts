import type { CollectionConfig } from 'payload'

export const Technologies: CollectionConfig = {
  slug: 'technologies',
  labels: {
    singular: 'Technology',
    plural: 'Technologies',
  },
  admin: {
    group: 'Content',
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Technology Name',
      required: true,
      unique: true,
      admin: {
        description: 'Name of the technology or skill (e.g., React, TypeScript, AWS)',
      },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      options: [
        { label: 'Frontend', value: 'frontend' },
        { label: 'Backend', value: 'backend' },
        { label: 'Database', value: 'database' },
        { label: 'Cloud/DevOps', value: 'cloud' },
        { label: 'Mobile', value: 'mobile' },
        { label: 'Design', value: 'design' },
        { label: 'Tools', value: 'tools' },
        { label: 'Languages', value: 'languages' },
        { label: 'Other', value: 'other' },
      ],
      defaultValue: 'other',
      admin: {
        description: 'Category this technology belongs to',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Brief description of this technology (optional)',
      },
    },
    {
      name: 'website',
      type: 'text',
      label: 'Official Website',
      admin: {
        description: 'Official website URL for this technology',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      label: 'Technology Logo',
      relationTo: 'media',
      admin: {
        description: 'Logo or icon for this technology',
      },
    },
    {
      name: 'color',
      type: 'text',
      label: 'Brand Color',
      admin: {
        description: 'Hex color code for this technology (e.g., #61DAFB for React)',
      },
    },
  ],
}
