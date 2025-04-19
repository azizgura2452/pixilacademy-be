'use client'
import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  styled,
  MenuItem,
  Select,
  FormControl
} from '@mui/material';
import Link from 'next/link';
import { getGlobalsSettings } from '@/utils/api';
import { SiteSetting } from '@/payload-types';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#A1C0F1',
  boxShadow: 'none',
  color: '#1a1a2e',
  position: 'relative',
});

const BrandTypography = styled(Typography)({
  fontWeight: 700,
  fontSize: '1.5rem',
  color: '#1a1a2e',
  cursor: 'pointer',
});

const Navbar: React.FC = () => {
  const [siteSettings, setSiteSettings] = useState<SiteSetting>();
  const [locale, setLocale] = useState<string>('en');

  useEffect(() => {
    const savedLocale = typeof window !== 'undefined' ? localStorage.getItem('locale') || 'en' : "en";
    setLocale(savedLocale);

    getGlobalsSettings().then(res => {
      setSiteSettings(res.siteSettings);
    });
  }, []);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocale = event.target.value;
    setLocale(selectedLocale);
    if(typeof window !== 'undefined')
    localStorage.setItem('locale', selectedLocale);
    window.location.reload(); // reload to re-fetch correct locale data
  };

  return (
    <StyledAppBar>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <BrandTypography variant="h6">
                {siteSettings?.brandName || 'Pixil Academy'}
              </BrandTypography>
            </Link>
          </Box>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={locale}
              onChange={handleLanguageChange}
              variant="outlined"
              displayEmpty
              sx={{ bgcolor: 'white' }}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="ar">عربي</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;
