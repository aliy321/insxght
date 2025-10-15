// Shared configuration for both ES modules and CommonJS
// Replicates the logic from getServerSideURL() for CommonJS compatibility
const getServerSideURL = () => {
  let url = process.env.NEXT_PUBLIC_SERVER_URL

  if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (!url) {
    url = 'http://localhost:3000'
  }

  return url
}

module.exports = {
  SITE_URL: getServerSideURL(),
}
