export const DEFAULT_CONFIG = {}

// Change this to an object if the need for config arises
export type InterUnitBaseConfig = Record<string, never>

export type InterUnitConfig<T> = InterUnitBaseConfig & T
