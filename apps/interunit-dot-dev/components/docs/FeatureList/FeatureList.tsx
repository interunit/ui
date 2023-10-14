import {Primitive} from '@interunit/primitives'
import {Check} from 'lucide-react'
import React from 'react'

import {Text} from '@/components/system/Text'

const FeatureList = ({children}: {children: React.ReactNode}) => {
  return (
    <Primitive.Box el="ul" className="list-none flex justify-end flex-col gap-4 px-4">
      {children}
    </Primitive.Box>
  )
}

const FeatureListItem = ({children}: {children: React.ReactNode}) => {
  return (
    <Primitive.Box el="li">
      <Primitive.Box el="span" className="flex flex-row">
        <Primitive.Box
          el="span"
          className="inline-block p-2 mr-4 rounded-full bg-slate-100 self-start"
        >
          <Check size={16} role="img" aria-label="Checkmark" />
        </Primitive.Box>
        <Text el="span" size="4">
          {children}
        </Text>
      </Primitive.Box>
    </Primitive.Box>
  )
}

FeatureList.Item = FeatureListItem

export {FeatureList}
