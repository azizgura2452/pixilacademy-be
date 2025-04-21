const PLACEHOLDER_IMAGE = '/assets/placeholder.webp'
const API_URL = process.env.API_URL

export const getImageSrc = (url: string) => {
  if (!url || typeof url !== 'string') return PLACEHOLDER_IMAGE
  // console.log(6, API_URL, url)
  if (url && typeof url === 'string') {
    // Check if it's already a full URL
    // console.log(9, API_URL, url)
    return url.startsWith('http') ? url : `${API_URL}${url}`
  }

  return PLACEHOLDER_IMAGE
}
