'use client'

import {VisuallyHidden} from '@interunit/a11y'
import {P} from '@interunit/primitives'
import {Github} from 'lucide-react'
import Link from 'next/link'

import {Badge} from '@/components/system/Badge'
import {theme} from '@/theme.config'

export default function Home() {
  return (
    <P.BX
      el="div"
      className={
        'flex flex-col items-center justify-center w-full h-screen p-4 gap-12'
      }
    >
      <P.IM
        el="img"
        src="/interunit-logo.svg"
        alt="Interunit Logo"
        className="w-[200px] h-auto"
      />
      <Badge color="bg-primary">Coming Soon</Badge>
      <P.BX el="div">
        <Link
          href="https://github.com/interunit/ui"
          className="p-2 inline-block hover:bg-bg-muted rounded transition-colors"
        >
          <VisuallyHidden>
            <P.TX el="span">InterUnit GitHub</P.TX>
          </VisuallyHidden>
          <Github size={32} stroke={theme.colors['text-light-accent']} />
        </Link>
      </P.BX>
    </P.BX>
  )
}
