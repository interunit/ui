import {Primitive} from '@interunit/primitives'

const Content = () => {
  return (
    <>
      <Primitive.Text as="h1" type="heading" sz="md" >
        this is imported from the library with correct props
      </Primitive.Text>
    </>
  )
}
export {Content}
