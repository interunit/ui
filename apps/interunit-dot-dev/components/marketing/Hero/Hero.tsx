'use client'

import {Sparkles} from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import {Badge} from '@/components/system/Badge'
import {Box} from '@/components/system/Box'
import {Button} from '@/components/system/Button'
import {Heading, Text} from '@/components/system/Text'

import './Hero.css'
import smoke from './smoke'

function Hero() {
  const heroRef = React.useRef<HTMLDivElement>(null)

  function getRandomBoolean() {
    return Math.random() > 0.3
  }

  function handleSmoke() {
    if (heroRef.current) {
      const canvas = heroRef.current.querySelector('canvas')
      const hero = heroRef.current

      if (!canvas) return

      canvas.width = hero.clientWidth
      canvas.height = hero.clientHeight

      const context = canvas.getContext('2d')
      const machine = smoke(context, [255, 255, 255])
      // eslint-disable-next-line
      function blowSmoke() {
        if (getRandomBoolean()) {
          machine.addSmoke(hero.clientWidth / 2, hero.clientHeight, 20, {
            minVx: 0.1,
            maxVx: 0.2,
            minVy: 0.1,
            maxVy: 0.2
          })
        }
        if (getRandomBoolean()) {
          machine.addSmoke(hero.clientWidth / 2, hero.clientHeight, 20, {
            minVx: -0.1,
            maxVx: -0.2,
            minVy: -0.1,
            maxVy: -0.2
          })
        }
        if (getRandomBoolean()) {
          machine.addSmoke(hero.clientWidth / 2, hero.clientHeight, 20, {
            minVx: 0.1,
            maxVx: -0.2,
            minVy: 0.1,
            maxVy: -0.2
          })
        }
        if (getRandomBoolean()) {
          machine.addSmoke(hero.clientWidth / 2, hero.clientHeight, 20, {
            minVx: -0.1,
            maxVx: 0.2,
            minVy: 0.1,
            maxVy: -0.2
          })
        }

        machine.step(10) // pretend 10 ms pass and rerender

        setTimeout(function () {
          machine.start()
        }, 500)
      }

      blowSmoke()
      setInterval(function () {
        blowSmoke()
      }, 4000)
    }
  }

  React.useEffect(() => {
    if (window !== undefined) {
      handleSmoke()
      window.addEventListener('resize', handleSmoke)
    }

    return () => {
      window.removeEventListener('resize', handleSmoke)
    }
  }, [])

  return (
    <Box
      className="flex items-center justify-center pb-12 pt-[112px] px-4 relative overflow-hidden bg-gradient-to-r from-blue-50 -mt-[64px] border-b border-b-slate-100"
      ref={heroRef}
    >
      <Box className="py-16 max-w-[1200px] w-full flex gap-[2rem] flex-col lg:flex-row relative z-20">
        <Box className="lg:basis-1/2 flex flex-col gap-6">
          <Box>
            <Badge size="1" color="slate">
              <Sparkles size={16} className="inline-block mr-2 -mt-1" />
              Alpha version out now
            </Badge>
          </Box>
          <Heading el="h2" size="3" weight="normal" className="drop-shadow-lg">
            Effortless{' '}
            <Heading el="span" size="3" className="lg:whitespace-nowrap">
              cross-platform
            </Heading>{' '}
            interfaces
          </Heading>
        </Box>
        <Box className="flex flex-col gap-4 lg:basis-1/2 justify-end">
          <Text
            el="p"
            size="4"
            weight="light"
            kind="accent"
            className="drop-shadow-lg"
          >
            InterUnit is a collection of open source packages that help you
            build cross-platform interfaces. Fully accessible, highly
            composable, and easy to use. Build once, run anywhere.
          </Text>
          <Box>
            <Button color="blue" size="2" className="shadow-xl">
              Get Started
            </Button>
          </Box>
        </Box>
      </Box>
      <Image
        src="/interunit-logo.svg"
        alt="Interunit Logo"
        className="HeroLogo w-full max-w-[600px] h-auto z-10 shadow-lg opacity-10 absolute -bottom-[400px]"
        height="600"
        width="600"
      />
      <canvas className="w-full h-full absolute top-0 left-0 opacity-50" />
    </Box>
  )
}
export {Hero}
