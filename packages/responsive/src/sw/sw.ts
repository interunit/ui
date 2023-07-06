import {type PixelString, isPixelString} from '../helpers/isPixelString'
import {useSW} from '../useSW'

// ScreenWidth
export const sw = (
  value: number | PixelString,
  query: 'min' | 'max' = 'min'
) => {
  const pixelNumber: number = isPixelString(value)
    ? parseInt(value.replace('px', ''))
    : value
  const {sw: width} = useSW()

  if (query === 'min') {
    return width >= pixelNumber
  }

  return width <= pixelNumber
}
