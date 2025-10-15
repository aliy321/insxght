import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'
import { whitelabel } from '@/config/whitelabel'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: whitelabel.openGraph.type,
  description: whitelabel.brandDescription,
  images: [
    {
      url: whitelabel.openGraph.images.startsWith('http')
        ? whitelabel.openGraph.images
        : `${getServerSideURL()}${whitelabel.openGraph.images}`,
    },
  ],
  siteName: whitelabel.brandName,
  title: whitelabel.brandName,
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
