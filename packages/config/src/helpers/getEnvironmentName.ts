import {InterUnitInternals} from '../index'

export const getEnvironmentName = () => {
  // Jest doesn't seem to crawl to this file correctly
  // so native tests run in a web env. This will fix that.
  // Might need to rethink this using haste or some other solution
  // if more problems arise from this same issue.
  if (process.env.TEST_ENV_NAME) {
    if (
      process.env.TEST_ENV_NAME !== ('native' as string) &&
      process.env.TEST_ENV_NAME !== ('web' as string)
    ) {
      throw new Error('TEST_ENV_NAME must be either "native" or "web"')
    }
    return process.env.TEST_ENV_NAME
  }
  return InterUnitInternals.InterUnitInternalConfig.ENVIRONMENT.NAME
}
