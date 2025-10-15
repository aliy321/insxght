import type { Post, Page } from '@/payload-types'
import type {
  Organization,
  WebSite,
  BlogPosting,
  BreadcrumbList,
  FAQPage,
  Person,
  WithContext,
  Graph,
  Thing,
} from 'schema-dts'
import { getServerSideURL } from './getURL'
import { whitelabel } from '@/config/whitelabel'

// Simple helper to add @context
export const createStructuredData = <T extends Thing>(data: T): WithContext<T> => {
  return {
    '@context': 'https://schema.org',
    ...(data as any),
  } as WithContext<T>
}

export const generateOrganizationData = (): WithContext<Organization> => {
  return createStructuredData<Organization>({
    '@type': 'Organization',
    name: whitelabel.brandName,
    url: getServerSideURL(),
    logo: `${getServerSideURL()}${whitelabel.logoPath}`,
    description: whitelabel.brandDescription,
    sameAs: Object.values(whitelabel.structuredData.socialMedia).filter(Boolean),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: whitelabel.structuredData.contactType,
      email: whitelabel.brandEmail,
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: whitelabel.structuredData.addressCountry,
    },
  })
}

export const generateWebsiteData = (): WithContext<WebSite> => {
  return createStructuredData<WebSite>({
    '@type': 'WebSite',
    name: whitelabel.brandName,
    url: getServerSideURL(),
    description: whitelabel.brandDescription,
    publisher: {
      '@type': 'Organization',
      name: whitelabel.brandName,
    },
  })
}

export const generateArticleData = (post: Post): WithContext<BlogPosting> => {
  const authors: Person[] = post.populatedAuthors?.map((author) => ({
    '@type': 'Person',
    name: author.name || whitelabel.brandName,
  })) || [
    {
      '@type': 'Person',
      name: whitelabel.brandName,
    },
  ]

  return createStructuredData<BlogPosting>({
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.meta?.description || '',
    image:
      post.meta?.image && typeof post.meta.image === 'object' && 'url' in post.meta.image
        ? `${getServerSideURL()}${post.meta.image.url}`
        : undefined,
    author: authors,
    publisher: {
      '@type': 'Organization',
      name: whitelabel.brandName,
      logo: {
        '@type': 'ImageObject',
        url: `${getServerSideURL()}${whitelabel.logoPath}`,
      },
    },
    datePublished: post.publishedAt || undefined,
    dateModified: post.updatedAt || undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${getServerSideURL()}/posts/${post.slug}`,
    },
    articleSection: post.categories
      ?.map((cat) => (typeof cat === 'object' && cat ? cat.title : ''))
      .filter(Boolean)
      .join(', '),
  })
}

export const generateBreadcrumbData = (
  breadcrumbs: Array<{ name: string; url: string }>,
): WithContext<BreadcrumbList> => {
  return createStructuredData<BreadcrumbList>({
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${getServerSideURL()}${item.url}`,
    })),
  })
}

export const generateFAQData = (
  faqs: Array<{ question: string; answer: string }>,
): WithContext<FAQPage> => {
  return createStructuredData<FAQPage>({
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  })
}

// Function to create a Graph with multiple structured data items
export const createStructuredDataGraph = (items: WithContext<any>[]): Graph => {
  return {
    '@context': 'https://schema.org',
    '@graph': items,
  }
}
