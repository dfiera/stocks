import * as NavigationMenuPrimitives from '@radix-ui/react-navigation-menu'
import { Link } from '@tanstack/react-router'
// import { RiBankLine, RiStockLine } from '@remixicon/react'
import { TabNavigation } from './TabNavigation.tsx'

export default function Navigation() {
  return (
    <TabNavigation className="flex justify-end gap-4 my-8 text-white">
      {/*<NavigationMenuPrimitives.Item>*/}
      {/*  <Link to="/markets">*/}
      {/*    /!*<RiBankLine className="size-4" aria-hidden="true" />*!/*/}
      {/*    Markets*/}
      {/*  </Link>*/}
      {/*</NavigationMenuPrimitives.Item>*/}
      <NavigationMenuPrimitives.Item>
        <Link to="/">
          {/*<RiStockLine className="-ml-1 size-4" aria-hidden="true" />*/}
          Screener
        </Link>
      </NavigationMenuPrimitives.Item>
    </TabNavigation>
  )
}
