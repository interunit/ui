import React from 'react'

import {VisuallyHidden} from '@interunit/a11y'
import {Child, Primitive} from '@interunit/primitives'

import {FormContext} from '../Form'

interface FieldProps<T> {
  name: string
  id: string
  value: T
  // TODO: Not sure of a good way to avoid an "any" here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void | T
  validate?: {
    validationFn?: (value: T) => string | boolean | void
  }
  isReadOnly?: boolean
  isError?: boolean
  isLabelHidden?: boolean
}

type FieldContextState<T> = Omit<FieldProps<T>, 'validate'> & {
  value: T
  InternalOnChange: (value: T | unknown) => void
  validity: string | boolean
  setValidity: ((value: T) => void) | undefined
}

const FieldContext = React.createContext<Partial<FieldContextState<unknown>>>(
  {}
)

const Field = <T,>({
  validate,
  children,
  ...props
}: FieldProps<T> & {children: React.ReactNode}) => {
  const {setFieldValue, getFieldValidity} = React.useContext(FormContext)

  const [internalValidity, setInternalValidity] = React.useState<
    string | boolean
  >(true)

  const value = props.value

  const InternalOnChange = (_value: T | unknown) => {
    if (props.onChange) {
      const value = props.onChange(_value)
      if (setFieldValue) {
        setFieldValue({name: props.name, value})
      }
    }
  }

  React.useEffect(() => {
    if (validate?.validationFn) {
      const validity = validate.validationFn?.(value) ?? true
      setInternalValidity(validity)
    }
  }, [value])

  const validity =
    (getFieldValidity && getFieldValidity(props.name)) === true
      ? internalValidity
      : getFieldValidity && getFieldValidity(props.name)

  const ContextValue = {
    name: props.name,
    id: props.id,
    onChange: props.onChange,
    isReadOnly: props.isReadOnly,
    isError: props.isError,
    isLabelHidden: props.isLabelHidden,
    value,
    InternalOnChange,
    validity
  }

  return (
    <FieldContext.Provider value={ContextValue}>
      {children}
    </FieldContext.Provider>
  )
}

const FieldContainer = ({children}: {children: React.ReactNode}) => {
  const {isError} = React.useContext(FieldContext)
  return (
    <Primitive.Box el="div" data-error={isError}>
      {children}
    </Primitive.Box>
  )
}

const FieldLabel = ({children}: {children: React.ReactNode}) => {
  const {id, isError, isLabelHidden} = React.useContext(FieldContext)

  if (isLabelHidden) {
    return (
      <VisuallyHidden>
        <Child el="label" htmlFor={id} data-error={isError}>
          {children}
        </Child>
      </VisuallyHidden>
    )
  }

  return (
    <Child el="label" htmlFor={id} data-error={isError}>
      {children}
    </Child>
  )
}

const FieldControl = ({children}: {children: React.ReactNode}) => {
  const {value, InternalOnChange, id, name, isError, isReadOnly} =
    React.useContext(FieldContext)

  return (
    <Primitive.Box el="div" data-error={isError}>
      <Child
        id={id}
        name={name}
        value={value}
        onChange={InternalOnChange}
        readOnly={isReadOnly}
        data-error={isError}
      >
        {children}
      </Child>
    </Primitive.Box>
  )
}

const FieldValidityMessage = ({
  children
}: {
  children(validity: string | boolean): React.ReactNode
}) => {
  const {validity} = React.useContext(FieldContext)

  if (
    validity !== true &&
    validity !== undefined &&
    validity !== null &&
    children
  ) {
    return (
      <Primitive.Box el="div" data-error={true}>
        {children(validity) ?? validity}
      </Primitive.Box>
    )
  }
}

Field.Container = FieldContainer
Field.Label = FieldLabel
Field.Control = FieldControl
Field.ValidityMessage = FieldValidityMessage

export {Field}
