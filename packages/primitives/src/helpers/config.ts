import {
  type CrossPlatformStyled,
  type InterConstruct,
  type StyledComponentTag
} from '../config'
import {Styles} from '../utility/Styles'

type ConstructObject = {inter: InterConstruct; styled: StyledComponentTag}
export const createWrappedConstruct = ({
  Construct
}: {
  Construct: ConstructObject[]
}): Record<InterConstruct, CrossPlatformStyled[StyledComponentTag]> => {
  return Construct.reduce((acc: any, {inter, styled}: ConstructObject) => {
    acc[inter] = Styles({
      element: styled
    })
    acc[inter].displayName = `InterConstruct.${inter}`
    return acc
  }, {})
}
