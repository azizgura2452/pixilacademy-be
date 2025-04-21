import React from 'react'
import { Box, Typography, styled, keyframes } from '@mui/material'
import Image from 'next/image'
import { getImageSrc } from '../utils/common'

interface Profile {
  id: string
  image: {
    url: string
  }
  positionX: number
  positionY: number
  size?: number
  animate?: boolean
}

interface HeroSectionProps {
  title?: string
  heading?: string
  subtext?: string
  avatars?: Profile[]
}

// Animation keyframes
const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`

const HeroWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 10),
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  minHeight: 300,
  backgroundColor: '#E8F1FF',
  width: '100%',
  direction: 'ltr',
}))

const ContentWrapper = styled(Box)(() => ({
  maxWidth: '50%',
}))

const ProfileBubble = styled(Box, {
  shouldForwardProp: (prop) =>
    !['top', 'left', 'bubbleSize', 'animate', 'animationType', 'delay'].includes(prop as string),
})<{
  top: number
  left: number
  bubbleSize: number
  animate: boolean
  animationType: 'float' | 'pulse'
  delay: number
}>(({ top, left, bubbleSize, animate, animationType, delay }) => ({
  position: 'absolute',
  top: `${top}%`,
  left: `${left}%`,
  width: `${bubbleSize}px`,
  height: `${bubbleSize}px`,
  borderRadius: '50%',
  overflow: 'hidden',
  border: '2px solid white',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  zIndex: 3,
  animation: animate
    ? `${animationType === 'float' ? float : pulse} ${animationType === 'float' ? 3 : 2}s ease-in-out ${delay}s infinite`
    : 'none',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}))

const HeroSection: React.FC<HeroSectionProps> = ({ title, heading, subtext, avatars = [] }) => {
  const getAnimationType = () => (Math.random() > 0.5 ? 'float' : 'pulse')
  const getAnimationDelay = () => Math.random() * 2

  const defaultProfiles = [
    { id: '1', position: { x: 65, y: 30 }, size: 40 },
    { id: '2', position: { x: 75, y: 20 }, size: 36 },
    { id: '3', position: { x: 60, y: 50 }, size: 44 },
    { id: '4', position: { x: 80, y: 40 }, size: 38 },
    { id: '5', position: { x: 70, y: 60 }, size: 40 },
  ]

  const isRtl =
    typeof document !== 'undefined' && document?.documentElement?.getAttribute('dir') === 'rtl'

  return (
    <HeroWrapper>
      <ContentWrapper>
        <Typography
          variant="body1"
          sx={{
            color: '#23A6F0',
            fontWeight: 600,
            display: 'block',
            mb: 1,
            fontSize: '16px',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: '#1a1a2e',
            width: '50%',
          }}
        >
          {heading || 'Highly Distinguished Courses'}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#666',
            mb: 4,
          }}
        >
          {subtext || 'Explore top courses from world-class instructors but things on a cool scale'}
        </Typography>
      </ContentWrapper>

      {/* Profile bubbles */}
      {(avatars.length > 0 ? avatars : defaultProfiles).map((avatar, index) => (
        <ProfileBubble
          key={avatar.id || index}
          top={avatar?.positionY || 20 + index * 15}
          left={
            isRtl
              ? 100 - (avatar?.positionX || 50 + index * 5)
              : avatar?.positionX || 50 + index * 8
          }
          bubbleSize={avatar.size || 80}
          animate={true}
          animationType={getAnimationType()}
          delay={getAnimationDelay()}
          sx={{
            display: {
              xs: 'none', // Hide on extra small (phones)
              sm: 'block', // Show from small screens and up
            },
          }}
        >
          <Image
            src={getImageSrc(avatar?.image?.url)}
            alt="Student profile"
            width={avatar.size || 40}
            height={avatar.size || 40}
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement
              target.src = '/assets/placeholder.webp'
            }}
            unoptimized
          />
        </ProfileBubble>
      ))}
    </HeroWrapper>
  )
}

export default HeroSection
