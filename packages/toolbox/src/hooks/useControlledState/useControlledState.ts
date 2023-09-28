import React from 'react'

export type ControlledStateParams<V> = {
  value: V
  defaultValue?: never
  onValueChange: (value: V) => void | React.SetStateAction<V>
}

export type UncontrolledStateParams<V> = {
  value?: never
  defaultValue: V
  onValueChange?: never
}

export type UseControlledStateParams<V> =
  | ControlledStateParams<V>
  | UncontrolledStateParams<V>

function useControlledState<V = any>(params: UseControlledStateParams<V>) {
  const isStateAlreadyControlled =
    params.value !== undefined && params.onValueChange !== undefined

  if (isStateAlreadyControlled) {
    return [params.value, params.onValueChange] as const
  }

  const [value, setValue] = React.useState(params.defaultValue as V)

  return [value, setValue] as const
}

export {useControlledState}
