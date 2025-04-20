const PLACEHOLDER_IMAGE = '/assets/placeholder.webp'
const API_URL = process.env.API_URL

export const getImageSrc = (url: string) => {
  if (!url || typeof url !== 'string') return PLACEHOLDER_IMAGE

  if (url && typeof url === 'string') {
    // Check if it's already a full URL
    return url.startsWith('http') ? url : `${API_URL}${url}`
  }

  return PLACEHOLDER_IMAGE
}
