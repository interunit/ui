import React, {useState} from 'react'

import {Primitive} from '@interunit/primitives'

type ComboboxOption = {
  label: string
  value: string
}

type ComboboxSingleValueProps = {
  type: 'single'
  value: string
  onChange: (value: string) => void
  options: ComboboxOption[]
}

type ComboboxMultiValueProps = {
  type: 'multi'
  value: string[]
  onChange: (value: string[]) => void
  options: ComboboxOption[]
}

type ComboboxProps = ComboboxSingleValueProps | ComboboxMultiValueProps

const Combobox = ({type, value, onChange, options}: ComboboxProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = (_value: string) => {
    if (type === 'multi') {
      const valueList = value as string[]
      if (valueList.includes(_value)) {
        return onChange(valueList.filter(val => val !== _value))
      }
      return onChange([...value, _value])
    }

    if (type === 'single') {
      return onChange(value)
    }

    throw new Error('Invalid type passed for Combobox')
  }

  return (
    <Primitive.Box as="div">
      <Primitive.Button
        onPress={() => {
          setIsOpen(!isOpen)
        }}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
        bg={{c: '#eee'}}
        aria-role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <Primitive.Box sp={{p: 1}} as="span">
          <Primitive.Text as="span" fnt={{c: 'black'}}>
            {type === 'multi'
              ? !value || value.length === 0
                ? 'Select...'
                : value.join(', ')
              : !value
              ? 'Select...'
              : value}
          </Primitive.Text>
        </Primitive.Box>
      </Primitive.Button>
      {isOpen && (
        // TODO: Replace with popover component
        <Primitive.Box as="div" bg={{c: 'white'}} role="group">
          {options.map(option => {
            return (
              <Primitive.Button
                onPress={() => handleChange(option.value)}
                onClick={() => handleChange(option.value)}
                bg={{c: '#ccc'}}
                sp={{p: 1}}
                role="option"
              >
                <Primitive.Text as="span" fnt={{c: 'black'}}>
                  {option.label}
                </Primitive.Text>
              </Primitive.Button>
            )
          })}
        </Primitive.Box>
      )}
    </Primitive.Box>
  )
}

export {Combobox}
