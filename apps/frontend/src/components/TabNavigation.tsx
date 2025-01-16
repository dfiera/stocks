// Tremor TabNavigation [v0.1.0]

import React from 'react'
import * as NavigationMenuPrimitives from '@radix-ui/react-navigation-menu'
import { cx, focusRing } from '../lib/utils.ts'

function getSubtree(
  options: { asChild: boolean | undefined; children: React.ReactNode },
  content: React.ReactNode | ((children: React.ReactNode) => React.ReactNode),
) {
  const { asChild, children } = options
  if (!asChild)
    return typeof content === "function" ? content(children) : content

  const firstChild = React.Children.only(children) as React.ReactElement
  return React.cloneElement(firstChild, {
    children:
      typeof content === "function"
        ? content(firstChild.props.children)
        : content,
  })
}

const TabNavigation = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitives.Root>,
  Omit<
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitives.Root>,
    "orientation" | "defaultValue" | "dir"
  >
>(({ className, children, ...props }, forwardedRef) => (
  <NavigationMenuPrimitives.Root
    ref={forwardedRef}
    {...props}
    tremor-id="tremor-raw"
    asChild={false}
  >
    <NavigationMenuPrimitives.List
      className={cx(
        // base
        "flex items-center justify-start whitespace-nowrap border-b [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        // border color
        "border-gray-200 dark:border-gray-800",
        className,
      )}
    >
      {children}
    </NavigationMenuPrimitives.List>
  </NavigationMenuPrimitives.Root>
))

TabNavigation.displayName = "TabNavigation"

const TabNavigationLink = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitives.Link>,
  Omit<
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitives.Link>,
    "onSelect"
  > & { disabled?: boolean }
>(({ asChild, disabled, className, children, ...props }, forwardedRef) => (
  <NavigationMenuPrimitives.Item className="flex" aria-disabled={disabled}>
    <NavigationMenuPrimitives.Link
      aria-disabled={disabled}
      className={cx(
        "group relative flex shrink-0 select-none items-center justify-center",
        disabled ? "pointer-events-none" : "",
      )}
      ref={forwardedRef}
      onSelect={() => {}}
      asChild={asChild}
      {...props}
    >
      {getSubtree({ asChild, children }, (children) => (
        <span
          className={cx(
            // base
            "-mb-px inline-block relative items-center justify-center whitespace-nowrap px-3 text-sm font-medium transition-all",
            // ::after base
            "after:absolute after:bottom-[-22px] after:left-0 after:w-full after:border-b-2 after:border-transparent after:pointer-events-none",
            // text color
            "text-gray-500 dark:text-gray-500",
            // hover
            "group-hover:text-gray-700 group-hover:dark:text-gray-400",
            // ::after border hover
            "group-hover:after:border-gray-300 group-hover:dark:after:border-gray-400",
            // selected
            "group-data-[active]:after:border-blue-500 group-data-[active]:text-blue-500",
            "group-data-[active]:dark:after:border-blue-500 group-data-[active]:dark:text-blue-500",
            // disabled
            disabled
              ? "pointer-events-none text-gray-300 dark:text-gray-700"
              : "",
            focusRing,
            className,
          )}
        >
          {children}
        </span>
      ))}
    </NavigationMenuPrimitives.Link>
  </NavigationMenuPrimitives.Item>
))

TabNavigationLink.displayName = "TabNavigationLink"

export {
  TabNavigation,
  TabNavigationLink
}
