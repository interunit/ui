import {Menu} from 'lucide-react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useTheme} from 'styled-components'

import {Text} from '@/components/system/Text'
import {VisuallyHidden} from '@interunit/a11y'
import {Popover} from '@interunit/popover'
import {sw} from '@interunit/responsive'

import {
  List,
  ListButtonAnchor,
  ListContainer,
  ListItem,
  MenuButton,
  NavigationContainer,
  NavigationPopover
} from './DocsSideNavigation.styled'

type DataItem = {
  name: string
  slug: string
  color: string
  sections: DataItem[]
}
type DocsSideNavigationProps = {
  data: DataItem
}

const RecursiveRender = ({data, path}: {path: string; data: DataItem}) => {
  const pathname = usePathname()
  return (
    <>
      {data.name && (
        <ListItem el="li">
          <Link href={path + data.slug} legacyBehavior passHref>
            <ListButtonAnchor
              el="a"
              color={data.color}
              variation="xs"
              $active={pathname === path + data.slug}
            >
              <Text el="span">{data.name}</Text>
            </ListButtonAnchor>
          </Link>
        </ListItem>
      )}
      {data?.sections?.length > 0 && (
        <List el="ul">
          {data.sections.map((section, index) => {
            return <RecursiveRender data={section} path={path} key={index} />
          })}
        </List>
      )}
    </>
  )
}

const NavigationList = ({data}: {data: DataItem}) => {
  return (
    <ListContainer el="div">
      <RecursiveRender data={data} path={'/ui/docs'} />
    </ListContainer>
  )
}
const DocsSideNavigation = ({data}: DocsSideNavigationProps) => {
  const theme = useTheme()

  if (sw(theme.breakpoint.large)) {
    return (
      <NavigationContainer el="nav">
        <NavigationList data={data} />
      </NavigationContainer>
    )
  }
  return (
    <NavigationContainer el="nav">
      <Popover
        triggerType="click"
        popoverPositioning={{
          side: 'bottom',
          align: 'start',
          offset: 12,
          arrow: {
            tipRadius: 2,
            stroke: theme?.color.border.primary,
            strokeWidth: 2
          }
        }}
      >
        <Popover.Trigger>
          <MenuButton
            el="button"
            color={theme.color.background.muted}
            variation="sm"
          >
            <VisuallyHidden>
              <Text el="span">Open navigation</Text>
            </VisuallyHidden>
            <Menu size={24} role="img" />
          </MenuButton>
        </Popover.Trigger>
        <Popover.Content>
          <NavigationPopover el="div">
            <NavigationList data={data} />
          </NavigationPopover>
        </Popover.Content>
      </Popover>
    </NavigationContainer>
  )
}

export {DocsSideNavigation}
