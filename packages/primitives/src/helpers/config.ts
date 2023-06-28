import {
  type ConstructTag,
  type CrossPlatformStyled,
  type InterConstruct
} from '@interunit/config'

import {Styles} from '../utility/Styles'

type ConstructObject = {inter: InterConstruct; styled: ConstructTag}
export const createWrappedConstruct = ({
  Construct
}: {
  Construct: ConstructObject[]
}): Record<InterConstruct, CrossPlatformStyled[ConstructTag]> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Construct.reduce((acc: any, {inter, styled}: ConstructObject) => {
    acc[inter] = Styles({
      element: styled
    })
    acc[inter].displayName = `InterConstruct.${inter}`
    return acc
  }, {})
}
