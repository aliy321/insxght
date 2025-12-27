import type { CollectionConfig, PayloadRequest } from 'payload'

import { APIError } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { whitelabel } from '@/config/whitelabel'

const MAX_IMAGE_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024 // 50MB
const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024 // 10MB for PDFs and documents

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Site Settings',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    // staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
  hooks: {
    beforeChange: [
      async ({ req, data }) => {
        if (data.filesize) {
          const fileType = data.mimeType.split('/')[0]
          if (!fileType) {
            throw new APIError('Invalid file type', 400)
          }

          let maxSize: number
          let fileTypeName: string

          if (fileType === 'image') {
            maxSize = MAX_IMAGE_SIZE
            fileTypeName = 'Image'
          } else if (fileType === 'video') {
            maxSize = MAX_VIDEO_SIZE
            fileTypeName = 'Video'
          } else if (data.mimeType === 'application/pdf') {
            maxSize = MAX_DOCUMENT_SIZE
            fileTypeName = 'PDF'
          } else {
            maxSize = MAX_DOCUMENT_SIZE
            fileTypeName = 'File'
          }

          if (data.filesize > maxSize) {
            throw new APIError(
              `${fileTypeName} files must be smaller than ${maxSize / 1024 / 1024}MB. Current size: ${(data.filesize / (1024 * 1024)).toFixed(1)}MB`,
              400,
            )
          }
        }
        return data
      },
    ],
  },
}
