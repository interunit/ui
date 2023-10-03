import {render} from '@testing-library/react'
import {axe} from 'jest-axe'

import {Image, ImageConstruct} from './Image'

describe('Image', () => {
  test('should have no accessibility violations', async () => {
    const {container} = render(
      <Image el="img" src="https://interunit.dev/favicon.ico" alt="image" />
    )
    expect(await axe(container)).toHaveNoViolations()
  })
  test('should render the passed el', () => {
    const elements = Object.keys(ImageConstruct)
    elements.forEach(el => {
      const {container} = render(
        <Image
          el={el as keyof typeof ImageConstruct}
          src="https://interunit.dev/favicon.ico"
          alt="image"
        />
      )
      expect(container?.firstChild?.nodeName).toBe(el.toUpperCase())
    })
  })
})
