import {
  type InterConstruct,
  type StyledComponentTag,
  type CrossPlatformStyled,
  WebConstruct,
  css,
  styled,
  DEFAULT_UNIT
} from './construct/WebConstruct'
import {createWrappedConstruct} from './helpers/config'

type ConstructType = typeof WebConstruct

const Construct = createWrappedConstruct({
  Construct: WebConstruct
})

export {
  styled,
  css,
  ConstructType,
  DEFAULT_UNIT,
  Construct,
  type InterConstruct,
  type StyledComponentTag,
  type CrossPlatformStyled
}
