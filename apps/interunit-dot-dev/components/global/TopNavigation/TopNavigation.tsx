'use client'

import {Popover} from '@interunit/popover'
import {Primitive} from '@interunit/primitives'
import {ArrowRight, ChevronDown, Github, Twitter} from 'lucide-react'
import React from 'react'

import {SearchBar} from '@/components/global/SearchBar'
import {Button} from '@/components/system/Button'
import {Link, Text} from '@/components/system/Text'
import {gettingStarted, ui} from '@/constants/ui'
import {theme} from '@/theme.config'

import './TopNavigation.css'

const TopNavigation = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <Primitive.Box
      el="div"
      className="border-b-slate-100 border-b-[1px] bg-gradient-to-r from-blue-50"
    >
      <Primitive.Box
        el="div"
        className="px-4 flex flex-row items-center justify-between max-w-[1200px] mx-auto"
      >
        <Link href="/">
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
                value={isOpen}
                onValueChange={setIsOpen}
                className="relative"
              >
                <Popover.Trigger asChild>
                  <Button tabIndex={0} color="blue" size="2">
                    <Text el="span" size="2">
                      Docs
                    </Text>
                    <ChevronDown
                      color={theme.colors.gray[1100]}
                      role="img"
                      className={`transition-transform
                      ${isOpen && 'rotate-180'}
                        `}
                      aria-label="Arrow pointing down"
                    />
                  </Button>
                </Popover.Trigger>
                {isOpen && (
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
                      strokeColor: theme.colors.gray[200],
                      size: 12,
                      borderRadius: 2,
                      strokeWidth: 2
                    }}
                    asChild
                  >
                    <Primitive.Box
                      el="div"
                      className="rounded bg-gray-50 border border-gray-200"
                    >
                      <Primitive.Box
                        el="div"
                        className="flex flex-col lg:flex-row"
                      >
                        <Primitive.Box
                          el="div"
                          className="flex flex-col p-6 border-r border-r-gray-200"
                        >
                          <Text el="span" size="2">
                            Getting Started
                          </Text>
                          <Primitive.Box
                            el="ul"
                            className="list-none py-2 flex flex-col gap-1 px-2 h-full"
                          >
                            {gettingStarted.sections.map((section, index) => (
                              <Primitive.Box el="li" key={index}>
                                <Link
                                  href={section.slug}
                                  passHref
                                  className="hover:no-underline"
                                  size="2"
                                >
                                  <Text
                                    el="span"
                                    className="group text-md flex items-center gap-2 hover:no-underline"
                                    size="2"
                                  >
                                    {section.name}
                                    <ArrowRight
                                      className="group-hover:translate-x-1 transition-transform"
                                      size={16}
                                      color={theme.colors.gray[1100]}
                                    />
                                  </Text>
                                </Link>
                              </Primitive.Box>
                            ))}
                          </Primitive.Box>
                        </Primitive.Box>
                        {ui.sections.map((section, index) => (
                          <Primitive.Box
                            el="div"
                            className={`nav-popover-li hover:bg-gray-100 transition-all`}
                            key={index}
                          >
                            <Link
                              href={`/ui/docs`}
                              size="2"
                              className="flex flex-col hover:no-underline focus:no-underline"
                            >
                              <Primitive.Box
                                el="div"
                                className="p-6 transition-all flex flex-col gap-2 hover:no-underline"
                                key={index}
                              >
                                <Text el="h2" size="2" weight="medium">
                                  {section.name}
                                </Text>
                                <Text el="p" size="2">
                                  {section.description}
                                </Text>
                              </Primitive.Box>
                            </Link>
                          </Primitive.Box>
                        ))}
                      </Primitive.Box>
                    </Primitive.Box>
                  </Popover.Content>
                )}
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
                size="2"
                className="flex flex-col hover:no-underline focus:no-underline hover:bg-bg-muted rounded"
              >
                <Primitive.Box el="span" className="inline-block p-4">
                  <Github
                    color={theme.colors.gray[1100]}
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
                size="2"
              >
                <Primitive.Box el="span" className="inline-block p-4">
                  <Twitter
                    color={theme.colors.gray[1100]}
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
