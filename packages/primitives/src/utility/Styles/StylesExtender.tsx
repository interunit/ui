import React from 'react'

import {Styles} from './Styles'

const StylesExtender = ({
  as,
  css,
  ...props
}: {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
  as: React.ReactNode | React.FC<any>
  css: string
}) => {
  const Component = Styles({element: as, customCss: css})
  return <Component {...props} />
}

export {StylesExtender}
