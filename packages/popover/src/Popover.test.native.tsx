import {fireEvent, render} from '@interunit/jest/native'
import {P} from '@interunit/primitives'

import {Popover} from './Popover'

const PopoverComponent = () => {
  return (
    <Popover defaultValue={false}>
      <Popover.Trigger>
        <P.TX el="span">Trigger</P.TX>
      </Popover.Trigger>
      <Popover.Content>
        <P.TX el="span">Content</P.TX>
      </Popover.Content>
    </Popover>
  )
}

describe('Popover', () => {
  test('renders component', () => {
    const {getByText} = render(<PopoverComponent />)
    expect(getByText('Trigger')).toBeTruthy()
  })
  test('it should open the content when the trigger is pressed', async () => {
    const {getByText} = render(<PopoverComponent />)
    const trigger = getByText('Trigger')
    fireEvent.press(trigger)
    const content = getByText('Content')
    expect(content).toBeVisible()
  })
  test('it should close the content when the trigger is pressed again', async () => {
    const {getByText} = render(<PopoverComponent />)
    const trigger = getByText('Trigger')
    fireEvent.press(trigger)
    fireEvent.press(trigger)
    const content = getByText('Content')
    expect(content).not.toBeVisible()
  })
})
