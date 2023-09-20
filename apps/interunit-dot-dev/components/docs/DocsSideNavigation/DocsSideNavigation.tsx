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
              color={data.color as ThemeColor}
              variation="xs"
              data-active={pathname === path + data.slug}
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
    <Primitive.Box el="div" className="lg:sticky lg:left-0 lg:top-4 p-4">
      <RecursiveRender data={data} path={'/ui/docs'} />
    </Primitive.Box>
  )
}
const DocsSideNavigation = ({data}: DocsSideNavigationProps) => {
  if (sw(theme.screens.lg)) {
    return (
      <Primitive.Box
        el="nav"
        className="bg-bg-primary border-b-1 border-border h-full lg:p-4 lg:border-r-1 lg:border-b-0 relative"
      >
        <NavigationList data={data} />
      </Primitive.Box>
    )
  }
  return (
    <Primitive.Box
      el="nav"
      className="bg-bg-primary border-b-1 p-4 border-border h-full lg:border-r-1 lg:border-b-0"
    >
      <Popover defaultValue={false}>
        <Popover.Trigger asChild>
          <Button
            el="button"
            className="block lg:hidden"
            color="bg-muted"
            variation="sm"
          >
            <VisuallyHidden>
              <Text el="span">Open navigation</Text>
            </VisuallyHidden>
            <Menu size={24} role="img" />
          </Button>
        </Popover.Trigger>
        <Popover.Content
          positioning={{
            side: 'bottom',
            align: 'start',
            offset: 12,
            width: '400px',
            maxWidth: '90vw'
          }}
          arrow={{
            borderRadius: 2,
            strokeColor: theme.colors.border,
            fillColor: theme.colors['bg-primary'],
            strokeWidth: 2,
            size: 12
          }}
          asChild
        >
          <Primitive.Box
            el="div"
            className="flex flex-col bg-bg-primary border-border rounded border-[1px] lg:mx-4 overflow-y-auto"
          >
            <NavigationList data={data} />
          </Primitive.Box>
        </Popover.Content>
      </Popover>
    </Primitive.Box>
  )
}

export {DocsSideNavigation}
