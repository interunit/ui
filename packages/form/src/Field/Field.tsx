import React from 'react'

import {visuallyHiddenStyles} from '@interunit/a11y'
import {Child, Primitive} from '@interunit/primitives'

import {FormContext} from '../Form'

function onChangeValidate<E>(
  onChange: ((event: E) => void) | undefined,
  validate: ((value: E) => boolean | string | void) | undefined,
  setValidity: React.Dispatch<React.SetStateAction<boolean | string>>
) {
  if (!onChange) return
  return (event: E) => {
    if (validate) {
      setValidity(validate(event) ?? true)
    }

    onChange(event)
  }
}

interface BaseFieldProps {
  name: string
  id: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate?: (value: any) => boolean | string | void
  isReadOnly?: boolean
  isError?: boolean
  isLabelHidden?: boolean
}

type FieldProps = BaseFieldProps

type FieldContextState = FieldProps & {
  value: unknown
  InternalOnChange: (value: unknown) => void
  validity: string | boolean
  setValidity: React.Dispatch<React.SetStateAction<string | boolean>>
}

const FieldContext = React.createContext({} as FieldContextState)

const Field = ({
  children,
  ...props
}: FieldProps & {children: React.ReactNode}) => {
  const {validity: contextValidity, fieldValues, setFieldValues} = React.useContext(FormContext)

  const [internalValidity, setInternalValidity] = React.useState<
    string | boolean
  >(true)

  const value = fieldValues?.[props.name]

  const InternalOnChange = (event: unknown) => {
    const value = props.onChange(event)
    if (setFieldValues) {
      setFieldValues((prev: typeof fieldValues) => ({
        ...prev,
        [props.name]: value
      }))
    }
  }

  const validity = contextValidity?.[props.name] || internalValidity

  const ContextValue = {
    ...props,
    value,
    InternalOnChange,
    validity,
    setValidity: setInternalValidity
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
    <Primitive.Box as="div" data-error={isError}>
      {children}
    </Primitive.Box>
  )
}

const FieldLabel = ({children}: {children: React.ReactNode}) => {
  const {id, isError, isLabelHidden} = React.useContext(FieldContext)
  return (
    <Child
      as="label"
      htmlFor={id}
      data-error={isError}
      style={isLabelHidden ? visuallyHiddenStyles : {}}
    >
      {children}
    </Child>
  )
}

const FieldControl = ({children}: {children: React.ReactNode}) => {
  const {
    value,
    InternalOnChange,
    id,
    name,
    isError,
    isReadOnly,
    validate,
    setValidity
  } = React.useContext(FieldContext)
  return (
    <Primitive.Box as="div" data-error={isError}>
      <Child
        id={id}
        name={name}
        value={value}
        onChange={onChangeValidate(InternalOnChange, validate, setValidity)}
        readonly={isReadOnly}
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
      <Primitive.Box as="div" data-error={true}>
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
