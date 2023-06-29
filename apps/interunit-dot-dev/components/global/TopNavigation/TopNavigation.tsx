'use client'

import {ChevronDown, Github, Twitter} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import {Button} from '@/components/primitives/Button'
import {Text} from '@/components/primitives/Text'
import {ui} from '@/constants/ui'
import {useTheme} from '@interunit/config'
import {Popover} from '@interunit/popover'
import {Primitive} from '@interunit/primitives'

import {
  Logo,
  NavigationList,
  NavigationListButton,
  NavigationListItem,
  NavigationListItemPopoverContent,
  NavigationListLink,
  NavigationPopoverList,
  NavigationPopoverListItem,
  NavigationPopoverListLink,
  NavigationPopoverSection
} from './TopNavigation.styled'

// Change To Image Primitive

const TopNavigation = () => {
  const theme = useTheme()
  return (
    <Primitive.Box
      as="div"
      sp={{p: [0, 2]}}
      flx={{dir: 'x', ai: 'center', jc: 'space-between'}}
      bg={{c: theme?.color.background.primary}}
      bdr={{c: theme?.color.border.primary, w: [0, 0, 1, 0]}}
    >
      <Link href="/">
        <Primitive.Box
          as="span"
          flx={{dir: 'x', ai: 'center', gp: 0.75}}
          sp={{p: [1, 0]}}
        >
          <Logo
            src="/interunit-logo.svg"
            alt="Logo for InterUnit"
            sz={{w: 60}}
          />
        </Primitive.Box>
      </Link>
      <Primitive.Box as="div" flx={{dir: 'x', ai: 'center', gp: 0.75}}>
        <NavigationList>
          <NavigationListItem>
            <Popover
              triggerType="hover"
              popoverPositioning={{
                placement: 'bottom-end',
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
                <NavigationListButton>
                  <Primitive.Box
                    as="span"
                    flx={{dir: 'x', ai: 'center', gp: 0.5}}
                  >
                    <Text as="span">Documentation</Text>
                    <ChevronDown
                      color={theme?.color.text.secondary}
                      aria-role="img"
                      aria-label="Arrow pointing down"
                    />
                  </Primitive.Box>
                </NavigationListButton>
              </Popover.Trigger>
              <Popover.Content>
                <NavigationListItemPopoverContent>
                  {ui.sections.map((section, index) => (
                    <NavigationPopoverListLink
                      href={`/docs/ui/${section.slug}`}
                      className="nav-popover-list-link"
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
                  ))}
                </NavigationListItemPopoverContent>
              </Popover.Content>
            </Popover>
          </NavigationListItem>
          <NavigationListItem>
            <NavigationListLink href="https://github.com/interunit">
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
            <NavigationListLink href="https://twitter.com/interunitdev">
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
