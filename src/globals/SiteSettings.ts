import { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
    slug: 'site-settings',
    label: 'Site Settings',
    admin: {
      hidden: ({ user }) => user?.role !== 'admin',
    },
    access: {
        read: () => true,
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    fields: [
      {
        name: 'brandName',
        type: 'text',
        required: true,
        localized: true,
      },
      {
        name: 'loader_image',
        type: 'upload',
        relationTo: 'media',
        label: 'Loader Image'
      },
    ],
  }
  