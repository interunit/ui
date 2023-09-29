import {axe, render, userEvent} from '@interunit/jest/web'
import React from 'react'

import {Combobox} from './Combobox'

const ComboboxComponent = () => {
  const [value, setValue] = React.useState('Item 1')
  return (
    <Combobox value={value} onValueChange={setValue}>
      <Combobox.Label>Label</Combobox.Label>
      <Combobox.Trigger>{value}</Combobox.Trigger>
      <Combobox.Content>
        <Combobox.List>
          <Combobox.Item value="Item 1">Item 1</Combobox.Item>
          <Combobox.Item value="Item 2">Item 2</Combobox.Item>
          <Combobox.Item value="Item 3">Item 3</Combobox.Item>
        </Combobox.List>
      </Combobox.Content>
    </Combobox>
  )
}

describe('Combobox', () => {
  test('it should have no accessibility violations', async () => {
    const {container} = render(<ComboboxComponent />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
  test('it should open the list when the trigger is clicked', async () => {
    const user = userEvent.setup()

    const {container} = render(<ComboboxComponent />)

    const trigger = container.querySelector('[data-combobox-trigger]')
    expect(trigger).toBeInTheDocument()

    const content = container.querySelector('[data-combobox-content]')

    await user.click(trigger)

    expect(content).toHaveAttribute('aria-expanded', 'true')
    expect(content).toBeVisible()
  })
  test('it should close the list when the trigger is clicked again', async () => {
    const user = userEvent.setup()

    const {container} = render(<ComboboxComponent />)

    const trigger = container.querySelector('[data-combobox-trigger]')
    expect(trigger).toBeInTheDocument()

    const content = container.querySelector('[data-combobox-content]')

    await user.click(trigger)
    await user.click(trigger)

    expect(content).toHaveAttribute('aria-expanded', 'false')
    expect(content).not.toBeVisible()
  })
  test('the user should be able to use arrow keys to select a value', async () => {
    const user = userEvent.setup()

    const {container} = render(<ComboboxComponent />)

    const trigger = container.querySelector('[data-combobox-trigger]')

    trigger.focus()

    const item1 = container.querySelector('[data-combobox-item-value="Item 1"]')
    const item2 = container.querySelector('[data-combobox-item-value="Item 2"]')
    // const item3 = container.querySelector('[data-combobox-item="Item 3"]')

    await user.keyboard('{ArrowDown}')

    expect(item1).toHaveAttribute('data-combobox-item-focused', 'true')

    await user.keyboard('{ArrowDown}')

    expect(item1).toHaveAttribute('data-combobox-item-focused', 'false')
    expect(item2).toHaveAttribute('data-combobox-item-focused', 'true')

    await user.keyboard('{ArrowUp}')

    expect(item1).toHaveAttribute('data-combobox-item-focused', 'true')
    expect(item2).toHaveAttribute('data-combobox-item-focused', 'false')

    await user.keyboard('{ArrowDown}')
    await user.keyboard('{Enter}')

    trigger.focus()

    expect(item2).toHaveAttribute('aria-selected', 'true')
    expect(trigger).toHaveTextContent('Item 2')
  })
  test('the combobox closes onBlur', async () => {
    const user = userEvent.setup()

    const {container} = render(<ComboboxComponent />)

    const trigger = container.querySelector('[data-combobox-trigger]')
    expect(trigger).toBeInTheDocument()

    const content = container.querySelector('[data-combobox-content]')
    expect(content).toBeInTheDocument()

    await user.click(trigger)

    expect(content).toHaveAttribute('aria-expanded', 'true')

    await user.tab()

    expect(content).toHaveAttribute('aria-expanded', 'false')
    expect(content).not.toBeVisible()
  })
  test('clicking on an item should change the value', async () => {
    const user = userEvent.setup()

    const {container} = render(<ComboboxComponent />)

    const trigger = container.querySelector('[data-combobox-trigger]')
    expect(trigger).toBeInTheDocument()

    const content = container.querySelector('[data-combobox-content]')
    expect(content).toBeInTheDocument()

    await user.click(trigger)

    const item2 = container.querySelector('[data-combobox-item-value="Item 2"]')
    expect(item2).toBeInTheDocument()

    await user.click(item2)

    expect(trigger).toHaveTextContent('Item 2')
  })
})
