
import {type InterUnitConfig} from './config'
import {
  InterUnitInternalContext,
  InterUnitInternalProvider,
  useInterUnitInternalContext,
  useTheme,
  withTheme
} from './context'
import {useComponentExtension} from './helpers/componentExtension'

const createInterUnit = (config: InterUnitConfig) => {
  return {config}
}

const InterUnitInternals = {
  InterUnitInternalContext,
  InterUnitInternalProvider,
  useInterUnitInternalContext,
  useComponentExtension
}

export {
  createInterUnit,
  InterUnitInternalProvider as InterUnitProvider,
  InterUnitInternals,
  useTheme,
  withTheme
}
