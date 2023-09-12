import {fireEvent, render} from '@interunit/jest/native'
import {P} from '@interunit/primitives'

import {Tabs} from './Tabs'

const TabsComponent = ({defaultValue = 'home'}) => {
  return (
    <Tabs defaultValue={defaultValue} testID="tabs">
      <Tabs.TriggerList className="flex flex-row justify-between w-screen bg-white p-4">
        <Tabs.Trigger
          value={'home'}
          aria-label="View the home content"
          asChild
          testID="home"
        >
          <P.BT el="button">
            <P.TX el="span" className="text-blue">
              Home
            </P.TX>
          </P.BT>
        </Tabs.Trigger>
        <Tabs.Trigger
          value="about"
          aria-label="View the about content"
          asChild
          testID="about"
        >
          <P.BT el="button">
            <P.TX el="span" className="text-blue">
              About
            </P.TX>
          </P.BT>
        </Tabs.Trigger>
        <Tabs.Trigger
          value="contact"
          aria-label="View the contact content"
          asChild
        >
          <P.BT el="button">
            <P.TX el="span" className="text-blue">
              Contact
            </P.TX>
          </P.BT>
        </Tabs.Trigger>
      </Tabs.TriggerList>
      <P.BX
        className="w-full border-border border-[2px] rounded p-4 mt-4"
        el="div"
      >
        <Tabs.Content value="home">
          <P.TX el="span">Home</P.TX>
        </Tabs.Content>
        <Tabs.Content value="about">
          <P.TX el="span">About</P.TX>
        </Tabs.Content>
        <Tabs.Content value="contact">
          <P.TX el="span">Contact</P.TX>
        </Tabs.Content>
      </P.BX>
    </Tabs>
  )
}

describe('Tabs', () => {
  test('renders tabs component', async () => {
    const {getByTestId} = render(<TabsComponent />)
    expect(getByTestId('tabs')).toBeVisible()
  })
  test('pressing tab shows the content', async () => {
    const {getByTestId} = render(<TabsComponent />)
    const homeTab = getByTestId('home')
    const aboutTab = getByTestId('about')

    expect(homeTab).toHaveProp('accessibilityState', {selected: true})

    fireEvent.press(aboutTab)

    expect(homeTab).toHaveProp('accessibilityState', {selected: false})
    expect(aboutTab).toHaveProp('accessibilityState', {selected: true})
  })
})
