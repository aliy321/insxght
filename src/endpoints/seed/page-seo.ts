import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { whitelabel } from '@/config/whitelabel'

export const seedPageSEO = async () => {
  const payload = await getPayload({ config: configPromise })

  try {
    await payload.updateGlobal({
      slug: 'page-seo',
      data: {
        home: {
          title: `${whitelabel.brandName} - Digital Innovation & Product Development`,
          description: whitelabel.brandDescription,
        },
        about: {
          title: `About Us | ${whitelabel.brandName}`,
          description: `Learn about ${whitelabel.brandName}, our mission, and the team behind our digital innovation and product development services.`,
        },
        projects: {
          title: `Our Projects | ${whitelabel.brandName}`,
          description: `Explore our portfolio of successful digital products and innovative solutions delivered by ${whitelabel.brandName}.`,
        },
        blogs: {
          title: `Blog | ${whitelabel.brandName}`,
          description: `Insights, thoughts, and updates from the ${whitelabel.brandName} team on digital innovation, product development, and industry trends.`,
        },
        // posts: {
        //     title: `Posts | ${whitelabel.brandName}`,
        //     description: `Latest articles and insights from ${whitelabel.brandName} on digital innovation, product development, and technology trends.`,
        // },
        contact: {
          title: `Contact Us | ${whitelabel.brandName}`,
          description: `Get in touch with ${whitelabel.brandName}. Let's discuss your digital innovation and product development needs.`,
        },
        // search: {
        //     title: `Search | ${whitelabel.brandName}`,
        //     description: `Search through our content, projects, and insights at ${whitelabel.brandName}.`,
        // },
      },
    })

    console.log('✅ PageSEO global seeded successfully')
  } catch (error) {
    console.error('❌ Error seeding PageSEO global:', error)
  }
}
