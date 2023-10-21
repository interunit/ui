import {InterUnitInternals} from '@interunit/config'
import {
  type ConstructTag,
  type InterConstruct,
  type NativeComponent,
  type WebComponent
} from '@interunit/config'
import type React from 'react'

import {getConstruct} from './getConstruct'

export const getEnvironmentName = () => {
  // Jest doesn't seem to crawl to this file correctly
  // so native tests run in a web env. This will fix that.
  // Might need to rethink this using haste or some other solution
  // if more problems arise from this same issue.
  try {
    if (
      process?.env?.TEST_ENV_NAME &&
      process?.env?.TEST_ENV_NAME !== undefined
    ) {
      if (
        process.env.TEST_ENV_NAME !== ('native' as string) &&
        process.env.TEST_ENV_NAME !== ('web' as string)
      ) {
        throw new Error('TEST_ENV_NAME must be either "native" or "web"')
      }
      return process.env.TEST_ENV_NAME
    }
    return InterUnitInternals.InterUnitInternalConfig.ENVIRONMENT.NAME
  } catch (e) {
    return InterUnitInternals.InterUnitInternalConfig.ENVIRONMENT.NAME
  }
}
const ENVIRONMENT = getEnvironmentName()

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
