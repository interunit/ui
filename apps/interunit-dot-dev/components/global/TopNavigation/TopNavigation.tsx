'use client'

import {Popover} from '@interunit/popover'
import {Primitive} from '@interunit/primitives'
import {ChevronDown, Github, Twitter} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import {SearchBar} from '@/components/global/SearchBar'
import {Button} from '@/components/system/Button'
import {Text} from '@/components/system/Text'
import {ui} from '@/constants/ui'
import {theme} from '@/theme.config'

import './TopNavigation.css'

const TopNavigation = () => {
  return (
    <Primitive.Box el="div" className="bg-bg-primary border-b-[1px]">
      <Primitive.Box
        el="div"
        className="px-4 flex flex-row items-center justify-between max-w-[1200px] mx-auto"
      >
        <Link href="/" tabIndex={0}>
          <Primitive.Box
            el="span"
            className="flex flex-row items-center gap-3 py-4"
          >
            <Primitive.Image
            el="img"
              src="/interunit-logo.png"
              alt="Logo for InterUnit"
              className="full-width transition-all hover:rotate-180 max-w-[50px]"
            />
          </Primitive.Box>
        </Link>

        <Primitive.Box el="div" className="flex flex-row items-center gap-3">
          <SearchBar />
          <Primitive.Box
            el="ul"
            className="flex flex-row items-center mr-2 list-none"
          >
            <Primitive.Box
              el="li"
              className={`flex flex-row items-center m-0 NavigationArrow`}
            >
              <Popover
                triggerType="hover"
                popoverPositioning={{
                  side: 'bottom',
                  align: 'end',
                  offset: 12,
                  width: 600,
                  maxWidth: '100vw',
                  zIndex: 10,
                  arrow: {
                    strokeColor: theme.colors.border,
                    width: 12,
                    borderRadius: 2,
                    strokeWidth: 2
                  }
                }}
              >
                <Popover.Trigger>
                  <Button tabIndex={0} color="bg-secondary" variation="sm">
                    <Text el="span">Docs</Text>
                    <ChevronDown
                      color={theme.colors['text-light-accent']}
                      role="img"
                      aria-label="Arrow pointing down"
                    />
                  </Button>
                </Popover.Trigger>
                <Popover.Content>
                  <Primitive.Box el="div" className="rounded">
                    <Primitive.Box
                      el="ul"
                      className="m-0 list-none p-0 flex flex-col bg-bg-primary border rounded hover:no-underline"
                    >
                      {ui.sections.map((section, index) => (
                        <Primitive.Box
                          el="li"
                          className={`nav-popover-li first:border-b-[1px] hover:bg-bg-muted first:rounded-tl-[7px] first:rounded-tr-[7px] last:rounded-bl-[7px] last:rounded-br-[7px] transition-all`}
                          key={index}
                        >
                          <Link
                            href={`/docs/ui/${section.slug}`}
                            className="flex flex-col hover:no-underline focus:no-underline"
                          >
                            <Primitive.Box
                              el="div"
                              className="border-border p-6 transition-all flex flex-col full-width gap-2  hover:no-underline"
                              key={index}
                            >
                              <Text el="h2" variation="md">
                                {section.name}
                              </Text>
                              <Text el="p" variation="md">
                                {section.description}
                              </Text>
                            </Primitive.Box>
                          </Link>
                        </Primitive.Box>
                      ))}
                    </Primitive.Box>
                  </Primitive.Box>
                </Popover.Content>
              </Popover>
            </Primitive.Box>
          </Primitive.Box>
          <Primitive.Box
            el="ul"
            className="flex flex-row items-center list-none m-0 gap-4"
          >
            <Primitive.Box el="li" className="flex flex-row items-center m-0">
              <Link
                href="https://github.com/interunit"
                className="flex flex-col hover:no-underline focus:no-underline hover:bg-bg-muted rounded"
                tabIndex={0}
              >
                <Primitive.Box el="span" className="inline-block p-4">
                  <Github
                    color={theme.colors['text-light-accent']}
                    role="img"
                    aria-label="GitHub logo for going to the InterUnit GitHub"
                  />
                </Primitive.Box>
              </Link>
            </Primitive.Box>
            <Primitive.Box el="li">
              <Link
                href="https://twitter.com/interunitdev"
                className="flex flex-col hover:no-underline focus:no-underline hover:bg-bg-muted rounded"
                tabIndex={0}
              >
                <Primitive.Box el="span" className="inline-block p-4">
                  <Twitter
                    color={theme.colors['text-light-accent']}
                    role="img"
                    aria-label="Twitter logo for going to the InterUnit Twitter"
                  />
                </Primitive.Box>
              </Link>
            </Primitive.Box>
          </Primitive.Box>
        </Primitive.Box>
      </Primitive.Box>
    </Primitive.Box>
  )
}

export {TopNavigation}
