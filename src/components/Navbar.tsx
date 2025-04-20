'use client'
import React, { useEffect, useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  styled,
  MenuItem,
  Select,
  FormControl,
  useTheme,
  SelectChangeEvent,
} from '@mui/material'
import Link from 'next/link'
import { getGlobalsSettings } from '@/utils/api'
import { getMockWeather } from '@/utils/mockWeather'
import { SiteSetting } from '@/payload-types'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import LocationOnIcon from '@mui/icons-material/LocationOn'

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#A1C0F1',
  boxShadow: 'none',
  color: '#1a1a2e',
  position: 'relative',
})

const BrandTypography = styled(Typography)({
  fontWeight: 700,
  fontSize: '1.5rem',
  color: '#1a1a2e',
  cursor: 'pointer',
})

const Navbar: React.FC = () => {
  const theme = useTheme()
  const [siteSettings, setSiteSettings] = useState<SiteSetting>()
  const [locale, setLocale] = useState<string>('en')
  const [weather, setWeather] = useState<{ temp: number; condition: string } | null>(null)
  const [location, setLocation] = useState<{ city: string; country: string } | null>(null)
  const [geoError, setGeoError] = useState<string | null>(null)
  const [geoLoading, setGeoLoading] = useState(false)

  useEffect(() => {
    const savedLocale =
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('locale='))
        ?.split('=')[1] || 'en'
    setLocale(savedLocale)

    getGlobalsSettings().then((res) => {
      setSiteSettings(res.siteSettings)
    })

    getMockWeather().then(setWeather)
    fetchUserLocation()
  }, [])

  const fetchUserLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation not supported')
      return
    }

    setGeoLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
          )
          const data = await response.json()

          setLocation({
            city: data.city || data.locality,
            country: data.countryName,
          })
        } catch (err) {
          console.log(err)
          setGeoError('Could not fetch location details')
        } finally {
          setGeoLoading(false)
        }
      },
      (error) => {
        setGeoError(error.message)
        setGeoLoading(false)
        fetchIPBasedLocation()
      },
    )
  }

  const fetchIPBasedLocation = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/')
      const data = await response.json()
      setLocation({
        city: data.city,
        country: data.country_name,
      })
    } catch (err) {
      console.error('IP-based location failed:', err)
    } finally {
      setGeoLoading(false)
    }
  }

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const selectedLocale = event.target.value as string
    setLocale(selectedLocale)
    if (typeof window !== 'undefined') {
      document.cookie = `locale=${selectedLocale}; path=/; max-age=${60 * 60 * 24 * 365}`
      window.location.reload()
    }
  }

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

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {geoLoading ? (
              <Typography variant="caption" sx={{ fontWeight: 500 }}>
                Finding your location..
              </Typography>
            ) : location ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOnIcon
                  fontSize="small"
                  sx={{ mr: 0.5, color: theme.palette.error.dark }}
                />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {location.city}, {location.country}
                </Typography>
              </Box>
            ) : (
              geoError && (
                <Typography variant="body2" color="error">
                  Location unavailable
                </Typography>
              )
            )}

            {weather && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WbSunnyIcon fontSize="small" sx={{ mr: 0.5, color: '#fff917' }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {weather.temp}°C, {weather.condition}
                </Typography>
              </Box>
            )}

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
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  )
}

export default Navbar
