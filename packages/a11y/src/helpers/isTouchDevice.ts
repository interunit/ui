import {InterUnitInternals} from '@interunit/config'

const ENVIRONMENT = InterUnitInternals.InterUnitInternalConfig.ENVIRONMENT.NAME
export const isTouchDevice = () => {
  if (ENVIRONMENT === 'native') return true
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}
