import {Box, type BoxConstrcutEl, type BoxPrimitiveProps} from './Box'
import {Button, type ButtonPrimitiveProps} from './Button'
import {Image, type ImagePrimitiveProps} from './Image'
import {Text, type TextConstructEl, type TextPrimitiveProps} from './Text'

export type PrimitiveProps = {
  Text: TextPrimitiveProps
  Box: BoxPrimitiveProps
  Button: ButtonPrimitiveProps
  Image: ImagePrimitiveProps
}

export type PrimitiveElement = {
  Text: TextConstructEl
  Box: BoxConstrcutEl
}

export const Primitive = {
  Box,
  Button,
  Text,
  Image
}

export type PP = {
  BX: BoxPrimitiveProps
  BT: ButtonPrimitiveProps
  TX: TextPrimitiveProps
  IM: ImagePrimitiveProps
}

export type PE = {
  BX: BoxConstrcutEl
  TX: TextConstructEl
}

export const P = {
  BX: Box,
  BT: Button,
  TX: Text,
  IM: Image
}
