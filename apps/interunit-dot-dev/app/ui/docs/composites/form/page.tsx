'use client'

import {
  Field,
  Form,
  description,
  homepage,
  name,
  version
} from '@interunit/form'
import {P} from '@interunit/primitives'
import {Check} from 'lucide-react'
import React from 'react'
import {useTheme} from 'styled-components'

import {AnchoredHeading} from '@/components/docs/AnchoredHeading'
import {CodeBlock} from '@/components/docs/CodeBlock'
import {CodeTag} from '@/components/docs/CodeTag'
import {ComponentDisplay} from '@/components/docs/ComponentDisplay'
import {FeatureList} from '@/components/docs/FeatureList'
import {InstallBlock} from '@/components/docs/InstallBlock'
import {PackageInfo} from '@/components/docs/PackageInfo'
import {PropsTable} from '@/components/docs/PropsTable'
import {Button} from '@/components/system/Button'
import {InputGroup} from '@/components/system/InputGroup'
import {InputLabel} from '@/components/system/InputLabel'
import {Text} from '@/components/system/Text'
import {TextInput} from '@/components/system/TextInput'

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
    <P.BX el="div">
      <PackageInfo
        data={{
          title: 'Form',
          name,
          version,
          description,
          homepage
        }}
      />
      <ComponentDisplay className="mb-12">
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
      <P.BX el="div" className="flex flex-col justify-between gap-12 mb-12">
        <P.BX el="div" className="w-full">
          <AnchoredHeading
            id="installation"
            el="h2"
            className="text-sm-hd"
            boxClassName="mb-4"
          >
            Installation
          </AnchoredHeading>

          <InstallBlock packageName={name} />
        </P.BX>
        <P.BX el="div">
          <Text el="h2" className="text-sm-hd mb-4">
            What's Included
          </Text>
          <FeatureList>
            <FeatureList.Item>Form</FeatureList.Item>
            <FeatureList.Item>Field</FeatureList.Item>
            <FeatureList.Item>Text Input</FeatureList.Item>
            <FeatureList.Item>More (WIP)</FeatureList.Item>
          </FeatureList>
        </P.BX>
      </P.BX>
      <AnchoredHeading
        id="form"
        el="h2"
        className="text-md-hd"
        boxClassName="mb-4"
      >
        {'<Form />'}{' '}
      </AnchoredHeading>

      <CodeBlock
        className="mb-8"
        code={`
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
    }}}
>
        `}
      />
      <P.BX el="div" className="mb-8">
        <AnchoredHeading
          id="initial-values"
          el="h3"
          className="text-sm-hd"
          boxClassName="mb-4"
        >
          Props
        </AnchoredHeading>
        <P.TX el="p">
          An object of values that the form will be initialized with. The keys
          of this object should match the <CodeTag>name</CodeTag> prop of the{' '}
          <CodeTag>{'<Field />'}</CodeTag> component.
        </P.TX>
      </P.BX>
      <P.BX el="div" className="mb-8">
        <PropsTable
          propsToDisplay={[
            {
              name: 'initialValues',
              type: 'object',
              required: false,
              description:
                'An object of values that the form will be initialized with. The keys of this object should match the name prop of the Field component.'
            },
            {
              name: 'initialValues',
              type: 'object',
              required: false,
              description:
                'An object of values that the form will be initialized with. The keys of this object should match the name prop of the Field component.'
            }
          ]}
        />
      </P.BX>
    </P.BX>
  )
}

export default FormPage
