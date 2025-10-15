import type { GlobalConfig } from 'payload'

import { revalidateHomepage } from './hooks/revalidateHomepage'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  admin: {
    group: 'Homepage',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero Section',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [
                {
                  name: 'heroImage',
                  type: 'upload',
                  label: 'Hero Background Image',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Introduction',
          fields: [
            {
              name: 'intro',
              type: 'group',
              fields: [
                {
                  name: 'content',
                  type: 'richText',
                  label: 'Content',
                },
                {
                  name: 'ctaText',
                  type: 'text',
                  label: 'Call to Action Text',
                },
                {
                  name: 'ctaLink',
                  type: 'text',
                  label: 'Call to Action Link',
                },
              ],
            },
          ],
        },
        {
          name: 'offer',
          fields: [
            {
              name: 'offerings',
              type: 'array',
              label: 'Offerings',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Offering Title',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Offering Description',
                },
              ],
              maxRows: 6,
            },
          ],
        },
        {
          label: 'Projects',
          fields: [
            {
              name: 'projects',
              type: 'group',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  label: 'Image',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Section Title',
                },
                {
                  name: 'description',
                  type: 'richText',
                  label: 'Description',
                },
              ],
            },
            {
              name: 'featuredProjects',
              type: 'group',
              fields: [
                {
                  name: 'ctaText',
                  type: 'text',
                  label: 'Call to Action Text',
                },
                {
                  name: 'ctaLink',
                  type: 'text',
                  label: 'Call to Action Link',
                },
                {
                  name: 'featuredProjects',
                  type: 'relationship',
                  label: 'Featured Projects',
                  relationTo: 'projects',
                  hasMany: true,
                  maxRows: 6,
                  admin: {
                    description: 'Select projects to feature on the homepage',
                    sortOptions: '-publishedAt',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Outro',
          fields: [
            {
              name: 'outro',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Section Title',
                },
              ],
            },
          ],
        },
        {
          label: 'Insights',
          fields: [
            {
              name: 'insights',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Section Title',
                },
                {
                  name: 'description',
                  type: 'richText',
                  label: 'Description',
                },
                {
                  name: 'ctaText',
                  type: 'text',
                  label: 'Call to Action Text',
                },
                {
                  name: 'ctaLink',
                  type: 'text',
                  label: 'Call to Action Link',
                },
                {
                  name: 'featuredPosts',
                  type: 'relationship',
                  label: 'Featured Posts',
                  relationTo: 'blogs',
                  hasMany: true,
                  maxRows: 3,
                  admin: {
                    description: 'Select posts to feature on the homepage',
                    sortOptions: '-publishedAt',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHomepage],
  },
}
