"use client"

import Image from "next/image"
import Link from "next/link"

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/apple.svg" alt="logo" width={44} height={15} />
          <p className='text-1xl text-semibold text-black'>IkuVibes</p>
        </Link>

        {/*
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems />
          </nav>
*/}


      </div>
    </header>
  )
}

export default Header