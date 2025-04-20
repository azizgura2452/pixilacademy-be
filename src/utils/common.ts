export const getImageSrc = (url: string) => {
  return url && url.startsWith('http') ? url : '/assets/placeholder.webp'
}
