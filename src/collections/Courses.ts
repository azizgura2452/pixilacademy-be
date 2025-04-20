import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'editor',
    update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'editor',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      localized: true,
      editor: lexicalEditor({}),
    },
    {
      name: 'price',
      type: 'text',
      required: true,
    },
    {
      name: 'sale_price',
      type: 'text',
      required: false,
      label: 'Sale Price',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'duration',
      type: 'text',
      required: false,
      localized: true,
    },
    {
      name: 'lessons',
      type: 'number',
      required: false,
    },
    {
      name: 'category',
      type: 'select',
      hasMany: false,
      options: [
        { label: 'Frontend', value: 'frontend' },
        { label: 'Backend', value: 'backend' },
        { label: 'Fullstack', value: 'fullstack' },
        { label: 'DevOps', value: 'devops' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'level',
      type: 'select',
      options: [
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
      ],
      required: true,
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  versions: {
    drafts: true,
  },
}
