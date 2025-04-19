import React from 'react'
import './styles.css'
import RootClient from '@/components/RootClient';

export const metadata = {
  description: 'Best online learning platform in Kuwait',
  title: 'Pixil Academy',
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
