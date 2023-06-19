import {
  type InterConstruct,
  NativeConstruct,
  type StyledComponentTag,
  type CrossPlatformStyled,
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
  ConstructType,
  Construct,
  type InterConstruct,
  type StyledComponentTag,
  type CrossPlatformStyled
}
