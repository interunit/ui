import {axe, render, userEvent} from '@interunit/jest/web'

import {Popover} from './Popover'

const PopoverComponent = ({
  interaction = 'click',
  side = 'bottom',
  align = 'center',
  offset = 0,
  width = undefined
}: {
  interaction?: 'click' | 'hover' | 'none'
  side?: 'top' | 'bottom' | 'left' | 'right'
  align?: 'start' | 'center' | 'end'
  offset?: number
  width?: number | 'trigger'
}) => {
  return (
    <Popover defaultValue={false}>
      <Popover.Trigger interaction={interaction}>Trigger</Popover.Trigger>
      <Popover.Content positioning={{side, align, offset, width}}>
        Content
      </Popover.Content>
    </Popover>
  )
}

describe('Popover', () => {
  test('it should have no accessibility violations', async () => {
    const user = userEvent.setup()
    const {container} = render(<PopoverComponent />)

    expect(await axe(container)).toHaveNoViolations()
    const trigger = container.querySelector('[data-popover-trigger]')
    user.click(trigger)

    expect(await axe(container)).toHaveNoViolations()
  })
  test('it should open the content when the trigger is clicked', async () => {
    const user = userEvent.setup()
    const {container} = render(<PopoverComponent />)

    const trigger = container.querySelector('[data-popover-trigger]')
    expect(trigger).toBeInTheDocument()

    const content = container.querySelector('[data-popover-content]')

    await user.click(trigger)

    expect(content).toHaveAttribute('aria-hidden', 'false')
    expect(content).toBeVisible()
  })

  test('it should close the content when the trigger is clicked again', async () => {
    const user = userEvent.setup()
    const {container} = render(<PopoverComponent />)

    const trigger = container.querySelector('[data-popover-trigger]')
    expect(trigger).toBeInTheDocument()

    const content = container.querySelector('[data-popover-content]')

    await user.click(trigger)
    await user.click(trigger)

    expect(content).toHaveAttribute('aria-hidden', 'true')
    expect(content).not.toBeVisible()
  })
  test('it should close the content when the user clicks outside of the popover', async () => {
    const user = userEvent.setup()
    const {container} = render(<PopoverComponent />)

    const trigger = container.querySelector('[data-popover-trigger]')
    expect(trigger).toBeInTheDocument()

    const content = container.querySelector('[data-popover-content]')

    await user.click(trigger)
    await user.click(document.body)

    expect(content).toHaveAttribute('aria-hidden', 'true')
    expect(content).not.toBeVisible()
  })

  test('it should close the content when the user presses the escape key', async () => {
    const user = userEvent.setup()
    const {container} = render(<PopoverComponent />)

    const trigger = container.querySelector('[data-popover-trigger]')
    expect(trigger).toBeInTheDocument()

    const content = container.querySelector('[data-popover-content]')

    await user.click(trigger)
    await user.keyboard('{Escape}')

    expect(content).toHaveAttribute('aria-hidden', 'true')
    expect(content).not.toBeVisible()
  })
  test('it should open on hover and close on mouse leave', async () => {
    const user = userEvent.setup()
    const {container} = render(<PopoverComponent interaction="hover" />)

    const trigger = container.querySelector('[data-popover-trigger]')
    expect(trigger).toBeInTheDocument()

    const content = container.querySelector('[data-popover-content]')

    await user.hover(trigger)

    expect(content).toHaveAttribute('aria-hidden', 'false')
    expect(content).toBeVisible()

    await user.unhover(trigger)

    expect(content).toHaveAttribute('aria-hidden', 'true')
    expect(content).not.toBeVisible()
  })
  test('space should open when focusing on the trigger', async () => {
    const user = userEvent.setup()
    const {container} = render(<PopoverComponent />)

    const trigger = container.querySelector('[data-popover-trigger]')
    const content = container.querySelector('[data-popover-content]')

    await trigger.focus()

    await user.type(trigger, '{Space}')

    expect(content).toHaveAttribute('aria-hidden', 'false')
    expect(content).toBeVisible()
  })
  test('enter should open when focusing on the trigger', async () => {
    const user = userEvent.setup()
    const {container} = render(<PopoverComponent />)

    const trigger = container.querySelector('[data-popover-trigger]')
    const content = container.querySelector('[data-popover-content]')

    await trigger.focus()

    await user.keyboard('{Enter}')

    expect(content).toHaveAttribute('aria-hidden', 'false')
    expect(content).toBeVisible()
  })
  test('hovering off content closes popover', async () => {
    const user = userEvent.setup()
    const {container} = render(<PopoverComponent interaction="hover" />)

    const trigger = container.querySelector('[data-popover-trigger]')
    const content = container.querySelector('[data-popover-content]')

    await user.hover(trigger)

    expect(content).toHaveAttribute('aria-hidden', 'false')
    expect(content).toBeVisible()

    await user.unhover(content)

    expect(content).toHaveAttribute('aria-hidden', 'true')
    expect(content).not.toBeVisible()
  })
  describe('positioning', () => {
    test('opens top', async () => {
      const user = userEvent.setup()
      const {container} = render(<PopoverComponent side="top" />)

      const trigger = container.querySelector('[data-popover-trigger]')
      const content = container.querySelector('[data-popover-content]')

      await user.click(trigger)

      expect(content).toHaveAttribute('data-popover-side', 'top')
      expect(content).toHaveAttribute('data-popover-align', 'center')

      expect(content).toHaveAttribute('aria-hidden', 'false')
      expect(content).toBeVisible()
    })
    test('opens bottom', async () => {
      const user = userEvent.setup()
      const {container} = render(<PopoverComponent side="bottom" />)

      const trigger = container.querySelector('[data-popover-trigger]')
      const content = container.querySelector('[data-popover-content]')

      await user.click(trigger)

      expect(content).toHaveAttribute('data-popover-side', 'bottom')
      expect(content).toHaveAttribute('data-popover-align', 'center')

      expect(content).toHaveAttribute('aria-hidden', 'false')
      expect(content).toBeVisible()
    })
    test('opens left', async () => {
      const user = userEvent.setup()
      const {container} = render(<PopoverComponent side="left" />)

      const trigger = container.querySelector('[data-popover-trigger]')
      const content = container.querySelector('[data-popover-content]')

      await user.click(trigger)

      expect(content).toHaveAttribute('data-popover-side', 'left')
      expect(content).toHaveAttribute('data-popover-align', 'center')

      expect(content).toHaveAttribute('aria-hidden', 'false')
      expect(content).toBeVisible()
    })
    test('opens right', async () => {
      const user = userEvent.setup()
      const {container} = render(<PopoverComponent side="right" />)

      const trigger = container.querySelector('[data-popover-trigger]')
      const content = container.querySelector('[data-popover-content]')

      await user.click(trigger)

      expect(content).toHaveAttribute('data-popover-side', 'right')
      expect(content).toHaveAttribute('data-popover-align', 'center')

      expect(content).toHaveAttribute('aria-hidden', 'false')
      expect(content).toBeVisible()
    })
    test('aligns center', async () => {
      const user = userEvent.setup()
      const {container} = render(<PopoverComponent align="center" />)

      const trigger = container.querySelector('[data-popover-trigger]')
      const content = container.querySelector('[data-popover-content]')

      await user.click(trigger)

      expect(content).toHaveAttribute('data-popover-side', 'bottom')
      expect(content).toHaveAttribute('data-popover-align', 'center')

      expect(content).toHaveAttribute('aria-hidden', 'false')
      expect(content).toBeVisible()
    })
    test('aligns start', async () => {
      const user = userEvent.setup()
      const {container} = render(<PopoverComponent align="start" />)

      const trigger = container.querySelector('[data-popover-trigger]')
      const content = container.querySelector('[data-popover-content]')

      await user.click(trigger)

      expect(content).toHaveAttribute('data-popover-side', 'bottom')
      expect(content).toHaveAttribute('data-popover-align', 'start')

      expect(content).toHaveAttribute('aria-hidden', 'false')
      expect(content).toBeVisible()
    })
    test('aligns end', async () => {
      const user = userEvent.setup()
      const {container} = render(<PopoverComponent align="end" />)

      const trigger = container.querySelector('[data-popover-trigger]')
      const content = container.querySelector('[data-popover-content]')

      await user.click(trigger)

      expect(content).toHaveAttribute('data-popover-side', 'bottom')
      expect(content).toHaveAttribute('data-popover-align', 'end')

      expect(content).toHaveAttribute('aria-hidden', 'false')
      expect(content).toBeVisible()
    })
  })
  test('still renders with offset', async () => {
    const user = userEvent.setup()
    const {container} = render(<PopoverComponent offset={10} />)

    const trigger = container.querySelector('[data-popover-trigger]')
    const content = container.querySelector('[data-popover-content]')

    await user.click(trigger)

    expect(content).toHaveAttribute('aria-hidden', 'false')
    expect(content).toBeVisible()
  })
  test('still renders with trigger width', async () => {
    const user = userEvent.setup()
    const {container} = render(<PopoverComponent width={'trigger'} />)

    const trigger = container.querySelector('[data-popover-trigger]')
    const content = container.querySelector('[data-popover-content]')

    await user.click(trigger)

    expect(content).toHaveAttribute('aria-hidden', 'false')
    expect(content).toBeVisible()
  })
})
