'use client'

import React from 'react'
import {useTheme} from 'styled-components'

import {CodeBlock} from '@/components/docs/CodeBlock'
import {ComponentDisplay} from '@/components/docs/ComponentDisplay'
import {Primitive} from '@/components/primitives'
import {Button} from '@/components/system/Button'
import {InputGroup} from '@/components/system/InputGroup'
import {InputLabel} from '@/components/system/InputLabel'
import {Text} from '@/components/system/Text'
import {TextInput} from '@/components/system/TextInput'
import {Field, Form} from '@interunit/form'

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
      <Primitive.Box
        el="div"
        sp={{m: [0, 0, 3, 0]}}
        flx={{dir: 'y', gp: 1}}
        sz={{mw: 600}}
      >
        <Text el="h1" kind="heading" variation="lg">
          Form
        </Text>
        <Text el="p" variation="lg">
          Cross platform UI components for forms along with a light weight form
          state management library.
        </Text>
      </Primitive.Box>
      <ComponentDisplay>
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
              <InputGroup>
                <Field
                  name="firstName"
                  id="firstName"
                  value={values.firstName}
                  onChange={value => value}
                >
                  <Field.Label>
                    <InputLabel>First Name</InputLabel>
                  </Field.Label>
                  <Field.Control>
                    <TextInput type="text" />
                  </Field.Control>
                  <Field.ValidityMessage>
                    {validity => <Text el="span">{validity}</Text>}
                  </Field.ValidityMessage>
                </Field>
              </InputGroup>
              <InputGroup>
                <Field
                  name="lastName"
                  id="lastName"
                  value={values.lastName}
                  onChange={value => value}
                >
                  <Field.Label>
                    <InputLabel>Last Name</InputLabel>
                  </Field.Label>
                  <Field.Control>
                    <TextInput type="text" />
                  </Field.Control>
                  <Field.ValidityMessage>
                    {validity => <Text el="span">{validity}</Text>}
                  </Field.ValidityMessage>
                </Field>
              </InputGroup>
              <Button type="submit" color={theme?.color.background.secondary}>
                Submit
              </Button>
            </>
          )}
        </Form>
      </ComponentDisplay>
      <Primitive.Box el="div" sp={{p: [2, 0]}}>
        <Text el="h2" kind="heading" variation="md">
          What's Included
        </Text>

          <Primitive.Box el="ul">
            <Primitive.Box el="li">Form</Primitive.Box>
            <Primitive.Box el="li">Field</Primitive.Box>
            <Primitive.Box el="li">TextInput</Primitive.Box>
            <Primitive.Box el="li">More... (WIP)</Primitive.Box>
          </Primitive.Box>
      </Primitive.Box>

      <CodeBlock
        code={`
            <Field
              name="lastName"
              id="lastName"
              value={values.lastName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                event.target.value
              }
            >
        `}
      />
    </div>
  )
}

export default FormPage
