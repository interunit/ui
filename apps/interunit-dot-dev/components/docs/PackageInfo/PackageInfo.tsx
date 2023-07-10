import {P} from '@interunit/primitives'
import {Github, Package} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import {Badge} from '@/components/system/Badge'
import {Text} from '@/components/system/Text'

type PackageInfoProps = {
  data: {
    title: string
    name: string
    version: string
    description: string
    homepage: string
  }
}

const PackageInfo = ({data}: PackageInfoProps) => {
  return (
    <P.BX el="div" className="flex flex-col lg:flex-row justify-between">
      <P.BX el="div" className="flex flex-col gap-4 mb-4 max-w-[600px]">
        <Text el="h1" className="text-lg-hd">
          {data.title}
        </Text>
        <Text el="p" className="text-lg">
          {data.description}
        </Text>
      </P.BX>
      <P.BX
        el="ul"
        className="flex flex-row items-center gap-4 pb-4 list-none m-0 lg:p-0 lg:flex-col lg:items-end"
      >
        <P.BX el="li">
          <Badge color="bg-blended">v{data.version}</Badge>
        </P.BX>
        <P.BX el="li">
          <Link
            href={data.homepage}
            className="flex flex-row items-center gap-1"
          >
            <Github size={16} />
            Source
          </Link>
        </P.BX>
        <P.BX el="li">
          <Link
            href={`https://www.npmjs.com/package/${data.name}`}
            className="flex flex-row items-center gap-1"
          >
            <Package size={16} />
            npm
          </Link>
        </P.BX>
      </P.BX>
    </P.BX>
  )
}

export {PackageInfo}
