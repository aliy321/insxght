import { getClientSideURL } from '@/utilities/getURL'
import type { Media } from '@/payload-types'

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  // Check if URL already has http/https protocol
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return cacheTag ? `${url}?${cacheTag}` : url
  }

  // Otherwise prepend client-side URL
  const baseUrl = getClientSideURL()
  return cacheTag ? `${baseUrl}${url}?${cacheTag}` : `${baseUrl}${url}`
}

/**
 * Extracts the URL from a Payload media object or ID
 * @param media The media object or ID from Payload
 * @param fallbackUrl Optional fallback URL if media is not available
 * @returns The media URL or fallback URL
 */
export const getMediaUrlFromPayload = (
  media: Media | number | null | undefined,
  fallbackUrl?: string,
): string => {
  if (!media) return fallbackUrl || ''

  if (typeof media === 'number') return fallbackUrl || ''

  if (typeof media === 'object' && media.url) {
    return getMediaUrl(media.url, media.updatedAt)
  }

  return fallbackUrl || ''
}
