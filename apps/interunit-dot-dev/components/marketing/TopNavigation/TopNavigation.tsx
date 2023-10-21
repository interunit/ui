import {Link} from '@/components/system/Text'

import './TopNavigation.css'

function TopNavigation() {
  return (
    <>
      <nav className="MarketingTopNavigation z-40">
        <div className="MarketingTopNavigationInner" aria-hidden="true" />
        <div className="MarketingTopNavigationEdge" aria-hidden="true" />
        <div className="max-w-[1200px] w-full mx-auto z-10 relative h-full flex items-center justify-between px-4">
          <Link href="/" size="4" weight="medium">
            InterUnit
          </Link>
          <div>
            <ul className="list-none flex items-center gap-4">
              <li>
                <Link href="/ui/docs" size="3">
                  Docs
                </Link>
              </li>
              <li>
                <Link href="/x" size="3">
                  InterUnitX
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="h-[64px]" />
    </>
  )
}

export {TopNavigation}
