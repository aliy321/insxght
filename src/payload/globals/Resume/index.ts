import { revalidateTag } from 'next/cache'
import type { GlobalAfterChangeHook, GlobalConfig } from 'payload'

const revalidateResume: GlobalAfterChangeHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidateTag('global_resume')
  }
  return doc
}

export const Resume: GlobalConfig = {
  slug: 'resume',
  label: 'Resume',
  admin: {
    group: 'Site Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Enable Resume Download',
      defaultValue: true,
      admin: {
        description: 'Show/hide the resume download button in the navigation',
      },
    },
    {
      name: 'resumeFile',
      type: 'upload',
      label: 'Resume PDF File',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Upload your resume as a PDF file',
      },
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
      defaultValue: 'Resume',
      admin: {
        description: 'Text to display on the download button',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateResume],
  },
}
