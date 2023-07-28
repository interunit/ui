'use client'

import {Primitive} from '@interunit/primitives'

const Page = () => {
  return (
    <>
      <Primitive.Box
        el="div"
        sp={{p: [2]}}
        bg={{c: 'red'}}
        bdr={{c: 'yellow', w: '10', r: '20', s: 'dashed'}}
      >
        <Primitive.Text el="span">Regular Box</Primitive.Text>
      </Primitive.Box>

    </>
  )
}

export default Page
