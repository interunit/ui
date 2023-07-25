import * as InterUnitInternalConfig from './internal/internalConfig'

const InterUnitInternals = {
  InterUnitInternalConfig: {...InterUnitInternalConfig}
}
export {useCSSUnitConversion} from './hooks/useCSSUnitConversion'
export type {
  ConstructTag,
  InterConstruct,
  CSSUnit,
  NativeComponent,
  WebComponent
} from './internal/sharedConfig'
export {createInterUnit} from './createInterUnit'
export {getEnvironmentName} from './helpers/getEnvironmentName'
export {InterUnitInternals}
