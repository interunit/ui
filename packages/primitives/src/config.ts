import {
  type ConstructTag,
  type InterConstruct,
  InterUnitInternals
} from '@interunit/config'

import {createWrappedConstruct} from './helpers/config'

const ConstructFromConfig =
  InterUnitInternals.InterUnitInternalConfig.ConstructFromConfig
const ENVIRONMENT = InterUnitInternals.InterUnitInternalConfig.ENVIRONMENT

type ConstructType = typeof ConstructFromConfig

const Construct = createWrappedConstruct({
  Construct: ConstructFromConfig ,
})

export {
  ENVIRONMENT,
  type ConstructType,
  Construct,
  type InterConstruct,
  type ConstructTag
}
