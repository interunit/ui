import {
  type CrossPlatformStyled,
  ENVIRONMENT,
  type InterConstruct,
  NativeConstruct,
  type StyledComponentTag,
  css,
  styled
} from './construct/NativeConstruct'
import {createWrappedConstruct} from './helpers/config'

type ConstructType = typeof NativeConstruct

const Construct = createWrappedConstruct({
  Construct: NativeConstruct
})

export {
  styled,
  css,
  type ConstructType,
  Construct,
  type InterConstruct,
  type StyledComponentTag,
  type CrossPlatformStyled,
  ENVIRONMENT
}
