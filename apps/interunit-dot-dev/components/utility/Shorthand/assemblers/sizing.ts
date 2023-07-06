import {type CSSUnit, InterUnitInternals} from '@interunit/config'

import {valueConversion} from '../helpers/valueConversion'

const DEFAULT_SIZING_UNIT =
  InterUnitInternals.InterUnitInternalConfig.ENVIRONMENT.DEFAULT_CSS_UNIT.SIZING
export type Sizing = {
  sz?: SizingValue
}

type SizingValue = {
  w?: string | number
  mw?: string | number
  h?: string | number
  mh?: string | number
}

const formatSizingValues = ({
  value,
  unit
}: {
  value: string | number
  unit: CSSUnit
}) => {
  if (typeof value === 'string') return value

  return valueConversion({value, unit})
}

const sizingAssembler = ({sz}: {sz?: SizingValue}) => {
  if (!sz) return undefined

  let result = ''

  if (sz.w)
    result += `width: ${formatSizingValues({
      value: sz.w,
      unit: DEFAULT_SIZING_UNIT as CSSUnit
    })};`
  if (sz.h)
    result += `height: ${formatSizingValues({
      value: sz.h,
      unit: DEFAULT_SIZING_UNIT as CSSUnit
    })};`

  if (sz.mw)
    result += `max-width: ${formatSizingValues({
      value: sz.mw,
      unit: DEFAULT_SIZING_UNIT as CSSUnit
    })};`

  if (sz.mh)
    result += `max-height: ${formatSizingValues({
      value: sz.mh,
      unit: DEFAULT_SIZING_UNIT as CSSUnit
    })};`

  return result
}

export const sizing = {
  assembler: sizingAssembler,
  propNames: ['sz']
}
