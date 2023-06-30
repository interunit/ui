import {InterUnitInternals} from '../index'
import {ENVIRONMENT} from '../internal/internalConfig'
import {type CSSUnit, type CSSUnitProperties} from '../internal/sharedConfig'

type CSSUnitProperty = keyof CSSUnitProperties

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

export const useCSSUnitConversion = () => {
  const config = InterUnitInternals.useInterUnitInternalContext()

  const convert = ({
    value: RawValue,
    unit,
    property
  }: {
    value: number | string | undefined
    unit: CSSUnit
    property: CSSUnitProperty
  }) => {
    if (!RawValue) return undefined

    if (
      typeof RawValue === 'string' &&
      UnitsToIgnore.some(unit => RawValue.includes(unit))
    ){
        return RawValue
    }

    const value = typeof RawValue === 'string' ? parseFloat(RawValue) : RawValue
    const passedUnit = unit
    const configuredUnit = config?.cssUnit?.[property]

    if (!configuredUnit)
      throw new Error(`Error fetching configuration for ${property}`)

    if (passedUnit === configuredUnit) {
      if (ENVIRONMENT.NAME === 'native') {
        if (unit === 'rem') {
          return value * 16
        }

        return value
      }

      if (ENVIRONMENT.NAME === 'web') {
        return `${value}${unit}`
      }
    }

    if (passedUnit !== configuredUnit) {
      if (passedUnit === 'px' && configuredUnit === 'rem') {
        if (ENVIRONMENT.NAME === 'native') {
          return value / 16
        }
        if (ENVIRONMENT.NAME === 'web') {
          return `${value / 16}rem`
        }
      }

      if (passedUnit === 'rem' && configuredUnit === 'px') {
        if (ENVIRONMENT.NAME === 'native') {
          return value * 16
        }
        if (ENVIRONMENT.NAME === 'web') {
          return `${value * 16}px`
        }
      }
    }
  }

  return {convert}
}
