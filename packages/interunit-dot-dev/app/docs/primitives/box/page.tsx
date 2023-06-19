'use client'

import {Primitive} from '@interunit/primitives'

const Page = () => {
  return (
    <>
      <Primitive.Box as="div" sp={{p: [2]}} bg={{c: 'red'}} bdr={{ c: 'yellow', w: '10', r: '20', s: 'dashed'}}>
        <Primitive.Text as="span">Regular Box</Primitive.Text>
      </Primitive.Box>

      <Primitive.Box as="child" sp={{p: [5]}} bg={{c: 'blue'}}>
        <Primitive.Text as="span">Box Targeting Child</Primitive.Text>
      </Primitive.Box>
    </>
  )
}

export default Page
