import {axe, render, userEvent} from '@interunit/jest/web'

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
    const user = userEvent.setup()
    const {container} = render(<CollapsibleComponent />)
    const results = await axe(container)
    const trigger = container.querySelector('[role="button"]')

    expect(results).toHaveNoViolations()

    trigger.focus()
    await user.type(trigger, '{Space}')

    const openResults = await axe(container)
    expect(openResults).toHaveNoViolations()
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
  test('a11y keyboard navigation should work', async () => {
    // For some reason user.keyboard doesn't seem to work here?
    const user = userEvent.setup()
    const {container} = render(
      <div>
        <CollapsibleComponent />
      </div>
    )

    const trigger = container.querySelector('[role="button"]')
    trigger.focus()

    expect(trigger).toHaveFocus()
    await user.type(trigger, '{Space}')

    const content = container.querySelector('[role="region"]')
    expect(content).toBeVisible()

    await user.keyboard(trigger, '{Space}')
    expect(content).not.toBeVisible()

    await user.type(trigger, '{Enter}', {skipClick: true})
    expect(content).toBeVisible()

    await user.type(trigger, '{Enter}', {skipClick: true})
    expect(content).not.toBeVisible()
  })
})
