// components/courses/JoinReasons.tsx
import React from 'react'
import { Box, Typography, Paper, styled, Grid } from '@mui/material'
import Image from 'next/image'
import { getImageSrc } from '@/utils/common'

interface Feature {
  id: string
  title: string
  description: string
  icon: {
    url: string
  }
}

interface JoinReasonsProps {
  title?: string
  heading?: string
  description?: string
  features?: Feature[]
}

const SectionWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 10),
}))

const ReasonCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6, 4),
  height: '100%',
  borderRadius: theme.spacing(1),
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
  },
}))

const IconBox = styled(Box)(({ theme }) => ({
  width: 72,
  height: 72,
  borderRadius: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  color: 'white',
}))

const WhyJoinSection: React.FC<JoinReasonsProps> = ({
  title,
  heading,
  description,
  features = [],
}) => {
  const displayReasons = features.length > 0 ? features : []

  return (
    <SectionWrapper>
      <Typography
        variant="subtitle1"
        component="h2"
        sx={{
          fontWeight: 600,
          mb: 1,
          color: '#23A6F0',
          fontSize: '16px',
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h4"
        component="h3"
        sx={{
          fontWeight: 700,
          mb: 1,
          color: '#1a1a2e',
        }}
      >
        {heading || 'Why you should join this?'}
      </Typography>
      <Typography
        variant="caption"
        component="p"
        sx={{
          fontWeight: 400,
          mb: 4,
          color: '#737373',
          width: { xs: '100%', md: '40%' },
        }}
      >
        {description || ''}
      </Typography>

      <Grid container spacing={3}>
        {displayReasons.map((reason) => (
          <Grid size={{ xs: 12, sm: 4, md: 4 }} key={reason.id}>
            <ReasonCard>
              <IconBox sx={{ bgcolor: '#23A6F0' }}>
                <Image
                  src={getImageSrc(reason?.icon?.url)}
                  alt={reason.title}
                  width={32}
                  height={32}
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement
                    target.src = '/assets/placeholder.webp'
                  }}
                  style={{ objectFit: 'contain' }}
                  unoptimized
                />
              </IconBox>
              <Typography variant="h6" component="h4" sx={{ fontWeight: 600, mb: 1 }}>
                {reason.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {reason.description}
              </Typography>
            </ReasonCard>
          </Grid>
        ))}
      </Grid>
    </SectionWrapper>
  )
}

export default WhyJoinSection
