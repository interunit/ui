import type React from 'react'

import {InterUnitInternals} from '@interunit/config'
import {
  type ConstructTag,
  type InterConstruct,
  type NativeComponent
} from '@interunit/config'

import {getConstruct} from './getConstruct'

const ENVIRONMENT = InterUnitInternals.InterUnitInternalConfig.ENVIRONMENT.NAME

type ConstructObject = {
  inter: InterConstruct
  tag: ConstructTag
  component?: NativeComponent
}
export const createWrappedConstruct = ({
  Construct
}: {
  Construct: ConstructObject[]
}) => {
  return Construct.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (acc: any, {inter, tag, component}: ConstructObject) => {
      if (ENVIRONMENT === 'web') {
        const InterUnitConstruct = tag as keyof React.JSX.IntrinsicElements
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
