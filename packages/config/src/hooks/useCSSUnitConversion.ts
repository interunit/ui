// TODO: Might not needs this if primitives are automatically
// converting these values with platformStyleTranslation
import {ENVIRONMENT} from '../internal/internalConfig'
import {type CSSUnit, type CSSUnitValue} from '../internal/sharedConfig'

// TODO: This isn't an exhaustive list of units to ignore
const UnitsToIgnore = [
  'auto',
  'calc',
  'var',
  'min',
  'max',
  'clamp',
  'fit-content',
  '%',
  'vh',
  'vw',
  'vmin',
  'vmax',
  'em',
  'ex',
  'ch',
  'cm',
  'mm',
  'in',
  'pt',
  'pc'
]

// Could support:
// - vh
// - vw

export const useCSSUnitConversion = () => {
  const convert = ({
    value: RawValue,
    unit
  }: {
    value: CSSUnitValue | undefined
    unit: CSSUnit
  }) => {
    if (!RawValue) return undefined

    if (
      typeof RawValue === 'string' &&
      UnitsToIgnore.some(unit => RawValue.includes(unit))
    ) {
      return RawValue
    }

    const value = typeof RawValue === 'string' ? parseFloat(RawValue) : RawValue
    const passedUnit = unit

    if (passedUnit === 'px') {
      if (ENVIRONMENT.NAME === 'native') {
        return value
      }
      if (ENVIRONMENT.NAME === 'web') {
        return `${value}px`
      }
    }

    if (passedUnit === 'rem') {
      if (ENVIRONMENT.NAME === 'native') {
        return value * 16
      }
      if (ENVIRONMENT.NAME === 'web') {
        return `${value}rem`
      }
    }

    if (passedUnit === '%') {
      return `${value}%`
    }
  }

  return {convert}
}
