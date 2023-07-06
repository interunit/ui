import React from 'react'
import styled from 'styled-components/native'

import {InterUnitProvider} from '@interunit/config'
import {Field, Form, TextInput} from '@interunit/form'
import {Popover} from '@interunit/popover'
import {Primitive} from '@interunit/primitives'
import {mq} from '@interunit/responsive'

import {config} from './interunit.config'

const StyledBox = styled(Primitive.Box).attrs({el: 'div'})`
  background-color: red;

  ${mq(800)`
  background-color: green;

      `}
`

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
      el="div"
      style={{height: '100%', flex: 1, marginTop: 30, padding: 20}}
    >
      <StyledBox el="div">
        <Primitive.Text el="span">hi</Primitive.Text>
      </StyledBox>
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
        {({values}) => (
          <>
            <Field
              name="firstName"
              id="firstName"
              value={values.firstName}
              onChange={value => value}
              isLabelHidden={true}
            >
              <Field.Label>
                <Primitive.Text el="label">First Name</Primitive.Text>
              </Field.Label>
              <Field.Control>
                <TextInput type="text" />
              </Field.Control>
              <Field.ValidityMessage>
                {validity => (
                  <Primitive.Text el="span">{validity}</Primitive.Text>
                )}
              </Field.ValidityMessage>
            </Field>
            <Field
              name="lastName"
              id="lastName"
              value={values.lastName}
              onChange={value => value}
            >
              <Field.Label>
                <Primitive.Text el="label">Last Name</Primitive.Text>
              </Field.Label>
              <Field.Control>
                <TextInput type="text" />
              </Field.Control>
            </Field>
            <Form.Trigger>
              <Primitive.Button
                el="button"
                type="submit"
                style={{
                  width: 200,
                  backgroundColor: 'blue',
                  padding: 20,
                  color: 'white'
                }}
              >
                <Primitive.Text el="span">Submit</Primitive.Text>
              </Primitive.Button>
            </Form.Trigger>
          </>
        )}
      </Form>
      <Primitive.Box el="div" collapsable={false} style={{marginTop: 30}}>
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
              el="button"
              style={{
                width: 200,
                backgroundColor: 'blue',
                padding: 20,
                color: 'white'
              }}
            >
              <Primitive.Text el="span">Press me</Primitive.Text>
            </Primitive.Button>
          </Popover.Trigger>
          <Popover.Content>
            <Primitive.Box
              el="div"
              style={{
                backgroundColor: 'red',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Primitive.Text el="span">Popover content</Primitive.Text>
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
