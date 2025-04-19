import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    hidden: ({ user }) => user?.role !== 'admin',
  },
  auth: true,
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      // Only allow Admins and Editors to upload media
      return user?.role === 'admin';
    },
    update: ({ req: { user } }) => {
      // Only allow Admins and Editors to update media
      return user?.role === 'admin';
    },
    delete: ({ req: { user } }) => {
      // Only allow Admins to delete media
      return user?.role === 'admin';
    },
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'password',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'role',
      type: 'select',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
      ],
      defaultValue: 'editor',
      required: true,
    },
  ],
}
