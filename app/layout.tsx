import React from 'react'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'IkuVibes Music',
  description: 'IkuVibes is a platform for free music and video streaming and downloads.',
  /*icons: {
    icon: '/assets/images/logo.svg'
  }*/
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.variable}>{children}</body>
    </html>
  )
}
