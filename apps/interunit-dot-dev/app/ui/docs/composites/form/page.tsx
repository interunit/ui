'use client'

import React from 'react'
import {useTheme} from 'styled-components'

import {Button} from '@/components/system/Button'
import {Text} from '@/components/system/Text'
import {Field, Form, TextInput} from '@interunit/form'

const FormPage = () => {
  const theme = useTheme()

  type FormValues = {
    firstName: string
    lastName: string
  }

  const handleSubmit = ({values}: {values: FormValues}) => {
    console.log('Submission Values', values)
  }

  return (
    <div>
      <h1>Form Page</h1>
      <Form
        initialValues={{firstName: 'Peter', lastName: 'Parker'}}
        onSubmit={handleSubmit}
        validate={{
          validationFn: ({values}) => {
            const errors = {} as FormValues

            if (values.firstName.length > 10) {
              errors.firstName = 'First name must be less than 10 characters'
            }

            if (values.lastName.length > 10) {
              errors.lastName = 'Last name must be less than 10 characters'
            }

            return errors
          }
        }}
      >
        {({values}) => (
          <>
            <Field
              name="firstName"
              id="firstName"
              value={values.firstName}
              onChange={value => value}
            >
              <Field.Label>
                <Text as="label">First Name</Text>
              </Field.Label>
              <Field.Control>
                <TextInput type="text" />
              </Field.Control>
              <Field.ValidityMessage>
                {validity => <Text as="span">{validity}</Text>}
              </Field.ValidityMessage>
            </Field>
            <Field
              name="lastName"
              id="lastName"
              value={values.lastName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                event.target.value
              }
            >
              <Field.Label>
                <Text as="label">Last Name</Text>
              </Field.Label>
              <Field.Control>
                <input type="text" />
              </Field.Control>
              <Field.ValidityMessage>
                {validity => <Text as="span">{validity}</Text>}
              </Field.ValidityMessage>
            </Field>
            <Button type="submit" color={theme?.color.background.secondary}>
              Submit
            </Button>
          </>
        )}
      </Form>
    </div>
  )
}

export default FormPage
