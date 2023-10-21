'use client'

import {Hero} from '@/components/marketing/Hero'
import {TopNavigation} from '@/components/marketing/TopNavigation'

export default function Home() {
  return (
    <>
      <TopNavigation />
      <Hero />
      <div
        className="
bg-gradient-to-r from-blue-50
h-[2000px]
      "
      ></div>
    </>
  )
}
