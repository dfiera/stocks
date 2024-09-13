import { TabNavigation, TabNavigationLink } from './TabNavigation.tsx'
import { RiBankLine, RiStockLine } from '@remixicon/react'

export default function Navigation() {
  return (
    <TabNavigation className="flex justify-end my-10">
      <TabNavigationLink href="/markets" active className="inline-flex gap-2">
        <RiBankLine className="size-4" aria-hidden="true" />
        Markets
      </TabNavigationLink>
      <TabNavigationLink href="/screener" className="inline-flex gap-2">
        <RiStockLine className="-ml-1 size-4" aria-hidden="true" />
        Screener
      </TabNavigationLink>
    </TabNavigation>
  )
}
