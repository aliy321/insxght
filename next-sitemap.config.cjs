const { SITE_URL } = require('./src/utilities/siteConfig')

const staticRoutes = [
  '/',
  '/about',
  '/projects',
  '/blogs',
  '/contact',
  '/search',
]

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: [
    '/admin/*',
    '/api/*',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/admin/*', '/api/*'],
      },
    ],
    additionalSitemaps: [
      `${SITE_URL}/blogs-sitemap.xml`,
      `${SITE_URL}/projects-sitemap.xml`,
    ],
  },
  additionalPaths: async (config) => {
    return staticRoutes.map((route) => ({
      loc: route,
      changefreq: 'weekly',
      priority: route === '/' ? 1.0 : 0.8,
      lastmod: new Date().toISOString(),
    }))
  },
}

