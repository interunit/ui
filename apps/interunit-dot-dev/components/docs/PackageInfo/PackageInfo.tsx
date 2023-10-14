import {Primitive} from '@interunit/primitives'
import {Github, Package} from 'lucide-react'
import React from 'react'

import {Badge} from '@/components/system/Badge'
import {Heading, Link, Text} from '@/components/system/Text'

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
    <Primitive.Box el="div" className="flex flex-col lg:flex-row justify-between mb-4">
      <Primitive.Box el="div" className="flex flex-col gap-4 mb-4 max-w-[600px]">
        <Heading el="h1" size="3" weight="medium">
          {data.title}
        </Heading>
        <Text el="p" size="3">
          {data.description}
        </Text>
      </Primitive.Box>
      <Primitive.Box
        el="ul"
        className="flex flex-row items-center gap-4 pb-4 list-none m-0 lg:p-0 lg:flex-col lg:items-end"
      >
        <Primitive.Box el="li">
          <Badge color="gray">v{data.version}</Badge>
        </Primitive.Box>
        <Primitive.Box el="li">
          <Link
            href={data.homepage}
            size="3"
            className="flex flex-row items-center gap-1"
          >
            <Github size={16} />
            Source
          </Link>
        </Primitive.Box>
        <Primitive.Box el="li">
          <Link
            href={`https://www.npmjs.com/package/${data.name}`}
            size="3"
            className="flex flex-row items-center gap-1"
          >
            <Package size={16} />
            npm
          </Link>
        </Primitive.Box>
      </Primitive.Box>
    </Primitive.Box>
  )
}

export {PackageInfo}
