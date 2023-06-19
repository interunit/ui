import {Box} from './Box'
import {Button} from './Button'
// import {Image} from './Image'
import {Text} from './Text'

type PrimtiveComponent = {
  Box: typeof Box
  Button: typeof Button
  // Image: typeof Image
  Text: typeof Text
}

const Primitive: PrimtiveComponent = {
  Box,
  Button,
  // Image,
  Text
}
export {Primitive}
