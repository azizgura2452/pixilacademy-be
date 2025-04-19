// globals/CoursesSection.ts
import type { GlobalConfig } from 'payload';

export const CoursesSection: GlobalConfig = {
  slug: 'courses-section',
  admin: {
    hidden: ({ user }) => user?.role !== 'admin',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'editor',
  },
  fields: [
    {
    name: 'title',
    type: 'text',
    required: true,
    localized: true,
    },
    {
        name: 'heading',
        type: 'text',
        required: true,
        localized: true,
    },
    {
    name: 'description',
    type: 'textarea',
    localized: true,
    },
  ],
};
