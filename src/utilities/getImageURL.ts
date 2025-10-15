import { getServerSideURL } from './getURL'
import { whitelabel } from '@/config/whitelabel'

/**
 * Generates a complete image URL for Open Graph and other meta purposes.
 * Prefers OG-specific image size if available, otherwise uses the main image URL.
 * Falls back to default OG image if no image is provided.
 */
export const getImageURL = (image?: any) => {
  const serverUrl = getServerSideURL()

  // If no image provided, return default
  if (!image || typeof image !== 'object' || !('url' in image)) {
    return serverUrl + whitelabel.defaultOgImage
  }

  // Prefer OG-specific size if available, otherwise use main URL
  const ogUrl = image.sizes?.og?.url
  return ogUrl ? serverUrl + ogUrl : serverUrl + image.url
}
