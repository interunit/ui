import {getEnvironmentName} from '@interunit/config'

const ENVIRONMENT = getEnvironmentName()
export const isTouchDevice = () => {
  if (ENVIRONMENT === 'native') return true
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}
