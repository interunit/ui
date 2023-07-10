'use client'

import {Modal, description, homepage, name, version} from '@interunit/modal'
import {P} from '@interunit/primitives'
import React from 'react'

import {ComponentDisplay} from '@/components/docs/ComponentDisplay'
import {FeatureList} from '@/components/docs/FeatureList'
import {InstallBlock} from '@/components/docs/InstallBlock'
import {PackageInfo} from '@/components/docs/PackageInfo'
import {PropsTable} from '@/components/docs/PropsTable'
import {Button} from '@/components/system/Button'

const ModalPage = () => {
  const [showModal, setShowModal] = React.useState(false)
  const testRef = React.useRef(null)

  return (
    <P.BX el="div">
      <P.BX el="div" className="mb-8">
        <PackageInfo
          data={{title: 'Modal', name, description, version, homepage}}
        />
      </P.BX>
      <ComponentDisplay className="mb-12">
        <Button color="bg-secondary" onClick={() => setShowModal(true)}>
          Show Modal
        </Button>
        {showModal && (
          <Modal
            className="fixed top-0 left-0 w-full h-full bg-orange z-20 flex justify-center items-center bg-opacity-80"
            onClose={() => setShowModal(false)}
            ref={testRef}
          >
            <Button color="bg-secondary" onClick={() => setShowModal(false)}>
              Hide Modal
            </Button>
          </Modal>
        )}
      </ComponentDisplay>
      <P.BX el="div" className="mb-12">
        <P.TX el="h2" className="text-sm-hd mb-4">
          Installation
        </P.TX>
        <InstallBlock packageName={name} />
      </P.BX>
      <P.BX el="div" className="mb-12">
        <P.TX el="h2" className="text-sm-hd mb-4">
          What's Included
        </P.TX>
        <FeatureList>
          <FeatureList.Item>
            Fully accessible component to be used to create dialogs, popovers,
            modals, or anything else you can think of.
          </FeatureList.Item>
          <FeatureList.Item>Support for escape key closing</FeatureList.Item>
          <FeatureList.Item>Focus trapping control</FeatureList.Item>
        </FeatureList>
      </P.BX>
      <P.BX el="div" className="mb-12">
        <P.TX el="h2" className="text-sm-hd mb-4">
          {'<Modal/>'}
        </P.TX>
        <PropsTable
          propsToDisplay={[
            {
              name: 'isOpen',
              type: 'boolean | undefined',
              required: false,
              description:
                "If you plan to control the styling of the modal to be open or closed, you can pass this prop to control the open state of the modal. If you are using conditional rendering, this isn't necessary."
            },
            {
              name: 'onClose',
              type: 'boolean',
              required: false,
              description:
                'A function that will be called when the modal is closed'
            },
            {
              name: '...props',
              type: 'object',
              required: false,
              description: 'All rest props will go to the modal container'
            },
            {
              name: 'ref',
              type: 'React.RefObject',
              required: false,
              description: 'A ref to the modal container'
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              required: false,
              description: 'The contents of the modal'
            }
          ]}
        />
      </P.BX>
    </P.BX>
  )
}

export default ModalPage
