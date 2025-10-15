import type { GlobalConfig } from 'payload'

import { revalidateAbout } from './hooks/revalidateAbout'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About',
  admin: {
    group: 'About',
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
                  name: 'title',
                  type: 'text',
                  label: 'Section Title',
                  defaultValue: 'About',
                },
                {
                  name: 'content',
                  type: 'richText',
                  label: 'Content',
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
                  name: 'text',
                  type: 'text',
                  label: 'Outro Text',
                  defaultValue: 'Written as HYPERFUSE pronounced as: HAI-PER-FYOOZ',
                },
              ],
            },
            {
              name: 'outroDescription',
              type: 'richText',
              label: 'Outro Description',
            },
          ],
        },
        {
          label: 'Offer',
          fields: [
            {
              name: 'offer',
              type: 'group',
              fields: [
                {
                  name: 'items',
                  type: 'array',
                  label: 'Offer Items',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Item Title',
                      required: true,
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Item Description',
                    },
                  ],
                  maxRows: 6,
                },
              ],
            },
          ],
        },
        {
          label: 'Founders',
          fields: [
            {
              name: 'foundersTitle',
              type: 'text',
              label: 'Section Title',
              defaultValue: 'Founders',
            },
            {
              name: 'foundersDescription',
              type: 'richText',
              label: 'Section Description',
            },
            {
              name: 'foundersList',
              type: 'array',
              label: 'Founders',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  label: 'Founder Name',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Founder Description',
                },
                {
                  name: 'image',
                  type: 'upload',
                  label: 'Founder Image',
                  relationTo: 'media',
                  required: true,
                },
              ],
              maxRows: 6,
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateAbout],
  },
}
