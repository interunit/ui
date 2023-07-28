'use client'

import {Popover} from '@interunit/popover'
import {Primitive} from '@interunit/primitives'
import {useSW} from '@interunit/responsive'

import {Button} from '@/components/system/Button'
import {Text} from '@/components/system/Text'
import {theme} from '@/theme.config'

const PopoverPage = () => {
  const {sw} = useSW()

  return (
    <div>
      <Popover
        triggerType="click"
        popoverPositioning={{
          side: sw > 1025 ? 'right' : 'bottom',
          offset: 10,
          zIndex: 10,
          width: '200px',
          arrow: {
            fillColor: theme?.colors['bg-primary'],
            strokeColor: theme?.colors.border,
            strokeWidth: 1,
            width: 10,
            borderRadius: 2
          }
        }}
      >
        <Popover.Trigger>
          <Button color={'bg-secondary'}>Click me</Button>
        </Popover.Trigger>
        <Popover.Content>
          <Primitive.Box
            el="div"
            className={'bg-bg-primary border-[1px] border-border rounded p-4'}
          >
            <Text el="span">
              The content test test <br /> test <br /> test
            </Text>
          </Primitive.Box>
        </Popover.Content>
      </Popover>
    </div>
  )
}
export default PopoverPage
