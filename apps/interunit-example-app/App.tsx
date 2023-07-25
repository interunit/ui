import {Modal} from '@interunit/modal'
import {Primitive} from '@interunit/primitives'
import React from 'react'

const Test = () => {
  const [showModal, setShowModal] = React.useState(false)
  return (
    <Primitive.Box
      el="div"
      style={{height: '100%', flex: 1, marginTop: 30, padding: 20}}
    >
      <Primitive.Button
        el="button"
        onPress={() => setShowModal(true)}
        style={{
          width: 200,
          backgroundColor: 'blue',
          padding: 20,
          color: 'white'
        }}
      >
        <Primitive.Text el="span">Open me</Primitive.Text>
      </Primitive.Button>
      {showModal && (
        <Modal
          style={{backgroundColor: 'red'}}
          onClose={() => setShowModal(false)}
        >
          <Primitive.Button
            el="button"
            onPress={() => setShowModal(false)}
            style={{
              width: 200,
              backgroundColor: 'blue',
              padding: 20,
              color: 'white'
            }}
          >
            <Primitive.Text el="span">Close me</Primitive.Text>
          </Primitive.Button>
        </Modal>
      )}
    </Primitive.Box>
  )
}

export default function App() {
  return <Test />
}
