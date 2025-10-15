import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { getImageURL } from './getImageURL'
import { whitelabel } from '@/config/whitelabel'

export type PageSEOKey = 'home' | 'about' | 'projects' | 'blogs' | 'posts' | 'contact' | 'search'

export const getPageSEO = async (pageKey: PageSEOKey): Promise<Metadata> => {
  const payload = await getPayload({ config: configPromise })

  try {
    // Try route-level SEO override by current path
    const headersList = await headers()
    const path = headersList.get('x-pathname') || `/${pageKey === 'home' ? '' : pageKey}`
    const routeSEO = await payload.find({
      // cast to any to avoid dependency on generated union types for boilerplate
      collection: 'route-seo' as any,
      where: { path: { equals: path } },
      depth: 1,
      limit: 1,
    })

    const pageSEO = await payload.findGlobal({
      slug: 'page-seo',
    })

    const pageData = (pageSEO as any)?.[pageKey]

    if (!pageData && (!routeSEO.docs || routeSEO.docs.length === 0)) {
      // Fallback to default metadata
      return {
        title: pageKey === 'home' ? { absolute: whitelabel.brandName } : whitelabel.brandName,
        description: whitelabel.brandDescription,
        keywords: [
          'digital innovation',
          'startup development',
          'renaissance design',
          whitelabel.brandName.toLowerCase(),
        ],
        authors: [{ name: whitelabel.brandName }],
        creator: whitelabel.brandName,
        publisher: whitelabel.brandName,
        robots: {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
        twitter: {
          card: whitelabel.twitter.card,
          title: whitelabel.twitter.title,
          description: whitelabel.twitter.description,
          creator: whitelabel.twitter.creator,
        },
        openGraph: mergeOpenGraph({
          description: whitelabel.brandDescription,
          title: whitelabel.brandName,
        }),
      }
    }

    const routeOverride = (routeSEO as any).docs?.[0] as any
    const ogImage = getImageURL(routeOverride?.image || (pageData as any)?.image)
    const title = routeOverride?.title || (pageData as any)?.title || whitelabel.brandName
    const description =
      routeOverride?.description ||
      (pageData as any)?.description ||
      'Where the spirit of the Renaissance meets modern innovation. We craft digital solutions with the precision of master artisans and the vision of true pioneers.'

    return {
      title: pageKey === 'home' ? { absolute: title } : title,
      description,
      keywords: pageData.keywords || [
        'digital innovation',
        'startup development',
        'renaissance design',
        whitelabel.brandName.toLowerCase(),
        'web development',
        'digital solutions',
        'creative agency',
      ],
      authors: [{ name: whitelabel.brandName }],
      creator: whitelabel.brandName,
      publisher: whitelabel.brandName,
      category: 'technology',
      classification: 'business',
      robots: {
        index: routeOverride?.noindex ? false : true,
        follow: true,
        googleBot: {
          index: routeOverride?.noindex ? false : true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      alternates: {
        canonical: `${getServerSideURL()}/${pageKey === 'home' ? '' : pageKey}`,
      },
      twitter: {
        card: whitelabel.twitter.card,
        title,
        description,
        images: ogImage ? [ogImage] : undefined,
        creator: whitelabel.twitter.creator,
        site: whitelabel.twitter.creator,
      },
      openGraph: mergeOpenGraph({
        description,
        images: ogImage
          ? [
              {
                url: ogImage,
                width: 1200,
                height: 630,
                alt: title,
              },
            ]
          : undefined,
        title,
        url: `${getServerSideURL()}/${pageKey === 'home' ? '' : pageKey}`,
        siteName: whitelabel.brandName,
        locale: 'en_US',
        type: 'website',
      }),
    }
  } catch (error) {
    // Fallback to default metadata if there's an error
    return {
      title: pageKey === 'home' ? { absolute: whitelabel.brandName } : whitelabel.brandName,
      description:
        'Where the spirit of the Renaissance meets modern innovation. We craft digital solutions with the precision of master artisans and the vision of true pioneers.',
      keywords: [
        'digital innovation',
        'startup development',
        'renaissance design',
        whitelabel.brandName.toLowerCase(),
        'web development',
        'digital solutions',
        'creative agency',
      ],
      authors: [{ name: whitelabel.brandName }],
      creator: whitelabel.brandName,
      publisher: whitelabel.brandName,
      category: 'technology',
      classification: 'business',
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      alternates: {
        canonical: `${getServerSideURL()}/${pageKey === 'home' ? '' : pageKey}`,
      },
      twitter: {
        card: whitelabel.twitter.card,
        title: whitelabel.brandName,
        description: whitelabel.brandDescription,
        creator: whitelabel.twitter.creator,
        site: whitelabel.twitter.creator,
      },
      openGraph: mergeOpenGraph({
        description: whitelabel.brandDescription,
        title: whitelabel.brandName,
        url: `${getServerSideURL()}/${pageKey === 'home' ? '' : pageKey}`,
        siteName: whitelabel.brandName,
        locale: 'en_US',
        type: 'website',
      }),
    }
  }
}
