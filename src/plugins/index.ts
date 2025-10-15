import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateImage, GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/components/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/components/search/beforeSync'
import { s3Storage } from '@payloadcms/storage-s3'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { whitelabel } from '@/config/whitelabel'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title}` : whitelabel.brandName
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

const generateImage: GenerateImage<Page> = ({ doc }) => {
  if (typeof doc.meta?.image === 'object' && doc.meta?.image) {
    return doc.meta.image.url || '/og.png'
  }
  return '/og.png'
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
    generateImage,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  payloadCloudPlugin(),
  s3Storage({
    clientUploads: true,
    collections: {
      media: {
        prefix: process.env.S3_ROOT ? `${process.env.S3_ROOT}/` : '',
        generateFileURL: ({ filename, prefix }) => {
          const customDomain = process.env.S3_CUSTOM_DOMAIN || 'media.hyperfuse.studio'

          if (!customDomain) {
            // Fallback to S3 URL if custom domain is not configured
            const bucket = process.env.S3_UPLOAD_BUCKET
            const region = process.env.S3_UPLOAD_REGION

            if (!bucket || !region) {
              console.warn('S3 configuration incomplete, falling back to API route')
              return `/api/media/file/${filename}`
            }

            return `https://s3.${region}.amazonaws.com/${bucket}/${prefix}${filename}`
          }

          // Use custom domain URL
          return `https://${customDomain}/${prefix}${filename}`
        },
      },
    },
    bucket: process.env.S3_UPLOAD_BUCKET || '',
    config: {
      credentials: {
        accessKeyId: process.env.S3_UPLOAD_KEY || '',
        secretAccessKey: process.env.S3_UPLOAD_SECRET || '',
      },
      region: process.env.S3_UPLOAD_REGION || '',
    },
  }),
]
