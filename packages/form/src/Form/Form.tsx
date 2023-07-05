import React from 'react'

import {InterUnitInternals} from '@interunit/config'

const ENVIRONMENT = InterUnitInternals.InterUnitInternalConfig.ENVIRONMENT.NAME

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OnSubmit = any
type Validity = {[key: string]: string | boolean}

//eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseValues = {[key: string]: any}

export const FormContext = React.createContext(
  {} as FormContextInitialState<BaseValues>
)

interface FormContextInitialState<T> {
  initialValues: T
  fieldValues: T
  validity: T
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFieldValues: (values: any) => void
}

interface FormContextState<T> extends FormContextInitialState<T> {
  getFieldValidity: (name: string) => string | boolean
}

const Form = <T extends BaseValues>({
  initialValues,
  onSubmit,
  validate,
  children
}: {
  initialValues: T
  onSubmit: OnSubmit
  validate?: ({values}: {values: T}) => {
    [key: string]: string | boolean
  }
  children({
    values,
    validity,
    onSubmit
  }: {
    values: T
    validity: Validity
    onSubmit: OnSubmit
  }): React.ReactNode
}) => {
  const [fieldValues, setFieldValues] = React.useState(initialValues)
  const [validity, setValidity] = React.useState<Validity>({})

  const InternalOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (validate) {
      const validity = validate({values: fieldValues})
      setValidity(validity)

      if (Object.values(validity).some(value => value !== true)) return
    }

    if (onSubmit) {
      onSubmit({values: fieldValues})
    }
  }

  const getFieldValidity = (name: string) => {
    if (!validity?.[name]) return true
    return validity[name]
  }

  const ContextValue = {
    initialValues,
    fieldValues,
    validity,
    setFieldValues,
    getFieldValidity
  } as FormContextState<T>

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

export {Form}
