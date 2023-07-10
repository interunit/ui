import {type InterUnitConfig} from './config'

const createInterUnit = <T extends unknown>(config: InterUnitConfig<T>) => {
  return {config}
}

export {createInterUnit}
