import {type InterUnitConfig} from './config'
import {ENVIRONMENT} from './internal/internalConfig'
import {type CSSUnitProperties} from './internal/sharedConfig'

type CSSUnitProperty = keyof CSSUnitProperties

const createInterUnit = <T extends unknown>(config: InterUnitConfig<T>) => {
  /* Setup CSS Unit */
  const DEFAULT_CSS_UNIT = ENVIRONMENT.DEFAULT_CSS_UNIT
  const CONFIGURED_CSS_UNIT = {}

  Object.keys(DEFAULT_CSS_UNIT).forEach(k => {
    const key = k as CSSUnitProperty
    if (config?.cssUnit?.[key]) {
      Object.assign(CONFIGURED_CSS_UNIT, {[key]: config.cssUnit[key]})
    } else {
      Object.assign(CONFIGURED_CSS_UNIT, {[key]: DEFAULT_CSS_UNIT[key]})
    }
  })

  config.cssUnit = CONFIGURED_CSS_UNIT

  return {config}
}

export {createInterUnit}
