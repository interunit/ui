'use client'

import {Field, Form, homepage, name, version} from '@interunit/form'
import {Primitive} from '@interunit/primitives'
import {Check} from 'lucide-react'
import {Github, Package} from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {useTheme} from 'styled-components'

import {CodeBlock} from '@/components/docs/CodeBlock'
import {ComponentDisplay} from '@/components/docs/ComponentDisplay'
import {InstallBlock} from '@/components/docs/InstallBlock'
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
    <Primitive.Box el="div">
      <Primitive.Box
        el="div"
        className="flex flex-col lg:flex-row  justify-between mb-8"
      >
        <Primitive.Box
          el="div"
          className="flex flex-col gap-4 mb-4 max-w-[600px]"
        >
          <Text el="h1" className="text-lg-hd">
            Form
          </Text>
          <Text el="p" className="text-lg">
            Cross platform UI components for forms along with a light weight
            form state management library.
          </Text>
        </Primitive.Box>
        <Primitive.Box
          el="ul"
          className="flex flex-row items-center gap-4 pb-4 list-none m-0 lg:p-0 lg:flex-col lg:items-end"
        >
          <Primitive.Box el="li">
            <Badge color="bg-blended">v{version}</Badge>
          </Primitive.Box>
          <Primitive.Box el="li">
            <Link href={homepage} className="flex flex-row items-center gap-1">
              <Github size={16} />
              Source
            </Link>
          </Primitive.Box>
          <Primitive.Box el="li">
            <Link
              href={`https://www.npmjs.com/package/${name}`}
              className="flex flex-row items-center gap-1"
            >
              <Package size={16} />
              npm
            </Link>
          </Primitive.Box>
        </Primitive.Box>
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
      <Primitive.Box el="div" className="py-8">
        <Text el="h2" className="text-sm-hd">
          What's Included
        </Text>

        <Primitive.Box
          el="ul"
          className="list-none flex flex-col gap-4 py-8 px-4"
        >
          <Primitive.Box el="li">
            <Primitive.Box el="span" className="flex flex-row items-center">
              <Primitive.Box
                el="span"
                className="inline-block p-2 mr-4 rounded-full bg-bg-muted"
              >
                <Check size={16} role="img" aria-label="Checkmark" />
              </Primitive.Box>
              <Text el="span" className="text-lg">
                Form
              </Text>
            </Primitive.Box>
          </Primitive.Box>

          <Primitive.Box el="li">
            <Primitive.Box el="span" className="flex flex-row items-center">
              <Primitive.Box
                el="span"
                className="inline-block p-2 mr-4 rounded-full bg-bg-muted"
              >
                <Check size={16} role="img" aria-label="Checkmark" />
              </Primitive.Box>
              <Text el="span" className="text-lg">
                Form
              </Text>
            </Primitive.Box>
          </Primitive.Box>
          <Primitive.Box el="li">
            <Primitive.Box el="span" className="flex flex-row items-center">
              <Primitive.Box
                el="span"
                className="inline-block p-2 mr-4 rounded-full bg-bg-muted"
              >
                <Check size={16} role="img" aria-label="Checkmark" />
              </Primitive.Box>
              <Text el="span" className="text-lg">
                Text Input
              </Text>
            </Primitive.Box>
          </Primitive.Box>
          <Primitive.Box el="li">
            <Primitive.Box el="span" className="flex flex-row items-center">
              <Primitive.Box
                el="span"
                className="inline-block p-2 mr-4 rounded-full bg-bg-muted"
              >
                <Check size={16} role="img" aria-label="Checkmark" />
              </Primitive.Box>
              <Text el="span" className="text-lg">
                And more... (WIP)
              </Text>
            </Primitive.Box>
          </Primitive.Box>
        </Primitive.Box>
      </Primitive.Box>
      <Primitive.Box el="div" className="mb-8">
        <Text el="h2" className="text-sm-hd mb-4">
          Installation
        </Text>

        <InstallBlock packageName={name} />
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
    </Primitive.Box>
  )
}

export default FormPage
