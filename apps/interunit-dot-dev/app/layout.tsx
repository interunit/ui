import {Inter} from 'next/font/google'

import {InterUnitProvider} from '@/components/utility/InterUnitProvider'
import './globals.css'


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata = {
  title: 'InterUnit',
  description: 'InterUnit is a design system for web and native platforms.'
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
          <InterUnitProvider>
          {children}
          </InterUnitProvider>
      </body>
    </html>
  )
}
