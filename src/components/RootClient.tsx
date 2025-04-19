'use client'
import type { Metadata } from 'next'
import Navbar from './Navbar';

export const metadata: Metadata = {
  title: 'Payload Blank Template',
  description: 'A blank template using Payload in a Next.js app.',
}

export default function RootClient({ children }: { children: React.ReactNode }) {
    const locale = typeof window !== 'undefined' ? localStorage.getItem('locale') || 'en' : "en";

    return (
        <body style={{background: "#f1f1f1"}} dir={locale === "ar" ? 'rtl': 'ltr'}>
          <Navbar />
          <main style={{background: "#f1f1f1"}}>{children}</main>
        </body>
  )
}
