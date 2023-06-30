import {
  InterUnitInternalContext,
  InterUnitInternalProvider,
  useInterUnitInternalContext
} from './context'
import * as InterUnitInternalConfig from './internal/internalConfig'

export {type InterUnitConfig} from './config'

export {useCSSUnitConversion} from './hooks/useCSSUnitConversion'
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
export {InterUnitProvider, InterUnitInternals}
export {createInterUnit} from './createInterUnit'
