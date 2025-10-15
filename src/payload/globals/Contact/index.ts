import type { GlobalConfig } from 'payload'

export const ContactGlobal: GlobalConfig = {
  slug: 'contact-global',
  label: 'Contact Global',
  admin: {
    group: 'Contact',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroImage',
      type: 'upload',
      label: 'Hero Background Image',
      relationTo: 'media',
      required: true,
    },
  ],
}
