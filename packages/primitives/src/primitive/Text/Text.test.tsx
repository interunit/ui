import {render} from '@testing-library/react'
import {axe} from 'jest-axe'

import {Text, TextConstruct} from './Text'

describe('Text', () => {
  test('should have no accessibility violations', async () => {
    const {container} = render(<Text el="span">Box</Text>)
    expect(await axe(container)).toHaveNoViolations()
  })
  test('should error if not a valid element', () => {
    // TODO: move this to a matcher
    jest.spyOn(console, 'error')
    console.error = jest.fn()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignorediv
    expect(() => render(<Text el="invalid">Box</Text>)).toThrow()
    console.error = jest.fn()
  })
  test('should render the passed el', () => {
    const elements = Object.keys(TextConstruct)
    elements.forEach(el => {
      const {container} = render(<Text el={el as keyof typeof TextConstruct} />)
      expect(container?.firstChild?.nodeName).toBe(el.toUpperCase())
    })
  })
})
