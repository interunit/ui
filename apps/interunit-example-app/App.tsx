
import {InterUnitProvider} from '@interunit/config'
import {Popover} from '@interunit/popover'
import {Primitive} from '@interunit/primitives'

import {config} from './interunit.config'

const Test = () => {
  return (
    <Primitive.Box
      as="div"
      style={{height: '100%', flex: 1, marginTop: 30, padding: 20}}
    >
      <Primitive.Box as="div" collapsable={false}>
        <Popover
          triggerType="click"
          popoverPositioning={{
            side: 'bottom',
            align: 'end',
            offset: 10,
            width: 'trigger'
          }}
        >
          <Popover.Trigger>
            <Primitive.Button
              as="button"
              style={{
                width: 200,
                backgroundColor: 'blue',
                padding: 20,
                color: 'white'
              }}
            >
              <Primitive.Text as="span">Press me</Primitive.Text>
            </Primitive.Button>
          </Popover.Trigger>
          <Popover.Content>
            <Primitive.Box
              as="div"
              style={{
                backgroundColor: 'red',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Primitive.Text as="span">Popover content</Primitive.Text>
            </Primitive.Box>
          </Popover.Content>
        </Popover>
      </Primitive.Box>
    </Primitive.Box>
  )
}

export default function App() {
  return (
    <InterUnitProvider config={config}>
      <Test />
    </InterUnitProvider>
  )
}
