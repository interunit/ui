import React from 'react'

import {InterUnitInternals} from '@interunit/config'
import {Child} from '@interunit/primitives'

const ENVIRONMENT = InterUnitInternals.InterUnitInternalConfig.ENVIRONMENT.NAME

type OnSubmit<T> = ({values}: {values: T}) => void | Promise<void>
type BaseValues = {[key: string]: unknown}
type Validity<T> = {[key in keyof T]: string | boolean}

export const FormContext = React.createContext<
  Partial<FormContextState<unknown>>
>({})

interface FormContextState<T> {
  initialValues: T
  fieldValues: T
  validity: T
  setFieldValue: ((params: {name: string; value: unknown}) => void) | undefined
  InternalOnSubmit:
    | ((event: React.FormEvent<HTMLFormElement>) => void)
    | undefined
  getFieldValidity: (name: string) => string | boolean
}

interface FormProps<T> {
  initialValues: T
  onSubmit: OnSubmit<T>
  validate?: {
    runOnChange?: boolean
    runOnSubmit?: boolean
    validationFn: (params: {values: T}) => Validity<T>
  }
  children({
    values,
    validity,
    onSubmit
  }: {
    values: T
    validity: Validity<T>
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  }): React.ReactNode
}

const Form = <T extends BaseValues>({
  initialValues,
  onSubmit,
  validate,
  children
}: FormProps<T>) => {
  const [fieldValues, setInternalFieldValues] = React.useState<T>(initialValues)
  const [validity, setValidity] = React.useState<Validity<T>>({} as Validity<T>)

  const validateOnSubmit = validate?.runOnSubmit ?? true
  const validateOnChange = validate?.runOnChange ?? false

  const InternalOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()

    if (validateOnSubmit && validate) {
      const validity = validate.validationFn({values: fieldValues})
      setValidity(validity)

      if (Object.values(validity).some(value => value !== true)) return
    }

    if (onSubmit) {
      onSubmit({values: fieldValues})
    }
  }

  React.useEffect(() => {
    if (validateOnChange && validate) {
      const validity = validate.validationFn({values: fieldValues})
      setValidity(validity)
    }
  }, [fieldValues])

  const getFieldValidity = (name: string) => {
    if (validity?.[name] === false || typeof validity?.[name] === 'string') {
      return validity[name]
    }
    return true
  }

  const setFieldValue = ({name, value}: {name: string; value: unknown}) => {
    setInternalFieldValues({
      ...fieldValues,
      [name]: value
    })
  }

  const ContextValue = {
    initialValues,
    fieldValues,
    validity,
    setFieldValue,
    getFieldValidity,
    InternalOnSubmit
  }
  if (ENVIRONMENT === 'native') {
    return (
      <FormContext.Provider value={ContextValue}>
        {children({values: fieldValues, validity, onSubmit: InternalOnSubmit})}
      </FormContext.Provider>
    )
  }

  return (
    <FormContext.Provider value={ContextValue}>
      <form onSubmit={InternalOnSubmit}>
        {children({values: fieldValues, validity, onSubmit: InternalOnSubmit})}
      </form>
    </FormContext.Provider>
  )
}

const FormTrigger = ({children}: {children: React.ReactNode}) => {
  const {InternalOnSubmit} = React.useContext(FormContext)

  if (ENVIRONMENT === 'native') {
    return <Child onPress={InternalOnSubmit}>{children}</Child>
  }

  return children
}

Form.Trigger = FormTrigger

export {Form}
