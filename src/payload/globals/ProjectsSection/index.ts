import { revalidateTag } from 'next/cache'
import type { GlobalAfterChangeHook, GlobalConfig } from 'payload'

const revalidateProjectsSection: GlobalAfterChangeHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidateTag('global_projectsSection')
  }
  return doc
}

export const ProjectsSection: GlobalConfig = {
  slug: 'projectsSection',
  label: 'Projects Section',
  admin: {
    group: 'Homepage Sections',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'My Projects',
      admin: {
        description: 'Main title for the projects section',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      defaultValue: 'Check out my latest work',
      admin: {
        description: 'Subtitle displayed below the main title',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Section Description',
      defaultValue:
        "I've worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites.",
      admin: {
        description: 'Description text for the projects section',
      },
    },
    {
      name: 'badgeText',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'My Projects',
      admin: {
        description: 'Text displayed in the small badge above the title',
      },
    },
    {
      name: 'featuredProjects',
      type: 'relationship',
      label: 'Featured Projects',
      relationTo: 'projects',
      hasMany: true,
      admin: {
        description: 'Select projects to feature on the homepage',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateProjectsSection],
  },
}
