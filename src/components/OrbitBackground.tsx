// components/courses/OrbitBackground.tsx
import React from 'react';
import { Box, styled } from '@mui/material';
import { Profile } from './HeroSection';

interface OrbitBackgroundProps {
  color?: string;
  avatars: Profile[]; // Pass avatars as a prop
}

const OrbitContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  width: '50%',
  height: '100%',
  overflow: 'hidden',
  pointerEvents: 'none', // Allows clicking through the orbits
  zIndex: 0,
}));

const Orbit = styled(Box)<{ size: number; speed: number; opacity: number; delay: number }>(
  ({ theme, size, speed, opacity, delay }) => ({
    position: 'absolute',
    top: '50%',
    right: '10%',
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    border: '1px solid rgba(66, 133, 244, 0.3)',
    transform: 'translate(50%, -50%)',
    opacity,
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: `orbit ${speed}s linear infinite ${delay}s`,
    },
    '@keyframes orbit': {
      '0%': {
        transform: 'rotate(0deg)',
      },
      '100%': {
        transform: 'rotate(360deg)',
      },
    },
  })
);

const OrbitDot = styled(Box)<{
  size: number;
  orbitSize: number;
  position: number;
  speed: number;
  delay: number;
}>(({ theme, size, orbitSize, position, speed, delay }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: `${size}px`,
  height: `${size}px`,
  marginLeft: `-${size / 2}px`,
  marginTop: `-${size / 2}px`,
  backgroundColor: 'transparent', // We are using the avatar, so no background color here
  transformOrigin: 'center center',
  animation: `orbitDot ${speed}s linear infinite ${delay}s`,
  '@keyframes orbitDot': {
    '0%': {
      transform: `rotate(${position}deg) translateX(${orbitSize / 2}px) rotate(-${position}deg)`,
    },
    '100%': {
      transform: `rotate(${position + 360}deg) translateX(${orbitSize / 2}px) rotate(-${position + 360}deg)`,
    },
  },
}));

const OrbitBackground: React.FC<OrbitBackgroundProps> = ({ color = '#ff5555', avatars }) => {
  // Define orbit properties
  const orbits = [
    { size: 400, speed: 120, opacity: 0.15, delay: 0, dots: 2 },
    { size: 300, speed: 100, opacity: 0.2, delay: 2, dots: 3 },
    { size: 200, speed: 80, opacity: 0.25, delay: 4, dots: 1 },
  ];

  // Generate random positions for dots
  const generatePositions = (count: number) => {
    const positions = [];
    const angleStep = 360 / count;

    for (let i = 0; i < count; i++) {
      // Create some randomness in the starting position
      const baseAngle = i * angleStep;
      const randomOffset = Math.random() * 60 - 30; // -30 to +30 degrees
      positions.push(baseAngle + randomOffset);
    }

    return positions;
  };

  return (
    <OrbitContainer>
      {orbits.map((orbit, index) => {
        const positions = generatePositions(orbit.dots);

        return (
          <Orbit
            key={`orbit-${index}`}
            size={orbit.size}
            speed={orbit.speed}
            opacity={orbit.opacity}
            delay={orbit.delay}
          >
            {positions.map((position, dotIndex) => {
              const avatar = avatars[dotIndex]; // Get corresponding avatar for the position
              return (
                <OrbitDot
                  key={`dot-${index}-${dotIndex}`}
                  size={avatar?.size || 40}
                  orbitSize={orbit.size}
                  position={position}
                  speed={orbit.speed}
                  delay={orbit.delay}
                >
                  <img
                    src={avatar?.image?.url || '/api/placeholder/40/40'}
                    alt="Avatar"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%',
                    }}
                  />
                </OrbitDot>
              );
            })}
          </Orbit>
        );
      })}
    </OrbitContainer>
  );
};

export default OrbitBackground;
