import type { Config } from 'src/payload-types'

import config from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Global = keyof Config['globals']

async function getGlobal<G extends Global>(slug: G, depth = 0): Promise<Config['globals'][G]> {
  const payload = await getPayload({ config })

  const global = await payload.findGlobal({
    slug,
    depth,
  })

  return global as Config['globals'][G]
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = <G extends Global>(slug: G, depth = 0) =>
  unstable_cache(async () => getGlobal<G>(slug, depth), [slug], {
    tags: [`global_${slug}`],
  })
