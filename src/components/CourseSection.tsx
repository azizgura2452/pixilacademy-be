import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import CourseCard from './CourseCard';
import { Course } from '@/payload-types';

interface CoursesListProps {
  title?: string;
  heading?: string;
  description?: string;
  courses?: Course[];
}

const SectionWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 10),
  backgroundColor: '#E8F1FF',
}));

const ScrollContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',  // Ensure items are laid out horizontally
  overflowX: 'auto',
  gap: theme.spacing(2), // Adds spacing between the items
  paddingBottom: theme.spacing(2),
  scrollSnapType: 'x mandatory',  // Ensures snapping behavior
  '&::-webkit-scrollbar': {
    display: 'none', // Hides the scrollbar for a clean look
  },
}));

const CourseSection: React.FC<CoursesListProps> = ({ title, heading, description, courses = [] }) => {
  const displayCourses = courses.length > 0 ? courses : [];

  return (
    <SectionWrapper>
      <Typography variant="subtitle1" component="h2" sx={{ fontWeight: 600, mb: 1, color: '#23A6F0', fontSize: '16px' }}>
        {title}
      </Typography>
      <Typography variant="h4" component="h3" sx={{ fontWeight: 700, mb: 1, color: '#1a1a2e' }}>
        {heading || "Why you should join this?"}
      </Typography>
      <Typography variant="caption" component="p" sx={{ fontWeight: 400, mb: 4, color: '#737373', width: '40%' }}>
        {description || ""}
      </Typography>

      <ScrollContainer>
        {displayCourses.map((course) => (
          <Box key={course.id} sx={{ flex: '0 0 auto', scrollSnapAlign: 'start' }}>
            <CourseCard course={course} />
          </Box>
        ))}
      </ScrollContainer>
    </SectionWrapper>
  );
};

export default CourseSection;
