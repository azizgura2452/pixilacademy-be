import type { Endpoint } from 'payload'
import type { PayloadRequest } from 'payload'

export const courseBySlugEndpoint: Endpoint = {
  path: '/courses/slug/:slug',
  method: 'get',
  handler: async ({ req, params }) => {
    const payloadReq = req as PayloadRequest // 👈 this gives you `.payload` access

    const slug = params.slug

    const course = await payloadReq.payload.find({
      collection: 'courses',
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    if (!course.docs.length) {
      return new Response(
        JSON.stringify({ message: 'Course not found' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    return new Response(
      JSON.stringify(course.docs[0]),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  },
}
