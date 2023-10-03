import {fireEvent, render} from '@interunit/jest/native'
import {P} from '@interunit/primitives'

import {Popover} from './Popover'

const PopoverComponent = () => {
  return (
    <Popover defaultValue={false}>
      <Popover.Trigger testID="trigger">
        <P.TX el="span">Trigger</P.TX>
      </Popover.Trigger>
      <Popover.Content testID="content">
        <P.TX el="span">Content</P.TX>
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
