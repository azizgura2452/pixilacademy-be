'use client'

export const API_URL = process.env.API_URL

// Utility to get locale from cookies
const getLocale = (): string => {
  if (typeof window !== 'undefined') {
    const match = document.cookie.match(/(?:^|; )locale=([^;]*)/)
    return match ? decodeURIComponent(match[1]) : 'en'
  }

  // Default fallback on server
  return 'en'
}

const fetchFromPayload = async (path: string) => {
  try {
    const res = await fetch(`${API_URL}/api/${path}`, {
      cache: 'no-store',
    })
    if (!res.ok) throw new Error(`Failed to fetch: ${path}`)
    return res.json()
  } catch (error) {
    console.error(`Payload fetch error at ${path}:`, error)
    return null
  }
}

export const getGlobals = async () => {
  const locale = getLocale()
  const hero = await fetchFromPayload(`globals/hero-section?depth=1&draft=false&locale=${locale}`)
  const whyJoin = await fetchFromPayload(`globals/why-join?depth=1&draft=false&locale=${locale}`)
  const coursesSection = await fetchFromPayload(
    `globals/courses-section?depth=1&draft=false&locale=${locale}`,
  )
  const siteSettings = await fetchFromPayload(
    `globals/site-settings?depth=1&draft=false&locale=${locale}`,
  )
  return {
    hero,
    whyJoin,
    coursesSection,
    siteSettings,
  }
}

export const getGlobalsSettings = async () => {
  const locale = getLocale()
  const siteSettings = await fetchFromPayload(
    `globals/site-settings?depth=1&draft=false&locale=${locale}`,
  )
  return { siteSettings }
}

export const getCourses = async () => {
  const locale = getLocale()
  const data = await fetchFromPayload(`courses?where[published][equals]=true&locale=${locale}`)
  return data?.docs || []
}
