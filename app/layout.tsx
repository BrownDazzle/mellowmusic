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
  icons: {
    icon: "/iku_logo.png"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7793275307187854"
          crossOrigin="anonymous"></script>
      </head>
      <body className={poppins.variable}>{children}</body>
    </html>
  )
}
