import {
  type InterConstruct,
  type StyledComponentTag,
  type CrossPlatformStyled,
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
  styled,
  css,
  ConstructType,
  Construct,
  type InterConstruct,
  type StyledComponentTag,
  type CrossPlatformStyled
}
