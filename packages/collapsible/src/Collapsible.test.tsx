import {axe, render, userEvent, waitFor} from '@interunit/jest/web'

import {Collapsible} from './Collapsible'

const CollapsibleComponent = ({defaultValue = false, ...props}) => {
  return (
    <Collapsible defaultValue={defaultValue} {...props}>
      <Collapsible.Trigger {...props}>Trigger</Collapsible.Trigger>
      <Collapsible.Content {...props}>Content</Collapsible.Content>
    </Collapsible>
  )
}

describe('Collapsible', () => {
  test('should have no accessibility violations', async () => {
    const {container} = render(<CollapsibleComponent />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
  test('generated id should match', () => {
    const {getByText} = render(<CollapsibleComponent />)
    const trigger = getByText('Trigger')
    const content = getByText('Content')

    const contentAttribute = content.getAttribute('id')
    const triggerAttribute = trigger.getAttribute('aria-controls')

    expect(triggerAttribute).toEqual(contentAttribute)
  })
  test('passed id should match', () => {
    const {getByText} = render(
      <CollapsibleComponent id="test" aria-controls="test" />
    )
    const trigger = getByText('Trigger')
    const content = getByText('Content')

    expect(trigger).toHaveAttribute('aria-controls', 'test')
    expect(content).toHaveAttribute('id', 'test')
  })
  test('basic keyboard navigation should work', async () => {
    const user = userEvent.setup()
    const {getByText} = render(<CollapsibleComponent />)
    const trigger = getByText('Trigger')
    const content = getByText('Content')

    trigger.focus()

    expect(trigger).toHaveFocus()

    await user.keyboard('{Space}')
    await waitFor(() => expect(content).toBeVisible())
    user.keyboard('{Space}')
    await waitFor(() => expect(content).not.toBeVisible())
  })
})
