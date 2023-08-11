'use client'

import {Popover} from '@interunit/popover'
import {Primitive} from '@interunit/primitives'
import {ArrowRight, ChevronDown, Github, Twitter} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import {SearchBar} from '@/components/global/SearchBar'
import {Button} from '@/components/system/Button'
import {Text} from '@/components/system/Text'
import {gettingStarted, ui} from '@/constants/ui'
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
              <Popover triggerType="hover">
                <Popover.Trigger>
                  {({isOpen}) => (
                    <Button tabIndex={0} color="bg-secondary" variation="sm">
                      <Text el="span">Docs</Text>
                      <ChevronDown
                        color={theme.colors['text-light-accent']}
                        role="img"
                        className={`transition-transform ${
                          isOpen && 'rotate-180'
                        }`}
                        aria-label="Arrow pointing down"
                      />
                    </Button>
                  )}
                </Popover.Trigger>
                <Popover.Content
                  positioning={{
                    side: 'bottom',
                    align: 'end',
                    offset: 12,
                    width: 600,
                    maxWidth: '90vw',
                    zIndex: 11
                  }}
                  arrow={{
                    strokeColor: theme.colors.border,
                    size: 12,
                    borderRadius: 2,
                    strokeWidth: 2
                  }}
                >
                  <Primitive.Box
                    el="div"
                    className="rounded bg-bg-primary border"
                  >
                    <Primitive.Box
                      el="div"
                      className="flex flex-col lg:flex-row"
                    >
                      <Primitive.Box el="div" className="flex flex-col p-6">
                        <Text el="span" className="text-md font-medium">
                          Getting Started
                        </Text>
                        <Primitive.Box
                          el="ul"
                          className="list-none py-2 flex flex-col gap-1 px-2"
                        >
                          {gettingStarted.sections.map(section => (
                            <Primitive.Box el="li">
                              <Link
                                href={section.slug}
                                passHref
                                className="hover:no-underline"
                              >
                                <Text
                                  el="a"
                                  className="group text-md flex items-center gap-2 hover:no-underline"
                                >
                                  {section.name}
                                  <ArrowRight
                                    className="group-hover:translate-x-1 transition-transform"
                                    size={16}
                                    color={theme.colors['text-light-accent']}
                                  />
                                </Text>
                              </Link>
                            </Primitive.Box>
                          ))}
                        </Primitive.Box>
                      </Primitive.Box>
                      <Primitive.Box
                        el="ul"
                        className="m-0 flex-1 list-none p-0 flex flex-col bg-bg-primary border-t-[1px] lg:border-l-[1px] lg:border-t-[0px] hover:no-underline rounded-br rounded-bl lg:rounded-bl-none lg:rounded-tr lg:rounded-br"
                      >
                        {ui.sections.map((section, index) => (
                          <Primitive.Box
                            el="li"
                            className={`nav-popover-li first:border-b-[1px] hover:bg-bg-muted lg:first:rounded-tl-[7px] lg:first:rounded-tr-[7px] last:rounded-bl-[7px] last:rounded-br-[7px] transition-all`}
                            key={index}
                          >
                            <Link
                              href={`/docs/ui/${section?.slug}`}
                              className="flex flex-col hover:no-underline focus:no-underline"
                            >
                              <Primitive.Box
                                el="div"
                                className="border-border p-6 transition-all flex flex-col full-width gap-2  hover:no-underline"
                                key={index}
                              >
                                <Text el="h2" className="text-md font-medium">
                                  {section.name}
                                </Text>
                                <Text el="p" className="text-md">
                                  {section.description}
                                </Text>
                              </Primitive.Box>
                            </Link>
                          </Primitive.Box>
                        ))}
                      </Primitive.Box>
                    </Primitive.Box>
                  </Primitive.Box>
                </Popover.Content>
              </Popover>
            </Primitive.Box>
          </Primitive.Box>
          <Primitive.Box
            el="ul"
            className="hidden flex-row items-center list-none m-0 gap-4 lg:flex"
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
