import {
  type CrossPlatformStyled,
  ENVIRONMENT,
  type InterConstruct,
  type StyledComponentTag,
  WebConstruct,
  css,
  styled
} from './construct/WebConstruct'
import {createWrappedConstruct} from './helpers/config'

type ConstructType = typeof WebConstruct

const Construct = createWrappedConstruct({
  Construct: WebConstruct
})

export {
  ENVIRONMENT,
  styled,
  css,
 type ConstructType,
  Construct,
  type InterConstruct,
  type StyledComponentTag,
  type CrossPlatformStyled
}
