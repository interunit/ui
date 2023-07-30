import {render} from '@testing-library/react'
import {axe} from 'jest-axe'
import React from 'react'

import {Button, ButtonConstruct} from './Button'

describe('Button', () => {
  test('should have no accessibility violations', async () => {
    const {container} = render(<Button el="button">Box</Button>)
    expect(await axe(container)).toHaveNoViolations()
  })
  test('should error if not a valid element', () => {
    // TODO: move this to a matcher
    jest.spyOn(console, 'error')
    console.error = jest.fn()
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      render(<Button el="invalid">Button</Button>)
    }).toThrow()
    console.error = jest.fn()
  })
  test('should render the passed el', () => {
    const elements = Object.keys(ButtonConstruct)
    elements.forEach(el => {
      const {container} = render(
        <Button el={el as keyof typeof ButtonConstruct} />
      )
      expect(container?.firstChild?.nodeName).toBe(el.toUpperCase())
    })
  })
})
