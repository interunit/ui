import React from 'react'

import {type InterUnitConfig} from './config'
import {
  InterUnitInternalContext,
  InterUnitInternalProvider,
  useInterUnitInternalContext,
  useTheme,
  withTheme
} from './context'

const InterUnitInternals = {
  InterUnitInternalContext,
  useInterUnitInternalContext
}

const createInterUnit = (config: InterUnitConfig) => {
  const InterUnitProvider = (props: {
    children: React.ReactElement
  }): React.ReactNode => {
    return (
      <InterUnitInternalProvider config={config} children={props.children} />
    )
  }
  const InterUnit = {
    InterUnitProvider: InterUnitProvider as unknown as React.ReactNode
  }

  return InterUnit
}

export {createInterUnit, useTheme, withTheme, InterUnitInternals}
