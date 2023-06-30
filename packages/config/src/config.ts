import {type CSSUnitProperties} from './internal/sharedConfig'

export const DEFAULT_CONFIG = {}

export type InterUnitBaseConfig = {
  // TODO: Any more to support?
  cssUnit?: CSSUnitProperties
}

export type InterUnitConfig<T> = InterUnitBaseConfig & T
