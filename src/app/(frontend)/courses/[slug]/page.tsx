import { Box, Typography, Chip, Button, Divider } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import Image from 'next/image';
import { API_URL } from '@/utils/api';

interface Course {
  id: string;
  title: string;
  category?: string;
  description?: string;
  thumbnail?: {
    url: string;
  };
  duration: string;
  level: string;
  price: number;
  sale_price?: number;
  isNew?: boolean;
}

async function getCourseBySlug(slug: string): Promise<Course | null> {
  const res = await fetch(
    `${API_URL}/api/courses?where[slug][equals]=${slug}`,
    { next: { revalidate: 60 } } // caching optional
  );

  const json = await res.json();
  return json?.docs?.[0] || null;
}

interface CourseDetailPageProps {
  params: {
    slug: string;
  }
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const course = await getCourseBySlug(params.slug);

  if (!course) {
    return <Typography>Course not found.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4, p: 2 }}>
      <Box sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 2 }}>
        <Image
          src={course.thumbnail?.url || '/api/placeholder/800/400'}
          alt={course.title}
          width={800}
          height={400}
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" fontWeight={700} sx={{ color: '#000000' }}>
          {course.title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 2 }}>
          <Chip label={course.category} color="primary" size="small" sx={{ textTransform: 'capitalize' }} />
          <Chip label={course.level} variant="outlined" size="small" sx={{ textTransform: 'capitalize' }} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, color: '#000000' }} />
            <Typography variant="body2" sx={{ color: '#000000' }}>{course.duration}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <StarIcon sx={{ color: '#FFCE31', fontSize: '1rem', mr: 0.5 }} />
            <Typography variant="body2" fontWeight={600} sx={{ color: '#000000' }}>4.9</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1" sx={{ color: '#444' }}>
          {course.description}
        </Typography>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            {course.sale_price ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ textDecoration: 'line-through', color: '#888', mr: 1 }}>
                  ${course.price}
                </Typography>
                <Typography variant="h6" sx={{ color: '#40BB15' }}>
                  ${course.sale_price}
                </Typography>
              </Box>
            ) : (
              <Typography variant="h6" sx={{ color: '#1a1a2e' }}>
                ${course.price}
              </Typography>
            )}
          </Box>

          <Button variant="contained" color="primary" sx={{ borderRadius: 2, px: 3 }}>
            Enroll Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
