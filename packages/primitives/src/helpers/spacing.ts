export type Spacing = {
  m?: SpacingValue
  p?: SpacingValue
}

export type SpacingValue =
  | [number, number, number, number]
  | [number, number]
  | [number]

// TODO: Set Default
export type SpacingUnit = 'rem' | 'px'

export const SpacingValueToCssString = ({
  value,
  unit = 'rem'
}: {
  value: SpacingValue
  unit?: SpacingUnit
}) => {
  return value.map(v => `${v}${unit}`).join(' ')
}
