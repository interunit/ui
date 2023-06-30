import {InterUnitInternals} from '@interunit/config'

const ENVIRONMENT = InterUnitInternals.InterUnitInternalConfig.ENVIRONMENT
export const valueConversion = ({
  value,
  unit
}: {
  value: number
  unit: 'px' | 'rem'
}) => {
  if (ENVIRONMENT.NAME === 'web') {
    return `${value}${unit}`
  }

  if (ENVIRONMENT.NAME === 'native') {
    if (unit.toLowerCase() === 'rem') {
      return `${value * 16}px`
    }

    return `${value}${unit}`
  }
}
