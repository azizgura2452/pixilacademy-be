import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.NODE_ENV === 'production' ? 'https://pixilacademy-be.vercel.app' : 'http://localhost:3000',
  },
  devIndicators: {
    position: 'bottom-right'
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
