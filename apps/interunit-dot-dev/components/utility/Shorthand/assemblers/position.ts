import type {CSSUnit} from '@interunit/config'
import {InterUnitInternals} from '@interunit/config'

import {valueConversion} from '../helpers/valueConversion'

export type Position = {
  pos?: PositionValue
}

const ENVIRONMENT = InterUnitInternals.InterUnitInternalConfig.ENVIRONMENT

const DEFAULT_POSITION_UNIT = ENVIRONMENT.DEFAULT_CSS_UNIT.ELEMENT_POSITION as CSSUnit
type PositionValue = {
  p?: 'relative' | 'absolute' | 'fixed' | 'sticky'
  t?: string | number
  r?: string | number
  b?: string | number
  l?: string | number
}

const formatPositioningValues = ({
  value,
  unit
}: {
  value: string | number
  unit: CSSUnit
}) => {
  if (typeof value === 'string') return value

  return valueConversion({value, unit})
}

const positionAssembler = ({pos}: {pos?: PositionValue}) => {
  if (!pos) return undefined

  let result = ''

  if (pos.p) result += `position: ${pos.p};`

  if (pos.t)
    result += `top: ${formatPositioningValues({
      value: pos.t,
      unit: DEFAULT_POSITION_UNIT
    })};`
  if (pos.r)
    result += `right: ${formatPositioningValues({
      value: pos.r,
      unit: DEFAULT_POSITION_UNIT
    })};`
  if (pos.b)
    result += `bottom: ${formatPositioningValues({
      value: pos.b,
      unit: DEFAULT_POSITION_UNIT
    })};`
  if (pos.l)
    result += `left: ${formatPositioningValues({
      value: pos.l,
      unit: DEFAULT_POSITION_UNIT
    })};`

  return result
}

export const position = {
  assembler: positionAssembler,
  propNames: ['pos']
}
