import React from 'react'
import { TopNavigation} from '@/components/global/TopNavigation'
const DocsLayout = ({children}: { children: typeof React.Children}) => {
  return <><TopNavigation/>{children}</>
}

export default DocsLayout
