import {InterUnitInternals} from '@interunit/config'
import {
  type OrderingProperty,
  formatOrderingProperty
} from '../helpers/orderingProperty'

const ENVIRONMENT = InterUnitInternals.InterUnitInternalConfig.ENVIRONMENT

const DEFAULT_BORDER_WIDTH_UNIT = ENVIRONMENT.DEFAULT_UNIT.BORDER_WIDTH
const DEFAULT_BORDER_RADIUS_UNIT = ENVIRONMENT.DEFAULT_UNIT.BORDER_RADIUS

export type Border = {
  bdr?: {
    // Border Color
    c?: string // TODO: Make this based on predefined colors
    // Border Width
    w?: OrderingProperty
    // Border Style
    s?: 'solid' | 'dashed' | 'dotted'
    // Border Radius
    r?: OrderingProperty
  }
}

const borderAssembler = ({bdr}: {bdr?: Border['bdr']}) => {
  if (!bdr) return undefined

  let result = ''

  if (bdr.c) result += `border-color: ${bdr.c};`

  if (bdr.w)
    result += `border-width: ${formatOrderingProperty({
      value: bdr.w,
      unit: DEFAULT_BORDER_WIDTH_UNIT as 'px' | 'rem'
    })};`

  if (bdr.s) result += `border-style: ${bdr.s};`
  if (!bdr.s) result += `border-style: solid;`

  if (bdr.r)
    result += `border-radius: ${formatOrderingProperty({
      value: bdr.r,
      unit: DEFAULT_BORDER_RADIUS_UNIT as 'px' | 'rem'
    })};`

  return result
}

export const border = {
  assembler: borderAssembler,
  propNames: ['bdr']
}
