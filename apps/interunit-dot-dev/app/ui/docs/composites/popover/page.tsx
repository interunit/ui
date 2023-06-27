'use client'

import {useTheme} from '@interunit/config'
import {Popover} from '@interunit/popover'
import {Primitive} from '@interunit/primitives'

const PopoverPage = () => {
  const theme = useTheme()
  return (
    <div>
      <Popover
        onPopoverStateChange={state => console.log(state)}
        popoverPositioning={{
          placement: 'right'
        }}
      >
        <Popover.Trigger>
          <Primitive.Button
            style={{appearance: 'none'}}
            bg={{c: theme?.color.background.secondary}}
            sp={{p: 1}}
            bdr={{c: theme?.color.border.primary, w: 1, r: 8}}
          >
            <Primitive.Text as="span">Click me</Primitive.Text>
          </Primitive.Button>
        </Popover.Trigger>
        <Popover.Content>
          <Primitive.Box
            as="div"
            bg={{c: theme?.color.background.primary}}
            bdr={{c: theme?.color.border.primary, w: 1, r: 8}}
            sp={{p: 1}}
            style={{width: '500px'}}
          >
            The content
          </Primitive.Box>
        </Popover.Content>
      </Popover>
    </div>
  )
}
export default PopoverPage
