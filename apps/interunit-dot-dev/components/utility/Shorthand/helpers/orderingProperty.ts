import { valueConversion } from './valueConversion'

export type OrderingProperty =
  | [number, number, number, number]
  | [number, number]
  | [number]
  | number

export const formatOrderingProperty = ({
  value,
  unit
}: {
  value: OrderingProperty
  unit: 'px' | 'rem'
}) => {
  if (!value) return undefined

  if (typeof value === 'number') {
    return valueConversion({value, unit})
  }
  if (Array.isArray(value)) {
    return value.map(v => `${valueConversion({value: v, unit})}`).join(' ')
  }
}
