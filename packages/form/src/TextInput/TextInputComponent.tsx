type TextComponentInputProps<T> = {
  value?: T
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => T
} & React.InputHTMLAttributes<HTMLInputElement>

const TextInputComponent = <T extends string>(
  props: TextComponentInputProps<T>
) => {
  return <input value={props.value} onChange={props.onChange} {...props} />
}

export {TextInputComponent}
