// globals/HeroSection.ts
import type { GlobalConfig } from 'payload';

export const HeroSection: GlobalConfig = {
  slug: 'hero-section',
  access: {
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'editor',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      localized: true,
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'subtext',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'avatars',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'altText',
          type: 'text',
        },
        {
            name: 'size',
            type: 'number',
          },
      ],
    },
  ],
};
