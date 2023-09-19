import {fireEvent, render} from '@interunit/jest/native'
import {P} from '@interunit/primitives'

import {Collapsible} from './Collapsible'

const CollapsibleComponent = ({defaultValue = false, ...props}) => {
  return (
    <Collapsible defaultValue={defaultValue} {...props}>
      <Collapsible.Trigger {...props} testID="trigger">
        <P.TX el="span">Trigger</P.TX>
      </Collapsible.Trigger>
      <Collapsible.Content {...props} testID="content">
        Content
      </Collapsible.Content>
    </Collapsible>
  )
}

describe('Collapsible', () => {
  test('renders collapsible component', () => {
    const {getByTestId} = render(<CollapsibleComponent />)
    expect(getByTestId('trigger')).toBeVisible()
  })
  test('pressing trigger shows the content', () => {
    const {queryByTestId} = render(<CollapsibleComponent />)
    expect(queryByTestId('content')).toBeNull()
    fireEvent.press(queryByTestId('trigger'))
    expect(queryByTestId('content')).toBeVisible()
    fireEvent.press(queryByTestId('trigger'))
    expect(queryByTestId('content')).toBeNull()
  })
})
