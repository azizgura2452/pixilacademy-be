import React from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Button,
  styled,
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { Favorite, ShoppingCart, Visibility } from '@mui/icons-material'
import Link from 'next/link'
import { getImageSrc } from '@/utils/common'

interface Image {
  url: string
}

interface Course {
  id: string
  title: string
  category?: string
  description?: string
  thumbnail?: Image
  duration: string
  level: string
  price: number
  sale_price?: number
  isNew?: boolean
  slug: string
}

interface CourseCardProps {
  course: Course
}

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  overflow: 'visible',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  height: '300px',
  display: 'flex',
  flexDirection: 'column',
}))

const CourseMediaWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: `${theme.spacing(1)} ${theme.spacing(1)} 0 0`,
}))

const StatusChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  fontWeight: 600,
}))

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <StyledCard sx={{ display: 'flex', flexDirection: 'row', minHeight: 200 }}>
      {/* LEFT: Image */}
      <CourseMediaWrapper sx={{ position: 'relative', width: 240 }}>
        <CardMedia
          component="img"
          image={getImageSrc(course.thumbnail?.url || '/assets/placeholder.webp')}
          alt={course.title}
          sx={{ height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />

        {/* Floating Icons */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 60,
            display: 'flex',
            flexDirection: 'row',
            gap: 1,
          }}
        >
          <IconButton sx={{ bgcolor: '#fff', boxShadow: 1 }} size="small">
            <Favorite fontSize="small" color="error" />
          </IconButton>
          <IconButton sx={{ bgcolor: '#fff', boxShadow: 1 }} size="small">
            <ShoppingCart fontSize="small" color="primary" />
          </IconButton>
          <IconButton sx={{ bgcolor: '#fff', boxShadow: 1 }} size="small">
            <Visibility fontSize="small" color="action" />
          </IconButton>
        </Box>

        {course.sale_price && <StatusChip label="SALE" size="small" color="error" />}
      </CourseMediaWrapper>

      {/* RIGHT: Content */}
      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          py: 2,
        }}
      >
        <Box>
          <Box
            display={'flex'}
            flexDirection="row"
            justifyContent={'space-between'}
            alignItems={'flex-start'}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: '0.8rem',
                mb: 1,
                textTransform: 'capitalize',
                color: '#23A6F0',
              }}
            >
              {course.category}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <StarIcon sx={{ color: '#FFCE31', fontSize: '1rem', mr: 0.5 }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                4.9
              </Typography>
            </Box>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem', mb: 1 }}>
            {course.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: 400, fontSize: '14px', mb: 1, maxWidth: 200 }}
          >
            {(course.description as string)?.substring(0, 130)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon sx={{ color: '#666', fontSize: '1rem', mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {course.duration}
            </Typography>
          </Box>
          <Typography
            variant="caption"
            sx={{
              bgcolor: '#f0f0f0',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            {course.level}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            {course.sale_price ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="h4"
                  sx={{ textDecoration: 'line-through', color: '#999', fontSize: '20px' }}
                >
                  ${course.price}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: '#40BB15', ml: 1, fontSize: '20px' }}
                >
                  ${course.sale_price}
                </Typography>
              </Box>
            ) : (
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#1a1a2e' }}>
                ${course.price}
              </Typography>
            )}
          </Box>
          <Link href={`/courses/${course.slug}`} style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              size="small"
              sx={{
                borderRadius: 4,
                fontWeight: 600,
                px: 2,
                textTransform: 'none',
              }}
            >
              Learn More
            </Button>
          </Link>
        </Box>
      </CardContent>
    </StyledCard>
  )
}

export default CourseCard
