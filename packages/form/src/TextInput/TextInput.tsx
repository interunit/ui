import {InterUnitInternals as InterUnitConfigInternals} from '@interunit/config'
import {InterUnitInternals} from '@interunit/primitives'

const ENVIRONMENT =
  InterUnitConfigInternals.InterUnitInternalConfig.ENVIRONMENT.NAME

type TextInputProps<T> = {
  value?: T
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => T
} & typeof InterUnitInternals.Construct.Input

const TextInput = <T extends string>({..._props}: TextInputProps<T>) => {
  const props = {
    value: _props.value,
    ..._props
  }

  delete props.onChange
  delete props.onChangeText

  if (ENVIRONMENT === 'native') {
    props.onChangeText = (value: string) => {
      _props.onChange(value)
    }
  }

  if (ENVIRONMENT === 'web') {
    props.onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      _props.onChange(event.target.value)
    }
  }

  return <InterUnitInternals.Construct.Input {...props} />
}

export {TextInput}
