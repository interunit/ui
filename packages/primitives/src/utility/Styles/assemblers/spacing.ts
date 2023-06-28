import {InterUnitInternals} from '@interunit/config'
import {
  type OrderingProperty,
  formatOrderingProperty
} from '../helpers/orderingProperty'

const ENVIRONMENT = InterUnitInternals.InterUnitInternalConfig.ENVIRONMENT
// TODO: Let user override this
const DEFAULT_SPACING_UNIT = ENVIRONMENT.DEFAULT_UNIT.SPACING

export type Spacing = {
  sp?: SpacingValue
}

type SpacingValue = {
  m?: OrderingProperty
  p?: OrderingProperty
}

// TODO: Set Default
export type SpacingUnit = 'rem' | 'px'

export const SpacingValueToCssString = ({
  value,
  unit = DEFAULT_SPACING_UNIT as SpacingUnit
}: {
  value: OrderingProperty
  unit?: SpacingUnit
}) => {
  if (typeof value === 'number') return `${value}${unit}`

  if (Array.isArray(value)) {
    return value.map(v => `${v}${unit}`).join(' ')
  }

  throw new Error('Spacing(sp): value must be a number or an array of numbers')
}

export const spacingAssembler = ({sp}: {sp?: SpacingValue}) => {
  if (!sp) return undefined

  let result = ''

  if (sp?.p) {
    result += `padding: ${formatOrderingProperty({
      value: sp.p,
      unit: DEFAULT_SPACING_UNIT as 'rem'
    })};`
  }

  if (sp?.m) {
    result += `margin: ${formatOrderingProperty({
      value: sp.m,
      unit: DEFAULT_SPACING_UNIT as 'rem'
    })};`
  }

  return result
}

export const spacing = {
  assembler: spacingAssembler,
  propNames: ['sp']
}
