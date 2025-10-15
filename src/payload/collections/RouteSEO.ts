import type { CollectionConfig } from 'payload'

export const RouteSEO: CollectionConfig = {
  slug: 'route-seo',
  labels: {
    singular: 'Route SEO',
    plural: 'Route SEO',
  },
  admin: {
    useAsTitle: 'path',
    defaultColumns: ['path', 'title', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'path',
      type: 'text',
      required: true,
      index: true,
      admin: { description: 'URL path starting with / (e.g., /, /about)' },
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'noindex',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}

export default RouteSEO
