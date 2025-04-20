import { Box, Typography, Chip, Button, Divider } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import StarIcon from '@mui/icons-material/Star'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import { getImageSrc } from '@/utils/common'
import { SerializedEditorState, SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'

interface Course {
  id: string
  title: string
  slug: string
  category?: string
  description?: SerializedEditorState | string
  thumbnail?: {
    url: string
  }
  duration: string
  level: string
  price: number
  sale_price?: number
  isNew?: boolean
}

const API_URL = process.env.API_URL!

export async function generateStaticParams() {
  const res = await fetch(`${API_URL}/api/courses`)
  const json = await res.json()

  return (
    json?.docs?.map((course: Course) => ({
      slug: course.slug,
    })) || []
  )
}

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const cookieStore = cookies()
  const locale = cookieStore.get('locale')?.value || 'en'
  const paramSlug = await params

  const res = await fetch(
    `${API_URL}/api/courses?where[slug][equals]=${paramSlug.slug}&locale=${locale}`,
    { cache: 'no-store' },
  )
  const json = await res.json()

  const course: Course | null = json?.docs?.[0] || null

  if (!course) {
    notFound()
  }

  const description =
    typeof course.description === 'string'
      ? (JSON.parse(course.description) as SerializedEditorState)
      : course.description

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 4, p: { xs: 2, sm: 3 } }}>
      {/* Course Image */}
      <Box sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 3 }}>
        <Image
          src={getImageSrc(course?.thumbnail?.url as string)}
          alt={course.title}
          width={1000}
          height={320}
          style={{ width: '100%', height: '320px', objectFit: 'cover', objectPosition: 'center' }}
        />
      </Box>

      {/* Course Info */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h3" fontWeight={700} sx={{ color: '#111827', mb: 2 }}>
          {course.title}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          <Chip
            label={course.category}
            color="primary"
            size="small"
            sx={{ textTransform: 'capitalize' }}
          />
          <Chip
            label={course.level}
            variant="outlined"
            size="small"
            sx={{ textTransform: 'capitalize' }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, color: '#555' }} />
            <Typography variant="body2" color="#555">
              {course.duration}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <StarIcon sx={{ color: '#FFCE31', fontSize: '1rem', mr: 0.5 }} />
            <Typography variant="body2" fontWeight={600} color="#555">
              4.9
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Rich Description */}
        <Box
          sx={{
            color: '#333',
            lineHeight: 1.7,
            fontSize: '1rem',
            '& *': { fontFamily: 'inherit !important' },
          }}
        >
          <RichText
            data={course?.description as unknown as SerializedEditorState<SerializedLexicalNode>}
          />
        </Box>

        {/* Pricing + CTA */}
        <Box sx={{ mt: 5, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={700} sx={{ color: '#1F2937', mb: 1 }}>
            {course.sale_price ? (
              <>
                <span style={{ textDecoration: 'line-through', color: '#888', marginRight: 12 }}>
                  ${course.price}
                </span>
                <span style={{ color: '#10B981' }}>${course.sale_price}</span>
              </>
            ) : (
              <>${course.price}</>
            )}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              mt: 3,
              px: 5,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: 3,
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              textTransform: 'none',
            }}
          >
            Enroll Now
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
