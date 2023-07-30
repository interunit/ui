import {render} from '@testing-library/react'
import {axe} from 'jest-axe'
import React from 'react'

import {Box, BoxConstruct} from './Box'

describe('Box', () => {
  test('should have no accessibility violations', async () => {
    const {container} = render(<Box el="div">Box</Box>)
    expect(await axe(container)).toHaveNoViolations()
  })
  test('should error if not a valid element', () => {
    // TODO: move this to a matcher
    jest.spyOn(console, 'error')
    console.error = jest.fn()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => render(<Box el="invalid">Box</Box>)).toThrow()
    console.error = jest.fn()
  })
  test('should render the passed el', () => {
    const elements = Object.keys(BoxConstruct)
    elements.forEach(el => {
      const {container} = render(<Box el={el as keyof typeof BoxConstruct} />)
      expect(container?.firstChild?.nodeName).toBe(el.toUpperCase())
    })
  })
})
