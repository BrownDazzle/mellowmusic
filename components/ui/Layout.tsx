import React from 'react';
import Head from 'next/head';
import Header from "@/components/shared/Header"
import Footer from "@/components/ui/Footer"

const Layout = ({ children }: any) => {
  return (
    <div className="layout">
      <Head>
        <title>IkuVibe Music</title>
      </Head>
      <header>
        <Header />
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout