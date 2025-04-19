import React from 'react'
import './styles.css'
import Navbar from '@/components/Navbar';
import RootClient from '@/components/RootClient';

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <RootClient>
        {children}
      </RootClient>
    </html>
  )
}
