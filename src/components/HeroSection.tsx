import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import OrbitBackground from './OrbitBackground';

interface Profile {
  id: string;
  image: {
    url: string;
  };
  position: {
    x: number;
    y: number;
  };
  size?: number;
  animate?: boolean;
}

interface HeroSectionProps {
  title?: string;
  heading?: string;
  subtext?: string;
  avatars?: Profile[];
}

const HeroWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 10),
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  minHeight: 300,
  backgroundColor: '#E8F1FF',
  width: '100%',
  direction: 'ltr', // Default direction, can be dynamically changed
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  maxWidth: '50%',
}));

const OnlineIndicator = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '30%',
  left: '60%',
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: '#ff5555',
}));

// Keyframes for animation (float and pulse)
const float = `
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

const pulse = `
  @keyframes pulse {
    0% {
      transform: scale(1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    50% {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  }
`;

const ProfileBubble = styled(Box, {
  shouldForwardProp: (prop) =>
    !['top', 'left', 'bubbleSize', 'animate', 'animationType', 'delay'].includes(prop as string),
})<{
  top: number;
  left: number;
  bubbleSize: number;
  animate: boolean;
  animationType: 'float' | 'pulse';
  delay: number;
}>(({ theme, top, left, bubbleSize, animate, animationType, delay }) => ({
  position: 'absolute',
  top: `${top}%`,
  left: `${left}%`,
  right: left ? 'auto' : 'unset', // Flip right and left depending on direction
  width: `${bubbleSize}px`,
  height: `${bubbleSize}px`,
  borderRadius: '50%',
  overflow: 'hidden',
  border: '2px solid white',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  zIndex: 3,
  animation: animate
    ? `${animationType === 'float' ? 'float' : 'pulse'} ${animationType === 'float' ? 3 : 2}s ease-in-out ${delay}s infinite`
    : 'none',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

const HeroSection: React.FC<HeroSectionProps> = ({ title, heading, subtext, avatars = [] }) => {
  const getAnimationType = () => (Math.random() > 0.5 ? 'float' : 'pulse');
  const getAnimationDelay = () => Math.random() * 2; // 0-2 second delay

  const defaultProfiles = [
    { id: '1', position: { x: 65, y: 30 }, size: 40 },
    { id: '2', position: { x: 75, y: 20 }, size: 36 },
    { id: '3', position: { x: 60, y: 50 }, size: 44 },
    { id: '4', position: { x: 80, y: 40 }, size: 38 },
    { id: '5', position: { x: 70, y: 60 }, size: 40 },
  ];

  const isRtl = document.documentElement.getAttribute('dir') === 'rtl';

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
          }}
        >
          {heading || 'Highly Distinguished Courses'}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#666',
            mb: 4,
            maxWidth: '80%',
          }}
        >
          {subtext || 'Explore top courses from world-class instructors but things on a cool scale'}
        </Typography>
      </ContentWrapper>

      {/* Profile bubbles */}
      <OnlineIndicator />
      {avatars.length > 0
        ? avatars.map((avatar, index) => (
            <ProfileBubble
              key={avatar.id || index}
              top={avatar.position?.y || 20 + index * 15}
              left={isRtl ? 100 - (avatar.position?.x || 60 + index * 5) : avatar.position?.x || 60 + index * 5}
              bubbleSize={avatar.size || 40}
              animate={avatar.animate !== undefined ? avatar.animate : true}
              animationType={getAnimationType()}
              delay={getAnimationDelay()}
            >
              <img src={avatar.image?.url || `/api/placeholder/40/40`} alt="Student profile" />
            </ProfileBubble>
          ))
        : defaultProfiles.map((avatar, index) => (
            <ProfileBubble
              key={avatar.id || index}
              top={avatar.position?.y || 20 + index * 15}
              left={isRtl ? 100 - (avatar.position?.x || 60 + index * 5) : avatar.position?.x || 60 + index * 5}
              bubbleSize={avatar.size || 40}
              animate={true}
              animationType={getAnimationType()}
              delay={getAnimationDelay()}
            >
              <img src={`/api/placeholder/40/40`} alt="Student profile" />
            </ProfileBubble>
          ))}
    </HeroWrapper>
  );
};

export default HeroSection;
