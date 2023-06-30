'use client'

import {ChevronDown, Github, Twitter} from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {useTheme} from 'styled-components'

import {Primitive} from '@/components/primitives'
import {Text} from '@/components/system/Text'
import {ui} from '@/constants/ui'
import {Popover} from '@interunit/popover'

import {
  Logo,
  NavigationList,
  NavigationListButton,
  NavigationListItem,
  NavigationListLink,
  NavigationPopoverList,
  NavigationPopoverListItem,
  NavigationPopoverListLink,
  NavigationPopoverSection
} from './TopNavigation.styled'

const TopNavigation = () => {
  const theme = useTheme()
  return (
    <Primitive.Box
      as="div"
      sp={{p: [0, 1]}}
      flx={{dir: 'x', ai: 'center', jc: 'space-between'}}
      bg={{c: theme?.color.background.primary}}
      bdr={{c: theme?.color.border.primary, w: [0, 0, 1, 0]}}
    >
      <Link href="/" tabIndex={0}>
        <Primitive.Box
          as="span"
          flx={{dir: 'x', ai: 'center', gp: 0.75}}
          sp={{p: [1, 0]}}
        >
          <Logo src="/interunit-logo.svg" alt="Logo for InterUnit" />
        </Primitive.Box>
      </Link>
      <Primitive.Box as="div" flx={{dir: 'x', ai: 'center', gp: 0.75}}>
        <NavigationList>
          <NavigationListItem>
            <Popover
              triggerType="click"
              popoverPositioning={{
                side: 'bottom',
                align: 'end',
                offset: 12,
                width: 600,
                maxWidth: '100vw',
                arrow: {
                  tipRadius: 2,
                  stroke: theme?.color.border.primary,
                  strokeWidth: 2
                }
              }}
            >
              <Popover.Trigger>
                <NavigationListButton  tabIndex={0}>
                  <Primitive.Box
                    as="span"
                    flx={{dir: 'x', ai: 'center', gp: 0.5}}
                  >
                    <Text as="span">Docs</Text>
                    <ChevronDown
                      color={theme?.color.text.secondary}
                      aria-role="img"
                      aria-label="Arrow pointing down"
                    />
                  </Primitive.Box>
                </NavigationListButton>
              </Popover.Trigger>
              <Popover.Content>
                <NavigationPopoverList>
                  {ui.sections.map((section, index) => (
                    <NavigationPopoverListItem className="nav-popover-li">
                      <NavigationPopoverListLink
                        href={`/docs/ui/${section.slug}`}
                      >
                        <NavigationPopoverSection key={index}>
                          <Text as="h2" variation="md">
                            {section.name}
                          </Text>
                          <Text as="p" variation="md">
                            {section.description}
                          </Text>
                        </NavigationPopoverSection>
                      </NavigationPopoverListLink>
                    </NavigationPopoverListItem>
                  ))}
                </NavigationPopoverList>
              </Popover.Content>
            </Popover>
          </NavigationListItem>
          <NavigationListItem>
            <NavigationListLink
              href="https://github.com/interunit"
              tabIndex={0}
            >
              <Primitive.Box as="span">
                <Github
                  color={theme?.color.text.secondary}
                  aria-role="img"
                  aria-label="GitHub logo for going to the InterUnit GitHub"
                />
              </Primitive.Box>
            </NavigationListLink>
          </NavigationListItem>
          <NavigationListItem>
            <NavigationListLink
              href="https://twitter.com/interunitdev"
              tabIndex={0}
            >
              <Primitive.Box as="span">
                <Twitter
                  color={theme?.color.text.secondary}
                  aria-role="img"
                  aria-label="Twitter logo for going to the InterUnit Twitter"
                />
              </Primitive.Box>
            </NavigationListLink>
          </NavigationListItem>
        </NavigationList>
      </Primitive.Box>
    </Primitive.Box>
  )
}

export {TopNavigation}
