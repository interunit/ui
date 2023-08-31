import React from 'react'

export type ControlledStateParams<V> = {
  value: V
  defaultValue?: never
  onValueChange: (value: V) => void
}

export type UncontrolledStateParams<V> = {
  value?: never
  defaultValue: V
  onValueChange?: never
}

export type UseControlledStateParams<V> =
  | ControlledStateParams<V>
  | UncontrolledStateParams<V>

function useControlledState<V>(params: UseControlledStateParams<V>) {
  const isStateAlreadyControlled = params.value !== undefined

  if (isStateAlreadyControlled) {
    return [params.value, params.onValueChange]
  }

  if (params.defaultValue === undefined) {
    throw new Error(
      'useControlledState requires either a defaultValue or a value and onValueChange'
    )
  }

  const [value, setValue] = React.useState<V>(params.defaultValue)

  return [value, setValue]
}

export {useControlledState}
