import React from 'react'

import {InterUnitProvider} from '@interunit/config'
import {Field, Form, TextInput} from '@interunit/form'
import {Popover} from '@interunit/popover'
import {Primitive} from '@interunit/primitives'

import {config} from './interunit.config'

const Test = () => {
  type FormValues = {
    firstName: string
    lastName: string
  }

  const handleSubmit = ({values}: {values: FormValues}) => {
    console.log('HERE, SUBMIT', values)
  }
  return (
    <Primitive.Box
      as="div"
      style={{height: '100%', flex: 1, marginTop: 30, padding: 20}}
    >
      <Form
        initialValues={{firstName: 'Peter', lastName: 'Parker'}}
        onSubmit={handleSubmit}
        validate={({values}: {values: FormValues}) => {
          const errors = {} as FormValues

          if (values.firstName.length > 10) {
            errors.firstName = 'First name must be less than 10 characters'
          }

          return errors
        }}
      >
        {({onSubmit}) => (
          <>
            <Field
              name="firstName"
              id="firstName"
              onChange={value => value}
              isLabelHidden={true}
            >
              <Field.Label>
                <Primitive.Text as="label">First Name</Primitive.Text>
              </Field.Label>
              <Field.Control>
                <TextInput type="text" />
              </Field.Control>
              <Field.ValidityMessage>
                {validity => (
                  <Primitive.Text as="span">{validity}</Primitive.Text>
                )}
              </Field.ValidityMessage>
            </Field>
            <Field
              name="lastName"
              id="lastName"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                event.target.value
              }
            >
              <Field.Label>
                <Primitive.Text as="label">Last Name</Primitive.Text>
              </Field.Label>
              <Field.Control>
                <TextInput type="text" />
              </Field.Control>
            </Field>
            <Primitive.Button
              as="button"
              type="submit"
              onClickOrPress={onSubmit}
              style={{
                width: 200,
                backgroundColor: 'blue',
                padding: 20,
                color: 'white'
              }}
            >
              <Primitive.Text as="span">Submit</Primitive.Text>
            </Primitive.Button>
          </>
        )}
      </Form>
      <Primitive.Box as="div" collapsable={false} style={{marginTop: 30}}>
        <Popover
          triggerType="click"
          popoverPositioning={{
            side: 'bottom',
            align: 'end',
            offset: 10,
            width: 'trigger'
          }}
        >
          <Popover.Trigger>
            <Primitive.Button
              as="button"
              style={{
                width: 200,
                backgroundColor: 'blue',
                padding: 20,
                color: 'white'
              }}
            >
              <Primitive.Text as="span">Press me</Primitive.Text>
            </Primitive.Button>
          </Popover.Trigger>
          <Popover.Content>
            <Primitive.Box
              as="div"
              style={{
                backgroundColor: 'red',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Primitive.Text as="span">Popover content</Primitive.Text>
            </Primitive.Box>
          </Popover.Content>
        </Popover>
      </Primitive.Box>
    </Primitive.Box>
  )
}

export default function App() {
  return (
    <InterUnitProvider config={config}>
      <Test />
    </InterUnitProvider>
  )
}
