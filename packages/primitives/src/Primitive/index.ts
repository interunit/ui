import {Box} from './Box'
import {Button} from './Button'
// import {Image} from './Image'
import {Text} from './Text'

type PrimitiveComponent = {
  Box: typeof Box
  Button: typeof Button
  // Image: typeof Image
  Text: typeof Text
}

const Primitive: PrimitiveComponent = {
  Box,
  Button,
  // Image,
  Text
}
export {Primitive}
