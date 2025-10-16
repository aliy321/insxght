// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'

import path from 'path'
import sharp from 'sharp'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Media } from './payload/collections/Media'
import { Pages } from './payload/collections/Pages'
import { Posts } from './payload/collections/Posts'
import { Users } from './payload/collections/Users'
import { Technologies } from './payload/collections/Technologies'
import { Projects } from './payload/collections/Projects'
import { SideProjects } from './payload/collections/SideProjects'
import { Footer } from './payload/globals/Footer/config'
import { Header } from './payload/globals/Header/config'
import { PageSEO } from './payload/globals/PageSEO'
import { HeroSection } from './payload/globals/HeroSection'
import { AboutSection } from './payload/globals/AboutSection'
import { WorkExperience } from './payload/globals/WorkExperience'
import { Education } from './payload/globals/Education'
import { Skills } from './payload/globals/Skills'
import { ProjectsSection } from './payload/globals/ProjectsSection'
import { SideProjectsSection } from './payload/globals/SideProjectsSection'
import { ContactSection } from './payload/globals/ContactSection'
import { RouteSEO } from './payload/collections/RouteSEO'
import { plugins } from './plugins'
import { defaultLexical } from '@/components/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { resendAdapter } from '@payloadcms/email-resend'
import { Categories } from './payload/collections/Categories'
import { whitelabel } from './config/whitelabel'
// Pruned unused globals and collections for boilerplate

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ['@/components/BeforeDashboard'],
      graphics: {
        Icon: whitelabel.adminGraphics?.icon,
        Logo: whitelabel.adminGraphics?.logo,
      },
    },
    meta: {
      description: `${whitelabel.brandName} Admin`,
      icons: [
        {
          type: 'image/svg+xml',
          rel: 'icon',
          url: whitelabel.logoIconPath,
        },
      ],
      openGraph: {
        description: `${whitelabel.brandName} Admin`,
        images: [
          {
            height: 600,
            url: whitelabel.defaultOgImage || '/website-template-OG.webp',
            width: 800,
          },
        ],
        title: `Admin Panel - ${whitelabel.brandName}`,
      },
      titleSuffix: `- ${whitelabel.brandName} Admin Panel`,
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  // database-adapter-config-start
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
      authToken: process.env.DATABASE_AUTH || '',
    },
  }),
  // database-adapter-config-end
  collections: [
    Pages,
    Posts,
    RouteSEO,
    Media,
    Users,
    Categories,
    Technologies,
    Projects,
    SideProjects,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [
    Header,
    Footer,
    PageSEO,
    HeroSection,
    AboutSection,
    WorkExperience,
    Education,
    Skills,
    ProjectsSection,
    SideProjectsSection,
    ContactSection,
  ],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  email: resendAdapter({
    defaultFromAddress: process.env.EMAIL_FROM!,
    defaultFromName: process.env.EMAIL_FROM_NAME!,
    apiKey: process.env.RESEND_API_KEY!,
  }),
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
