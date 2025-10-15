import { revalidateTag } from 'next/cache'
import type { GlobalAfterChangeHook, GlobalConfig } from 'payload'

const revalidateContactSection: GlobalAfterChangeHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidateTag('global_contactSection')
  }
  return doc
}

export const ContactSection: GlobalConfig = {
  slug: 'contactSection',
  label: 'Contact Section',
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
      defaultValue: 'Get in Touch',
      admin: {
        description: 'Main title for the contact section',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Contact Description',
      required: true,
      admin: {
        description: 'Description text with contact instructions and social links',
      },
    },
    {
      name: 'badgeText',
      type: 'text',
      label: 'Badge Text',
      defaultValue: 'Contact',
      admin: {
        description: 'Text displayed in the small badge above the title',
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      fields: [
        {
          name: 'platform',
          type: 'text',
          label: 'Platform Name',
          required: true,
          admin: {
            description: 'e.g., "Twitter", "LinkedIn", "GitHub"',
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'Profile URL',
          required: true,
        },
        {
          name: 'username',
          type: 'text',
          label: 'Username/Handle',
          admin: {
            description: 'e.g., "@username" or "username"',
          },
        },
        {
          name: 'isPrimary',
          type: 'checkbox',
          label: 'Primary Contact Method',
          admin: {
            description: 'Mark as the main contact method (e.g., for "shoot me a dm" text)',
          },
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'email',
      type: 'group',
      label: 'Email Contact',
      fields: [
        {
          name: 'address',
          type: 'email',
          label: 'Email Address',
          admin: {
            description: 'Your contact email address',
          },
        },
        {
          name: 'showEmail',
          type: 'checkbox',
          label: 'Show Email on Contact Section',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'callToAction',
      type: 'group',
      label: 'Call to Action',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'CTA Text',
          defaultValue: 'Want to chat? Just shoot me a dm',
          admin: {
            description: 'Main call-to-action text',
          },
        },
        {
          name: 'linkText',
          type: 'text',
          label: 'Link Text',
          defaultValue: 'with a direct question on twitter',
          admin: {
            description: 'Text for the clickable link',
          },
        },
        {
          name: 'disclaimer',
          type: 'text',
          label: 'Disclaimer Text',
          defaultValue: "and I'll respond whenever I can. I will ignore all soliciting.",
          admin: {
            description: 'Additional text after the link',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateContactSection],
  },
}
