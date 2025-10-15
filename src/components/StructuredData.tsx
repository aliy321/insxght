import Script from 'next/script'
import type { Post } from '@/payload-types'
import {
  generateOrganizationData,
  generateWebsiteData,
  generateArticleData,
  generateBreadcrumbData,
  generateFAQData,
} from '@/utilities/structuredData'

interface StructuredDataProps {
  type: 'organization' | 'website' | 'article' | 'breadcrumbs' | 'faq'
  data?: Post | Array<{ name: string; url: string }> | Array<{ question: string; answer: string }>
}

export const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const generateData = () => {
    switch (type) {
      case 'organization':
        return generateOrganizationData()
      case 'website':
        return generateWebsiteData()
      case 'article':
        return data ? generateArticleData(data as Post) : null
      case 'breadcrumbs':
        return data ? generateBreadcrumbData(data as Array<{ name: string; url: string }>) : null
      case 'faq':
        return data ? generateFAQData(data as Array<{ question: string; answer: string }>) : null
      default:
        return null
    }
  }

  const structuredData = generateData()

  if (!structuredData) return null

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
