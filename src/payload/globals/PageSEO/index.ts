import type { GlobalConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
} from '@payloadcms/plugin-seo/fields'

const seoTab = {
  fields: [
    MetaTitleField({
      hasGenerateFn: true,
    }),
    MetaDescriptionField({
      hasGenerateFn: true,
    }),
    MetaImageField({
      relationTo: 'media',
    }),
    OverviewField({
      titlePath: 'title',
      descriptionPath: 'description',
      imagePath: 'image',
    }),
  ],
}

export const PageSEO: GlobalConfig = {
  slug: 'page-seo',
  admin: {
    group: 'Site Settings',
  },
  label: 'Page SEO',
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Home',
          name: 'home',
          fields: seoTab.fields,
        },
        {
          label: 'About',
          name: 'about',
          fields: seoTab.fields,
        },
        {
          label: 'Projects',
          name: 'projects',
          fields: seoTab.fields,
        },
        {
          label: 'Blogs',
          name: 'blogs',
          fields: seoTab.fields,
        },
        // {
        //     label: 'Posts',
        //     name: 'posts',
        //     fields: seoTab.fields,
        // },
        {
          label: 'Contact',
          name: 'contact',
          fields: seoTab.fields,
        },
        // {
        //     label: 'Search',
        //     name: 'search',
        //     fields: seoTab.fields,
        // },
      ],
    },
  ],
  hooks: {
    afterChange: [
      ({ doc }) => {
        // Revalidate all pages when SEO changes
        // This ensures all pages get updated metadata
        return doc
      },
    ],
  },
} as const
