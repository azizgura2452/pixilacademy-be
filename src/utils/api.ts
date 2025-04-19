'use client';

export const API_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000';

const fetchFromPayload = async (path: string) => {
  try {
    const res = await fetch(`${API_URL}/api/${path}`, {
      cache: 'no-store', // SSR safe
    });
    if (!res.ok) throw new Error(`Failed to fetch: ${path}`);
    return res.json();
  } catch (error) {
    console.error(`Payload fetch error at ${path}:`, error);
    return null;
  }
};

export const getGlobals = async () => {
  const locale = typeof window !== 'undefined' ? localStorage.getItem("locale") || "en" : "en";
  const hero = await fetchFromPayload('globals/hero-section?depth=1&draft=false&locale='+locale);
  const whyJoin = await fetchFromPayload('globals/why-join?depth=1&draft=false&locale='+locale);
  const coursesSection = await fetchFromPayload('globals/courses-section?depth=1&draft=false&locale='+locale);
  const siteSettings = await fetchFromPayload('globals/site-settings?depth=1&draft=false&locale='+locale);
  return {
    hero,
    whyJoin,
    coursesSection,
    siteSettings
  };
};

export const getGlobalsSettings = async () => {
  const locale = typeof window !== 'undefined' ? localStorage.getItem("locale") || "en" : "en";
    const siteSettings = await fetchFromPayload('globals/site-settings?depth=1&draft=false&locale='+locale);
    return {
      siteSettings
    };
  };

export const getCourses = async () => {
  const locale = typeof window !== 'undefined' ? localStorage.getItem("locale") || "en" : "en";
  const data = await fetchFromPayload('courses?where[published][equals]=true&locale='+locale);
  return data?.docs || [];
};
