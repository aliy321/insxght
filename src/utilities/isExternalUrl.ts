/**
 * Utility function to determine if a URL is external
 * @param url - The URL to check
 * @returns boolean indicating if the URL is external
 */
export function isExternalUrl(url: string): boolean {
  if (!url) return false

  try {
    const urlObj = new URL(url)
    // Check if it's a different origin than the current site
    return urlObj.origin !== window.location.origin
  } catch {
    // If URL parsing fails, treat as internal
    return false
  }
}

/**
 * Get props for external links (target="_blank" and rel="noopener noreferrer")
 * @param url - The URL to check
 * @returns Object with target and rel attributes if external, empty object if internal
 */
export function getExternalLinkProps(url: string): { target?: string; rel?: string } {
  if (isExternalUrl(url)) {
    return {
      target: '_blank',
      rel: 'noopener noreferrer',
    }
  }
  return {}
}
