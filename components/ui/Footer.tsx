import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="flexCenter mb-24 px-10">
      <div className="padding-container max-container flex w-full flex-col gap-14 pb-5">
        <div className="flex flex-col items-start justify-center gap-[10%] md:flex-row">
          <Link href="/" className="flex items-center">
            <Image src="/iku_logo.png" alt="logo" width={64} height={20} />
            <p className='text-1xl text-semibold text-black'>IkuVibes</p>
          </Link>


          <div className='flex flex-wrap gap-5 sm:justify-between md:flex-1'>
            {FOOTER_LINKS.map((columns) => (
              <FooterColumn title={columns.title} key={columns.title}>
                <ul className="regular-14 flex flex-col gap-4 text-slate-700 text-sm text-bold">
                  {columns.links.map((link) => (
                    <Link href={link.href} key={link.value}>
                      {link.value}
                    </Link>
                  ))}
                </ul>
              </FooterColumn>
            ))}

            <div className="flex flex-col gap-5">
              <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                {FOOTER_CONTACT_INFO.links.map((link) => (
                  <Link
                    href="/"
                    key={link.label}
                    className="flex gap-4 md:flex-col lg:flex-row"
                  >
                    {/*<p className="whitespace-nowrap">
                      {link.label}:
                </p>*/}
                    <p className="medium-14 whitespace-nowrap text-slate-700 text-sm text-bold">
                      {link.value}
                    </p>
                  </Link>
                ))}
              </FooterColumn>
            </div>

            <div className="flex flex-col gap-5">

              <ul className="regular-14 flex gap-4 text-slate-700">
                {SOCIALS.links.map((link, i) => (
                  <Link href="/" key={i}>
                    <Image src={link.icon} alt="logo" width={24} height={24} />
                  </Link>
                ))}
              </ul>

            </div>
          </div>
        </div>

        <div className="border bg-gray-20" />
        <Link href="https://actscloudinc.com" target='_blank'>
          <p className="regular-14 w-full text-center text-slate-700"><strong className='text-semibold text-1xl'> ActsCloud Inc. </strong>| &copy;2024 All rights reserved</p>
        </Link>
      </div>
    </footer>
  )
}

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
}

const FooterColumn = ({ title, children }: FooterColumnProps) => {
  return (
    <div className="flex flex-col gap-5 mt-5 bottom-0">
      <p className={cn(`font-semibold text-md text-black whitespace-nowrap`)} >{title}</p>
      {children}
    </div>
  )
}

export default Footer