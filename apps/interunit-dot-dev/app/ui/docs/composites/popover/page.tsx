'use client'

import {useTheme} from 'styled-components'

import {Primitive} from '@/components/primitives'
import {Button} from '@/components/system/Button'
import {Text} from '@/components/system/Text'
import {Popover} from '@interunit/popover'

const PopoverPage = () => {
  const theme = useTheme()
  return (
    <div>
      <Popover
        triggerType="click"
        popoverPositioning={{
          side: 'right',
          offset: 10,
          arrow: {
            fill: theme?.color.background.primary,
            stroke: theme?.color.border.primary,
            strokeWidth: 1,
            tipRadius: 2
          }
        }}
      >
        <Popover.Trigger>
          <Button
            as="button"
            color={theme.color.background.secondary}
          >
            Click me
          </Button>
        </Popover.Trigger>
        <Popover.Content>
          <Primitive.Box
            as="div"
            bg={{c: theme?.color.background.primary}}
            bdr={{c: theme?.color.border.primary, w: 1, r: 8}}
            sp={{p: 1}}
            style={{width: '500px'}}
          >
            <Text as="span" variation="md">
              The content
            </Text>
          </Primitive.Box>
        </Popover.Content>
      </Popover>
    </div>
  )
}
export default PopoverPage
