import {
  InterUnitInternalContext,
  InterUnitInternalProvider,
  useInterUnitInternalContext
} from './context'
import * as InterUnitInternalConfig from './internal/internalConfig.native'

export {useCSSUnitConversion} from './hooks/useCSSUnitConversion'

export {type InterUnitConfig} from './config'

const InterUnitInternals = {
  InterUnitInternalContext,
  InterUnitInternalProvider,
  useInterUnitInternalContext,
  InterUnitInternalConfig: {...InterUnitInternalConfig}
}

const InterUnitProvider = InterUnitInternalProvider

export type {
  ConstructTag,
  InterConstruct,
  CSSUnit,
  NativeComponent,
  WebComponent
} from './internal/sharedConfig'
export {createInterUnit} from './createInterUnit'
export {InterUnitProvider, InterUnitInternals}
