import {P} from '@interunit/primitives'
import {Check} from 'lucide-react'
import React from 'react'

import {Text} from '@/components/system/Text'

const FeatureList = ({children}: {children: React.ReactNode}) => {
  return (
    <P.BX el="ul" className="list-none flex justify-end flex-col gap-4 px-4">
      {children}
    </P.BX>
  )
}

const FeatureListItem = ({children}: {children: React.ReactNode}) => {
  return (
    <P.BX el="li">
      <P.BX el="span" className="flex flex-row">
        <P.BX
          el="span"
          className="inline-block p-2 mr-4 rounded-full bg-bg-muted self-start"
        >
          <Check size={16} role="img" aria-label="Checkmark" />
        </P.BX>
        <Text el="span" className="text-lg self-start">
          {children}
        </Text>
      </P.BX>
    </P.BX>
  )
}

FeatureList.Item = FeatureListItem

export {FeatureList}
