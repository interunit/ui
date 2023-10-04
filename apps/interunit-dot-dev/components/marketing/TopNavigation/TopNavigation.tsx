import {Text} from '@/components/system/Text'

import './TopNavigation.css'

function TopNavigation() {
  return (
    <>
      <nav className="MarketingTopNavigation z-40">
        <div className="MarketingTopNavigationInner" aria-hidden="true" />
        <div className="MarketingTopNavigationEdge" aria-hidden="true" />
        <div className="max-w-[1200px] w-full mx-auto z-10 relative h-full flex items-center justify-betwen px-4">
          <Text el="span" size="4" weight="medium">
            InterUnit
          </Text>
        </div>
      </nav>
      <div className="h-[64px]" />
    </>
  )
}

export {TopNavigation}
