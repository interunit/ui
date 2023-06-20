import {ENVIRONMENT} from '../../../config'

export type OrderingProperty =
  | [number, number, number, number]
  | [number, number]
  | [number]
  | number

const valueConversion = ({
  value,
  unit
}: {
  value: number
  unit: 'px' | 'rem'
}) => {
  if (ENVIRONMENT.NAME === 'web') {
    return `${value}${unit}`
  }

  console.log(ENVIRONMENT.NAME, value, unit)

  if (ENVIRONMENT.NAME === 'native') {
    if (unit.toLowerCase() === 'rem') {
      console.log('rem')
      return `${value * 16}px`
    }

    return `${value}${unit}`
  }
}

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
