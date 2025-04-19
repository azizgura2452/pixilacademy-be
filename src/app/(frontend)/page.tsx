'use client';

import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import HeroSection from '@/components/HeroSection';
import { getCourses, getGlobals } from '@/utils/api';
import WhyJoinSection from '@/components/WhyJoinSection';
import CourseSection from '@/components/CourseSection';
import Image from 'next/image';

const CoursesPage: React.FC = () => {
  const [heroData, setHeroData] = useState([]);
  const [whyJoinData, setWhyJoinData] = useState([]);
  const [courseSectionData, setCourseSectionData] = useState([]);
  const [coursesData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 loader state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const globals = await getGlobals();
        setHeroData(globals.hero || []);
        setWhyJoinData(globals.whyJoin || []);
        setCourseSectionData(globals.coursesSection || []);
        console.log(globals.hero);
        console.log(globals.whyJoin)
        console.log(globals.coursesSection)
      } catch (err) {
        console.error('Failed to fetch globals:', err);
      } finally {
        setLoading(false); // 👈 hide loader after globals are fetched
      }
    };

    fetchData();

    // Courses can load in background
    getCourses().then((res) => setCourseData(res));
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#f5f7ff',
          flexDirection: 'column',
        }}
      >
        <Image
          src="/assets/logo.png"
          alt="Loading"
          width={229}
          height={140}
          style={{
            objectFit: 'contain',
            filter: 'grayscale(100%)',
            animation: 'colorFade 0.5s infinite alternate ease-in-out',
          }}
        />
        <style jsx global>{`
          @keyframes colorFade {
            0% {
              filter: grayscale(100%);
            }
            100% {
              filter: grayscale(0%);
            }
          }
        `}</style>
      </Box>
    );
  }  

  return (
    <Box sx={{ bgcolor: '#f5f7ff' }}>
      <Container maxWidth="xl" sx={{ padding: '0 !important' }}>
        <HeroSection 
          title={heroData.label} 
          heading={heroData.headline}
          subtext={heroData.subtext}
          avatars={heroData.avatars}
        />
        
        <WhyJoinSection 
          title={whyJoinData.title}
          heading={whyJoinData.heading}
          description={whyJoinData.description}
          features={whyJoinData.features}
        />
        
        <CourseSection 
          title={courseSectionData.title}
          heading={courseSectionData.heading}
          description={courseSectionData.description}
          courses={coursesData}
        />
      </Container>
    </Box>
  );
};

export default CoursesPage;
