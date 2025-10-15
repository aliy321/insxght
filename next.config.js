import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

// S3 Configuration
const S3_BUCKET = process.env.S3_UPLOAD_BUCKET
const S3_REGION = process.env.S3_UPLOAD_REGION
const S3_CUSTOM_DOMAIN = process.env.S3_CUSTOM_DOMAIN || 'media.hyperfuse.studio'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
      {
        protocol: 'https',
        hostname: S3_CUSTOM_DOMAIN,
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      ...(S3_BUCKET && S3_REGION
        ? [
            {
              protocol: 'https',
              hostname: `s3.${S3_REGION}.amazonaws.com`,
              port: '',
              pathname: `/${S3_BUCKET}/**`,
            },
          ]
        : []),
    ],
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
