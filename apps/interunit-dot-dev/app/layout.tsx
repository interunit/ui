import {Inter} from 'next/font/google'

import {InterUnitProvider} from '@/components/utility/InterUnitProvider'
import {StyledComponentsProvider} from '@/components/utility/StyledComponentsProvider'

import StyledComponentsRegistry from '../components/utility/StyledComponentsRegistry'

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
        <StyledComponentsRegistry>
          <InterUnitProvider>
            <StyledComponentsProvider>{children}</StyledComponentsProvider>
          </InterUnitProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
