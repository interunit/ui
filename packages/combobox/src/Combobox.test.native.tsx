import {fireEvent, render} from '@interunit/jest/native'
import {Primitive} from '@interunit/primitives'
import React from 'react'

import {Combobox} from './Combobox'

const ComboboxComponent = () => {
  const [value, setValue] = React.useState('Item 1')
  return (
    <Combobox value={value} onValueChange={setValue}>
      <Combobox.Label>Label</Combobox.Label>
      <Combobox.Trigger testID="combobox-trigger">
        <Primitive.Text el="span">{value}</Primitive.Text>
      </Combobox.Trigger>
      <Combobox.Content testID="combobox-content">
        <Combobox.List>
          <Combobox.Item value="Item 1">
            <Primitive.Text el="span">Item 1</Primitive.Text>
          </Combobox.Item>
          <Combobox.Item value="Item 2" testID="item-2">
            <Primitive.Text el="span">Item 2</Primitive.Text>
          </Combobox.Item>
          <Combobox.Item value="Item 3">
            <Primitive.Text el="span">Item 3</Primitive.Text>
          </Combobox.Item>
        </Combobox.List>
      </Combobox.Content>
    </Combobox>
  )
}

describe('Combobox', () => {
  test('it should open the list when the trigger is pressed', async () => {
    const {getByTestId} = render(<ComboboxComponent />)

    const trigger = getByTestId('combobox-trigger')
    expect(trigger).toBeVisible()

    fireEvent.press(trigger)

    const content = getByTestId('combobox-content')

    expect(content).toHaveProp('accessibilityState', {expanded: true})
    expect(content).toBeVisible()
  })
  test('clicking an item should change the value ', async () => {
    const {getByTestId} = render(<ComboboxComponent />)
    const trigger = getByTestId('combobox-trigger')
    fireEvent.press(trigger)

    const item = getByTestId('item-2')
    fireEvent.press(item)

    expect(trigger).toHaveTextContent('Item 2')
  })
})
