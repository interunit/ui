
import {
  InterUnitInternalContext,
  InterUnitInternalProvider,
  useInterUnitInternalContext,
  useTheme,
  withTheme
} from './context'

import * as InterUnitInternalConfig from './internal/internalConfig.native'


const InterUnitInternals = {
    InterUnitInternalContext,
    InterUnitInternalProvider,
    useInterUnitInternalContext,
    InterUnitInternalConfig: { ...InterUnitInternalConfig }
}


const styled = InterUnitInternalConfig.styled
const css = InterUnitInternalConfig.css
const InterUnitProvider = InterUnitInternalProvider

export type {CrossPlatformStyled, ConstructTag, InterConstruct, CSSUnit } from './internal/sharedConfig'
export { createInterUnit } from './createInterUnit'
export { InterUnitProvider, InterUnitInternals, withTheme, useTheme, styled, css}

