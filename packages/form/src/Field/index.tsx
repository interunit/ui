import React from 'react'

import {Child, Primitive} from '@interunit/primitives'

type FieldProps<T> = {
  value: T
  onChange: (value: T) => void
}

// TODO: Can this initator genreic be typed better?
const FieldContext = React.createContext({} as FieldProps<any>)

const Field = <T extends unknown>({
  children,
  ...props
}: FieldProps<T> & {children: React.ReactNode}) => {
  if (
    !!Object.getOwnPropertyDescriptor(props, 'value') ||
    !!Object.getOwnPropertyDescriptor(props, 'onChange')
  ) {
    throw new Error('Field must be passed a value and onChange prop')
  }

  return <FieldContext.Provider value={props}>{children}</FieldContext.Provider>
}

const FieldContainer = ({children}: {children: React.ReactNode}) => {
  return <Primitive.Box as="div">{children}</Primitive.Box>
}

const FieldLabel = ({children}: {children: React.ReactNode}) => {
  return <Primitive.Text as="label">{children}</Primitive.Text>
}

const FieldControl = ({children}: {children: React.ReactNode}) => {
  const {value, onChange} = React.useContext(FieldContext)
  return (
    <Primitive.Box as="div">
      <Child value={value} onChange={onChange}>
        {children}
      </Child>
    </Primitive.Box>
  )
}

const FieldMessage = ({children}: {children: React.ReactNode}) => {
  return (
    <Primitive.Box as="div">
      <Primitive.Text as="span">{children}</Primitive.Text>
    </Primitive.Box>
  )
}

Field.Container = FieldContainer
Field.Label = FieldLabel
Field.Control = FieldControl
Field.Message = FieldMessage

export {Field}
