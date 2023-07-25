import {InterUnitInternals} from '@interunit/config'
import {
  type ConstructTag,
  type InterConstruct,
  type NativeComponent,
  type WebComponent
} from '@interunit/config'
import type React from 'react'

import {getConstruct} from './getConstruct'

const ENVIRONMENT = InterUnitInternals.InterUnitInternalConfig.ENVIRONMENT.NAME

type ConstructObject = {
  inter: InterConstruct
  tag: ConstructTag
  component?: NativeComponent | WebComponent
}
export const createWrappedConstruct = ({
  Construct
}: {
  Construct: ConstructObject[]
}) => {
  return Construct.reduce(
    (acc: any, {inter, tag, component}: ConstructObject) => {
      if (ENVIRONMENT === 'web') {
        const InterUnitConstruct = tag as React.ElementType
        acc[inter] = InterUnitConstruct
        return acc
      }
      if (ENVIRONMENT === 'native') {
        const RN = getConstruct()
        acc[inter] = RN[component as keyof typeof RN]
        return acc
      }
    },
    {}
  )
}
