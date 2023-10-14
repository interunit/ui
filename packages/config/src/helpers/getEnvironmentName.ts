import {ENVIRONMENT} from '../internal/internalConfig'

export const getEnvironmentName = () => {
  // Jest doesn't seem to crawl to this file correctly
  // so native tests run in a web env. This will fix that.
  // Might need to rethink this using haste or some other solution
  // if more problems arise from this same issue.
  try {
    if (
      process?.env?.TEST_ENV_NAME &&
      process?.env?.TEST_ENV_NAME !== undefined
    ) {
      if (
        process.env.TEST_ENV_NAME !== ('native' as string) &&
        process.env.TEST_ENV_NAME !== ('web' as string)
      ) {
        throw new Error('TEST_ENV_NAME must be either "native" or "web"')
      }
      return process.env.TEST_ENV_NAME
    }
    return ENVIRONMENT.NAME
  } catch (e) {
    return ENVIRONMENT.NAME
  }
}
