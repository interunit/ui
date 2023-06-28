import {Popover} from '@interunit/popover'
import {Primitive} from '@interunit/primitives'

export default function App() {
  return (
    <Primitive.Box as="div">
      <Popover
        popoverPositioning={{
          placement: 'bottom-start',
          offset: 10,
          arrow: {
            fill: 'red',
            stroke: 'blue',
            strokeWidth: 1
          }
        }}
      >
        <Popover.Trigger>
          <Primitive.Button
            as="button"
            bg={{c: 'white'}}
            sp={{p: 1}}
            bdr={{c: 'black', w: 1, r: 8}}
            style={{width: 100}}
          >
            <Primitive.Text as="span">Press me</Primitive.Text>
          </Primitive.Button>
        </Popover.Trigger>
        <Popover.Content>
          <Primitive.Box as="div" bg={{c: 'black'}} bdr={{r: 8}} sp={{p: 1}}>
            <Primitive.Text as="span" fnt={{c: 'white'}}>
              Popover content
            </Primitive.Text>
          </Primitive.Box>
        </Popover.Content>
      </Popover>
    </Primitive.Box>
  )
}
