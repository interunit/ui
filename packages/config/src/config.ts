import {type DefaultTheme} from 'styled-components'

import {type Primitive} from '@interunit/primitives'

export const DEFAULT_CONFIG = {}

type PrimitiveExtension = {
  [key in keyof typeof Primitive]?: (typeof Primitive)[key]
}

export type InterUnitConfig = {
  theme?: DefaultTheme
  primitiveExtension?: PrimitiveExtension
}
