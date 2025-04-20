'use client'
import { useEffect, useState } from 'react'
import type { Metadata } from 'next'
import Navbar from './Navbar'

export const metadata: Metadata = {
  title: 'Pixil Academy',
  description: 'Best online learnign platform in Kuwait',
}

export default function RootClient({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<'en' | 'ar'>('en')

  useEffect(() => {
    const storedLocale =
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('locale='))
        ?.split('=')[1] || 'en'

    setLocale(storedLocale as 'en' | 'ar')
  }, [])

  return (
    <body style={{ background: '#f1f1f1' }} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar />
      <main style={{ background: '#f1f1f1' }}>{children}</main>
    </body>
  )
}
