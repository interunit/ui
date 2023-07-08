'use client'

import {Field, Form, homepage, name, version} from '@interunit/form'
import {P} from '@interunit/primitives'
import {Check} from 'lucide-react'
import {Github, Package} from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {useTheme} from 'styled-components'

import {AnchoredHeading} from '@/components/docs/AnchoredHeading'
import {CodeBlock} from '@/components/docs/CodeBlock'
import {CodeTag} from '@/components/docs/CodeTag'
import {ComponentDisplay} from '@/components/docs/ComponentDisplay'
import {InstallBlock} from '@/components/docs/InstallBlock'
import {PropsTable} from '@/components/docs/PropsTable'
import {Badge} from '@/components/system/Badge'
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
      <P.BX
        el="div"
        className="flex flex-col lg:flex-row  justify-between mb-8"
      >
        <P.BX el="div" className="flex flex-col gap-4 mb-4 max-w-[600px]">
          <Text el="h1" className="text-lg-hd">
            Form
          </Text>
          <Text el="p" className="text-lg">
            Cross platform UI components for forms along with a light weight
            form state management library.
          </Text>
        </P.BX>
        <P.BX
          el="ul"
          className="flex flex-row items-center gap-4 pb-4 list-none m-0 lg:p-0 lg:flex-col lg:items-end"
        >
          <P.BX el="li">
            <Badge color="bg-blended">v{version}</Badge>
          </P.BX>
          <P.BX el="li">
            <Link href={homepage} className="flex flex-row items-center gap-1">
              <Github size={16} />
              Source
            </Link>
          </P.BX>
          <P.BX el="li">
            <Link
              href={`https://www.npmjs.com/package/${name}`}
              className="flex flex-row items-center gap-1"
            >
              <Package size={16} />
              npm
            </Link>
          </P.BX>
        </P.BX>
      </P.BX>
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
        <P.BX el="div" className="w-full max-w-[500px]">
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
          <P.BX
            el="ul"
            className="list-none flex justify-end flex-col gap-4 px-4"
          >
            <P.BX el="li">
              <P.BX el="span" className="flex flex-row items-center">
                <P.BX
                  el="span"
                  className="inline-block p-2 mr-4 rounded-full bg-bg-muted"
                >
                  <Check size={16} role="img" aria-label="Checkmark" />
                </P.BX>
                <Text el="span" className="text-lg">
                  Form
                </Text>
              </P.BX>
            </P.BX>

            <P.BX el="li">
              <P.BX el="span" className="flex flex-row items-center">
                <P.BX
                  el="span"
                  className="inline-block p-2 mr-4 rounded-full bg-bg-muted"
                >
                  <Check size={16} role="img" aria-label="Checkmark" />
                </P.BX>
                <Text el="span" className="text-lg">
                  Field
                </Text>
              </P.BX>
            </P.BX>
            <P.BX el="li">
              <P.BX el="span" className="flex flex-row items-center">
                <P.BX
                  el="span"
                  className="inline-block p-2 mr-4 rounded-full bg-bg-muted"
                >
                  <Check size={16} role="img" aria-label="Checkmark" />
                </P.BX>
                <Text el="span" className="text-lg">
                  Text Input
                </Text>
              </P.BX>
            </P.BX>
            <P.BX el="li">
              <P.BX el="span" className="flex flex-row items-center">
                <P.BX
                  el="span"
                  className="inline-block p-2 mr-4 rounded-full bg-bg-muted"
                >
                  <Check size={16} role="img" aria-label="Checkmark" />
                </P.BX>
                <Text el="span" className="text-lg">
                  And more... (WIP)
                </Text>
              </P.BX>
            </P.BX>
          </P.BX>
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
