
import { InterUnitInternals, css, styled, type InterConstruct, type ConstructTag, type CrossPlatformStyled} from '@interunit/config'

import {createWrappedConstruct} from './helpers/config'

const ConstructFromConfig = InterUnitInternals.InterUnitInternalConfig.ConstructFromConfig
const ENVIRONMENT = InterUnitInternals.InterUnitInternalConfig.ENVIRONMENT

type ConstructType = typeof ConstructFromConfig

const Construct = createWrappedConstruct({
  Construct: ConstructFromConfig,
})

export {
  ENVIRONMENT,
  styled,
  css,
 type ConstructType,
  Construct,
  type InterConstruct,
  type ConstructTag,
  type CrossPlatformStyled
}
