import {InterUnitProvider} from '@/components/utility/InterUnitProvider'
import {inter} from '@/fonts'

import './globals.css'

export const metadata = {
  title: 'InterUnit',
  description: 'InterUnit is a design system for web and native platforms.'
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <InterUnitProvider>{children}</InterUnitProvider>
      </body>
    </html>
  )
}
