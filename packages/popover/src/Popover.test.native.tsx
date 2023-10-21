import {fireEvent, render} from '@interunit/jest/native'
import {Primitive} from '@interunit/primitives'

import {Popover} from './Popover'

const PopoverComponent = () => {
  return (
    <Popover defaultValue={false}>
      <Popover.Trigger testID="trigger">
        <Primitive.Text el="span">Trigger</Primitive.Text>
      </Popover.Trigger>
      <Popover.Content testID="content">
        <Primitive.Text el="span">Content</Primitive.Text>
      </Popover.Content>
    </Popover>
  )
}

describe('Popover', () => {
  test('renders component', () => {
    const {queryByTestId} = render(<PopoverComponent />)
    expect(queryByTestId('trigger')).toBeTruthy()
  })
  test('it should open the content when the trigger is pressed', async () => {
    const {queryByTestId} = render(<PopoverComponent />)
    const trigger = queryByTestId('trigger')
    fireEvent.press(trigger)
    const content = queryByTestId('content')
    expect(content).toBeVisible()
  })
  test('it should close the content when the trigger is pressed again', async () => {
    const {queryByTestId} = render(<PopoverComponent />)
    fireEvent.press(queryByTestId('trigger'))
    expect(queryByTestId('content')).toBeVisible()
    fireEvent.press(queryByTestId('trigger'))
    expect(queryByTestId('content')).toBeNull()
  })
})
