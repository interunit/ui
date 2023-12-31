import {axe, render, userEvent} from '@interunit/jest/web'

import {Tabs} from './Tabs'

const TabsComponent = ({defaultValue = '1'}) => {
  return (
    <Tabs defaultValue={defaultValue}>
      <Tabs.TriggerList>
        <Tabs.Trigger value="1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="3">Tab 3</Tabs.Trigger>
      </Tabs.TriggerList>
      <Tabs.Content value="1">Tab 1 content</Tabs.Content>
      <Tabs.Content value="2">Tab 2 content</Tabs.Content>
      <Tabs.Content value="3">Tab 3 content</Tabs.Content>
    </Tabs>
  )
}
const TabsComponentWithoutContent = ({defaultValue = '1'}) => {
  return (
    <Tabs defaultValue={defaultValue}>
      <Tabs.TriggerList>
        <Tabs.Trigger value="1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="3">Tab 3</Tabs.Trigger>
      </Tabs.TriggerList>
    </Tabs>
  )
}
describe('Tabs', () => {
  test('should have no accessibility violations', async () => {
    const {container} = render(<TabsComponent />)
    expect(await axe(container)).toHaveNoViolations()
  })
  test('default data attributes exist', async () => {
    const {container} = render(<TabsComponent />)
    const tab1 = container.querySelector('[data-tab-value="1"]')
    const tab2 = container.querySelector('[data-tab-value="2"]')
    const tab3 = container.querySelector('[data-tab-value="3"]')
    const tab1Content = container.querySelector('[data-tab-content="1"]')
    const tab2Content = container.querySelector('[data-tab-content="2"]')
    const tab3Content = container.querySelector('[data-tab-content="3"]')

    expect(tab1).toHaveAttribute('data-state', 'active')
    expect(tab2).toHaveAttribute('data-state', 'inactive')
    expect(tab3).toHaveAttribute('data-state', 'inactive')
    expect(tab1Content).not.toHaveAttribute('hidden')
    expect(tab2Content).toHaveAttribute('hidden')
    expect(tab3Content).toHaveAttribute('hidden')
  })
  test('prev and next keyboard navigation works', async () => {
    const user = userEvent.setup()

    const {container} = render(<TabsComponent />)
    const tab1 = container.querySelector('[data-tab-value="1"]')
    const tab2 = container.querySelector('[data-tab-value="2"]')
    const tab1Content = container.querySelector('[data-tab-content="1"]')

    tab1.focus()

    await user.keyboard('{ArrowRight}')

    expect(tab1).toHaveAttribute('data-state', 'inactive')
    expect(tab2).toHaveAttribute('data-state', 'active')
    expect(tab1Content).toHaveAttribute('hidden')

    await user.keyboard('{ArrowLeft}')

    expect(tab1).toHaveAttribute('data-state', 'active')
    expect(tab2).toHaveAttribute('data-state', 'inactive')
    expect(tab1Content).not.toHaveAttribute('hidden')
  })
  test('keyboard navigation looping works', async () => {
    const user = userEvent.setup()

    const {container} = render(<TabsComponent />)
    const tab1 = container.querySelector('[data-tab-value="1"]')
    const tab3 = container.querySelector('[data-tab-value="3"]')
    const tab3Content = container.querySelector('[data-tab-content="3"]')

    tab1.focus()

    await user.keyboard('{ArrowLeft}')

    expect(tab1).toHaveAttribute('data-state', 'inactive')
    expect(tab3).toHaveAttribute('data-state', 'active')
    expect(tab3Content).not.toHaveAttribute('hidden')
  })
  test('tabbing into Tabs selects first tab', async () => {
    const user = userEvent.setup()
    const {container} = render(
      <div>
        <button data-outside="1">Button</button>
        <TabsComponent />
        <button data-outside="2">Button</button>
      </div>
    )

    const outside1 = container.querySelector('[data-outside="1"]')
    const tab1 = container.querySelector('[data-tab-value="1"]')

    outside1.focus()

    expect(outside1).toHaveFocus()

    await user.tab()

    expect(tab1).toHaveFocus()
  })
  test('tabbing into Tabs selects active tab', async () => {
    const user = userEvent.setup()
    const {container} = render(
      <div>
        <button data-outside="1">Button</button>
        <TabsComponent defaultValue={'2'} />
      </div>
    )

    const outside1 = container.querySelector('[data-outside="1"]')
    const tab2 = container.querySelector('[data-tab-value="2"]')

    outside1.focus()

    expect(outside1).toHaveFocus()

    await user.tab()

    expect(tab2).toHaveFocus()
  })
  test('shift tabbing into Tabs selects active tab', async () => {
    const user = userEvent.setup()
    const {container} = render(
      <div>
        <TabsComponent defaultValue={'2'} />
      </div>
    )
    const tab2 = container.querySelector('[data-tab-value="2"]')
    const tab2Content = container.querySelector('[data-tab-content="2"]')

    tab2Content.focus()

    expect(tab2Content).toHaveFocus()

    await user.tab({shift: true})

    expect(tab2).toHaveFocus()
  })
  test('tabbing from Tabs trigger focuses content', async () => {
    const user = userEvent.setup()
    const {container} = render(
      <div>
        <TabsComponent defaultValue={'2'} />
      </div>
    )
    const tab2 = container.querySelector('[data-tab-value="2"]')
    const tab2Content = container.querySelector('[data-tab-content="2"]')

    tab2.focus()

    expect(tab2).toHaveFocus()

    await user.tab()

    expect(tab2Content).toHaveFocus()
  })
  test('works without Tabs.Content', async () => {
    const user = userEvent.setup()
    const {container} = render(
      <div>
        <button data-outside="1">Button</button>
        <TabsComponentWithoutContent defaultValue={'2'} />
        <button data-outside="2">Button</button>
      </div>
    )
    const outside1 = container.querySelector('[data-outside="1"]')
    const outside2 = container.querySelector('[data-outside="2"]')
    const tab2 = container.querySelector('[data-tab-value="2"]')

    tab2.focus()

    expect(tab2).toHaveFocus()

    await user.tab()

    expect(outside2).toHaveFocus()

    await user.tab({shift: true})

    expect(tab2).toHaveFocus()

    await user.tab({shift: true})

    expect(outside1).toHaveFocus()
  })
})
