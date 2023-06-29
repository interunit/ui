import {Inter} from 'next/font/google'

import {InterUnitProvider} from '@/components/utility/InterUnitProvider'

import StyledComponentsRegistry from '../components/utility/StyledComponentsRegistry'

const inter = Inter({subsets: ['latin']})

export const metadata = {
  title: 'InterUnit',
  description: 'InterUnit is a design system for web and native platforms.'
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <InterUnitProvider>{children}</InterUnitProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
