export type PixelString = string

export const isPixelString = (value: string | number): value is PixelString => {
  if (typeof value === 'number') {
    return false
  }
  return value.endsWith('px')
}
