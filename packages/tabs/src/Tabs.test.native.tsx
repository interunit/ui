import {fireEvent, render} from '@interunit/jest/native'
import {Primitive} from '@interunit/primitives'

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
          <Primitive.Button el="button">
            <Primitive.Text el="span" className="text-blue">
              Home
            </Primitive.Text>
          </Primitive.Button>
        </Tabs.Trigger>
        <Tabs.Trigger
          value="about"
          aria-label="View the about content"
          asChild
          testID="about"
        >
          <Primitive.Button el="button">
            <Primitive.Text el="span" className="text-blue">
              About
            </Primitive.Text>
          </Primitive.Button>
        </Tabs.Trigger>
        <Tabs.Trigger
          value="contact"
          aria-label="View the contact content"
          asChild
        >
          <Primitive.Button el="button">
            <Primitive.Text el="span" className="text-blue">
              Contact
            </Primitive.Text>
          </Primitive.Button>
        </Tabs.Trigger>
      </Tabs.TriggerList>
      <Primitive.Box
        className="w-full border-border border-[2px] rounded p-4 mt-4"
        el="div"
      >
        <Tabs.Content value="home">
          <Primitive.Text el="span">Home</Primitive.Text>
        </Tabs.Content>
        <Tabs.Content value="about">
          <Primitive.Text el="span">About</Primitive.Text>
        </Tabs.Content>
        <Tabs.Content value="contact">
          <Primitive.Text el="span">Contact</Primitive.Text>
        </Tabs.Content>
      </Primitive.Box>
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
