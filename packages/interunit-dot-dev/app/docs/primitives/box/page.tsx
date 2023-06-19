'use client'

import {Primitive} from '@interunit/primitives'

const Page = () => {
  return (
    <>
      <Primitive.Box as="div" sp={{p: [2]}}>
        <Primitive.Text as="span">Regular Box</Primitive.Text>
      </Primitive.Box>

      <Primitive.Box as="child" sp={{p: [5]}}>
        <Primitive.Text as="span">Box Targeting Child</Primitive.Text>
      </Primitive.Box>
    </>
  )
}

export default Page
