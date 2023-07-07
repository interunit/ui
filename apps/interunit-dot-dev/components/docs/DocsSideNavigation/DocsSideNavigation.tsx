import {VisuallyHidden} from '@interunit/a11y'
import {Popover} from '@interunit/popover'
import {Primitive} from '@interunit/primitives'
import {sw} from '@interunit/responsive'
import {Menu} from 'lucide-react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'

import {Button, ButtonAnchor} from '@/components/system/Button'
import {Text} from '@/components/system/Text'
import {type ThemeColor, theme} from '@/theme.config'

import './DocsSideNavigation.css'

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
        <Primitive.Box el="li">
          <Link href={path + data.slug} legacyBehavior passHref>
            <ButtonAnchor
              el="a"
              color={data.color as ThemeColor}
              variation="xs"
              className={`text-sm ${
                pathname !== path + data.slug ? 'ButtonInActive' : ''
              }`}
            >
              {data.name}
            </ButtonAnchor>
          </Link>
        </Primitive.Box>
      )}
      {data?.sections?.length > 0 && (
        <Primitive.Box
          el="ul"
          className="flex flex-col list-none gap-4 [&_ul]:ml-4"
        >
          {data.sections.map((section, index) => {
            return <RecursiveRender data={section} path={path} key={index} />
          })}
        </Primitive.Box>
      )}
    </>
  )
}

const NavigationList = ({data}: {data: DataItem}) => {
  return (
    <Primitive.Box el="div" className="sticky left-0 top-4 p-4">
      <RecursiveRender data={data} path={'/ui/docs'} />
    </Primitive.Box>
  )
}
const DocsSideNavigation = ({data}: DocsSideNavigationProps) => {
  if (sw(theme.screens.lg)) {
    return (
      <Primitive.Box
        el="nav"
        className="bg-bg-primary border-b-1 border-border h-full [&).iu-popover-arrow]:fill-bg-primary lg:p-4 lg:border-r-1 lg:border-b-0 relative"
      >
        <NavigationList data={data} />
      </Primitive.Box>
    )
  }
  return (
    <Primitive.Box
      el="nav"
      className="bg-bg-primary border-b-1 border-border h-full [&).iu-popover-arrow]:fill-bg-primary lg:p-4 lg:border-r-1 lg:border-b-0 relative"
    >
      <Popover
        triggerType="click"
        popoverPositioning={{
          side: 'bottom',
          align: 'start',
          offset: 12,
          arrow: {
            tipRadius: 2,
            stroke: theme.colors.border,
            strokeWidth: 2
          }
        }}
      >
        <Popover.Trigger>
          <Button
            el="button"
            className="block m-4 lg:hidden"
            color={theme.colors['bg-muted']}
            variation="sm"
          >
            <VisuallyHidden>
              <Text el="span">Open navigation</Text>
            </VisuallyHidden>
            <Menu size={24} role="img" />
          </Button>
        </Popover.Trigger>
        <Popover.Content>
          <Primitive.Box
            el="div"
            className="flex flex-col bg-bg-primary border-border rounded border-1 mx-4 overflow-y-auto"
            style={{width: 'calc(100vw - 2rem)'}}
          >
            <NavigationList data={data} />
          </Primitive.Box>
        </Popover.Content>
      </Popover>
    </Primitive.Box>
  )
}

export {DocsSideNavigation}
