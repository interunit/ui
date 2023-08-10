import {type CSSUnit, getEnvironmentName} from '@interunit/config'

export const platformCSSUnitTranslation = (
  unit: CSSUnit,
  enviornment?: 'native' | 'web'
) => {
  const env = enviornment || getEnvironmentName()
  if (env === 'native' && typeof unit === 'string') {
    if (unit.includes('px')) return parseFloat(unit)
    if (unit.includes('rem')) return parseFloat(unit) * 16
  }

  return unit
}
