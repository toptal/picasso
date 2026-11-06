import { useSidebar, usePageTopBar } from '@toptal/picasso-provider'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import type { ReactNode } from 'react'
import React, { forwardRef, useCallback, useEffect, useState } from 'react'
import { Container } from '@toptal/picasso-container'
import { noop } from '@toptal/picasso-utils'

import { PageHamburgerPortal, useHamburgerContext } from '../PageHamburger'
import { SidebarItem } from '../SidebarItem'
import { SidebarLogo } from '../SidebarLogo'
import { SidebarMenu } from '../SidebarMenu'
import type { VariantType } from './types'
import PageSidebarDesktop from './PageSidebarDesktop'

export interface Props extends BaseProps {
  /** Style variant of Sidebar and subcomponents */
  variant?: VariantType
  /** Content */
  children?: ReactNode
  /** Indicates Sidebar is collapsible */
  collapsible?: boolean
  /** Indicates Sidebar is collapsed as default **(applied if `collapsible: true`)** */
  defaultCollapsed?: boolean
  /** Controlled collapsed state **(applied if `collapsible: true`)**; when set, `defaultCollapsed` is ignored */
  collapsed?: boolean
  /** Test ids of the sidebar's inner elements */
  testIds?: {
    collapseButton?: string
    container?: string
    scrollableContainer?: string
  }
  /** Different width of sidebar */
  size?: SizeType<'small' | 'medium' | 'large'>
  /** Make sidebar scroll with the content */
  disableSticky?: boolean
  /** Max height of the wrapper around the sidebar's content */
  wrapperMaxHeight?: string | number
  /** Callback invoked when the collapse button is clicked, with the collapsed state it requests */
  onCollapse?: (collapsed: boolean) => void
}

const classesByVariant = {
  light: 'shadow-gray-200 bg-gray-100',
  dark: 'shadow-graphite-800 bg-graphite-800',
}

const classesBySize = {
  small: 'w-[212px]',
  medium: 'w-[236px]',
  large: 'w-[280px]',
}

export const PageSidebar = forwardRef<HTMLDivElement, Props>(function Sidebar(
  { variant = 'light', size = 'medium', ...props },
  ref
) {
  const {
    children,
    className,
    style,
    collapsible,
    defaultCollapsed,
    collapsed,
    testIds,
    wrapperMaxHeight,
    disableSticky,
    onCollapse = noop,
  } = props

  const [internalCollapsed, setInternalCollapsed] = useState(!!defaultCollapsed)

  const isControlled = collapsed !== undefined
  const isCollapsed =
    !!collapsible && (isControlled ? collapsed : internalCollapsed)

  // Keep the last controlled state, so that unsetting `collapsed` doesn't jump back to `defaultCollapsed`
  useEffect(() => {
    if (isControlled) {
      setInternalCollapsed(collapsed)
    }
  }, [isControlled, collapsed])

  const { setHasSidebar } = useSidebar()
  const { hasPageHamburger } = useHamburgerContext()
  const { hasTopBar } = usePageTopBar()

  useEffect(() => {
    setHasSidebar(true)

    return function cleanup() {
      setHasSidebar(false)
    }
  }, [setHasSidebar])

  const handleCollapse = useCallback(() => {
    const nextCollapsed = !isCollapsed

    if (!isControlled) {
      setInternalCollapsed(nextCollapsed)
    }

    onCollapse(nextCollapsed)
  }, [isControlled, isCollapsed, onCollapse])

  return (
    <Container
      ref={ref}
      style={style}
      className={twMerge(
        'h-full',
        'shadow-[inset_-1px_0_0_0]',
        'text-lg/[inherit]',
        'relative',
        'group/sidebar',
        'transition-[width] ease-in-out delay-[225ms]',
        'hidden min-[1280px]:block',
        '[&]:before:absolute',
        '[&]:before:content-[""]',
        '[&]:before:left-0',
        '[&]:before:top-0',
        '[&]:before:w-[15.5rem]',
        '[&]:before:h-full',
        className,
        classesByVariant[variant],
        classesBySize[size],
        'xs:max-md:overflow-y-scroll',
        isCollapsed && [
          'w-[5rem]',
          '[&]:before:w-[5.75rem]',
          '[&_.scrollable-content]:[-ms-overflow-style:none]',
          '[&_.scrollable-content]:[scrollbar-width:none]',
        ],
        !hasTopBar && 'block'
      )}
      data-testid={testIds?.container}
    >
      {hasPageHamburger ? (
        <PageHamburgerPortal>{children}</PageHamburgerPortal>
      ) : (
        <PageSidebarDesktop
          testIds={testIds}
          variant={variant}
          wrapperMaxHeight={wrapperMaxHeight}
          disableSticky={disableSticky}
          collapsible={collapsible}
          isCollapsed={isCollapsed}
          onCollapse={handleCollapse}
        >
          {children}
        </PageSidebarDesktop>
      )}
    </Container>
  )
})

PageSidebar.displayName = 'PageSidebar'

export default Object.assign(PageSidebar, {
  Menu: SidebarMenu,
  Item: SidebarItem,
  Logo: SidebarLogo,
})
