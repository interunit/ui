'use client'

import {Popover} from '@interunit/popover'
import {Primitive} from '@interunit/primitives'
import {useTheme} from 'styled-components'

import {Button} from '@/components/system/Button'
import {Text} from '@/components/system/Text'

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
          <Button as="button" color={'bg-secondary'}>
            Click me
          </Button>
        </Popover.Trigger>
        <Popover.Content>
          <Primitive.Box
            el="div"
            className={'backgound-bg-primary border-border rounded p-4 '}
            style={{width: '500px'}}
          >
            <Text el="span" variation="md">
              The content
            </Text>
          </Primitive.Box>
        </Popover.Content>
      </Popover>
    </div>
  )
}
export default PopoverPage
